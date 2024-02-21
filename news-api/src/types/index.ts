export interface ProductDetails {
  someField: string;
  someField2: number;
}

export interface Product {
  id: string;
  name: string;
  details: ProductDetails;
}
