import { IterableObject } from '../../types/IterableObject.type';
import { ShakeModuleInstanceDefinition } from '../../types/ShakeModuleInstanceDefinition.type';
import { ShakeVariableDefinition } from '../../types/ShakeVariableDefinition.type';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';
import { ShakeModule } from '../base/ShakeModule.class';
import { ShakeVariableInstance } from './ShakeVariableInstance.class';

export class ShakeModuleInstance {
    constructor(
        public label: string = '',
        private _parent: ShakeModuleInstance | null = null
    ) {
        if (_parent) {
            _parent.add
        }
    }

    private _variables: IterableObject<ShakeVariableInstance<ShakeVariableType>> = {};
    getVariables(): IterableObject<ShakeVariableInstance<ShakeVariableType>> {
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
            shakeModule.changeParentModule(this);
        } else {
            this._modules.push(shakeModule);
        }
    }
    removeModule(shakeModule: ShakeModuleInstance) {
        if (shakeModule.getParent() === this) {
            shakeModule.changeParentModule(null);
        } else if (this._modules.indexOf(shakeModule) > -1) {
            this._modules.splice(this._modules.indexOf(shakeModule), 1);
        }
    }

    getParent(): ShakeModuleInstance | null {
        return this._parent;
    }
    changeParentModule(parent: ShakeModuleInstance | null) {
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

    resolveVariable(label: string): ShakeVariableInstance<ShakeVariableType> | undefined {
        if (this._variables.hasOwnProperty(label)) {
            return this._variables[label];
        }
        return undefined;
    }

    onStart: ShakeExecution | null = null;
    onDestroy: ShakeExecution | null = null;

    triggers: ShakeTrigger[] = [];

    serializeAsJson(): ShakeModuleDefinition {
        return {
            label: this.label,
            variables: Object.entries(this._variables).reduce<IterableObject<ShakeVariableDefinition>>((coll, [key, value]) => {
                coll[key] = value;
                return coll;
            }, {}),
            onStart: this.onStart ? this.onStart.serializeAsJson() : null,
            onDestroy: this.onDestroy ? this.onDestroy.serializeAsJson() : null,
            triggers: this.triggers.map(trigger => trigger.serializeAsJson())
        };
    }
    
    static deserializeFromJson(def: ShakeModuleDefinition) {
        const nModule = new ShakeModule(def.label);
        Object.entries(def.variables).forEach(([key, value]) => {
            // Adds itself to module
            nModule.addVariable(value);
        });
        nModule.onStart = def.onStart ? ShakeExecution.deserializeFromJson(def.onStart) : null;
        nModule.onDestroy = def.onDestroy ? ShakeExecution.deserializeFromJson(def.onDestroy) : null;
        nModule.triggers = def.triggers.map(trigger => ShakeTrigger.deserializeFromJson(trigger));
        return nModule;
    }
}