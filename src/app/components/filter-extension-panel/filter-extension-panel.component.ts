import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ItemSelect} from "../dropdown-select/dropdown-select.component";

export interface ExtensionEvent {
  id: string;
  opened: boolean;
}

export enum SortType {
  ASC= 'ASC',
  DESC = 'DESC'
}

export interface SortEvent {
  field: string;
  type: SortType;
}

@Component({
  selector: 'extension-panel',
  templateUrl: './filter-extension-panel.component.html',
  styleUrls: ['./filter-extension-panel.component.scss'],
  animations: [
    trigger('extension', [
      state('opened', style({
        height: '*',
        opacity: 1,
        paddingBottom: '10px',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        paddingTop: '10px'
      })),
      state('closed', style({ height: '0', opacity: 0, paddingBottom: 0 })),
      transition('closed <=> opened', [ animate('0.1s') ])
    ])
  ]
})
export class FilterExtensionPanelComponent implements OnInit {

  public items = [
    {
      id: 'title',
      value: 'Название'
    }
  ];

  @Input()
  public idPanel: string;

  @Input()
  public title: string;

  @Input()
  public opened: boolean;

  @Output()
  public eventChange = new EventEmitter<ExtensionEvent>();

  @Output()
  public eventChangeSort = new EventEmitter<SortEvent>();

  public state = 'opened';

  public sort: SortType = SortType.ASC;

  constructor() { }

  ngOnInit() {
    this.state = this.getState();
  }

  handleState() {
    this.opened = !this.opened;
    this.state = this.getState();
    this.eventChange.emit({ id: this.idPanel, opened: this.opened });
  }

  getState(): string {
    return this.opened ? 'opened' : 'closed';
  }

  handleSortDestination(): void {
    this.sort = this.sort === SortType.ASC ? SortType.DESC : SortType.ASC;
    this.eventChangeSort.emit({field: this.items[0].id, type: this.sort } as SortEvent);
  }

  getIconSort(): string {
    return this.sort === SortType.ASC ? 'sort-up' : 'sort-down';
  }

  handleChangeSort($event: Array<ItemSelect>) {
    this.eventChangeSort.emit({field: $event[0].id, type: this.sort } as SortEvent);
  }
}
