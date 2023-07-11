import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'real'
})
export class RealPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `R$ ${value}`;
  }

}
