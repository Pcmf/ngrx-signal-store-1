import { CartItemVm } from "../components/cart/view-model/cart-item.vm";
import { ProductItemVm } from "../components/items-list/view-model/product-item.vm";

export interface ProductListVm {
  readonly productsItems: ProductItemVm[];
}

export interface CartVm {
  readonly items: CartItemVm[];
  readonly itemsCount: number;
  readonly subtotal: number;
  readonly tax: number;
  readonly total: number;
  readonly isActive: boolean;
  readonly isVisible: boolean;
  readonly canCheckout: boolean;
}
