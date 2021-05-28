import { staticImplements } from '../../decorators/static-implements.decorator';
import { ShakeBaseStatic } from '../../types/ShakeBase.type';
import { ShakeTriggerDefinition } from '../../types/ShakeTriggerDefinition.type';
import { ShakeExecution } from './ShakeExecution.class';

@staticImplements<ShakeBaseStatic<ShakeTriggerDefinition, ShakeTrigger>>()
export class ShakeTrigger {
    constructor (public label: string = '') {}

    private _watchedVariables: string[] = [];
    getWatchedVariableLabels(): string[] {
        return this._watchedVariables;
    }
    addWatchedVariable(label: string) {
        this._watchedVariables.push(label);
    }
    setWatchedVariables(labels: string[]) {
        this._watchedVariables = labels;
    }
    removeWatchedVariable(label: string) {
        if (this._watchedVariables.indexOf(label) > -1) {
            this._watchedVariables.splice(this._watchedVariables.indexOf(label), 1);
        }
    }

    onTrigger: ShakeExecution | null = null;

    serializeAsJson(): ShakeTriggerDefinition {
        return {
            label: this.label,
            watchedVariables: this.getWatchedVariableLabels(),
            onTrigger: this.onTrigger ? this.onTrigger.serializeAsJson() : null
        }
    }

    static deserializeFromJson(def: ShakeTriggerDefinition): ShakeTrigger {
        const trigger = new ShakeTrigger(def.label);
        trigger.setWatchedVariables(def.watchedVariables);
        trigger.onTrigger = def.onTrigger ? ShakeExecution.deserializeFromJson(def.onTrigger) : null;
        return trigger;
    }
}