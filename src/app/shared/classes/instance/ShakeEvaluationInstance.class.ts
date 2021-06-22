/**
 * Simply evaluates logic and returns a result
 */

import { RulesLogic } from 'json-logic-js';
import { ShakeEvaluationDefinition } from '../../types/ShakeEvaluationDefinition.type';
import { ValueOf } from '../../types/ValueOf.type';
import { ShakeVariableType } from '../../types/ShakeVariableType.type';
import { apply } from 'json-logic-js';
import { getVariableReferencesInLogic } from '../../functions/get-variable-references-in-logic.function';
import { IterableObject } from '../../types/IterableObject.type';
import { ShakeClosureInstance } from './ShakeClosureInstance.class';
import { v4 as uuidv4 } from 'uuid';

export class ShakeEvaluationInstance {
    constructor (
        def: ShakeEvaluationDefinition,
        private _parent: ShakeClosureInstance
    ) {
        this.label = def.label;
        this.logic = def.logic;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
    }

    readonly id: string;
    label: string;
    logic: RulesLogic = '';

    getParent(): ShakeClosureInstance {
        return this._parent;
    }
    setParent(p: ShakeClosureInstance) {
        this._parent = p;
    }

    run(): ValueOf<ShakeVariableType> {
        const vars = getVariableReferencesInLogic(this.logic);
        return apply(this.logic, vars.reduce<IterableObject<ValueOf<ShakeVariableType>>>((acc, cur) => {
            acc[cur] = this._parent.resolveVariable(cur);
            return acc;
        }, {}));
    }

    serializeAsJson(): ShakeEvaluationDefinition {
        return {
            label: this.label,
            logic: this.logic,
            id: this.id
        }
    }

    static deserializeFromJson(def: ShakeEvaluationDefinition, closure: ShakeClosureInstance): ShakeEvaluationInstance {
        return new ShakeEvaluationInstance(def, closure);
    }
}