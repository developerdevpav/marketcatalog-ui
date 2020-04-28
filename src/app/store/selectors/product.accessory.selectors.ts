import {createSelector} from '@ngrx/store';
import * as selectorProductAccessory from '../reducers/product.accessory.reducer';
import {Dictionary} from 'ngrx-data';
import {Pageable} from '../domain/abstract.domain';
import {ProductAccessory} from '../domain/product/product.accessory';

export const selectProductAccessoryPage = createSelector(
  selectorProductAccessory.selectEntities,
  (pages: Dictionary<Pageable<ProductAccessory>>, props: { pageIndex: number }) => {
    const page = pages[props.pageIndex];
    return page;
  }
);
