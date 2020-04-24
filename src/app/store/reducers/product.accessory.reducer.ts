import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import {ProductAccessoryActionType, ProductAccessoryType} from '../action/product/product.accessory.action';

export interface State extends EntityState<Pageable<ProductAccessory>> {
}

export const adapter: EntityAdapter<Pageable<ProductAccessory>> = createEntityAdapter<Pageable<ProductAccessory>>({
  selectId: page => page.page,
  sortComparer: (a, b) => a.page > b.page ? 1 : a.page === b.page ? 0 : -1
});

export const initialState: State = adapter.getInitialState({});

export function productAccessoryReducer(state = initialState, action: ProductAccessoryType): State {
  switch (action.type) {
    case ProductAccessoryActionType.GOT_SUCCESS_PRODUCT_ACCESSORY: {
      return adapter.addMany([action.payload], state);
    }
    default: {
      return state;
    }
  }
}

export const getPageProductCategory = createFeatureSelector<State>('pagesProductAccessory');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getPageProductCategory);
