import { ShakeExecutionDefinition } from './ShakeExecutionDefinition.type';

export interface ShakeTriggerDefinition {
    label: string;
    watchedVariables: string[];
    onTrigger: ShakeExecutionDefinition | null;
}