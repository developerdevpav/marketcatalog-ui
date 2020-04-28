import {BaseEntity, DataType} from '../abstract.domain';

export interface FilterCharacteristicItem extends BaseEntity {
  title: string;
  dataType: DataType;
  values: string[];
}


export interface FilterCategory extends BaseEntity {

  filter: FilterCharacteristicItem[];

}
