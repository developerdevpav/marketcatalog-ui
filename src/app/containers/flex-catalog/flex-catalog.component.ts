import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'flex-catalog',
  templateUrl: './flex-catalog.component.html',
  styleUrls: ['./flex-catalog.component.scss']
})
export class FlexCatalogComponent implements OnInit {

  @Output()
  public eventPageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @Input()
  public products: AbstractProduct[];

  @Input()
  public length: number = 100;

  @Input()
  public pageSize: number = 100;

  constructor() { }

  ngOnInit() {
  }

  handleChangePage($event: PageEvent) {
    this.eventPageChange.emit($event);
  }
}
