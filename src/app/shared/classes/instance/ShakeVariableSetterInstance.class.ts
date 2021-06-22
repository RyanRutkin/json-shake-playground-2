import { ShakeVariableSetterDefinition } from '../../types/ShakeVariableSetterDefinition.type';
import { ShakeEvaluationInstance } from './ShakeEvaluationInstance.class';
import { ShakeClosureInstance } from './ShakeClosureInstance.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeExecutionSequenceMemberType } from '../../types/ShakeExecutionSequenceMember.type';

export class ShakeVariableSetterInstance {
    constructor (
        def: ShakeVariableSetterDefinition,
        private _parent: ShakeClosureInstance
    ) {
        this.label = def.label;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
        this.variableLabel = def.variableLabel;
        this.evaluation = def.evaluation ? ShakeEvaluationInstance.deserializeFromJson(def.evaluation, _parent) : null;
    }

    readonly id: string;
    type: ShakeExecutionSequenceMemberType = 'setter';
    label: string;
    variableLabel: string | null = null;
    evaluation: ShakeEvaluationInstance | null = null;

    getParent(): ShakeClosureInstance {
        return this._parent;
    }
    setParent(p: ShakeClosureInstance) {
        this._parent = p;
        if (this.evaluation) {
            this.evaluation.setParent(p);
        }
    }

    serializeAsJson(): ShakeVariableSetterDefinition {
        return {
            type: 'setter',
            label: this.label,
            variableLabel: this.variableLabel,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null,
            id: this.id
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
        varRef.setValue(this.evaluation.run());
    }

    static deserializeFromJson(def: ShakeVariableSetterDefinition, closure: ShakeClosureInstance): ShakeVariableSetterInstance {
        return new ShakeVariableSetterInstance(def, closure);
    }
}