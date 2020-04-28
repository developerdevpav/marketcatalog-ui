import {ActionReducerMap} from '@ngrx/store';
import * as productCategoryReducer from './reducers/product.category.reducer';
import * as productAccessoryReducer from './reducers/product.accessory.reducer';
import * as filterCharacteristicReducer from './reducers/filter.characteristic.reducer';

export const reducers: ActionReducerMap<any> = {
  pagesProductCategory: productCategoryReducer.productCategoryReducer,
  pagesProductAccessory: productAccessoryReducer.productAccessoryReducer,
  filterCharacteristic: filterCharacteristicReducer.filterCharacteristicReducer
};
