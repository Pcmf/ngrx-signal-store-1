import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { initialShopSlice, PersistencedShopSlice } from './shop.slices';
import { buildCartVm, buildProductListVm } from './shop-vm-builders';
import { computed, effect, Signal } from '@angular/core';
import * as updaters from './shop.updaters';


export const ShopStore = signalStore(
  { providedIn: 'root', protectedState: true },
  withState(initialShopSlice),
  withComputed((store) => ({
    productsListVm: computed(() => buildProductListVm(
      store.products(),
      store.quantityInCart(),
      store.searchWord()
    )),

    cartVm: computed(() => buildCartVm(
      store.products(),
      store.quantityInCart(),
      store.taxRate(),
      store.cartVisible(),
    ))
  })),
  withMethods(store => ({
    setSearchWord: (searchWord: string) => patchState(store, updaters.setSearchWord(searchWord)),
    addToCart: (productId: string) => patchState(store, updaters.addToCart(productId)),
    incrementQty: (productId: string) => patchState(store, updaters.incrementQty(productId)),
    decrementQty: (productId: string) => patchState(store, updaters.decrementQty(productId)),
    toggleCartVisibility: () => patchState(store, updaters.toggleCartVisibility()),
    checkout: () => patchState(store, updaters.checkout())
  })),
  withHooks(store => ({
    onInit() {
      const persisted: Signal<PersistencedShopSlice> = computed(() => ({
        quantityInCart: store.quantityInCart()
      }));

      const persistedText = localStorage.getItem('shop');
      if (persistedText) {
        const persistedData = JSON.parse(persistedText) as PersistencedShopSlice;
        patchState(store, persistedData);
      }



      effect(() => {
        const persistedValue = persisted();
        localStorage.setItem('shop', JSON.stringify(persistedValue));
      })

    }
  }))
);
