import { Subject } from 'rxjs';
import { ShakeVariableDefinition } from '../../types/ShakeVariableDefinition.type';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';

export class ShakeVariableInstance<T extends keyof ShakeVariableType> {
    constructor (
        readonly label: string,
        readonly type: T,
        initialValue?: ShakeVariableType[T]
    ) {
        this._value = initialValue;
    }

    private _value: ShakeVariableType[T];
    getValue(): ShakeVariableType[T] {
        if (this.type === 'object') {
            return {...this._value};
        }
        return this._value;
    }
    setValue(value: ShakeVariableType[T]) {
        this.beforeChange.next(this._value);
        this._value = value;
        this.onChange.next(this._value);
    }

    readonly beforeChange: Subject<ShakeVariableType[T]> = new Subject();
    readonly onChange: Subject<ShakeVariableType[T]> = new Subject();

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
            type: this.type
        }
    }

    static deserializeFromJson(def: ShakeVariableDefinition) {
        switch (def.type) {
            case 'boolean':
                return new ShakeVariableInstance<"boolean">(def.label, def.type, String(def.value).toLowerCase() === 'true' ? true : false);
            case 'number':
                return new ShakeVariableInstance<"number">(def.label, def.type, parseFloat(String(def.value)));
            case 'string':
                return new ShakeVariableInstance<"string">(def.label, def.type, def.value);
            case 'object':
                try {
                    return new ShakeVariableInstance<"object">(def.label, def.type, JSON.parse(def.value));
                } catch (e) {
                    return new ShakeVariableInstance<"string">(def.label, "string", String(def.value));
                }
            default: 
                return new ShakeVariableInstance<"any">(def.label, "any", def.value);
        }
    }
}