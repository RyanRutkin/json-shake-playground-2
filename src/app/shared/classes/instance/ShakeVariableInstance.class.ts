import { Subject } from 'rxjs';
import { ShakeVariableDefinition } from '../../types/ShakeVariableDefinition.type';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';
import { ShakeClosureInstance } from './ShakeClosureInstance.class';
import { ValueOf } from '../../types/ValueOf.type';
import { IterableObject } from '../../types/IterableObject.type';
import { v4 as uuidv4 } from 'uuid';

export class ShakeVariableInstance<T extends ValueOf<ShakeVariableType>> {
    constructor (
        def: ShakeVariableDefinition,
        private _parent: ShakeClosureInstance
    ) {
        switch (def.type) {
            case 'boolean':
                this._value = (String(def.value).toLowerCase() === 'true' ? true : false) as T;
            case 'number':
                this._value = parseFloat(String(def.value)) as T;
            case 'string':
                this._value = String(def.value) as T;
            case 'object':
                try {
                    this._value = JSON.parse(def.value) as T;
                } catch (e) {
                    this._value = String(def.value) as T;
                }
            default: 
                this._value = def.value as T;
        }
        this.label = def.label;
        this.type = def.type;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
    }

    getParent(): ShakeClosureInstance {
        return this._parent;
    }
    setParent(p: ShakeClosureInstance) {
        this._parent = p;
    }

    readonly id: string;
    readonly type: keyof ShakeVariableType;
    label: string;
    private _value: T;
    getValue(): T {
        if (this.type === 'object') {
            return {...(this._value as IterableObject)} as T;
        }
        return this._value;
    }
    setValue(value: T) {
        this.beforeChange$.next(this.getValue());
        this._value = value;
        this.onChange$.next(this.getValue());
    }

    readonly beforeChange$: Subject<T> = new Subject();
    readonly onChange$: Subject<T> = new Subject();

    getStringifiedValue(): string {
        if (this._value && typeof this._value === 'object') {
            try {
                return JSON.stringify(this._value);
            } catch (e) {}
        }
        return String(this._value);
    }

    serializeAsJson(): ShakeVariableDefinition {
        return {
            label: this.label,
            value: this.getStringifiedValue(),
            type: this.type,
            id: this.id
        }
    }

    static deserializeFromJson(def: ShakeVariableDefinition, closure: ShakeClosureInstance) {
        switch (def.type) {
            case 'boolean':
                return new ShakeVariableInstance<boolean>(def, closure);
            case 'number':
                return new ShakeVariableInstance<number>(def, closure);
            case 'string':
                return new ShakeVariableInstance<string>(def, closure);
            case 'object':
                try {
                    return new ShakeVariableInstance<object>(def, closure);
                } catch (e) {
                    return new ShakeVariableInstance<string>(def, closure);
                }
            default: 
                return new ShakeVariableInstance<any>(def, closure);
        }
    }
}