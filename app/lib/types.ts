export interface Property {
  _id?: number;
  name: string;
  address: string;
  price?: number;
  codeInternal: string;
  year?: number;
  idOwner: number;
}

export interface Owner {
  name: string;
  address: string;
  photo?: string | null;
  birthday: string;
}

export interface PropertyImage {
  idProperty?: number;
  file: string;
  enabled?: boolean;
}

export interface PropertyTrace {
  dateSale: string;
  name: string;
  value?: number;
  tax?: number;
  idProperty: number;
}
