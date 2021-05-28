/**
 * Simply evaluates logic and returns a result
 */

import { RulesLogic } from 'json-logic-js';
import { ShakeBaseStatic } from '../../types/ShakeBase.type';
import { ShakeEvaluationDefinition } from '../../types/ShakeEvaluationDefinition.type';
import { staticImplements } from '../../decorators/static-implements.decorator';

@staticImplements<ShakeBaseStatic<ShakeEvaluationDefinition, ShakeEvaluation>>()
export class ShakeEvaluation {
    constructor (public label: string = '') {}

    logic: RulesLogic = '';

    serializeAsJson(): ShakeEvaluationDefinition {
        return {
            label: this.label,
            logic: this.logic
        }
    }

    static deserializeFromJson(def: ShakeEvaluationDefinition): ShakeEvaluation {
        const evaluation = new ShakeEvaluation(def.label);
        evaluation.logic = def.logic;
        return evaluation;
    }
}