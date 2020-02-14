import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AvatarCarouselConfig, ImageItem, TypeObjectFit} from '../../components/image-carousel/image-carousel.component';
import {AbstractProductService} from '../product-page/service/abstract.product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RolstorHttpService} from '../product-page/service/rolstor-http.service';
import {CorniceHttpService} from '../product-page/service/cornice-http.service';
import {AccessoryHttpService} from '../product-page/service/accessory-http.service';
import {JalosieHttpService} from '../product-page/service/jalosie-http.service';
import {ProductCharacteristic} from "../../store/domain/system/product.characteristic";

export interface ProductInformation {
  id?: string;
  images?: ImageItem[];
  value?: string;
  properties?: Property[];
}

export interface Property {
  title: string;
  values: string[];
}

@Component({
  selector: 'product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  productInformation: ProductInformation;

  @Input()
  serviceProduct: AbstractProductService<any>;

  configImageViewer: AvatarCarouselConfig = {
    height: '400px',
    objectFit: TypeObjectFit.CONTAIN,
    width: '100%'
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private rolstorHttpService: RolstorHttpService,
              private corniceHttpService: CorniceHttpService,
              private accessoryHttpService: AccessoryHttpService,
              private jalosieHttpService: JalosieHttpService) {
  }


  ngOnInit() {
    let characteristicSubscriber;
    let productSubscriber;

    this.serviceProduct = this.getService(this.activatedRoute.snapshot.data.service);

    const paramSubscriber = this.activatedRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');

      productSubscriber = this.serviceProduct.findById(id).subscribe((product: AbstractProduct) => {

        this.productInformation = {};
        this.productInformation.images = [{
          url: product.img
        }];

        this.productInformation.value = product.title;

        characteristicSubscriber = this.serviceProduct.getCharacteristic(id).subscribe((characteristic: ProductCharacteristic) => {
          const properties: Property[] = [];
          const mapper = it => {
            return {
              title: it.title,
              values: [...new Set(it.values)]
            } as Property;
          };

          const propertiesDouble = characteristic.doubleCharacteristic.map(mapper);
          properties.push(...propertiesDouble);

          const propertiesString = characteristic.stringCharacteristic.map(mapper);
          properties.push(...propertiesString);
          this.productInformation.properties = properties;
        });

        this.subscription.add(characteristicSubscriber);
      });


      this.subscription.add(productSubscriber);
    });

    this.subscription.add(paramSubscriber);
  }

  getService(serviceName: string): AbstractProductService<any> {
    switch (serviceName) {
      case 'rolstor': return this.rolstorHttpService;
      case 'cornice': return this.corniceHttpService;
      case 'jalousie': return this.jalosieHttpService;
      case 'accessory': return this.accessoryHttpService;
      default: return null;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
