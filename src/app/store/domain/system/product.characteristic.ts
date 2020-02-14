export interface ProductCharacteristic {
  doubleCharacteristic: TypeCharacteristic[];
  stringCharacteristic: TypeCharacteristic[];
}

export interface TypeCharacteristic {
  title: string;
  values: string[];
}
