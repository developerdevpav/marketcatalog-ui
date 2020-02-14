import {Pipe, PipeTransform} from '@angular/core';
import {Item} from '../components/extension-list/extension-list.component';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(value: Item[] = [], line: string = ''): Item[] {
    return value
      .filter(it => !!it)
      .filter(it => !!it.value)
      .filter(item => {
        const valueItem = item.value.toLowerCase();
        return valueItem.indexOf(line.toLowerCase()) !== -1;
      });
  }

}
