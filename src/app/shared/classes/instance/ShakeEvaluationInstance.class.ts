/**
 * Simply evaluates logic and returns a result
 */

import { RulesLogic } from 'json-logic-js';
import { ShakeEvaluationDefinition } from '../../types/ShakeEvaluationDefinition.type';
import { ValueOf } from '../../types/ValueOf.type';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';
import { apply } from 'json-logic-js';
import { getVariableReferencesInLogic } from '../../functions/get-variable-references-in-logic.function';
import { IterableObject } from '../../types/IterableObject.type';
import { ShakeModuleInstance } from './ShakeModuleInstance.class';

export class ShakeEvaluationInstance {
    constructor (
        public label: string = '',
        public parent: ShakeModuleInstance
    ) {}

    logic: RulesLogic = '';

    run(): ValueOf<ShakeVariableType> {
        const vars = getVariableReferencesInLogic(this.logic);
        return apply(this.logic, vars.reduce<IterableObject<ValueOf<ShakeVariableType>>>((acc, cur) => {
            acc[cur] = this.parent.resolveVariable(cur);
            return acc;
        }, {}));
    }

    serializeAsJson(): ShakeEvaluationDefinition {
        return {
            label: this.label,
            logic: this.logic
        }
    }

    static deserializeFromJson(def: ShakeEvaluationDefinition, mod: ShakeModuleInstance): ShakeEvaluationInstance {
        const evaluation = new ShakeEvaluationInstance(def.label, mod);
        evaluation.logic = def.logic;
        return evaluation;
    }
}