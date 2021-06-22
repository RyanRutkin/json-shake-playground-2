import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ShakeClosureInstance } from '../../classes/instance/ShakeClosureInstance.class';
import { ShakeLogicService } from '../../services/ShakeLogic.service';

@Component({
    selector: 'app-shake-closure',
    templateUrl: './ShakeClosure.component.html',
    styleUrls: ['./ShakeClosure.component.scss']
})
export class ShakeClosureComponent implements OnInit {
    @Input() closure: ShakeClosureInstance;
    @Input() parent: ShakeClosureInstance | null = null;
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