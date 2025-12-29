import { ALL_PRODUCTS } from '../data/all-products';
import { Product } from '../models/product.model';

export interface ShopSlice {
  readonly products: Product[];
  readonly searchWord: string;
  readonly quantityInCart: Record<string, number>;
  readonly cartVisible: boolean;
  readonly taxRate: number;
}

export type PersistencedShopSlice = Pick<ShopSlice, 'quantityInCart'>;

export const initialShopSlice: ShopSlice = {
  products: ALL_PRODUCTS,
  searchWord: '',
  quantityInCart: {},
  cartVisible: false,
  taxRate: 0.23,
};
