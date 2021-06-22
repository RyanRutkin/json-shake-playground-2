import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ShakeClosureInstance } from '../../classes/instance/ShakeClosureInstance.class';
import { ShakeLogicService } from '../../services/ShakeLogic.service';
import { ShakeDisplay } from '../../types/ShakeDisplay.type';
import { ShakeNodeType } from '../../types/ShakeNodeType.type';

@Component({
    selector: 'app-shake-node',
    templateUrl: './ShakeNode.component.html',
    styleUrls: ['./ShakeNode.component.scss']
})
export class ShakeNodeComponent implements OnInit {
    @Input() instance: any = undefined;
    @Input() type: ShakeNodeType;
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
        this.logicService.display[this.instance.id] = {x,y};
    }
}