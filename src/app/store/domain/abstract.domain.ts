interface BaseEntity {
  id: string;
}

interface AbstractProduct extends BaseEntity {
  title: string;
  img: string;
  category: string;
}


interface Pageable<T> {
  content: T[];
  total: number;
  size: number;
  page: number;
}
