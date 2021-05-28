import { staticImplements } from '../../decorators/static-implements.decorator';
import { ShakeBaseStatic } from '../../types/ShakeBase.type';
import { ShakeWhileDefinition } from '../../types/ShakeWhileDefinition.type';
import { ShakeEvaluation } from './ShakeEvalution.class';
import { ShakeExecution } from './ShakeExecution.class';

@staticImplements<ShakeBaseStatic<ShakeWhileDefinition, ShakeWhile>>()
export class ShakeWhile {
    constructor (public label: string = '') {}

    evaluation: ShakeEvaluation | null = null;
    execution: ShakeExecution | null = null;

    serializeAsJson(): ShakeWhileDefinition {
        return {
            type: 'while',
            label: this.label,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null,
            execution: this.execution ? this.execution.serializeAsJson() : null
        }
    }
    
    static deserializeFromJson(def: ShakeWhileDefinition) {
        const nWhile = new ShakeWhile(def.label);
        nWhile.evaluation = def.evaluation ? ShakeEvaluation.deserializeFromJson(def.evaluation) : null;
        nWhile.execution = def.execution ? ShakeExecution.deserializeFromJson(def.execution) : null;
        return nWhile;
    }
}