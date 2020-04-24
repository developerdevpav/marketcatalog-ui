import {Action} from '@ngrx/store';

export enum ProductCategoryActionType {
  GET_ALL = 'GET_ALL SUCCESS [PRODUCT_CATEGORY_ACTION_TYPE]',
  GET_PAGE_CATEGORY = 'GET_PAGE_CATEGORY SUCCESS [PRODUCT_CATEGORY_ACTION_TYPE]',
  GOT_SUCCESS_PRODUCT_CATEGORY = 'GET SUCCESS [PRODUCT_CATEGORY_ACTION_TYPE]',
  FATAL = 'FATAL [PRODUCT_CATEGORY_ACTION_TYPE]',
}

const SUCCESS = (value: string) => {
  return `SUCCESS(${value})`;
};

const FATAL = (value: string) => {
  return `FATAL(${value})`;
};

export class Fatal implements Action {
  readonly type = FATAL(ProductCategoryActionType.GET_ALL);
}

export class GetCategoryPage implements Action {

  readonly type = ProductCategoryActionType.GET_PAGE_CATEGORY;

  constructor(public pageIndex: number = 0, public pageSize: number = Number.MAX_VALUE) {}

}

export class GotSuccessPageCategory implements Action {

  readonly type = ProductCategoryActionType.GOT_SUCCESS_PRODUCT_CATEGORY;

  constructor(public payload: Pageable<ProductCategory>) {}

}


export type ProductCategoryAction =
  GetCategoryPage |
  GotSuccessPageCategory;
