import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface ExtensionEvent {
  id: string;
  opened: boolean;
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

  @Input()
  private idPanel: string;

  @Input()
  private title: string;

  @Input()
  private opened: boolean;

  @Output()
  private eventChange = new EventEmitter<ExtensionEvent>();

  private state = 'opened';

  private sort: string = 'ASC';

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
    this.sort = this.sort === 'ASC' ? 'DESC' : 'ASC';
  }

  getIconSort(): string {
    return this.sort === 'ASC' ? 'sort-up' : 'sort-down';
  }
}
