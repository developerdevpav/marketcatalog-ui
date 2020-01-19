import {Component, OnInit} from '@angular/core';
import {Item} from '../../components/extension-list/extension-list.component';

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

  private filter: Filter = {
    filters: [
      {
        id: 'uuid',
        title: 'Тип карниза',
        values: [
          {
            id: 'uuid',
            value: 'Металический'
          },
          {
            id: 'uuid',
            value: 'Пластиковые потолочные'
          },
          {
            id: 'uuid',
            value: 'Настенные металлопластиковые'
          },
          {
            id: 'uuid',
            value: 'Гибкие'
          },
          {
            id: 'uuid',
            value: 'Комплектующие для потолочных'
          },
          {
            id: 'uuid',
            value: 'Металлопластиковая фурнитура'
          },
          {
            id: 'uuid',
            value: 'Комплектующие для металлических'
          }
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit() {
    for (let i = 1; i < 10.0; i += 0.2000) {
      this.long.push({
        value: `${i}`
      });
    }
  }

  handle($event) {

  }

}
