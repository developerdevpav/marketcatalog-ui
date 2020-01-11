import {Component} from '@angular/core';
import {EntityServices} from 'ngrx-data';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketCatalogStore} from '../../../store/market-catalog-store.module';
import {AbstractProductController} from '../abstract.controller';

@Component({
  selector: 'jalosie-product-page',
  templateUrl: './jalosie-product-page.component.html',
  styleUrls: ['./jalosie-product-page.component.scss']
})
export class JalosieProductPageComponent extends AbstractProductController<ProductRolstor> {

  constructor(entityServices: EntityServices, activeRouting: ActivatedRoute, router: Router) {
    super(activeRouting, router, entityServices, MarketCatalogStore.PRODUCT_JALOSIE);
  }

}
