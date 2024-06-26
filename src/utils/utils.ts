import { BasketItem } from "@/components/ItemTile";
import { Dispatch } from "react";

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
                        effect_entries: [{ effect: item.effect_entries[0].effect }],
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
                effect_entries: [{ effect: item.effect_entries[0].effect }],
            },
        ]);
    }
}
export const basketCounter = (basket:BasketItem[])=>{
   return basket.reduce((acc, curr) => acc + curr.qty, 0)   
}
export const basketTotaller = (basket: BasketItem[], currency:string) => {
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
            (acc, curr) =>
                acc +
                (!curr.name.includes("coffee")
                    ? Number(curr.cost) * curr.qty
                    : 0),
            0
        )
    }
}