import { Component, Input, OnInit } from "@angular/core";
import { ShakeModuleInstance } from '../../classes/instance/ShakeModuleInstance.class';
import { ShakeModuleInstanceDefinition } from '../../types/ShakeModuleInstanceDefinition.type';

@Component({
    selector: 'app-shake-module',
    templateUrl: './ShakeModule.component.html',
    styleUrls: ['./ShakeModule.component.scss']
})
export class ShakeModuleComponent implements OnInit {
    @Input() def?: ShakeModuleInstanceDefinition = {
        label: 'New Module',
        variables: {},
        onStart: null,
        onDestroy: null,
        triggers: [],
        modules: []
    }
    @Input() mod: ShakeModuleInstance | null = null;

    module: ShakeModuleInstance | null = null;

    ngOnInit() {
        this.module = ShakeModuleInstance.deserializeFromJson(this.def, this.mod);
    }
}