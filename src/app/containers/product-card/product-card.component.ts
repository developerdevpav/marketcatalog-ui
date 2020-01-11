import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface ProductCardProps {
  id: string;
  title: string;
  subtitle: string;
  actionBtnTitle: string;
  img: string;
}

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input()
  public key: string;

  @Input()
  public title: string;

  @Input()
  public avatarURL: string;

  @Input()
  public titleActionBtn: string;

  @Output()
  private eventClickDetails = new EventEmitter<string>();

/*  @Input()
  public width: string = 'auto';

  @Input()
  public height: string = 'fit-content';*/

  constructor() {
  }

  ngOnInit() {
  }

  handleActionBtn = () => this.eventClickDetails.emit(this.key);

}

