import {createSelector} from '@ngrx/store';
import * as filterReducer from '../reducers/filter.characteristic.reducer';
import {FilterCategory} from '../domain/system/filterCharacteristicItem';
import {Dictionary} from 'ngrx-data';
import {FilterItem} from '../../containers/filter-cornice/filter-cornice.component';
import {Item} from '../../components/extension-list/extension-list.component';

export const selectFilterByCategory = createSelector(
  filterReducer.selectEntities,
  (filterDictionary: Dictionary<FilterCategory>, props: { id: string }) => {
    const filter = filterDictionary[props.id];

    if (!filter) {
      return [];
    }

    return filter.filter.map(itemFilter => {
      return {
        id: itemFilter.id,
        title: itemFilter.title,
        values: itemFilter.values.map(valueObject => ({
            value: valueObject
          } as Item)
        )
      } as FilterItem;
    });
  }
);
