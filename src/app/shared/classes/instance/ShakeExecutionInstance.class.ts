import { ShakeExecutionDefinition } from '../../types/ShakeExecutionDefinition.type';
import { ShakeExecutionSequence, ShakeExecutionSequenceMember } from '../../types/ShakeExecutionSequence.type';
import { ShakeConditionInstance } from './ShakeConditionInstance.class';
import { ShakeClosureInstance } from './ShakeClosureInstance.class';
import { ShakeVariableSetterInstance } from './ShakeVariableSetterInstance.class';
import { ShakeWhileInstance } from './ShakeWhileInstance.class';
import { v4 as uuidv4 } from 'uuid';

export class ShakeExecutionInstance {
    constructor (
        def: ShakeExecutionDefinition,
        private _parent: ShakeClosureInstance
    ) {
        this.label = def.label;
        this._sequence = def.sequence.map(entry => {
            if (entry.type === 'condition') {
                return ShakeConditionInstance.deserializeFromJson(entry, _parent);
            }
            if (entry.type === 'setter') {
                return ShakeVariableSetterInstance.deserializeFromJson(entry, _parent);
            }
            if (entry.type === 'while') {
                return ShakeWhileInstance.deserializeFromJson(entry, _parent);
            }
        });
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
    }

    readonly id: string;
    label: string;
    private _sequence: ShakeExecutionSequence = [];

    getParent(): ShakeClosureInstance {
        return this._parent;
    }
    setParent(p: ShakeClosureInstance) {
        this._parent = p;
        this._sequence.forEach(member => member.setParent(this._parent));
    }

    getSequence(): ShakeExecutionSequence {
        return this._sequence;
    }
    addToSequence(member: ShakeExecutionSequenceMember) {
        this._sequence.push(member);
        member.setParent(this._parent);
    }
    removeFromSequence(member: ShakeExecutionSequenceMember) {
        const idx = this._sequence.indexOf(member);
        if (idx > -1) {
            this._sequence.splice(idx, 1);
        }
    }
    setSequence(seq: ShakeExecutionSequence) {
        this._sequence = seq;
        this._sequence.forEach(member => member.setParent(this._parent));
    }

    run() {
        this._sequence.forEach(member => member.run());
    }

    serializeAsJson(): ShakeExecutionDefinition {
        return {
            label: this.label,
            sequence: this._sequence.map(entry => entry.serializeAsJson()),
            id: this.id
        }
    }

    static deserializeFromJson(def: ShakeExecutionDefinition, closure: ShakeClosureInstance): ShakeExecutionInstance {
        return new ShakeExecutionInstance(def, closure);
    }
}