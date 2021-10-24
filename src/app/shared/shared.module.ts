import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChildExecutionComponent } from './components/ChildExecution/ChildExecution.component';
import { ChildVariableComponent } from './components/ChildVariable/ChildVariable.component';
import { CreateSequenceMemberModalComponent } from './components/CreateSequenceMemberModal/CreateSequenceMemberModal.component';
import { CreateVariableModalComponent } from './components/CreateVariableModal/CreateVariableModal.component';
import { CreatorNodeComponent } from './components/CreatorNode/CreatorNode.component';
import { SelectedClosureComponent } from './components/SelectedClosure/SelectedClosure.component';
import { SelectedExecutionComponent } from './components/SelectedExecution/SelectedExecution.component';
import { SelectedNodeComponent } from './components/SelectedNode/SelectedNode.component';
import { ShakeClosureComponent } from './components/ShakeClosure/ShakeClosure.component';
import { ShakeConditionComponent } from './components/ShakeCondition/ShakeCondition.component';
import { ShakeNodeComponent } from './components/ShakeNode/ShakeNode.component';
import { GetValuePipe } from './pipes/get-value.pipe';

@NgModule({
    declarations: [
        ChildExecutionComponent,
        ChildVariableComponent,
        CreatorNodeComponent,
        SelectedClosureComponent,
        SelectedExecutionComponent,
        SelectedNodeComponent,
        ShakeClosureComponent,
        ShakeConditionComponent,
        ShakeNodeComponent,
        CreateVariableModalComponent,
        CreateSequenceMemberModalComponent,
        GetValuePipe
    ],
    exports: [
        ChildExecutionComponent,
        ChildVariableComponent,
        CreatorNodeComponent,
        SelectedClosureComponent,
        SelectedExecutionComponent,
        SelectedNodeComponent,
        ShakeClosureComponent,
        ShakeConditionComponent,
        ShakeNodeComponent,
        CreateVariableModalComponent,
        CreateSequenceMemberModalComponent,
        GetValuePipe
    ],
    entryComponents: [],
    imports: [
        CommonModule
    ],
    providers: [],
    bootstrap: [],
})
export class SharedModule {}
