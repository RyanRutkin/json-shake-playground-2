import { ShakeWhileDefinition } from '../../types/ShakeWhileDefinition.type';
import { ShakeEvaluationInstance } from './ShakeEvaluationInstance.class';
import { ShakeExecutionInstance } from './ShakeExecutionInstance.class';
import { ShakeClosureInstance } from './ShakeClosureInstance.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeExecutionSequenceMemberType } from '../../types/ShakeExecutionSequenceMember.type';

export class ShakeWhileInstance {
    constructor (
        def: ShakeWhileDefinition,
        private _parent: ShakeClosureInstance
    ) {
        this.label = def.label;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
        this.evaluation = def.evaluation ? ShakeEvaluationInstance.deserializeFromJson(def.evaluation, _parent) : null;
        this.execution = def.execution ? ShakeExecutionInstance.deserializeFromJson(def.execution, _parent) : null;
    }

    readonly id: string;
    type: ShakeExecutionSequenceMemberType = 'while';
    label: string;
    evaluation: ShakeEvaluationInstance | null = null;
    execution: ShakeExecutionInstance | null = null;

    getParent(): ShakeClosureInstance {
        return this._parent;
    }
    setParent(p: ShakeClosureInstance) {
        this._parent = p;
        this.evaluation.setParent(p);
    }

    serializeAsJson(): ShakeWhileDefinition {
        return {
            type: 'while',
            label: this.label,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null,
            execution: this.execution ? this.execution.serializeAsJson() : null,
            id: this.id
        }
    }

    run() {
        if (!this.evaluation) {
            throw new Error(`WhileLoop "${this.label}" triggered without evaluation.`);
        }
        if (!this.execution) {
            throw new Error(`WhileLoop "${this.label}" triggered without conclusive action.`);
        }
        while (!!this.evaluation.run()) {
            this.execution.run();
        }
    }
    
    static deserializeFromJson(def: ShakeWhileDefinition, closure: ShakeClosureInstance) {
        return new ShakeWhileInstance(def, closure);
    }
}