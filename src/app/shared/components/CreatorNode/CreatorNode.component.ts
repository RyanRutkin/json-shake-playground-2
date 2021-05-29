import { Component, Input } from "@angular/core";

export interface CreatorNodeConfig {
    header: string;
    callback: () => {};
    x: number;
    y: number;
}

@Component({
    selector: 'app-creator-node',
    templateUrl: './CreatorNode.component.html',
    styleUrls: ['./CreatorNode.component.scss']
})
export class CreatorNodeComponent {
    @Input() header: string;
    @Input() callback: () => void;
    @Input() x?: number = 0;
    @Input() y?: number = 0;
    @Input() children?: CreatorNodeConfig[] = []
    @Input() removeFromParent: () => {};

    debuggerStopped: boolean = false;
    dragging: boolean = false;

    onDragStart = (evt: any) => {
        evt.datatransfer.setData('config', {
            header: this.header,
            callback: this.callback,
            x: this.x,
            y: this.y
        });
        this.dragging = true;
    }

    onDrag = (evt: any) => {
        if (!this.dragging) {
            return;
        }
        if (!this.debuggerStopped) {
            debugger;
            this.debuggerStopped = true;
        }
        this.x = evt.localX;
        this.y = evt.localY;
    }

    onDragEnd = (evt: any) => {
        this.dragging = false
    }

    onDrop = (evt: any) => {
        this.children.push(evt.datatransfer.getData('config'));
    }

    removeChild = (child: CreatorNodeConfig) => {
        const idx = this.children.findIndex(c => c === child);
        if (idx > -1) {
            this.children.splice(idx, 1);
        }
    }
}