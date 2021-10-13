import { Component, Input } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { ShakeClosureInstance } from '../../classes/instance/ShakeClosureInstance.class';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';

@Component({
    selector: 'app-create-variable-modal',
    templateUrl: './CreateVariableModal.component.html',
    styleUrls: ['./CreateVariableModal.component.css']
})
export class CreateVariableModalComponent {
    @Input() closure: ShakeClosureInstance;

    constructor(private _modalController: ModalController) { }

    variableLabel: string = '';
    variableInitialValue: string = '';
    variableType: keyof ShakeVariableType = 'any';
    variableTypeOptions: (keyof ShakeVariableType)[] = [
        'boolean',
        'number',
        'object',
        'string',
        'any'
    ];
    createVariableError: string = '';

    handleLabelValueChange({ currentTarget }: { currentTarget: HTMLInputElement}) {
        this.variableLabel = currentTarget.value;
    }

    handleInitialValueChange({ currentTarget }: { currentTarget: HTMLInputElement}) {
        this.variableInitialValue = currentTarget.value;
    }

    handleVariableTypeChange({ currentTarget }: { currentTarget: HTMLSelectElement }) {
        this.variableType = (currentTarget.value as unknown) as keyof ShakeVariableType;
    }

    create() {
        try {
            this.closure.addVariable({
                label: this.variableLabel,
                value: this.variableInitialValue,
                type: this.variableType,
                id: null
            });
            this.dismiss();
        } catch(e) {
            this.createVariableError = e.toString();
        }
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this._modalController.dismiss({
          'dismissed': true
        });
    }
}