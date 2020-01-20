import {Component} from '@angular/core';
import {EntityServices} from 'ngrx-data';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketCatalogStore} from '../../../store/market-catalog-store.module';
import {AbstractProductController} from '../abstract.controller';
import {JalosieHttpService} from '../service/jalosie-http.service';

@Component({
  selector: 'jalosie-product-page',
  templateUrl: './jalosie-product-page.component.html',
  styleUrls: ['./jalosie-product-page.component.scss']
})
export class JalosieProductPageComponent extends AbstractProductController<ProductJalosie> {

  constructor(entityServices: EntityServices, activeRouting: ActivatedRoute, router: Router, service: JalosieHttpService) {
    super(activeRouting, router, entityServices, MarketCatalogStore.PRODUCT_JALOSIE, service);
  }

}
