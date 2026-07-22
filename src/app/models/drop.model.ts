export interface Drop {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  gallery?: string[];
  ref: string;
  endDate: string;
  active: boolean;
}