
import { BasketItem } from "@/types/basket";

export const fetchSpecialPrice = async (itemName: string) => {
    const response = await fetch(`https://pokemart-be.onrender.com/offers/${itemName}`)
    const offer = await response.json()
    return offer.length
        ? JSON.parse(offer[0]?.specialprice)
        : null
}

export const priceCalculator = (item: BasketItem, specialPrice: any) => {
  let subtotal = 0;

  if (specialPrice && item.qty >= specialPrice.quantity) {
    const multiple = Math.floor(item.qty / specialPrice.quantity);
    const remainder = item.qty % specialPrice.quantity;
    subtotal += specialPrice.price * multiple;
    subtotal += item.cost * remainder;
  } else {
    subtotal += item.cost * item.qty;
  }

  return subtotal;
};

  

