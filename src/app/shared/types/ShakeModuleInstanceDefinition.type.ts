import { ShakeModuleDefinition } from './ShakeModuleDefinition.type';

export interface ShakeModuleInstanceDefinition extends ShakeModuleDefinition {
    modules: ShakeModuleInstanceDefinition[];
}