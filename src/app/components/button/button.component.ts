import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'button-custom',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  public text: string;

  @Input()
  public iconSvg: string;

  @Input()
  public iconSize: string;

  constructor() { }

  ngOnInit() {
  }

}
