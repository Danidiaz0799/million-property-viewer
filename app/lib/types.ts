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
  _id: number;
  name: string;
  address: string;
  photo?: string | null;
  birthday: string;
}

export interface PropertyImage {
  _id?: number;
  idProperty?: number;
  file: string;
  enabled?: boolean;
}

export interface PropertyTrace {
  _id?: number;
  dateSale: string;
  name: string;
  value?: number;
  tax?: number;
  idProperty: number;
}

export interface PropertyDetails {
  property: Property;
  owner: Owner;
  images: PropertyImage[];
  traces: PropertyTrace[];
}
