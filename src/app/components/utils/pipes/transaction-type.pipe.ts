import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value: any): String {
    return value =="INCOME"?'Ingreso':'Gasto';
  }

}
