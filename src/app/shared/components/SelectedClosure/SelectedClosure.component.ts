import { Component, Input, OnInit } from "@angular/core";
import { ShakeClosureInstance } from '../../classes/instance/ShakeClosureInstance.class';
import { ShakeVariableInstance } from '../../classes/instance/ShakeVariableInstance.class';
import { ShakeLogicService } from '../../services/ShakeLogic.service';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';

@Component({
    selector: 'app-selected-closure',
    templateUrl: './SelectedClosure.component.html',
    styleUrls: ['./SelectedClosure.component.css']
})
export class SelectedClosure implements OnInit {
    @Input() closure: ShakeClosureInstance;
    variables: ShakeVariableInstance<keyof ShakeVariableType>[] = [];
    closures: ShakeClosureInstance[] = [];

    constructor (private _logicService: ShakeLogicService) { }

    ngOnInit() {
        this.variables = Object.values(this.closure.getVariables());
        this.closures = this.closure.getClosures();
    }
}