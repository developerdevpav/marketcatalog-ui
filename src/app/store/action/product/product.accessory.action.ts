import {Action} from '@ngrx/store';
import {Pageable} from '../../domain/abstract.domain';
import {ProductAccessory} from '../../domain/product/product.accessory';

export enum ProductAccessoryActionType {
  GET_ALL = 'GET_FROM_API SUCCESS [PRODUCT_ACCESSORY_ACTION_TYPE]',
  GET_PAGE_ACCESSORY = 'GET SUCCESS [PRODUCT_ACCESSORY_ACTION_TYPE]',
  GOT_SUCCESS_PRODUCT_ACCESSORY = 'FATAL [PRODUCT_ACCESSORY_ACTION_TYPE]',
}


export class GetAccessoryPage implements Action {

  readonly type = ProductAccessoryActionType.GET_PAGE_ACCESSORY;

  constructor(public pageIndex: number = 0, public pageSize: number = Number.MAX_VALUE) {}

}

export class GotSuccessPageAccessory implements Action {

  readonly type = ProductAccessoryActionType.GOT_SUCCESS_PRODUCT_ACCESSORY;

  constructor(public payload: Pageable<ProductAccessory>) {}

}

export type ProductAccessoryType = GetAccessoryPage | GotSuccessPageAccessory;
