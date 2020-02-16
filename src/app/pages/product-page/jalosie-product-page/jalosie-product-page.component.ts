import {Component} from '@angular/core';
import {EntityServices} from 'ngrx-data';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketCatalogStore} from '../../../store/market-catalog-store.module';
import {AbstractProductController} from '../abstract.controller';
import {JalosieHttpService} from '../service/jalosie-http.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'jalosie-product-page',
  templateUrl: './jalosie-product-page.component.html',
  styleUrls: ['./jalosie-product-page.component.scss']
})
export class JalosieProductPageComponent extends AbstractProductController<ProductJalosie> {

  constructor(entityServices: EntityServices, activeRouting: ActivatedRoute, router: Router, service: JalosieHttpService, dialog: MatDialog) {
    super(activeRouting, router, entityServices, MarketCatalogStore.PRODUCT_JALOUSIE, service, dialog);
  }

}
