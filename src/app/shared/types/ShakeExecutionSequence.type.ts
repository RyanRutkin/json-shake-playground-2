import { ShakeConditionInstance } from '../classes/instance/ShakeConditionInstance.class';
import { ShakeInvokerInstance } from '../classes/instance/ShakeInvokerInstance.class';
import { ShakeVariableSetterInstance } from '../classes/instance/ShakeVariableSetterInstance.class';
import { ShakeWhileInstance } from '../classes/instance/ShakeWhileInstance.class';

export type ShakeExecutionSequenceMember = ShakeConditionInstance | ShakeVariableSetterInstance | ShakeWhileInstance | ShakeInvokerInstance;

export type ShakeExecutionSequence = ShakeExecutionSequenceMember[];