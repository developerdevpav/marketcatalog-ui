import {Component, OnInit} from '@angular/core';
import {EntityCollectionService, EntityServices} from 'ngrx-data';
import {Observable} from 'rxjs';
import {MarketCatalogStore} from './store/market-catalog-store.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'marketcatalog-ui';

  rolstors$: Observable<ProductRolstor[]>;
  serviceRolstor: EntityCollectionService<ProductRolstor>;

  constructor(entityServices: EntityServices) {
    this.serviceRolstor = entityServices.getEntityCollectionService(MarketCatalogStore.PRODUCT_ROLSTOR);
    this.rolstors$ = this.serviceRolstor.entities$;
  }

  ngOnInit(): void {}

}
