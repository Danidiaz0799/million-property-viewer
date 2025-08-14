export interface Property {
  idProperty: number;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  idOwner: number;
  owner?: Owner; // Relación opcional
  images?: PropertyImage[];
  traces?: PropertyTrace[];
}

export interface Owner {
  idOwner: number;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface PropertyImage {
  idPropertyImage: number;
  idProperty: number;
  file: string;
  enabled: boolean;
}

export interface PropertyTrace {
  idPropertyTrace: number;
  dateSale: string;
  name: string;
  value: number;
  tax: number;
  idProperty: number;
}
