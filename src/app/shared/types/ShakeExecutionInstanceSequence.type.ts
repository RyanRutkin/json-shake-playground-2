import { ShakeConditionInstance } from '../classes/instance/ShakeConditionInstance.class';
import { ShakeVariableSetterInstance } from '../classes/instance/ShakeVariableSetterInstance.class';
import { ShakeWhileInstance } from '../classes/instance/ShakeWhileInstance.class';

export type ShapeExecutionInstanceSequenceMember = ShakeConditionInstance | ShakeVariableSetterInstance | ShakeWhileInstance;

export type ShapeExecutionInstanceSequence = ShapeExecutionInstanceSequenceMember[];