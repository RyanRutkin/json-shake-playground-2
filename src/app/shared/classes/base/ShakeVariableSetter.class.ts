import { staticImplements } from '../../decorators/static-implements.decorator';
import { ShakeBaseStatic } from '../../types/ShakeBase.type';
import { ShakeVariableSetterDefinition } from '../../types/ShakeVariableSetterDefinition.type';
import { ShakeEvaluation } from './ShakeEvalution.class';

@staticImplements<ShakeBaseStatic<ShakeVariableSetterDefinition, ShakeVariableSetter>>()
export class ShakeVariableSetter {
    constructor (public label: string = '') {}

    variableLabel: string | null = null;
    evaluation: ShakeEvaluation | null = null;

    serializeAsJson(): ShakeVariableSetterDefinition {
        return {
            type: 'setter',
            label: this.label,
            variableLabel: this.variableLabel,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null
        }
    }

    static deserializeFromJson(def: ShakeVariableSetterDefinition): ShakeVariableSetter {
        const setter = new ShakeVariableSetter(def.label);
        setter.variableLabel = def.variableLabel;
        setter.evaluation = def.evaluation ? ShakeEvaluation.deserializeFromJson(def.evaluation) : null;
        return setter;
    }
}