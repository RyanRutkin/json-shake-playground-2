import { IterableObject } from '../../types/IterableObject.type';
import { ShakeModuleInstanceDefinition } from '../../types/ShakeModuleInstanceDefinition.type';
import { ShakeVariableDefinition } from '../../types/ShakeVariableDefinition.type';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';
import { ShakeExecutionInstance } from './ShakeExecutionInstance.class';
import { ShakeTriggerInstance } from './ShakeTriggerInstance.class';
import { ShakeVariableInstance } from './ShakeVariableInstance.class';

export class ShakeModuleInstance {
    constructor(
        public label: string = '',
        private _parent: ShakeModuleInstance | null = null
    ) {
        if (_parent) {
            _parent.addModule(this);
        }
    }

    onStart: ShakeExecutionInstance | null = null;
    onDestroy: ShakeExecutionInstance | null = null;
    triggers: ShakeTriggerInstance[] = [];

    private _variables: IterableObject<ShakeVariableInstance<keyof ShakeVariableType>> = {};
    getVariables(): IterableObject<ShakeVariableInstance<keyof ShakeVariableType>> {
        return this._variables;
    }
    addVariable(variable: ShakeVariableDefinition) {
        this._variables[variable.label] = ShakeVariableInstance.deserializeFromJson(variable);
    }

    private _modules: ShakeModuleInstance[] = [];
    getModules(): ShakeModuleInstance[] {
        return this._modules;
    }
    addModule(shakeModule: ShakeModuleInstance) {
        if (shakeModule.getParent() !== this) {
            shakeModule.setParent(this);
        } else {
            this._modules.push(shakeModule);
        }
    }
    removeModule(shakeModule: ShakeModuleInstance) {
        if (shakeModule.getParent() === this) {
            shakeModule.setParent(null);
        } else if (this._modules.indexOf(shakeModule) > -1) {
            this._modules.splice(this._modules.indexOf(shakeModule), 1);
        }
    }

    getParent(): ShakeModuleInstance | null {
        return this._parent;
    }
    setParent(parent: ShakeModuleInstance | null) {
        const oldParent = this._parent;
        this._parent = parent;
        if (oldParent) {
            oldParent.removeModule(this);
            this._parent = parent;
        }
        if (this._parent) {
            this._parent.addModule(this);
        }
    }

    resolveVariable(label: string): ShakeVariableInstance<keyof ShakeVariableType> | undefined {
        if (this._variables.hasOwnProperty(label)) {
            return this._variables[label];
        }
        return undefined;
    }

    reportStack(): string[] {
        return [this.label, ...(this._parent ? this._parent.reportStack() : [])];
    }

    serializeAsJson(): ShakeModuleInstanceDefinition {
        return {
            label: this.label,
            variables: Object.entries(this._variables).reduce<IterableObject<ShakeVariableDefinition>>((coll, [key, value]) => {
                coll[key] = value.serializeAsJson();
                return coll;
            }, {}),
            modules: this._modules.map(mod => mod.serializeAsJson()),
            onStart: this.onStart ? this.onStart.serializeAsJson() : null,
            onDestroy: this.onDestroy ? this.onDestroy.serializeAsJson() : null,
            triggers: this.triggers.map(trigger => trigger.serializeAsJson())
        };
    }
    
    static deserializeFromJson(def: ShakeModuleInstanceDefinition, mod?: ShakeModuleInstance) {
        const nModule = new ShakeModuleInstance(def.label, mod);
        Object.entries(def.variables).forEach(([key, value]) => {
            // Adds itself to module
            nModule.addVariable(value);
        });
        nModule.onStart = def.onStart ? ShakeExecutionInstance.deserializeFromJson(def.onStart, nModule) : null;
        nModule.onDestroy = def.onDestroy ? ShakeExecutionInstance.deserializeFromJson(def.onDestroy, nModule) : null;
        nModule.triggers = def.triggers.map(trigger => ShakeTriggerInstance.deserializeFromJson(trigger, nModule));
        def.modules.forEach(subMod => ShakeModuleInstance.deserializeFromJson(subMod, nModule));
        return nModule;
    }
}