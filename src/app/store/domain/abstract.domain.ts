export interface BaseEntity {
  id: string;
}

export interface AbstractProduct extends BaseEntity {
  title: string;
  img: string;
  category: string;
}

export enum DataType {
  STRING = 'string',
  DOUBLE = 'double'
}

export interface Pageable<T> {
  content: T[];
  total: number;
  size: number;
  page: number;
}
