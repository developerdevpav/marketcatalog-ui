import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {EMPTY, Observable} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ProductAccessoryService} from '../services/product.accessory';
import {GetAccessoryPage, GotSuccessPageAccessory, ProductAccessoryActionType} from '../action/product/product.accessory.action';
import {ProductAccessory} from '../domain/product/product.accessory';
import {Pageable} from '../domain/abstract.domain';

@Injectable()
export class ProductAccessoryEffects {

  constructor(private actions$: Actions, private productAccessoryService: ProductAccessoryService) {
  }


  @Effect()
  getPage$: Observable<Action> = this.actions$.pipe(
    ofType(ProductAccessoryActionType.GET_PAGE_ACCESSORY),
    map((action: GetAccessoryPage) => ({...action})),
    switchMap((pageable) => this.productAccessoryService.getPage(pageable.pageIndex, pageable.pageSize)),
    map((page: Pageable<ProductAccessory>) => new GotSuccessPageAccessory({ ... page })),
    catchError((e) => EMPTY)
  );


}
