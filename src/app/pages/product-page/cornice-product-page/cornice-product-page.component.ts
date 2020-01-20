import {Component} from '@angular/core';
import {AbstractProductController} from '../abstract.controller';
import {EntityServices} from 'ngrx-data';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketCatalogStore} from '../../../store/market-catalog-store.module';
import {CorniceHttpService} from '../service/cornice-http.service';

@Component({
  selector: 'cornice-product-page',
  templateUrl: './cornice-product-page.component.html',
  styleUrls: ['./cornice-product-page.component.scss']
})
export class CorniceProductPageComponent extends AbstractProductController<ProductCornice> {

  constructor(entityServices: EntityServices, activeRouting: ActivatedRoute, router: Router, service: CorniceHttpService) {
    super(activeRouting, router, entityServices, MarketCatalogStore.PRODUCT_CORNICE, service);
  }

}
