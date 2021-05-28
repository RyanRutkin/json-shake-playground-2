import { IterableObject } from './IterableObject.type';
import { ShakeExecutionDefinition } from './ShakeExecutionDefinition.type';
import { ShakeTriggerDefinition } from './ShakeTriggerDefinition.type';
import { ShakeVariableDefinition } from './ShakeVariableDefinition.type';

export interface ShakeModuleDefinition {
    label: string;
    variables: IterableObject<ShakeVariableDefinition>;
    onStart: ShakeExecutionDefinition | null;
    onDestroy: ShakeExecutionDefinition | null;
    triggers: ShakeTriggerDefinition[];
}