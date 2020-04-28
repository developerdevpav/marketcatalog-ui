import {Action} from '@ngrx/store';
import {FilterCategory} from '../../domain/system/filterCharacteristicItem';

export enum FilterCharacteristicActionType {
  GET_CHARACTERISTIC_BY_CATEGORY = 'GET_CHARACTERISTIC_BY_CATEGORY SUCCESS [PRODUCT_CATEGORY_ACTION_TYPE]',
  GET_SUCCESS_CHARACTERISTIC_BY_CATEGORY = 'GET_SUCCESS_CHARACTERISTIC_BY_CATEGORY SUCCESS [PRODUCT_CATEGORY_ACTION_TYPE]',
}

export class GetFilterCharacteristicByCategory implements Action {

  readonly type = FilterCharacteristicActionType.GET_CHARACTERISTIC_BY_CATEGORY;

  constructor(public id: string) {}

}

export class GotSuccessProductCharacteristic implements Action {

  readonly type = FilterCharacteristicActionType.GET_SUCCESS_CHARACTERISTIC_BY_CATEGORY;

  constructor(public payload: FilterCategory[]) {}

}


export type FilterCategoryCharacteristicAction =
  GetFilterCharacteristicByCategory |
  GotSuccessProductCharacteristic;
