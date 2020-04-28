import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import {FilterCategory} from '../domain/system/filterCharacteristicItem';
import {FilterCategoryCharacteristicAction, FilterCharacteristicActionType} from '../action/system/filter.category.characteristic.action';

export interface State extends EntityState<FilterCategory> {
}

export const adapter: EntityAdapter<FilterCategory> = createEntityAdapter<FilterCategory>({
  selectId: value => value.id
});

export const initialState: State = adapter.getInitialState({
  entities: [],
  ids: []
});

export function filterCharacteristicReducer(state = initialState, action: FilterCategoryCharacteristicAction): State {
  switch (action.type) {
    case FilterCharacteristicActionType.GET_SUCCESS_CHARACTERISTIC_BY_CATEGORY: {
      return adapter.addMany(action.payload, state);
    }
    default: {
      return state;
    }
  }
}

export const getFilterCharacteristic = createFeatureSelector<State>('filterCharacteristic');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(getFilterCharacteristic);
