import { ShakeExecutionSequenceMember } from './ShakeExecutionSequenceMember.type';

export interface ShakeVariableSetterDefinition extends ShakeExecutionSequenceMember {
    type: 'setter';
    label: string;
    variableLabel: string | null;
    id: string | null;
}