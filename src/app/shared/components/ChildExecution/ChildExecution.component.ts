import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ShakeExecutionInstance } from '../../classes/instance/ShakeExecutionInstance.class';
import { ShakeLogicSelectedNode, ShakeLogicService } from '../../services/ShakeLogic.service';
import { ShakeDisplay } from '../../types/ShakeDisplay.type';

@Component({
    selector: 'app-child-execution',
    templateUrl: './ChildExecution.component.html',
    styleUrls: ['./ChildExecution.component.css']
})
export class ChildExecutionComponent implements AfterViewInit {
    @Input() execution: ShakeExecutionInstance;
    @Input() lockPosition?: boolean;
    @ViewChild('canvas') canvas: ElementRef;
    position: ShakeDisplay;

    constructor (private _logicService: ShakeLogicService) {}

    onAddNode(nodeDef: ShakeLogicSelectedNode) {
        switch (nodeDef.type) {
            case 'condition':
            case 'setter':
            case 'while':
            case 'invoker':
                this.execution.addToSequence(nodeDef.node);
        }
    }

    onRemoveNode(nodeDef: ShakeLogicSelectedNode) {
        switch (nodeDef.type) {
            case 'condition':
            case 'setter':
            case 'while':
            case 'invoker':
                this.execution.removeFromSequence(nodeDef.node);
        }
    }

    onSetPosition(position: ShakeDisplay) {
        if (this.lockPosition) {
            return;
        }
        this._logicService.display[this.execution.id] = position;
        this.position = this._logicService.display[this.execution.id];
    }

    ngAfterViewInit() {
        this.position = this._logicService.display[this.execution.id];
        const canv = this.canvas.nativeElement;
        canv.width = canv.parentNode.offsetWidth;
        canv.height = canv.parentNode.offsetHeight;
        const ctx = canv.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = '3';
        ctx.moveTo(canv.width / 8, canv.height / 10);
        ctx.lineTo((canv.width / 10) * 9, canv.height / 10)
        ctx.lineTo((canv.width / 8) * 7, (canv.height / 10) * 9);
        ctx.lineTo(canv.width / 8, (canv.height / 10) * 9);
        ctx.lineTo(canv.width / 8, canv.height / 10);
        ctx.closePath();
        ctx.stroke();
    }
}