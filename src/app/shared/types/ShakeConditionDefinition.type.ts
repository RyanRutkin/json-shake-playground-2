import { ShakeClosureDefinition } from './ShakeClosureDefinition.type';
import { ShakeExecutionSequenceMember } from './ShakeExecutionSequenceMember.type';

export interface ShakeConditionDefinition extends ShakeExecutionSequenceMember {
    type: 'condition';
    label: string;
    onTrue: ShakeClosureDefinition | null;
    onFalse: ShakeClosureDefinition | null;
    id: string | null;
}