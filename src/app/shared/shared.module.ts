import { NgModule } from '@angular/core';
import { ShakeConditionInstance } from './classes/instance/ShakeConditionInstance.class';
import { ShakeEvaluationInstance } from './classes/instance/ShakeEvaluationInstance.class';
import { ShakeExecutionInstance } from './classes/instance/ShakeExecutionInstance.class';
import { ShakeModuleInstance } from './classes/instance/ShakeModuleInstance.class';
import { ShakeTriggerInstance } from './classes/instance/ShakeTriggerInstance.class';
import { ShakeVariableInstance } from './classes/instance/ShakeVariableInstance.class';
import { ShakeVariableSetterInstance } from './classes/instance/ShakeVariableSetterInstance.class';
import { ShakeWhileInstance } from './classes/instance/ShakeWhileInstance.class';
import { CreatorNodeComponent } from './components/CreatorNode/CreatorNode.component';
import { ShakeLogicService } from './services/ShakeLogic.service';

@NgModule({
    declarations: [
        ShakeConditionInstance, 
        ShakeEvaluationInstance, 
        ShakeExecutionInstance,
        ShakeModuleInstance,
        ShakeTriggerInstance,
        ShakeVariableInstance,
        ShakeVariableSetterInstance,
        ShakeWhileInstance,
        CreatorNodeComponent,
        ShakeLogicService
    ],
    exports: [
        ShakeConditionInstance, 
        ShakeEvaluationInstance, 
        ShakeExecutionInstance,
        ShakeModuleInstance,
        ShakeTriggerInstance,
        ShakeVariableInstance,
        ShakeVariableSetterInstance,
        ShakeWhileInstance,
        CreatorNodeComponent,
        ShakeLogicService
    ],
    entryComponents: [],
    imports: [],
    providers: [],
    bootstrap: [],
})
export class SharedModule {}
