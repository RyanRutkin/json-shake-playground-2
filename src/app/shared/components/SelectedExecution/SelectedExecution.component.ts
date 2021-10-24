import { Component, Input } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { ShakeExecutionInstance } from '../../classes/instance/ShakeExecutionInstance.class';
import { ShakeLogicService } from '../../services/ShakeLogic.service';
import { ShakeExecutionSequenceMember } from '../../types/ShakeExecutionSequence.type';

@Component({
    selector: 'app-selected-execution',
    templateUrl: './SelectedExecution.component.html',
    styleUrls: ['./SelectedExecution.component.css']
})
export class SelectedExecutionComponent {
    @Input() execution: ShakeExecutionInstance;

    constructor (
        private _logicService: ShakeLogicService,
        private _modalController: ModalController
    ) { }

    removeSequenceMember(member: ShakeExecutionSequenceMember) {
        this.execution.removeFromSequence(member);
    }

    addExecutionMember() {
        
    }
}