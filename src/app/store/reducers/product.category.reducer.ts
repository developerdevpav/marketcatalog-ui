import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ProductCategoryAction, ProductCategoryActionType} from '../action/system/product.category.action';
import {createFeatureSelector} from '@ngrx/store';

export interface State extends EntityState<Pageable<ProductCategory>> {
}

export const adapter: EntityAdapter<Pageable<ProductCategory>> = createEntityAdapter<Pageable<ProductCategory>>({
  selectId: page => page.page,
  sortComparer: (a, b) => a.page > b.page ? 1 : a.page === b.page ? 0 : -1
});

export const initialState: State = adapter.getInitialState({
  entities: [],
  ids: []
});

export function productCategoryReducer(state = initialState, action: ProductCategoryAction): State {
  switch (action.type) {
    case ProductCategoryActionType.GOT_SUCCESS_PRODUCT_CATEGORY: {
        return adapter.addMany([action.payload], state);
    }
    default: {
      return state;
    }
  }
}

export const getPageProductCategory = createFeatureSelector<State>('pagesProductCategory');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getPageProductCategory);
