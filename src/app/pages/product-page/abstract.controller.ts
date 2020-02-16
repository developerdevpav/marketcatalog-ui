import {ActivatedRoute, Router} from '@angular/router';
import {OnDestroy, OnInit} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {EntityCollectionService, EntityServices, QueryParams} from 'ngrx-data';
import {MatDialog, PageEvent} from '@angular/material';
import {MarketCatalogStore} from '../../store/market-catalog-store.module';
import {AbstractProductService} from './service/abstract.product.service';
import {DialogProductInformationComponent} from '../dialog-product-information/dialog-product-information.component';

export enum PageQuery {
  PAGE = 'page',
  SIZE = 'size'
}

export interface Page {
  category?: string;
  page: number;
  size: number;
  total: number;
  filters?: FilterEntity[];
  isFilter: boolean;
}

export interface Pagination {
  page: number;
  size: number;
}

export enum FilterType {
  EQ = 'EQ',
  FT = 'FT'
}

export interface FilterEntity {
  id_charact: string;
  value: string[];
  type: FilterType;
}

export interface FilterPage {
  category: string;
  page: number;
  size: number;
  filters: FilterEntity[];
}

export class AbstractProductController<T extends AbstractProduct> implements OnInit, OnDestroy {

  private destroySubject: ReplaySubject<any> = new ReplaySubject<any>();

  constructor(protected activeRouting: ActivatedRoute,
              protected router: Router,
              protected entityServices: EntityServices,
              protected marketCatalogStore: MarketCatalogStore,
              protected serviceHttp: AbstractProductService<T>,
              protected dialog: MatDialog) {
    this.service = entityServices.getEntityCollectionService(marketCatalogStore);
  }

  protected subscription: Subscription = new Subscription();

  protected products: Observable<T[]>;
  protected service: EntityCollectionService<T>;

  protected paginationLength: Observable<number>;
  protected category: string;

  public pagination: Pagination;
  public filterPage: FilterPage;

  static getPagination(page: number, size: number): Pagination {
    return {
      page: !!page ? Math.max(page, 0) : 0,
      size: !!size ? Math.max(size, 0) : 36
    };
  }

  static getFilterPage(pagination: Pagination, category: string, filters: FilterEntity[] = []): FilterPage {
    return {
      category,
      page: pagination.page,
      size: pagination.size,
      filters
    };
  }

  ngOnInit(): void {
    this.products = this.service.entities$;

    const queryParamMap = this.activeRouting.snapshot.queryParamMap;

    console.log(queryParamMap);
    const page: number = parseInt(queryParamMap.get(PageQuery.PAGE), 10);
    const size: number = parseInt(queryParamMap.get(PageQuery.SIZE), 10);

    this.pagination = AbstractProductController.getPagination(page, size);

    this.navigate(this.pagination);

    this.category = queryParamMap.get('category');

    this.filterPage = AbstractProductController.getFilterPage(this.pagination, this.category);

    this.getPageByQuery(this.pagination, this.filterPage);
  }

  protected navigate(pagination: Pagination) {
    this.router.navigate([], {
      relativeTo: this.activeRouting,
      queryParams: { page: pagination.page, size: pagination.size },
      queryParamsHandling: 'merge'
    }).then(() => {})
      .catch(errorNavigate => {
        console.log(errorNavigate);
      });
  }

  public requestPaginationLength() {
    this.paginationLength = this.serviceHttp.findByFilterCount(this.filterPage);
  }

  protected handleChangePage($event: PageEvent) {
    console.log('handleChangePage: ', $event);
    this.pagination = AbstractProductController.getPagination($event.pageIndex, $event.pageSize);

    this.navigate(this.pagination);


    this.getPageByQuery(this.pagination, this.filterPage);
  }

  getPageByQuery(pagination: Pagination, filterPage: FilterPage) {
    const {page, size} = pagination;
    this.pagination = { ... this.pagination, page, size };
    this.products = this.serviceHttp.findByFilter(filterPage);
    this.requestPaginationLength();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getQueryByObject(obj: any): QueryParams {
    const query: QueryParams = {};
    Object.keys(obj).forEach(confKey => query[confKey] = obj[confKey]);
    return query;
  }

  handleClickDetails($event: string) {
    this.dialog.open(DialogProductInformationComponent, {
      data: {
        animal: 'panda'
      }
    });
  }


  handleChangeFilter($event: FilterEntity[]) {
    this.filterPage.filters = $event;
    this.getPageByQuery(this.pagination, this.filterPage);
    this.requestPaginationLength();
  }

  handleFilter() {
    this.products = this.serviceHttp.findByFilter(this.filterPage);
  }

  handleFilterReset() {

  }

}
