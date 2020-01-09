import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EntityCollectionService, EntityServices, QueryParams} from 'ngrx-data';
import {MarketCatalogStore} from '../../../store/market-catalog-store.module';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material';

export enum PageQuery {
  PAGE = 'page',
  SIZE = 'size'
}

@Component({
  selector: 'rolstor-product-page',
  templateUrl: './rolstor-product-page.component.html',
  styleUrls: ['./rolstor-product-page.component.scss']
})
export class RolstorProductPageComponent implements OnInit {

  rolstors$: Observable<ProductRolstorAction[]>;
  serviceRolstor: EntityCollectionService<ProductRolstorAction>;

  public page: number = 1;
  public size: number = 9;

  constructor(entityServices: EntityServices, private activeRouting: ActivatedRoute, private router: Router) {
    this.serviceRolstor = entityServices.getEntityCollectionService(MarketCatalogStore.PRODUCT_ROLSTOR);
  }

  ngOnInit(): void {
    this.rolstors$ = this.serviceRolstor.entities$;
    this.activeRouting.queryParamMap.subscribe(it => {
      const page: string = it.get(PageQuery.PAGE);
      this.loadProductPage(page);
    });
  }

  loadProductPage(page: string) {
    const queryParams = this.buildQueryParams(page);
    this.fixedPageInURL(this.page, this.size);
    this.serviceRolstor.getWithQuery(queryParams);
  }

  buildQueryParams = (page: string): QueryParams => {
    return  {
      page: page ? page : this.page.toString(),
      size: this.size.toString()
    };
  }

  fixedPageInURL = (page: number, size: number) => {
    this.router.navigate([], {
      relativeTo: this.activeRouting,
      queryParams: { page, size },
      queryParamsHandling: 'merge'
    });
  }

  handleChangePage($event: PageEvent) {
    this.page = $event.pageIndex + 1;
    this.size = $event.pageSize;

    this.serviceRolstor.clearCache();
    this.loadProductPage(this.page.toString());
  }
}
