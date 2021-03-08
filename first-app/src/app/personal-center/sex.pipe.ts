import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value === undefined || value === null) {
      console.warn('接收到了空的值');
      return '-';
    }

    if (value === true) {
      return '男';
    } else {
      return '女';
    }
  }

}
