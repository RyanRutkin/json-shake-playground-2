import { Component, Input } from "@angular/core";
import { ShakeLogicSelectedNode } from '../../services/ShakeLogic.service';
import { ShakeDisplay } from '../../types/ShakeDisplay.type';
import { ShakeNodeType } from '../../types/ShakeNodeType.type';

@Component({
    selector: 'app-creator-node',
    templateUrl: './CreatorNode.component.html',
    styleUrls: ['./CreatorNode.component.scss']
})
export class CreatorNodeComponent {
    @Input() header: string;
    @Input() position: ShakeDisplay;
    @Input() onAddNode?: (nodeDef: ShakeLogicSelectedNode) => void; // when dropped into node
    @Input() onRemoveNode?: (nodeDef: ShakeLogicSelectedNode) => void; // when dragged out of node
    @Input() onSetPosition: (position: ShakeDisplay) => void;
    @Input() instance: any;
    @Input() type: ShakeNodeType;

    dragging: boolean = false;

    onDragStart = (evt: any) => {
        evt.datatransfer.setData('config', {
            instance: this.instance,
            type: this.type
        });
        this.dragging = true;
    }

    onDrag = (evt: any) => {
        if (!this.dragging) {
            return;
        }
        this.onSetPosition({
            x: evt.localX,
            y: evt.localY
        });
    }

    onDragEnd = (evt: any) => {
        this.dragging = false
    }

    onDrop = (evt: any) => {
        if (this.onAddNode) {
            const data = evt.datatransfer.getData('config');
            this.onAddNode({
                node: data['instance'],
                type: data['type'] as ShakeNodeType
            });
        }
    }

}