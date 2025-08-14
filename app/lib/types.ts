export interface Property {
  id?: number;
  name: string;
  address: string;
  price?: number;
  codeInternal: string;
  year?: number;
  idOwner: number;
}

export interface Owner {
  id: number;
  name: string;
  address: string;
  photo?: string | null;
  birthday: string;
}

export interface PropertyImage {
  id?: number;
  idProperty?: number;
  file: string;
  enabled?: boolean;
}

export interface PropertyTrace {
  id?: number;
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
