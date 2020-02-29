import {Pipe, PipeTransform} from '@angular/core';
import {SortEvent, SortType} from '../../components/filter-extension-panel/filter-extension-panel.component';

@Pipe({
  name: 'sortCatalog'
})
export class SortCatalogListPipe implements PipeTransform {

  transform<T>(values: Array<T>, sortEvent: SortEvent): any {
    const compare = sortEvent.type === SortType.ASC ?
      (a, b) => (a[sortEvent.field] > b[sortEvent.field] ? -1 : 1) :
      (a, b) => (a[sortEvent.field] < b[sortEvent.field] ? -1 : 1);

    if (!values) {
      return [];
    }

    return values.sort(compare);
  }

}
