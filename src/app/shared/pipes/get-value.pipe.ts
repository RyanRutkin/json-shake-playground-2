import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'getValue'})
export class GetValuePipe implements PipeTransform {
    transform(node: { getValue: () => any }): number {
        return node.getValue();
    }
}