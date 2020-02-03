export interface ProductCharacteristic extends BaseEntity {
  title: string;
  dataType: string;
}

export interface FilterProductCharacteristic extends ProductCharacteristic {
  values: string[];
}
