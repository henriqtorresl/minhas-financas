import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? 'Pago' : 'Pendente';   // se value == true, return 'Pago', se for false return 'Pendente'
  }

}
