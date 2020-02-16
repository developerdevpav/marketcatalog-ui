import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SelectionModel} from '@angular/cdk/collections';

export interface ItemSelect {
  id?: string;
  value: string;
}

@Component({
  selector: 'dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
  animations: [
    trigger('extension', [
      state('opened', style({
        height: '*',
        opacity: 1,
        paddingBottom: '10px',
        paddingTop: '10px'
      })),
      state('closed', style({
        height: '0',
        opacity: 0
      })),
      transition('closed <=> opened', [ animate('0.1s') ])
    ])
  ]
})
export class DropdownSelectComponent implements OnInit {

  @Input()
  public onlySingleAlways: boolean = false;

  @Input()
  public labelUnSelected: string = 'Ничего не выбрано';

  @Input()
  public closeAfterSelect = false;

  @Input()
  public items: Array<ItemSelect> = [];

  public selected: ItemSelect;

  @Input()
  public selectedItems: Array<ItemSelect> = [];

  public selectModel: SelectionModel<ItemSelect>;

  @Input()
  public selectIndexItem: number = -1;

  @Input()
  public multiple: boolean = false;

  @Output()
  public eventChange: EventEmitter<Array<ItemSelect>> = new EventEmitter<Array<ItemSelect>>();

  @Input()
  set defaultNoneSelect(value: string) {
    if (!this.selected) {
      this.selected = { value };
    } else  {
      this.selected.value = value;
    }
  }

  public state: string = 'closed';

  public opened: boolean = false;

  constructor() { }

  ngOnInit() {
    this.setInitItemSelectByIndex();
    this.isValidOnlySingleAlways();

    this.selectModel = new SelectionModel<ItemSelect>(this.multiple, []);
    this.selectModel.select(...this.selectedItems);
  }

  isValidOnlySingleAlways(): void {
    if (this.onlySingleAlways) {
      const uncorrectData = !this.selectedItems || this.selectedItems.length === 0;
      if (uncorrectData) {
        throw new Error('If you set the onlySingleAlways=true, then you must set less 1 ItemSelect');
      }
    }
  }

  setInitItemSelectByIndex(): void {
    if (this.selectIndexItem !== -1) {
      if (this.items) {
        const itemSelect = this.items[this.selectIndexItem];
        if (itemSelect) {
          this.selectedItems.push(itemSelect);
        }
      }
    }
  }

  handleState(): void {
    this.opened = !this.opened;
    this.state = this.getState();
  }

  getState(): string {
    return this.opened ? 'opened' : 'closed';
  }

  isSelected(item: ItemSelect): boolean {
    return this.selectModel.isSelected(item);
  }

  selectItem(item: ItemSelect): void {
    if (this.onlySingleAlways && this.isSelected(item) && this.selectModel.selected.length === 1) {
      return;
    }
    this.selectModel.toggle(item);
    this.eventChange.emit(this.selectModel.selected);
    this.handleCloseAfterSelect();
  }

  handleCloseAfterSelect() {
    if (this.closeAfterSelect) {
      this.handleState();
    }
  }

  handleSelectedItemHeader(): string {
    if (this.selectModel.selected) {
      const length = this.selectModel.selected.length;
      if (!this.isEmptySelectModel()) {
        if (this.multiple) {
          if (length > 1) {
            return `${this.selectModel.selected[0].value} ... +${length - 1}`;
          }
        }
        return `${this.selectModel.selected[0].value}`;
      }
    }
    return this.labelUnSelected;
  }

  isEmptySelectModel(): boolean {
    if (!this.selectModel.selected) {
      return false;
    }
    return this.selectModel.selected.length === 0;
  }

}
