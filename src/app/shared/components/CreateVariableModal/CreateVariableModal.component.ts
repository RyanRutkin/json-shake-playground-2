import { Component, Input } from "@angular/core";
import { ShakeClosureInstance } from '../../classes/instance/ShakeClosureInstance.class';

@Component({
    selector: 'app-create-variable-modal',
    templateUrl: './CreateVariableModal.component.html',
    styleUrls: ['./CreateVariableModal.component.css']
})
export class CreateVariableModalComponent {
    @Input() closure: ShakeClosureInstance;
}