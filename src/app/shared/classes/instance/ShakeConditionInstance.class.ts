import { ShakeConditionDefinition } from '../../types/ShakeConditionDefinition.type';
import { ShakeEvaluationInstance } from './ShakeEvaluationInstance.class';
import { ShakeClosureInstance } from './ShakeClosureInstance.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeExecutionSequenceMemberType } from '../../types/ShakeExecutionSequenceMember.type';

export class ShakeConditionInstance {
    constructor (
        def: ShakeConditionDefinition,
        private _parent: ShakeClosureInstance
    ) {
        this.label = def.label;
        this.evaluation = def.evaluation ? ShakeEvaluationInstance.deserializeFromJson(def.evaluation, _parent) : null;
        this.onTrue = def.onTrue ? ShakeClosureInstance.deserializeFromJson(def.onTrue, _parent) : null;
        this.onFalse = def.onFalse ? ShakeClosureInstance.deserializeFromJson(def.onFalse, _parent) : null;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
    }

    readonly id: string;
    type: ShakeExecutionSequenceMemberType = 'condition';
    label: string;
    evaluation: ShakeEvaluationInstance | null = null;
    onTrue: ShakeClosureInstance | null = null;
    onFalse: ShakeClosureInstance | null = null;

    getParent(): ShakeClosureInstance {
        return this._parent;
    }
    setParent(p: ShakeClosureInstance) {
        this._parent = p;
        this.evaluation.setParent(p);
    }

    run() {
        if (!this.evaluation) {
            throw new Error(`Condition "${this.label}" triggered without evaluation`);
        }
        if (!this.onTrue && !this.onFalse) {
            throw new Error(`Condition "${this.label}" triggered without conclusive action`);
        }
        const evalResult = this.evaluation.run();
        if (!!evalResult && this.onTrue) {
            this.onTrue.run();
        }
        if (!evalResult && this.onFalse) {
            this.onFalse.run();
        }
    }

    serializeAsJson(): ShakeConditionDefinition {
        return {
            type: 'condition',
            label: this.label,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null,
            onTrue: this.onTrue ? this.onTrue.serializeAsJson() : null,
            onFalse: this.onFalse ? this.onFalse.serializeAsJson() : null,
            id: this.id
        }
    }

    static deserializeFromJson(def: ShakeConditionDefinition, closure: ShakeClosureInstance): ShakeConditionInstance {
        return new ShakeConditionInstance(def, closure);
    }
}