
import { Basket, BasketItem } from "@/types/basket";
import { Item } from "@/types/item";

export const priceCalculator = async (item:
    BasketItem) => {

    const response = await fetch(`https://pokemart-be.onrender.com/offers/${item.name}`)
    const offer = await response.json()
    let subtotal = 0

    const specialPrice = offer.length
        ? JSON.parse(offer[0]?.specialprice)
        : null
    if (specialPrice && item.qty / specialPrice.quantity >= 1) {
        const multiple = Math.floor(item.qty / specialPrice.quantity);
        const remainder = item.qty % specialPrice.quantity;
        subtotal += specialPrice.price * multiple;
        subtotal += item.cost * remainder;
        //Add logic here to recalculate total basket
        //This can be previous total + (newItem.price - saving)
        //Store basket total in context, saves another useState in Basket.tsx
    }
    else {
        subtotal += item.cost * item.qty
        //If no offer is applied, just add item.cost to the previous basket total, simple.
    }

    return subtotal
}

export const addItemToBasket = (basket: Basket, item: Item) => {
    const newBasket = structuredClone(basket)
    //Check if item already in basket (AND get its index)
    const itemLocationInBasket = basket.items.findIndex((basketItem) => basketItem.name === item.name)

    //If so, increment QTY, totalQTY, totalPrice
    console.log(itemLocationInBasket)
    if (itemLocationInBasket >= 0) {
        newBasket.items[itemLocationInBasket].qty += 1
        newBasket.totalPrice += item.cost
        newBasket.totalQty += 1
        //****Need to add eval as to whether new item has a specialPrice...***
        //...and if so, need to calculate the saving:
        // "total + (newItem.price - saving)"
        return newBasket
    }
    //If not, give item additional tags (QTY:1), increment totalQTY, increment totalPrice by + item.cost
    else {
        newBasket.items.push({ ...item, qty: 1 })
        newBasket.totalPrice += item.cost
        newBasket.totalQty += 1
    }

    return newBasket
}

export const removeItemFromBasket = (basket: Basket, itemName: string) => {
    const newBasket = structuredClone(basket)
    const itemLocationInBasket = basket.items.findIndex((basketItem) => basketItem.name === itemName)
    if (itemLocationInBasket >= 0) {
        const itemOfInterest = newBasket.items[itemLocationInBasket]
        newBasket.totalQty -= itemOfInterest.qty
        newBasket.totalPrice -= itemOfInterest.cost * itemOfInterest.qty
        newBasket.items =
            [...basket.items.slice(0, itemLocationInBasket),
            ...basket.items.slice(itemLocationInBasket + 1),]
        //Again, need more sophisticated logic here to check offers
        //Essentially needs to work in reverse and subtract subtotal from the basket totalPrice
    }

    return newBasket
}

export const increaseItemQTY = (basket: Basket, itemName: string) => {
    const newBasket = structuredClone(basket)
    const itemLocationInBasket = basket.items.findIndex((basketItem) => basketItem.name === itemName)
    if (itemLocationInBasket >= 0) {
        newBasket.items[itemLocationInBasket].qty++
        newBasket.totalQty++
        newBasket.totalPrice += newBasket.items[itemLocationInBasket].cost
        //same here
    }
    return newBasket
}

export const decreaseItemQTY = (basket: Basket, itemName: string) => {
    const newBasket = structuredClone(basket)
    const itemLocationInBasket = basket.items.findIndex((basketItem) => basketItem.name === itemName)
    if (itemLocationInBasket >= 0) {
        if (newBasket.items[itemLocationInBasket].qty > 0) {
            newBasket.items[itemLocationInBasket].qty -= 1
            newBasket.totalPrice -= newBasket.items[itemLocationInBasket].cost
            newBasket.totalQty -= 1
            //again, need sophisticated logic here
        }
        if (newBasket.items[itemLocationInBasket].qty === 0) {
            return removeItemFromBasket(basket, itemName)
        }
    }
    return newBasket
}