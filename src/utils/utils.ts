import { BasketItem } from "@/components/ItemTile";
import { Dispatch } from "react";
import offersData from '../resources/offersData.json';


export const basketItemQTYChanger = (basket: BasketItem[], setBasket:Dispatch<BasketItem[]>, item:BasketItem, num: number) => {
    let itemFound = false;
    if (num === 0 || (num === -1 && item.qty === 1)) {
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].id === item.id) {
                const tempBasket: BasketItem[] = [
                    ...basket.slice(0, i),
                    ...basket.slice(i + 1),
                ];

                setBasket(tempBasket);
                itemFound = true;
                break;
            }
        }
    } else {
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].id === item.id) {
                const tempBasket: BasketItem[] = [
                    ...basket.slice(0, i),
                    {
                        ...item,
                        qty: basket[i].qty + num,
                        key: item.id,
                        effect:item.effect,
                    },
                    ...basket.slice(i + 1),
                ];

                setBasket(tempBasket);
                itemFound = true;
                break;
            }
        }
    }

    if (!itemFound) {
        setBasket([
            ...basket,
            {
                ...item,
                key: item.id,
                qty: 1,
                effect: item.effect,
            },
        ]);
    }
}
export const basketCounter = async (basket:BasketItem[])=>{
   return basket.reduce(async (acc, curr) => await acc + curr.qty, 0)   
}
export const priceCalculator = async (item: 
    BasketItem) => {
 
    // const specialPrice = offersData.find((offer) => offer.name === item.name)?.specialPrice
    // let subtotal = 0
    
    // if (specialPrice && item.qty / specialPrice.quantity >= 1) {
    //     const multiple = Math.floor(item.qty / specialPrice.quantity);
    //     const remainder = item.qty % specialPrice.quantity;
    //     subtotal += specialPrice.price * multiple;
    //     subtotal += item.cost * remainder;
  
const response = await fetch(`https://pokemart-be.onrender.com/offers/${item.name}`)
const offer = await response.json()
let subtotal=0
if(offer.length){

    const specialPrice = JSON.parse(offer[0]?.specialprice)
    if (specialPrice && item.qty / specialPrice.quantity >= 1) {
        const multiple = Math.floor(item.qty / specialPrice.quantity);
        const remainder = item.qty % specialPrice.quantity;
        subtotal += specialPrice.price * multiple;
        subtotal += item.cost * remainder;
    }
    } else {
        subtotal += item.cost * item.qty
    }
    return subtotal
}


export const basketTotaller = async (basket: BasketItem[], currency:string) => {
    if (currency === 'gbp') {
       return basket.reduce(
             (acc, curr) =>
                acc +
                (curr.name.includes("coffee")
                    ? Number(curr.cost) * curr.qty
                    : 0),
            0
        )
    }
    if (currency === 'poke') {
        return basket.reduce(
            async (acc, curr) =>
                await acc +
                (!curr.name.includes("coffee")
                    ? await priceCalculator(curr)
                    : 0),
            0
        )
    }
}