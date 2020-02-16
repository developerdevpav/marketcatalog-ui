import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Output()
  public eventPageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @Input()
  public page: number = 20;

  @Input()
  public size: number = 10;

  constructor() { }

  ngOnInit() {
  }

  handleChangePage($event: PageEvent) {
    this.eventPageChange.emit($event);
  }
}
