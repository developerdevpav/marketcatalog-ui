import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface ChipProps {
  id?: string;
  title: string;
}

@Component({
  selector: 'chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {

  @Input()
  public props: ChipProps;

  styles = {
    background: '#785fff',
    color: 'white'
  };

  @Input()
  selected = false;

  @Output()
  private clickChip = new EventEmitter<ChipProps>();

  constructor() { }

  ngOnInit() {
  }

  handleClickByChip() {
    this.clickChip.emit(this.props);
  }
}
