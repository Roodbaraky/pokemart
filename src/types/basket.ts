import { Item } from "@/types/item";

export interface BasketItem extends Item{
    qty: number;
    key?: string|number;
   
}

export interface Basket {
    items: BasketItem[];
    totalQty: number;
    totalPrice: number;
}