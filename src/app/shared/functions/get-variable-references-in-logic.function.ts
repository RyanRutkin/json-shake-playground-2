import { RulesLogic } from 'json-logic-js';

export function getVariableReferencesInLogic(logic: RulesLogic): string[] {
    const vars: string[] = [];
    Object.entries(logic).forEach(([key, value]) => {
        if (key === 'var' && typeof value === 'object') {
            vars.push(value);
            return;
        } else if (key === 'var') {
            console.log(`Error: Anticipated variable reference but received "${typeof value}"`, value);
        }
        if (typeof value === 'object') {
            vars.push(...getVariableReferencesInLogic(value));
        }
    });
    return vars;
}