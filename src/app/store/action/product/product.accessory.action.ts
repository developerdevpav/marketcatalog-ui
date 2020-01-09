import {Action} from '@ngrx/store';

export enum ActionTypeRolstor {
  GET_CACHE = 'GET_CACHE',
  GET_BACKEND = 'GET_BACKEND',
  ADD_CACHE_MANY = 'ADD_CACHE_MANY'
}


export class GetCash implements Action {
  readonly type = ActionTypeRolstor.GET_CACHE;
}

export class GetBackend implements Action {
  readonly type = ActionTypeRolstor.GET_BACKEND;
}

export class AddMany implements Action {
  readonly type = ActionTypeRolstor.GET_BACKEND;
  constructor(public payload: ProductRolstor[]) {}
}


/*
export type AttractionActions =
  LoadSuccessAttractions |
  LoadAttractionById |
  AddAttraction |
  AddAttractions |
  UpdateAttraction |
  DeleteAttraction |
  DeleteAttractions;
*/
