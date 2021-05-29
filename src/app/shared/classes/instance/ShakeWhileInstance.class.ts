import { ShakeWhileDefinition } from '../../types/ShakeWhileDefinition.type';
import { ShakeEvaluationInstance } from './ShakeEvaluationInstance.class';
import { ShakeExecutionInstance } from './ShakeExecutionInstance.class';
import { ShakeModuleInstance } from './ShakeModuleInstance.class';

export class ShakeWhileInstance {
    constructor (
        public label: string = '',
        private _parent: ShakeModuleInstance
    ) {}

    evaluation: ShakeEvaluationInstance | null = null;
    execution: ShakeExecutionInstance | null = null;

    getParent(): ShakeModuleInstance {
        return this._parent;
    }
    setParent(p: ShakeModuleInstance) {
        this._parent = p;
        this.evaluation.setParent(p);
    }

    serializeAsJson(): ShakeWhileDefinition {
        return {
            type: 'while',
            label: this.label,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null,
            execution: this.execution ? this.execution.serializeAsJson() : null
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
    
    static deserializeFromJson(def: ShakeWhileDefinition, mod: ShakeModuleInstance) {
        const nWhile = new ShakeWhileInstance(def.label, mod);
        nWhile.evaluation = def.evaluation ? ShakeEvaluationInstance.deserializeFromJson(def.evaluation, mod) : null;
        nWhile.execution = def.execution ? ShakeExecutionInstance.deserializeFromJson(def.execution, mod) : null;
        return nWhile;
    }
}