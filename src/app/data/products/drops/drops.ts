import { Drop } from '../../../models/drop.model';

export const DROPS: Drop[] = [

  {
    id: 1,
    name: 'Sudadera ARK Limited Black',
    brand: 'ARK',
    description: 'Drop exclusivo de unidades limitadas inspirado en el streetwear contemporáneo.',
    price: 89,
    ref: 'DROP-001',
    image: 'assets/products/drops/jacket1.jpg',
    gallery: [
      'assets/products/drops/jacket1.jpg',
      'assets/products/drops/jacket1-2.jpg',
      'assets/products/drops/jacket1-3.jpg'
    ],
    endDate: '2027-07-10',
    active: true
  },

  {
    id: 2,
    name: 'Zapatillas Court Vision Lo',
    brand: 'NIKE',
    description: 'Zapatillas Court Vision exclusivas disponible únicamente durante este drop.',
    price: 74,
    ref: 'DROP-002',
    image: 'assets/products/drops/shoe1.jpg',
    gallery: [
      'assets/products/drops/shoe1.jpg',
      'assets/products/drops/shoe1-2.jpg',
      'assets/products/drops/shoe1-3.jpg'
    ],
    endDate: '2027-08-30',
    active: true
  },

  {
    id: 3,
    name: 'Oversized Tee Cream',
    brand: 'ADIDAS',
    description: 'Camiseta exclusiva diseñada para los drops de temporada modelo street.',
    price: 39,
    ref: 'DROP-003',
    image: 'assets/products/drops/tee4.jpg',
    gallery: [
      'assets/products/drops/tee4.jpg',
      'assets/products/drops/tee4-2.jpg',
      'assets/products/drops/tee4-3.jpg'
    ],
    endDate: '2027-10-02',
    active: true
  },

  {
    id: 4,
    name: '4 Urban Windbreaker Shadow',
    brand: 'ARK',
    description: 'Chaqueta ligera exclusiva diseñada para los drops de temporada.',
    price: 109,
    ref: 'DROP-004',
    image: 'assets/products/drops/',
    gallery: [
      'assets/products/drops/',
      'assets/products/drops/',
      'assets/products/drops/'
    ],
    endDate: '2027-05-28',
    active: false
  },

  {
    id: 5,
    name: '5 Street Cap Midnight',
    brand: 'ARK',
    description: 'Gorra exclusiva del drop Midnight Series con unidades limitadas.',
    price: 29,
    ref: 'DROP-005',
    image: 'assets/products/drops/',
    gallery: [
      'assets/products/drops/',
      'assets/products/drops/',
      'assets/products/drops/'
    ],
    endDate: '2027-06-21',
    active: true
  },

  {
    id: 6,
    name: '6 Heavy Hoodie Washed Grey',
    brand: 'ARK',
    description: 'Sudadera premium oversized exclusiva del drop Washed Collection.',
    price: 94,
    ref: 'DROP-006',
    image: 'assets/products/drops/',
    gallery: [
      'assets/products/drops/',
      'assets/products/drops/',
      'assets/products/drops/'
    ],
    endDate: '2027-06-30',
    active: false
  }

];