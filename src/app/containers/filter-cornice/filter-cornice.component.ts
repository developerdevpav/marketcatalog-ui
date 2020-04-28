import {Component, Input, OnInit} from '@angular/core';
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

  @Input()
  private filters: Array<FilterItem>;

  constructor() { }

  ngOnInit() {
  }

  handle($event) {

  }

}
