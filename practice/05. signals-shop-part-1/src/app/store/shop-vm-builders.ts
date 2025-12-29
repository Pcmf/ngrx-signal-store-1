import { CartItemVm } from "../components/cart/view-model/cart-item.vm";
import { Product } from "../models/product.model";
import { CartVm, ProductListVm } from "./shop.vm";

//PRODUCTS LIST
export function buildProductListVm(
  products: Product[],
  quantities: Record<string, number>,
  searchWord: string,
): ProductListVm {

  return { productsItems: buildProductItems() }

  function buildProductItems() {
    const word = searchWord.trim().toLocaleLowerCase();

    return products.filter(product => product.name.toLocaleLowerCase().includes(word))
      .map(product => ({
        ...product,
        quantity: quantities[product.id] || 0
      }))
  }

}
//CART
export function buildCartVm(
  products: Product[],
  quantities: Record<string, number>,
  taxRate: number,
  cartVisible: boolean,
): CartVm {
  const items = buildCartItems();
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax
  const itemsCount = items.length;
  const isActive = itemsCount > 0;
  const canCheckout = isActive;

  return {
    items,
    itemsCount,
    subtotal,
    tax,
    total,
    isActive,
    isVisible: cartVisible,
    canCheckout
  }

  function buildCartItems(): CartItemVm[] {
    return products.filter(product => quantities[product.id])
      .map(product => {
        const quantity = quantities[product.id];
        return {
          id: product.id,
          name: product.name,
          quantity,
          price: product.unitPrice,
          total: product.unitPrice * quantity
        }
      })
  }

}
