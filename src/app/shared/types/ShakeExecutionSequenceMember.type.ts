import { ShakeEvaluationDefinition } from './ShakeEvaluationDefinition.type';

export type ShakeExecutionSequenceMemberType = 'condition' | 'setter' | 'while';

export interface ShakeExecutionSequenceMember {
    type: ShakeExecutionSequenceMemberType;
    evaluation: ShakeEvaluationDefinition | null;
}