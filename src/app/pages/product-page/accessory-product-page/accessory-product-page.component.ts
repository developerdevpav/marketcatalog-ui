import {Component} from '@angular/core';
import {EntityServices} from 'ngrx-data';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketCatalogStore} from '../../../store/market-catalog-store.module';
import {AbstractProductController} from '../abstract.controller';
import {AccessoryHttpService} from '../service/accessory-http.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-accessory-product-page',
  templateUrl: './accessory-product-page.component.html',
  styleUrls: ['./accessory-product-page.component.scss']
})
export class AccessoryProductPageComponent extends AbstractProductController<ProductAccessory> {

  constructor(entityServices: EntityServices,
              activeRouting: ActivatedRoute,
              router: Router,
              service: AccessoryHttpService,
              dialog: MatDialog) {
    super(activeRouting, router, entityServices, MarketCatalogStore.PRODUCT_ACCESSORY, service, dialog);
  }


}
