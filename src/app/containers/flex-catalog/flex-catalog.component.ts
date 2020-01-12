import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'flex-catalog',
  templateUrl: './flex-catalog.component.html',
  styleUrls: ['./flex-catalog.component.scss']
})
export class FlexCatalogComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('headerproduct', {static: true})
  public headerproduct: ElementRef;

  protected isFlow: boolean;

  @Output()
  public eventPageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @Input()
  public products: AbstractProduct[];

  @Input()
  public loading: boolean = false;

  @Input()
  public titlePage: string;

  @Input()
  public length: number = 100;

  @Input()
  public pageSize: number = 100;

  constructor() {
  }

  ngOnInit() {
  }

  handleChangePage($event: PageEvent) {
    this.eventPageChange.emit($event);
  }

  handleHeaderClass = () => {
    const nativeElement = this.headerproduct.nativeElement.offsetTop;
    this.isFlow = (nativeElement - 20) !== 0;
    console.log(this.isFlow);
  }

  ngAfterViewInit(): void {
    document.addEventListener('scroll', this.handleHeaderClass);
  }

  ngOnDestroy(): void {
    document.removeEventListener('scroll', this.handleHeaderClass);
  }

}
