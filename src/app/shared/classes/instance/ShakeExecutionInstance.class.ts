import { ShakeExecutionDefinition } from '../../types/ShakeExecutionDefinition.type';
import { ShapeExecutionInstanceSequence, ShapeExecutionInstanceSequenceMember } from '../../types/ShakeExecutionInstanceSequence.type';
import { ShakeConditionInstance } from './ShakeConditionInstance.class';
import { ShakeModuleInstance } from './ShakeModuleInstance.class';
import { ShakeVariableSetterInstance } from './ShakeVariableSetterInstance.class';
import { ShakeWhileInstance } from './ShakeWhileInstance.class';

export class ShakeExecutionInstance {
    constructor (
        public label: string = '',
        private _parent: ShakeModuleInstance
    ) { }

    private _sequence: ShapeExecutionInstanceSequence = [];

    getParent(): ShakeModuleInstance {
        return this._parent;
    }
    setParent(p: ShakeModuleInstance) {
        this._parent = p;
        this._sequence.forEach(member => member.setParent(this._parent));
    }

    getSequence(): ShapeExecutionInstanceSequence {
        return this._sequence;
    }
    addToSequence(member: ShapeExecutionInstanceSequenceMember) {
        this._sequence.push(member);
        member.setParent(this._parent);
    }
    removeFromSequence(member: ShapeExecutionInstanceSequenceMember) {
        const idx = this._sequence.indexOf(member);
        if (idx > -1) {
            this._sequence.splice(idx, 1);
        }
    }
    setSequence(seq: ShapeExecutionInstanceSequence) {
        this._sequence = seq;
        this._sequence.forEach(member => member.setParent(this._parent));
    }

    run() {
        this._sequence.forEach(member => member.run());
    }

    serializeAsJson(): ShakeExecutionDefinition {
        return {
            label: this.label,
            sequence: this._sequence.map(entry => entry.serializeAsJson())
        }
    }

    static deserializeFromJson(def: ShakeExecutionDefinition, mod: ShakeModuleInstance): ShakeExecutionInstance {
        const execution = new ShakeExecutionInstance(def.label, mod);
        execution._sequence = def.sequence.map(entry => {
            if (entry.type === 'condition') {
                return ShakeConditionInstance.deserializeFromJson(entry, mod);
            }
            if (entry.type === 'setter') {
                return ShakeVariableSetterInstance.deserializeFromJson(entry, mod);
            }
            if (entry.type === 'while') {
                return ShakeWhileInstance.deserializeFromJson(entry, mod);
            }
        });

        return execution;
    }
}