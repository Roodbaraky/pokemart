
import { BasketItem } from "@/types/basket";

export const fetchSpecialPrice = async (itemName: string) => {
  // const response = await fetch(`https://pokemart-be.onrender.com/offers/${itemName}`)
  try{
  const response = await fetch(`/api/specialPrice/${itemName}`)
  const offer = await response.json()
  console.log('offer ==>', offer)
  return !offer ? null : offer
  ? JSON.parse(offer?.specialprice)
  : null
}catch(error){
  console.log(error)
}
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



