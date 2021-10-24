import { Component, Input } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { ShakeExecutionInstance } from '../../classes/instance/ShakeExecutionInstance.class';
import { ShakeExecutionSequenceMemberType } from '../../types/ShakeExecutionSequenceMember.type';

@Component({
    selector: 'app-create-sequence-member-modal',
    templateUrl: './CreateSequenceMemberModal.component.html',
    styleUrls: ['./CreateSequenceMemberModal.component.scss']
})
export class CreateSequenceMemberModalComponent {
    @Input() execution: ShakeExecutionInstance;

    constructor(private _modalController: ModalController) { }

    executionMemberOptions: {
        label: string;
        type: ShakeExecutionSequenceMemberType;
    }[] = [
        {
            label: 'Conditional',
            type: 'condition'
        },
        {
            label: 'While Loop',
            type: 'while'
        },
        {
            label: 'Variable Setter',
            type: 'setter'
        },
        {
            label: 'Method Invocation',
            type: 'invoker'
        }
    ];

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this._modalController.dismiss({
          'dismissed': true
        });
    }
}