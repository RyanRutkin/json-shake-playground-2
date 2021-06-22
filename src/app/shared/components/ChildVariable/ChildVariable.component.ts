import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { ShakeVariableInstance } from '../../classes/instance/ShakeVariableInstance.class';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';

@Component({
    selector: 'app-child-variable',
    templateUrl: './ChildVariable.component.html',
    styleUrls: ['./ChildVariable.component.css']
})
export class ChildVariableComponent implements OnInit, OnDestroy {
    @Input() variable: ShakeVariableInstance<keyof ShakeVariableType>;
    private _sub: Subscription;
    value: string;

    ngOnInit() {
        this.value = String(this.variable.getValue());
        this._sub = this.variable.onChange$.subscribe(value => this.value = String(value));
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }
}