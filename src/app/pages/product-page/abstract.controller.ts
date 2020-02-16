import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
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

  constructor(protected activeRouting: ActivatedRoute,
              protected router: Router,
              protected entityServices: EntityServices,
              protected marketCatalogStore: MarketCatalogStore,
              protected serviceHttp: AbstractProductService<T>,
              protected dialog: MatDialog) {
    this.service = entityServices.getEntityCollectionService(marketCatalogStore);
  }

  protected subscription: Subscription = new Subscription();

  public products: Observable<T[]>;
  public service: EntityCollectionService<T>;

  public paginationLength: Observable<number>;
  public category: string;

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
    const queryParamMap = this.activeRouting.snapshot.queryParamMap;

    this.products = this.service.entities$;
    const subscription = this.activeRouting.queryParamMap.subscribe(map => {
      if (!this.filterPage || this.filterPage.filters.length === 0) {
        this.initStatePage(map);
      }
    });

    this.subscription.add(subscription);
  }

  initStatePage(queryParamMap: ParamMap) {
    console.log('start loading');
    const page: number = parseInt(queryParamMap.get(PageQuery.PAGE), 10);
    const size: number = parseInt(queryParamMap.get(PageQuery.SIZE), 10);

    this.pagination = AbstractProductController.getPagination(page, size);

    this.navigate(this.pagination);

    this.category = queryParamMap.get('category');

    console.log('loading by categoty: ', this.category);

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

  handleChangePage($event: PageEvent) {
    this.pagination = AbstractProductController.getPagination($event.pageIndex, $event.pageSize);

    const {page, size} = this.pagination;

    this.filterPage = { ...this.filterPage, page, size};

    this.navigate(this.pagination);

    this.getPageByQuery(this.pagination, this.filterPage);
  }

  getPageByQuery(pagination: Pagination, filterPage: FilterPage) {
    const {page, size} = pagination;
    this.pagination = { ... this.pagination, page, size };
    this.filterPage = { ... filterPage, page, size };

    this.requestPaginationLength();
    this.products = this.serviceHttp.findByFilter(this.filterPage);
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
        id: $event,
        service: this.marketCatalogStore
      },
      width: '30%',
      height: 'fit-content',
      position: {
        top: '0px',
        left: '0px'
      }
    });
  }


  handleChangeFilter($event: FilterEntity[]) {
    this.filterPage.filters = $event;
    this.pagination = AbstractProductController.getPagination(0, 36);

    this.navigate(this.pagination);

    this.requestPaginationLength();
    this.getPageByQuery(this.pagination, this.filterPage);
  }

  handleFilter() {
    this.products = this.serviceHttp.findByFilter(this.filterPage);
  }

  handleFilterReset() {
    const pagination = AbstractProductController.getPagination(0, 36);
    const filterPage = AbstractProductController.getFilterPage(pagination, this.filterPage.category, []);

    this.getPageByQuery(pagination, filterPage);
  }


}
