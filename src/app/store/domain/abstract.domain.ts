interface BaseEntity {
  id: string;
}

interface AbstractProduct extends BaseEntity {
  title: string;
  img: string;
  category: string;
}
