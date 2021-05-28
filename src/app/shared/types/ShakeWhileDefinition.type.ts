import { ShakeExecutionDefinition } from './ShakeExecutionDefinition.type';
import { ShakeExecutionSequenceMember } from './ShakeExecutionSequenceMember.type';

export interface ShakeWhileDefinition extends ShakeExecutionSequenceMember {
    type: 'while',
    label: string;
    execution: ShakeExecutionDefinition | null;
}