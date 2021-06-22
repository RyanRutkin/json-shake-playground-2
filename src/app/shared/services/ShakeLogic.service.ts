import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { ShakeClosureInstance } from '../classes/instance/ShakeClosureInstance.class';
import { IterableObject } from '../types/IterableObject.type';
import { ShakeDisplay } from '../types/ShakeDisplay.type';
import { ShakeLogicWithDisplay } from '../types/ShakeLogicWithDisplay.type';
import { ShakeNodeType } from '../types/ShakeNodeType.type';

export interface ShakeLogicSelectedNode {
    node: any;
    type: ShakeNodeType;
}

@Injectable({ providedIn: 'root' })
export class ShakeLogicService {
    logic: ShakeClosureInstance | undefined;
    display: IterableObject<ShakeDisplay> = {};
    selectedNode$: BehaviorSubject<ShakeLogicSelectedNode | undefined> = new BehaviorSubject(undefined);

    loadLogic(logicDefs: ShakeLogicWithDisplay) {
        this.display = logicDefs.display;
        if (!logicDefs.logic) {
            this.logic = undefined;
            return;
        }
        const closure = ShakeClosureInstance.deserializeFromJson(logicDefs.logic);
        if (!this.display[closure.id]) {
            this.display[closure.id] = {
                x: 0,
                y: 0
            };
        }
    }

    findNodeById(id: string) {
        this._findNodeById(id, this.logic);
    }

    run() {
        if(!this.logic) {
            return;
        }
        this.logic.run();
    }

    getSelectedNode() {
        return this.selectedNode$.getValue();
    }

    setSelectedNode(node:any, type: ShakeNodeType) {
        this.selectedNode$.next({
            node, type
        });
    }

    private _findNodeById(id: string, closure: ShakeClosureInstance): ShakeClosureInstance | undefined {
        if (closure.id === id) {
            return closure;
        }
        return closure.getClosures().find(cClosure => this._findNodeById(id, cClosure));
    }
}