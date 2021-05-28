import { ShakeExecutionDefinition } from '../../types/ShakeExecutionDefinition.type';
import { ShakeCondition } from './ShakeCondition.class';
import { ShakeVariableSetter } from './ShakeVariableSetter.class';
import { staticImplements } from '../../decorators/static-implements.decorator';
import { ShakeBaseStatic } from '../../types/ShakeBase.type';
import { ShakeWhile } from './ShakeWhile.class';

@staticImplements<ShakeBaseStatic<ShakeExecutionDefinition, ShakeExecution>>()
export class ShakeExecution {
    constructor (public label: string = '') { }

    sequence: (ShakeCondition | ShakeVariableSetter | ShakeWhile)[] = [];

    serializeAsJson(): ShakeExecutionDefinition {
        return {
            label: this.label,
            sequence: this.sequence.map(entry => entry.serializeAsJson())
        }
    }

    static deserializeFromJson(def: ShakeExecutionDefinition): ShakeExecution {
        const execution = new ShakeExecution(def.label);
        execution.sequence = def.sequence.map(entry => {
            if (entry.type === 'condition') {
                return ShakeCondition.deserializeFromJson(entry);
            }
            if (entry.type === 'setter') {
                return ShakeVariableSetter.deserializeFromJson(entry);
            }
            if (entry.type === 'while') {
                return ShakeWhile.deserializeFromJson(entry);
            }
        });

        return execution;
    }
}