import { ShakeConditionDefinition } from '../../types/ShakeConditionDefinition.type';
import { ShakeEvaluationInstance } from './ShakeEvaluationInstance.class';
import { ShakeExecutionInstance } from './ShakeExecutionInstance.class';
import { ShakeModuleInstance } from './ShakeModuleInstance.class';

export class ShakeConditionInstance {
    constructor (
        public label: string = '',
        private _parent: ShakeModuleInstance
    ) {}

    evaluation: ShakeEvaluationInstance | null = null;
    onTrue: ShakeExecutionInstance | null = null;
    onFalse: ShakeExecutionInstance | null = null;

    getParent(): ShakeModuleInstance {
        return this._parent;
    }
    setParent(p: ShakeModuleInstance) {
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
            onFalse: this.onFalse ? this.onFalse.serializeAsJson() : null
        }
    }

    static deserializeFromJson(def: ShakeConditionDefinition, mod: ShakeModuleInstance): ShakeConditionInstance {
        const condition = new ShakeConditionInstance(def.label, mod);
        condition.evaluation = def.evaluation ? ShakeEvaluationInstance.deserializeFromJson(def.evaluation, mod) : null;
        condition.onTrue = def.onTrue ? ShakeExecutionInstance.deserializeFromJson(def.onTrue, mod) : null;
        condition.onFalse = def.onFalse ? ShakeExecutionInstance.deserializeFromJson(def.onFalse, mod) : null;
        return condition;
    }
}