export interface ShakeInvokerDefinition {
    label: string;
    type: 'invoker';
    id: string | null;
    closureName: string;
    parametersClosureNames: string[];
}