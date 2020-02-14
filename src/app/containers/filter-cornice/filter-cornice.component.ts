import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../components/extension-list/extension-list.component';
import {ProductCharacteristicService} from '../../pages/product-page/service/product-characteristic.service';
import {FilterProductCharacteristic} from '../../store/domain/product-characteristic/product-characteristic';

export interface Filter {
  filters: FilterItem[];
}

export interface FilterItem {
  id: string;
  title: string;
  values: Array<Item>;
}

@Component({
  selector: 'filter-cornice',
  templateUrl: './filter-cornice.component.html',
  styleUrls: ['./filter-cornice.component.scss']
})
export class FilterCorniceComponent implements OnInit {

  long: Array<Item> = [];

  @Input()
  filter: Filter;

  @Input()
  category: string;

  @Output()
  public eventChange = new EventEmitter<FilterItem>();

  constructor(private productService: ProductCharacteristicService) { }

  ngOnInit() {
    if (this.category) {
      this.productService.getFilterByCategory(this.category).subscribe((filters: FilterProductCharacteristic[]) => {
        const array = filters.map(it => ({
          id: it.id,
          title: it.title,
          dataType: it.dataType,
          values: it.values
            .filter(value => value.trim() !== '-' && value.trim() !== '')
            .map(value => {
              const existAlt = value.toLowerCase().indexOf('alt=\'');
              if (existAlt !== -1) {
                const num = value.toLowerCase().lastIndexOf('alt=\'');
                return value
                  .substring(num, value.length)
                  .replace('alt=', '')
                  .split('\'')
                  .join('');
              }
              return value;
            })
            .map(value => ({
              value
            } as Item))
        } as FilterItem));

        this.filter = {
          filters: array
        };
      });
    }
  }

  handle($event: Array<Item>, filterItem: FilterItem) {

  }
}
