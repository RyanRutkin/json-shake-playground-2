import { Component, HostBinding, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { ShakeLogicService } from '../../services/ShakeLogic.service';
import { ShakeNodeType } from '../../types/ShakeNodeType.type';

@Component({
    selector: 'app-selected-node',
    templateUrl: './SelectedNode.component.html',
    styleUrls: ['./SelectedNode.component.css'],
    styles: [
        `.app-selected-node-host {
            height: 100%;
        }`
    ]
})
export class SelectedNodeComponent implements OnDestroy {
    @HostBinding('class') classes = 'app-selected-node-host';

    constructor (private _logicService: ShakeLogicService) {
        this._sub = this._logicService.selectedNode$.subscribe(nodeDef => {
            if (!nodeDef) {
                this.selectedNode = undefined;
                this.selectedNodeType = undefined;
                return;
            }
            this.selectedNode = nodeDef.node;
            this.selectedNodeType = nodeDef.type;
        })
    }
    private _sub: Subscription;
    selectedNode: any;
    selectedNodeType: ShakeNodeType | undefined;

    ngOnDestroy() {
        this._sub.unsubscribe();
    }
}