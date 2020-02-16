import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../components/extension-list/extension-list.component';
import {ProductCharacteristicService} from '../../pages/product-page/service/product-characteristic.service';
import {FilterProductCharacteristic} from '../../store/domain/product-characteristic/product-characteristic';
import {FilterEntity, FilterType} from '../../pages/product-page/abstract.controller';

export interface Filter {
  filters: FilterItem[];
}

export interface FilterItem {
  id: string;
  title: string;
  values: Array<Item>;
  clean?: boolean;
}

@Component({
  selector: 'filter-cornice',
  templateUrl: './filter-cornice.component.html',
  styleUrls: ['./filter-cornice.component.scss']
})
export class FilterCorniceComponent implements OnInit {

  long: Array<Item> = [];

  @Input()
  countFilterItem: number;

  @Input()
  filter: Filter;

  @Input()
  category: string;

  map: Map<string, FilterEntity> = new Map<string, FilterEntity>();

  @Output()
  public eventChange = new EventEmitter<FilterEntity[]>();
  @Output()
  public eventFilterBtn = new EventEmitter<any>();
  @Output()
  public eventFilterReset = new EventEmitter<any>();

  public array: FilterProductCharacteristic[];

  constructor(private productService: ProductCharacteristicService) {
  }

  ngOnInit() {
    if (this.category) {
      this.init();
    }
  }

  public init() {
    this.productService.getFilterByCategory(this.category).subscribe((filters: FilterProductCharacteristic[]) => {
      this.array = filters;
      this.filter = {
        filters: this.transformFilter(filters)
      };
    });
  }

  private transformFilter(filters: FilterProductCharacteristic[]) {
    return filters.map(it => ({
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
        } as Item)),
      clean: false
    } as FilterItem));
  }

  isShowReset() {
    return this.map.size !== 0;
  }

  handle($event: Array<Item>, filterItem: FilterItem) {
    if (!$event || $event.length === 0) {
      this.map.delete(filterItem.id);
    } else {
      this.map.set(filterItem.id,
        {
          id_charact: filterItem.id,
          type: FilterType.EQ,
          value: $event.map(it => it.value)
        }
      );
    }

    this.eventChange.emit(Array.from(this.map.values()));
  }

  handleFilterReset($event: MouseEvent) {
    this.filter = {
      filters: this.transformFilter(this.array)
    };
    this.map.clear();
    this.eventChange.emit([]);
    this.eventFilterReset.emit();
  }
}
