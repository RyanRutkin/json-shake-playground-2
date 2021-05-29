import { Injectable } from "@angular/core";
import { ShakeModuleInstance } from '../classes/instance/ShakeModuleInstance.class';
import { CreatorNodeConfig } from '../components/CreatorNode/CreatorNode.component';
import { ShakeModuleInstanceDefinition } from '../types/ShakeModuleInstanceDefinition.type';

@Injectable({ providedIn: 'root' })
export class ShakeLogicService {
    logic: ShakeModuleInstance[] = [];
    display: CreatorNodeConfig[] = [];

    addLogic(logicDef: ShakeModuleInstanceDefinition) {
        this.logic.push(ShakeModuleInstance.deserializeFromJson(logicDef));
    }
}