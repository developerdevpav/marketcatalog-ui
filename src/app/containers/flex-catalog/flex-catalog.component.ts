import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {PageEvent} from '@angular/material';
import {SortEvent, SortType} from '../../components/filter-extension-panel/filter-extension-panel.component';

@Component({
  selector: 'flex-catalog',
  templateUrl: './flex-catalog.component.html',
  styleUrls: ['./flex-catalog.component.scss']
})
export class FlexCatalogComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('headerproduct', {static: true})
  public headerproduct: ElementRef;

  public isFlow: boolean;

  public sortEvent: SortEvent = {
    field: 'title',
    type: SortType.ASC
  } as SortEvent;

  @Output()
  eventGetDetails = new EventEmitter<string>();

  @Output()
  public eventPageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @Input()
  public products: AbstractProduct[];

  @Input()
  public loading: boolean = false;

  @Input()
  public titlePage: string;

  @Input()
  public paginationSize: number = 100;

  @Input()
  public paginationPage: number = 100;

  constructor() {
  }

  ngOnInit() {
  }

  handleChangePage($event: PageEvent) {
    this.eventPageChange.emit($event);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  handleEventGetDetails($event: string) {
    this.eventGetDetails.emit($event);
  }

  handleSortEvent($event: SortEvent) {
    this.sortEvent = $event;
  }
}
