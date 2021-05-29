import { Subscription } from 'rxjs';
import { IterableObject } from '../../types/IterableObject.type';
import { ShakeTriggerDefinition, ShakeTriggerWatchedVariableDefinition } from '../../types/ShakeTriggerDefinition.type';
import { ShakeExecutionInstance } from './ShakeExecutionInstance.class';
import { ShakeModuleInstance } from './ShakeModuleInstance.class';

export class ShakeTriggerInstance {
    constructor (
        public label: string = '',
        private _parent: ShakeModuleInstance
    ) {}

    onTrigger: ShakeExecutionInstance | null = null;
    private _watchedVariables: ShakeTriggerWatchedVariableDefinition[] = [];
    private _subs: IterableObject<Subscription> = {};

    getParent(): ShakeModuleInstance {
        return this._parent;
    }
    setParent(p: ShakeModuleInstance) {
        this._parent = p;
    }

    getWatchedVariableLabels(): ShakeTriggerWatchedVariableDefinition[] {
        return this._watchedVariables;
    }
    addWatchedVariable(def: ShakeTriggerWatchedVariableDefinition) {
        const varRef = this._parent.resolveVariable(def.label);
        if (!varRef) {
            throw new Error(`Failed to resolve variable "${def.label}" in trigger "${this.label}". \n${([this.label, ...this._parent.reportStack()]).join('\n')}`);
        }
        this._watchedVariables.push(def);
        if (def.on === 'before') {
            this._subs[varRef.label] = varRef.beforeChange.subscribe(val => this._run);
        } else {
            this._subs[varRef.label] = varRef.onChange.subscribe(val => this._run);
        }
    }
    removeWatchedVariable(label: string) {
        const varDefIdx = this._watchedVariables.findIndex(def => def.label === label);
        if (varDefIdx > -1) {
            this._watchedVariables.splice(varDefIdx, 1);
            this._subs[label].unsubscribe();
        }
    }
    setWatchedVariables(varDefs: ShakeTriggerWatchedVariableDefinition[]) {
        Object.values(this._subs).forEach(sub => sub.unsubscribe());
        this._subs = {};
        this._watchedVariables = [];
        varDefs.forEach(def => {
            const varRef = this._parent.resolveVariable(def.label);
            if (!varRef) {
                throw new Error(`Failed to resolve variable "${def.label}" in trigger "${this.label}". \n${([this.label, ...this._parent.reportStack()]).join('\n')}`);
            }
            if (def.on === 'before') {
                this._subs[def.label] = varRef.beforeChange.subscribe(val => this._run());
            } else {
                this._subs[def.label] = varRef.onChange.subscribe(val => this._run());
            }
        });
    }

    private _run() {
        if (!this.onTrigger) {
            throw new Error(`Trigger fired without execution instance. \n${([this.label, ...this._parent.reportStack()]).join('\n')}`)
        }
    }


    serializeAsJson(): ShakeTriggerDefinition {
        return {
            label: this.label,
            watchedVariables: this.getWatchedVariableLabels(),
            onTrigger: this.onTrigger ? this.onTrigger.serializeAsJson() : null
        }
    }

    static deserializeFromJson(def: ShakeTriggerDefinition, mod: ShakeModuleInstance): ShakeTriggerInstance {
        const trigger = new ShakeTriggerInstance(def.label, mod);
        trigger.setWatchedVariables(def.watchedVariables);
        trigger.onTrigger = def.onTrigger ? ShakeExecutionInstance.deserializeFromJson(def.onTrigger, mod) : null;
        return trigger;
    }
}