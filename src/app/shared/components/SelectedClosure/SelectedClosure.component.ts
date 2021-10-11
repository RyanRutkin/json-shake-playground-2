import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { ShakeClosureInstance } from '../../classes/instance/ShakeClosureInstance.class';
import { ShakeExecutionInstance } from '../../classes/instance/ShakeExecutionInstance.class';
import { ShakeVariableInstance } from '../../classes/instance/ShakeVariableInstance.class';
import { ShakeLogicService } from '../../services/ShakeLogic.service';
import { ShakeConditionDefinition } from '../../types/ShakeConditionDefinition.type';
import { ShakeInvokerDefinition } from '../../types/ShakeInvokerDefinition.type';
import { ShakeVariableSetterDefinition } from '../../types/ShakeVariableSetterDefinition.type';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';
import { ShakeWhileDefinition } from '../../types/ShakeWhileDefinition.type';
import { CreateVariableModalComponent } from '../CreateVariableModal/CreateVariableModal.component';

@Component({
    selector: 'app-selected-closure',
    templateUrl: './SelectedClosure.component.html',
    styleUrls: ['./SelectedClosure.component.css']
})
export class SelectedClosureComponent implements OnInit {
    @Input() closure: ShakeClosureInstance;
    variables: ShakeVariableInstance<keyof ShakeVariableType>[] = [];
    closures: ShakeClosureInstance[] = [];

    constructor (
        private _logicService: ShakeLogicService,
        private _modalController: ModalController
    ) { }

    ngOnInit() {
        this.variables = Object.values(this.closure.getVariables());
        this.closures = this.closure.getClosures();
    }

    createExecution(type: 'start' | 'end') {
        if (type === 'start') {
            this.closure.onStart = ShakeExecutionInstance.deserializeFromJson({
                label: 'onStart',
                sequence: [] as (ShakeConditionDefinition | ShakeVariableSetterDefinition | ShakeWhileDefinition | ShakeInvokerDefinition)[],
                id: null
            }, this.closure);
        } else {
            this.closure.onDestroy = ShakeExecutionInstance.deserializeFromJson({
                label: 'onDestroy',
                sequence: [] as (ShakeConditionDefinition | ShakeVariableSetterDefinition | ShakeWhileDefinition | ShakeInvokerDefinition)[],
                id: null
            }, this.closure);
        }
    }

    async createVariable() {
        const modal = await this._modalController.create({
            component: CreateVariableModalComponent,
            cssClass: 'app-create-variable-modal',
            componentProps: {
                closure: this.closure
            }
        });
        return await modal.present();
    }
}