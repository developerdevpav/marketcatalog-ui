import {Component} from '@angular/core';
import {EntityServices} from 'ngrx-data';
import {MarketCatalogStore} from '../../../store/market-catalog-store.module';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractProductController} from '../abstract.controller';

@Component({
  selector: 'rolstor-product-page',
  templateUrl: './rolstor-product-page.component.html',
  styleUrls: ['./rolstor-product-page.component.scss']
})
export class RolstorProductPageComponent extends AbstractProductController<ProductRolstor> {

  constructor(entityServices: EntityServices, activeRouting: ActivatedRoute, router: Router) {
    super(activeRouting, router, entityServices, MarketCatalogStore.PRODUCT_ROLSTOR);
  }

}
