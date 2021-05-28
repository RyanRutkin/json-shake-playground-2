import { ShakeConditionDefinition } from './ShakeConditionDefinition.type';
import { ShakeVariableSetterDefinition } from './ShakeVariableSetterDefinition.type';
import { ShakeWhileDefinition } from './ShakeWhileDefinition.type';

export interface ShakeExecutionDefinition {
    label: string;
    sequence: (ShakeConditionDefinition | ShakeVariableSetterDefinition | ShakeWhileDefinition)[];
}