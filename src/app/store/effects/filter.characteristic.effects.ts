import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {EMPTY, Observable} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  FilterCharacteristicActionType,
  GetFilterCharacteristicByCategory,
  GotSuccessProductCharacteristic
} from '../action/system/filter.category.characteristic.action';
import {FilterCategory} from '../domain/system/filterCharacteristicItem';
import {FilterCharacteristicService} from '../services/filter.characteristic.service';

@Injectable()
export class FilterCharacteristicEffects {

  constructor(private actions$: Actions, private productCategoryService: FilterCharacteristicService) {
  }

  @Effect()
  getFilter$: Observable<Action> = this.actions$.pipe(
    ofType(FilterCharacteristicActionType.GET_CHARACTERISTIC_BY_CATEGORY),
    map((action: GetFilterCharacteristicByCategory) => (action.id)),
    switchMap((idCategory) => this.productCategoryService.getFilter(idCategory)),
    map((filterCategory: FilterCategory ) => new GotSuccessProductCharacteristic([filterCategory])),
    catchError((e) => EMPTY)
  );

}
