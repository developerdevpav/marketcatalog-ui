import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';
import {AbstractService} from '../../store/services/abstract.service';
import {Store} from '@ngrx/store';
import {GetAccessoryPage} from '../../store/action/product/product.accessory.action';
import {MemoizedSelectorWithProps} from '@ngrx/store/src/selector';
import {AbstractProduct, Pageable} from '../../store/domain/abstract.domain';
import {GetFilterCharacteristicByCategory} from '../../store/action/system/filter.category.characteristic.action';
import {FilterItem} from '../../containers/filter-cornice/filter-cornice.component';
import {selectFilterByCategory} from '../../store/selectors/filter.characteristic.selectors';

export enum PageQuery {
  PAGE = 'page',
  SIZE = 'size'
}

export interface Page {
  page: number;
  size: number;
  total: number;
}

export abstract class AbstractProductController<T extends AbstractProduct> implements OnInit, OnDestroy {

  protected subscription: Subscription = new Subscription();

  protected pageProduct: Observable<Pageable<T>>;

  protected currentPage: Pageable<T>;

  protected filters: FilterItem[];

  protected loading: boolean = false;

  protected pageConf: Page = {
    page: 0,
    size: 12,
    total: 0
  };

  protected constructor(protected activeRouting: ActivatedRoute,
                        protected router: Router,
                        protected store: Store<any>,
                        protected service: AbstractService<T>) {
  }


  ngOnInit(): void {
    const paramMap = this.activeRouting.snapshot.paramMap;
    const categoryId = this.activeRouting.snapshot.queryParams.category;

    this.store.dispatch(new GetFilterCharacteristicByCategory(categoryId));

    const subscriberFilterByCategory = this.store.select(selectFilterByCategory, { id: categoryId }).subscribe(filters => {
      if (!filters) {
        return;
      }

      this.filters = filters;
    });

    this.subscription.add(subscriberFilterByCategory);

    this.ripperPageQuery(paramMap);
    this.navigate();
    this.getPageByQuery(this.pageConf);
  }

  ripperPageQuery(paramMap: ParamMap) {
    const page: number = parseInt(paramMap.get(PageQuery.PAGE), 10);
    const size: number = parseInt(paramMap.get(PageQuery.SIZE), 10);

    if (page) {
      this.pageConf.page = Math.max(page, 0);
    }

    if (size) {
      this.pageConf.size = Math.max(size, 10);
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

    this.navigate();
    this.getPageByQuery(this.pageConf);
  }

  getPageByQuery(pageConfig: Page) {
    const {page, size} = pageConfig;
    this.store.dispatch(new GetAccessoryPage(page, size));
    this.pageProduct = this.store.select(this.getSelectorPage(), { pageIndex: page });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  abstract getSelectorPage(): MemoizedSelectorWithProps<any, any, any>;

}
