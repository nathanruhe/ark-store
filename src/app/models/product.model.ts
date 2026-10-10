export type ProductGender = 'men' | 'women' | 'kids';

export type ProductCategory =
  | 'sudaderas'
  | 'chaquetas'
  | 'pantalones'
  | 'camisas'
  | 'camisetas'
  | 'zapatillas'
  | 'vestidos'
  | 'faldas'
  | 'accesorios';

export type AccessoryType =
  | 'bolsos'
  | 'gorros'
  | 'relojes'
  | 'joyeria'
  | 'gafas';

export interface Product {
  ref: string;

  name: string;
  brand: string;
  description: string;

  category: ProductCategory; /* CATEGORY */
  accessoryType?: AccessoryType; /* SUBCATEGORY FOR ACCESSORIES */

  gender: ProductGender;

  retailPrice: number;
  price: number;

  hoverImage?: string;
  gallery: string[];

  loaded?: boolean;
}