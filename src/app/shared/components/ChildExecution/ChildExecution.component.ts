import { Component, Input } from "@angular/core";
import { ShakeExecutionInstance } from '../../classes/instance/ShakeExecutionInstance.class';

@Component({
    selector: 'app-child-execution',
    templateUrl: './ChildExecution.component.html',
    styleUrls: ['./ChildExecution.component.scss']
})
export class ChildExecutionComponent {
    @Input() execution: ShakeExecutionInstance;
}