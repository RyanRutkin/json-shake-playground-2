import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ShakeConditionInstance } from '../../classes/instance/ShakeConditionInstance.class';
import { ShakeLogicService } from '../../services/ShakeLogic.service';

@Component({
    selector: 'app-shake-condition',
    templateUrl: './ShakeCondition.component.html',
    styleUrls: ['./ShakeCondition.component.scss']
})
export class ShakeConditionComponent implements OnInit {
    @Input() closure: ShakeConditionInstance;
    @Input() parent: ShakeConditionInstance | null = null;
    @ViewChild('canvas') canvasEl: ElementRef;

    constructor(private logicService: ShakeLogicService) { }

    private _canvas: any;

    ngOnInit() {
        this._canvas = this.canvasEl.nativeElement;
        this._canvas.width = '100%';
        this._canvas.height = '100%';
    }

    setPosition(x: number, y: number) {
        this.logicService.display[this.closure.id] = {x,y};
    }
}