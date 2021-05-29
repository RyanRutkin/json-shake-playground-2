import { ShakeVariableSetterDefinition } from '../../types/ShakeVariableSetterDefinition.type';
import { ShakeEvaluationInstance } from './ShakeEvaluationInstance.class';
import { ShakeModuleInstance } from './ShakeModuleInstance.class';

export class ShakeVariableSetterInstance {
    constructor (
        public label: string = '',
        private _parent: ShakeModuleInstance
    ) {}

    getParent(): ShakeModuleInstance {
        return this._parent;
    }
    setParent(p: ShakeModuleInstance) {
        this._parent = p;
        if (this.evaluation) {
            this.evaluation.setParent(p);
        }
    }

    variableLabel: string | null = null;
    evaluation: ShakeEvaluationInstance | null = null;

    serializeAsJson(): ShakeVariableSetterDefinition {
        return {
            type: 'setter',
            label: this.label,
            variableLabel: this.variableLabel,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null
        }
    }

    run() {
        if (!this.variableLabel) {
            throw new Error(`Setter "${this.label}" triggered without a variable target.`);
        }
        if (!this.evaluation) {
            throw new Error(`Setter "${this.label}" triggered without evaluation.`);
        }
        const varRef = this._parent.resolveVariable(this.variableLabel);
        if (!varRef) {
            throw new Error(`Failed to resolve variable reference "${this.variableLabel}".\n${([this.label, ...this._parent.reportStack()]).join('\n')}`);
        }
        varRef.setValue(this.evaluation.run);
    }

    static deserializeFromJson(def: ShakeVariableSetterDefinition, mod: ShakeModuleInstance): ShakeVariableSetterInstance {
        const setter = new ShakeVariableSetterInstance(def.label, mod);
        setter.variableLabel = def.variableLabel;
        setter.evaluation = def.evaluation ? ShakeEvaluationInstance.deserializeFromJson(def.evaluation, mod) : null;
        return setter;
    }
}