import {Component, Input, OnInit} from '@angular/core';

export interface ImageItem {
  url: string;
}

export enum TypeObjectFit {
  CONTAIN = 'contain',
  COVER = 'cover'
}

export interface AvatarCarouselConfig {
  objectFit: TypeObjectFit;
  width: string;
  height: string;
  border?: string;
}

@Component({
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  @Input()
  images: ImageItem[] = [];

  $config: AvatarCarouselConfig = {
    objectFit: TypeObjectFit.CONTAIN,
    width: 'inherit',
    height: '300px'
  };

  private styles: {
    'object-fit': TypeObjectFit,
    width: string,
    height: string
  };

  @Input()
  set config(config: AvatarCarouselConfig) {
    this.$config = config;
  }

  image: ImageItem;
  index = 0;

  constructor() {
  }

  ngOnInit() {
    this.image = this.images[0];
    this.index = 0;

    this.styles = {
      ...this.$config,
      'object-fit': this.$config.objectFit
    };
  }

  next() {
    let indexImage = this.images.indexOf(this.image);
    if (indexImage < 0 || ((indexImage + 1) === this.images.length)) {
      return;
    }
    this.index = ++indexImage;
    this.image = this.images[this.index];
  }

  prev() {
    let indexImage = this.images.indexOf(this.image);
    if (indexImage < 0 || (indexImage === 0)) {
      return;
    }
    this.index = --indexImage;
    this.image = this.images[this.index];
  }

}
