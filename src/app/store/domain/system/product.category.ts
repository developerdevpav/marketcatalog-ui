import {BaseEntity} from '../abstract.domain';

export interface ProductCategory extends BaseEntity {
  title: string;
  systemName: string;
  parent: string;
  img: string;
}
