import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {EMPTY, Observable} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProductCategoryService} from '../services/product.category';
import {GetCategoryPage, GotSuccessPageCategory, ProductCategoryActionType} from '../action/system/product.category.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Pageable} from '../domain/abstract.domain';
import {ProductCategory} from '../domain/system/product.category';

@Injectable()
export class ProductCategoryEffects {

  constructor(private actions$: Actions, private productCategoryService: ProductCategoryService) {
  }


  @Effect()
  getPage$: Observable<Action> = this.actions$.pipe(
    ofType(ProductCategoryActionType.GET_PAGE_CATEGORY),
    map((action: GetCategoryPage) => ({...action})),
    switchMap((pageable) => this.productCategoryService.getPage(pageable.pageIndex, pageable.pageSize)),
    map((page: Pageable<ProductCategory>) => new GotSuccessPageCategory({...page})),
    catchError((e) => EMPTY)
  );


}
