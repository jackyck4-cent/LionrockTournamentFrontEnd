import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitColumns'
})
export class SplitColumnsPipe implements PipeTransform {

  transform(array: string[], n_columns: number) {
    console.log(`splitColumns: array.length=${array.length}, n_columns=${n_columns}`);
    let ret: string[][] = [];
    for (let i = 0; i < array.length; ++i) {
      let item = array[i];
      console.log(`splitColumns: i=${i}, item=${item}`);
      let col = i % n_columns;
      if (col == 0) {
        ret.push([item]);
      } else {
        ret[ret.length - 1].push(item);
      }
    }
    if (ret.length > 0) {
      let last_row = ret[ret.length - 1];
      while (last_row.length < n_columns) {
        // padding
        last_row.push('');
      }
    }
    console.log(`splitColumns: return ${JSON.stringify(ret)}`);
    return ret;
  }
}
