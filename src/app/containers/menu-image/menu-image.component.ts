import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface MenuImageItem {
  id: string;
  title: string;
  image: string;
}

@Component({
  selector: 'menu-image',
  templateUrl: './menu-image.component.html',
  styleUrls: ['./menu-image.component.scss']
})
export class MenuImageComponent implements OnInit {

  @Input()
  items: MenuImageItem[];

  @Output()
  eventClick: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {

  }


  handleEventClick(id: string) {
    this.eventClick.emit(id);
  }

}
