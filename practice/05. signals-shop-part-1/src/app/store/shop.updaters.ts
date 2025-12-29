import { PartialStateUpdater } from '@ngrx/signals';
import { ShopSlice } from './shop.slices';

export function setSearchWord(
  searchWord: string
): PartialStateUpdater<ShopSlice> {
  return (_) => ({ searchWord });
}

export function addToCart(productId: string): PartialStateUpdater<ShopSlice> {
  return state => {
    const quantityInCart = { ...state.quantityInCart };
    quantityInCart[productId] = quantityInCart[productId] + 1 || 1;

    return { quantityInCart };
  };
}

export function incrementQty(
  productId: string
): PartialStateUpdater<ShopSlice> {
  return addToCart(productId);
}

export function decrementQty(
  productId: string
): PartialStateUpdater<ShopSlice> {
  return (state) => {
    const quantityInCart = { ...state.quantityInCart };
    if (quantityInCart[productId] > 1) {
      quantityInCart[productId]--;
    } else {
      delete quantityInCart[productId];
    }
    return { quantityInCart };
  };
}

export function toggleCartVisibility(): PartialStateUpdater<ShopSlice> {
  return (state) => ({ cartVisible: !state.cartVisible });
}

export function checkout(): PartialStateUpdater<ShopSlice> {
  return (_) => ({
    quantityInCart: {},
    cartVisible: false,
  });
}
