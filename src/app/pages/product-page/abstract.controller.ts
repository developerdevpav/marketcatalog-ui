import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EntityCollectionService, EntityServices, QueryParams} from 'ngrx-data';
import {PageEvent} from '@angular/material';
import {MarketCatalogStore} from '../../store/market-catalog-store.module';

export enum PageQuery {
  PAGE = 'page',
  SIZE = 'size'
}

export interface Page {
  page: number;
  size: number;
}

export class AbstractProductController<T extends AbstractProduct> implements OnInit {

  protected products: Observable<T[]>;
  protected service: EntityCollectionService<T>;

  protected pageConf: Page = {
    page: 1,
    size: 30
  };

  constructor(protected activeRouting: ActivatedRoute,
              protected router: Router,
              protected entityServices: EntityServices,
              protected marketCatalogStore: MarketCatalogStore) {
    this.service = entityServices.getEntityCollectionService(marketCatalogStore);
  }

  ngOnInit(): void {
    this.products = this.service.entities$;
    this.activeRouting.queryParamMap.subscribe(query => {
      this.ripperPageQuery(query);
      this.navigate();
      this.getAllByQuery(this.pageConf);
    });
  }

  ripperPageQuery(paramMap: ParamMap) {
    const page: number = parseInt(paramMap.get(PageQuery.PAGE), 10);
    const size: number = parseInt(paramMap.get(PageQuery.SIZE), 10);

    if (page) {
      this.pageConf.page = Math.max(page, 0);
    }

    if (size) {
      this.pageConf.size = Math.max(size, 0);
    }
  }

  protected navigate() {
    this.router.navigate([], {
      relativeTo: this.activeRouting,
      queryParams: { page: this.pageConf.page, size: this.pageConf.size },
      queryParamsHandling: 'merge'
    });
  }


  protected handleChangePage($event: PageEvent) {
    this.pageConf.page = $event.pageIndex + 1;
    this.pageConf.size = $event.pageSize;

    this.service.clearCache();
    this.navigate();
    this.getAllByQuery(this.pageConf);
  }

  getAllByQuery(pageConfig: Page) {
    const query: QueryParams = {};
    Object.keys(pageConfig).forEach(confKey => query[confKey] = pageConfig[confKey]);
    this.service.getWithQuery(query);
  }

}
