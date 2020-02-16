import {Component} from '@angular/core';
import {EntityServices} from 'ngrx-data';
import {MarketCatalogStore} from '../../../store/market-catalog-store.module';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractProductController} from '../abstract.controller';
import {HttpClient} from '@angular/common/http';
import {RolstorHttpService} from '../service/rolstor-http.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'rolstor-product-page',
  templateUrl: './rolstor-product-page.component.html',
  styleUrls: ['./rolstor-product-page.component.scss']
})
export class RolstorProductPageComponent extends AbstractProductController<ProductRolstor> {

  constructor(entityServices: EntityServices, activeRouting: ActivatedRoute, router: Router,
              http: HttpClient, serviceHttp: RolstorHttpService, dialog: MatDialog) {
    super(activeRouting, router, entityServices, MarketCatalogStore.PRODUCT_ROLSTOR, serviceHttp, dialog);
  }

}
