import { staticImplements } from '../../decorators/static-implements.decorator';
import { ShakeBaseStatic } from '../../types/ShakeBase.type';
import { ShakeConditionDefinition } from '../../types/ShakeConditionDefinition.type';
import { ShakeEvaluation } from './ShakeEvalution.class';
import { ShakeExecution } from './ShakeExecution.class';

@staticImplements<ShakeBaseStatic<ShakeConditionDefinition, ShakeCondition>>()
export class ShakeCondition {
    constructor (public label: string = '') {}

    evaluation: ShakeEvaluation | null = null;
    onTrue: ShakeExecution | null = null;
    onFalse: ShakeExecution | null = null;

    serializeAsJson(): ShakeConditionDefinition {
        return {
            type: 'condition',
            label: this.label,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null,
            onTrue: this.onTrue ? this.onTrue.serializeAsJson() : null,
            onFalse: this.onFalse ? this.onFalse.serializeAsJson() : null
        }
    }

    static deserializeFromJson(def: ShakeConditionDefinition): ShakeCondition {
        const condition = new ShakeCondition(def.label);
        condition.evaluation = def.evaluation ? ShakeEvaluation.deserializeFromJson(def.evaluation) : null;
        condition.onTrue = def.onTrue ? ShakeExecution.deserializeFromJson(def.onTrue) : null;
        condition.onFalse = def.onFalse ? ShakeExecution.deserializeFromJson(def.onFalse) : null;
        return condition;
    }
}