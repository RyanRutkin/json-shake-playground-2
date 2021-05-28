import { ShakeModuleInstance } from '../classes/instance/ShakeModuleInstance.class';
import { ShakeBase } from './ShakeBase.type';

export interface ShakeInstanceStatic<T, P extends ShakeBase<T>> {
    new(label?: string): P;
    deserializeFromJson(def: T, mod?: ShakeModuleInstance): P;
}