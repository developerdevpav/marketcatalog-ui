import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {EntityCollectionService, EntityServices, QueryParams} from 'ngrx-data';
import {PageEvent} from '@angular/material';
import {MarketCatalogStore} from '../../store/market-catalog-store.module';
import {RolstorHttpService} from './service/rolstor-http.service';

export enum PageQuery {
  PAGE = 'page',
  SIZE = 'size'
}

export interface Page {
  page: number;
  size: number;
  total: number;
}

export class AbstractProductController<T extends AbstractProduct> implements OnInit, OnDestroy {

  protected subscription: Subscription = new Subscription();

  protected products: Observable<T[]>;
  protected service: EntityCollectionService<T>;

  protected category: string;

  protected loading: boolean = false;

  protected pageConf: Page = {
    page: 0,
    size: 35,
    total: 0
  };

  constructor(protected activeRouting: ActivatedRoute,
              protected router: Router,
              protected entityServices: EntityServices,
              protected marketCatalogStore: MarketCatalogStore,
              protected serviceHttp: RolstorHttpService) {
    this.service = entityServices.getEntityCollectionService(marketCatalogStore);
  }

  ngOnInit(): void {
    this.products = this.service.entities$;
    const subscriptionQueryParamMap = this.activeRouting.queryParamMap.subscribe(query => {
      this.ripperPageQuery(query);
      this.navigate();
      this.getPageByQuery(this.pageConf);
    });

    const subscriptionCount = this.getCount().subscribe(count => this.pageConf.total = count);

    const subscriptionLoading = this.service.loading$.subscribe(loading => this.loading = loading);
    const subscriptionLoaded  = this.service.loaded$.subscribe(loading => this.loading = loading);

    this.subscription.add(subscriptionQueryParamMap);
    this.subscription.add(subscriptionCount);
    this.subscription.add(subscriptionLoading);
    this.subscription.add(subscriptionLoaded);
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

    const category = paramMap.get('category');

    if (category) {
      this.category = category;
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
    this.pageConf.page = $event.pageIndex;
    this.pageConf.size = $event.pageSize;

    this.service.clearCache();
    this.navigate();
    this.getPageByQuery(this.pageConf);
  }

  getPageByQuery(pageConfig: Page) {
    const {page, size} = pageConfig;
    const queryParams = this.getQueryByObject({page, size});
    this.service.getWithQuery(queryParams);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getQueryByObject(obj: any): QueryParams {
    const query: QueryParams = {};
    Object.keys(obj).forEach(confKey => query[confKey] = obj[confKey]);
    return query;
  }

  getCount() {
    return this.serviceHttp.getCount();
  }

}
