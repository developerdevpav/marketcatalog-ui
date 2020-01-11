import {Component} from '@angular/core';
import {EntityServices} from 'ngrx-data';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketCatalogStore} from '../../../store/market-catalog-store.module';
import {AbstractProductController} from '../abstract.controller';

@Component({
  selector: 'app-accessory-product-page',
  templateUrl: './accessory-product-page.component.html',
  styleUrls: ['./accessory-product-page.component.scss']
})
export class AccessoryProductPageComponent extends AbstractProductController<ProductRolstor> {

  constructor(entityServices: EntityServices, activeRouting: ActivatedRoute, router: Router) {
    super(activeRouting, router, entityServices, MarketCatalogStore.PRODUCT_ACCESSORY);
  }

}
