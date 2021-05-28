import { staticImplements } from '../../decorators/static-implements.decorator';
import { IterableObject } from '../../types/IterableObject.type';
import { ShakeBaseStatic } from '../../types/ShakeBase.type';
import { ShakeModuleDefinition } from '../../types/ShakeModuleDefinition.type';
import { ShakeVariableDefinition } from '../../types/ShakeVariableDefinition.type';
import { ShakeExecution } from './ShakeExecution.class';
import { ShakeTrigger } from './ShakeTrigger.class';

/**
 * A module definition, in itself, does not have nesting.
 * Nesting is only obtained by instances of modules.
 */

@staticImplements<ShakeBaseStatic<ShakeModuleDefinition, ShakeModule>>()
export class ShakeModule {
    constructor(public label: string = '') {}

    private _variables: IterableObject<ShakeVariableDefinition> = {};

    getVariables(): IterableObject<ShakeVariableDefinition> {
        return this._variables;
    }
    addVariable(variable: ShakeVariableDefinition) {
        this._variables[variable.label] = variable;
    }

    resolveVariable(label: string): ShakeVariableDefinition | undefined {
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