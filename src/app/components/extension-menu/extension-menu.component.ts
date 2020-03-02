import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface ToolbarItem {
  id?: string;
  value: string;
  children?: ToolbarItem[];
  extensible?: boolean;
}

@Component({
  selector: 'extension-menu',
  templateUrl: './extension-menu.component.html',
  styleUrls: ['./extension-menu.component.scss'],
  animations: [
    trigger('extension', [
      state('opened', style({
        height: 'max-content',
        opacity: 1
      })),
      state('closed', style({ height: 0 })),
      transition('closed <=> opened', [ animate('0.1s') ])
    ])
  ]
})
export class ExtensionMenuComponent implements OnInit {

  public state: string = 'closed';

  @Input()
  public opened: boolean = false;

  @Input()
  public extensible: boolean = false;

  @Input()
  public props: ToolbarItem;

  constructor() { }

  ngOnInit() {
  }

  handleState() {
    this.opened = !this.opened;
    this.state = this.getState();
  }

  getState(): string {
    return this.opened ? 'opened' : 'closed';
  }
}
