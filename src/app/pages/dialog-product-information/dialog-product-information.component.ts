import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AbstractProductService} from '../product-page/service/abstract.product.service';
import {AvatarCarouselConfig, TypeObjectFit} from '../../components/image-carousel/image-carousel.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RolstorHttpService} from '../product-page/service/rolstor-http.service';
import {CorniceHttpService} from '../product-page/service/cornice-http.service';
import {AccessoryHttpService} from '../product-page/service/accessory-http.service';
import {JalosieHttpService} from '../product-page/service/jalosie-http.service';
import {ProductCharacteristic} from '../../store/domain/system/product.characteristic';
import {ProductInformation, Property} from '../product-information/product-information.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MarketCatalogStore} from "../../store/market-catalog-store.module";

@Component({
  selector: 'app-dialog-product-information',
  templateUrl: './dialog-product-information.component.html',
  styleUrls: ['./dialog-product-information.component.scss']
})
export class DialogProductInformationComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  productInformation: ProductInformation;

  private id: string;

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
              private jalosieHttpService: JalosieHttpService,
              public dialogRef: MatDialogRef<DialogProductInformationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: string, service: MarketCatalogStore }) {
  }


  ngOnInit() {
    let characteristicSubscriber;
    let productSubscriber;


    this.serviceProduct = this.getService(this.data.service);

    productSubscriber = this.serviceProduct.findById(this.data.id).subscribe(product => {

      this.productInformation = {};
      this.productInformation.images = [{
        url: product.img
      }];

      this.productInformation.value = product.title;

      characteristicSubscriber = this.serviceProduct.getCharacteristic(this.data.id)
        .subscribe((characteristic: ProductCharacteristic) => {
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
  }

  getService(serviceName: MarketCatalogStore): AbstractProductService<any> {
    switch (serviceName) {
      case MarketCatalogStore.PRODUCT_ROLSTOR:
        return this.rolstorHttpService;
      case MarketCatalogStore.PRODUCT_CORNICE:
        return this.corniceHttpService;
      case MarketCatalogStore.PRODUCT_JALOUSIE:
        return this.jalosieHttpService;
      case MarketCatalogStore.PRODUCT_ACCESSORY:
        return this.accessoryHttpService;
      default:
        return null;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
