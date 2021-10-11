import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChildExecutionComponent } from './components/ChildExecution/ChildExecution.component';
import { ChildVariableComponent } from './components/ChildVariable/ChildVariable.component';
import { CreatorNodeComponent } from './components/CreatorNode/CreatorNode.component';
import { SelectedClosureComponent } from './components/SelectedClosure/SelectedClosure.component';
import { SelectedNodeComponent } from './components/SelectedNode/SelectedNode.component';
import { ShakeClosureComponent } from './components/ShakeClosure/ShakeClosure.component';
import { ShakeConditionComponent } from './components/ShakeCondition/ShakeCondition.component';
import { ShakeNodeComponent } from './components/ShakeNode/ShakeNode.component';

@NgModule({
    declarations: [
        ChildExecutionComponent,
        ChildVariableComponent,
        CreatorNodeComponent,
        SelectedClosureComponent,
        SelectedNodeComponent,
        ShakeClosureComponent,
        ShakeConditionComponent,
        ShakeNodeComponent
    ],
    exports: [
        ChildExecutionComponent,
        ChildVariableComponent,
        CreatorNodeComponent,
        SelectedClosureComponent,
        SelectedNodeComponent,
        ShakeClosureComponent,
        ShakeConditionComponent,
        ShakeNodeComponent
    ],
    entryComponents: [],
    imports: [
        CommonModule
    ],
    providers: [],
    bootstrap: [],
})
export class SharedModule {}
