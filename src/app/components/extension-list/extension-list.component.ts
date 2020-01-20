import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface Item {
  id?: string;
  value: string;
}

@Component({
  selector: 'extension-list',
  templateUrl: './extension-list.component.html',
  styleUrls: ['./extension-list.component.scss'],
  animations: [
    trigger('extension', [
      state('opened', style({
        height: '*',
        overflowY: 'scroll',
        opacity: 1,
      })),
      state('closed', style({ height: 'max-content', paddingBottom: 0, overflowY: 'hidden' })),
      transition('closed <=> opened', [ animate('0.1s') ])
    ])
  ]
})
export class ExtensionListComponent implements OnInit {

  @Input()
  public name: string;

  @Input()
  public items: Array<Item> = [];

  public selectedItems: Array<Item> = [];

  private selectModel: SelectionModel<Item>;

  public opened: boolean = false;

  private state: string = 'closed';

  @Input()
  public multiple: boolean = false;

  @Output()
  public eventChange: EventEmitter<Array<Item>> = new EventEmitter<Array<Item>>();

  constructor() { }

  ngOnInit() {
    this.selectModel = new SelectionModel<Item>(this.multiple, []);
    this.selectModel.select(...this.selectedItems);
  }

  handleState() {
    this.opened = !this.opened;
    this.state = this.getState();
  }

  getState(): string {
    return this.opened ? 'opened' : 'closed';
  }

  isSelected(item: Item): boolean {
    return this.selectModel.isSelected(item);
  }

  selectItem(item: Item): void {
    this.selectModel.toggle(item);
    this.eventChange.emit(this.selectModel.selected);
  }
}
