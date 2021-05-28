import { ShakeExecutionDefinition } from './ShakeExecutionDefinition.type';
import { ShakeExecutionSequenceMember } from './ShakeExecutionSequenceMember.type';

export interface ShakeConditionDefinition extends ShakeExecutionSequenceMember {
    type: 'condition';
    label: string;
    onTrue: ShakeExecutionDefinition | null;
    onFalse: ShakeExecutionDefinition | null;
}