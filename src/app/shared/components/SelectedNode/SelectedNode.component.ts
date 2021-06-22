import { Component, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { ShakeLogicService } from '../../services/ShakeLogic.service';
import { ShakeNodeType } from '../../types/ShakeNodeType.type';

@Component({
    selector: 'app-selected-node',
    templateUrl: './SelectedNode.component.html',
    styleUrls: ['./SelectedNode.component.css']
})
export class SelectedNode implements OnDestroy {
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