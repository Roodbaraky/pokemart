"use client";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { Basket, BasketItem } from "../types/basket";
import { fetchSpecialPrice, priceCalculator } from '@/utils/utils';

export const BasketContext = createContext<{
  basket: Basket;
  addItem: (item: BasketItem) => void;
  removeItem: (itemName: string) => void;
  increaseItemQty: (itemName: string) => void;
  decreaseItemQty: (itemName: string) => void;
}>({
  basket: {
    items: [],
    totalQty: 0,
    totalPrice: 0,
  },
  addItem: () => {},
  removeItem: () => {},
  increaseItemQty: () => {},
  decreaseItemQty: () => {},
});

export function BasketWrapper({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<Basket>({
    items: [],
    totalPrice: 0,
    totalQty: 0,
  });

  useEffect(() => {
    const storedBasket = localStorage.getItem("basket");
    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const updateTotalPrice = async (newBasket: Basket) => {
    let totalPrice = 0;
    for (const item of newBasket.items) {
      const specialPrice = await fetchSpecialPrice(item.name);
      totalPrice += priceCalculator(item, specialPrice);
    }
    newBasket.totalPrice = totalPrice;
    setBasket(newBasket);
  };

  const addItem = useCallback(async (item: BasketItem) => {
    const newBasket = structuredClone(basket);
    const itemLocationInBasket = basket.items.findIndex((basketItem) => basketItem.name === item.name);

    if (itemLocationInBasket >= 0) {
      newBasket.items[itemLocationInBasket].qty += 1;
    } else {
      newBasket.items.push({ ...item, qty: 1 });
    }

    newBasket.totalQty += 1;

    await updateTotalPrice(newBasket);
  }, [basket]);

  const removeItem = useCallback(async (itemName: string) => {
    const newBasket = structuredClone(basket);
    const itemLocationInBasket = basket.items.findIndex((basketItem) => basketItem.name === itemName);
    if (itemLocationInBasket >= 0) {
      const itemOfInterest = newBasket.items[itemLocationInBasket];
      newBasket.totalQty -= itemOfInterest.qty;
      newBasket.items = [
        ...basket.items.slice(0, itemLocationInBasket),
        ...basket.items.slice(itemLocationInBasket + 1),
      ];
    }
    await updateTotalPrice(newBasket);
  }, [basket]);

  const increaseItemQty = useCallback(async (itemName: string) => {
    const newBasket = structuredClone(basket);
    const itemLocationInBasket = basket.items.findIndex((basketItem) => basketItem.name === itemName);
    if (itemLocationInBasket >= 0) {
      newBasket.items[itemLocationInBasket].qty++;
      newBasket.totalQty++;
      await updateTotalPrice(newBasket);
    }
  }, [basket]);

  const decreaseItemQty = useCallback(async (itemName: string) => {
    const newBasket = structuredClone(basket);
    const itemLocationInBasket = basket.items.findIndex((basketItem) => basketItem.name === itemName);
    if (itemLocationInBasket >= 0) {
      if (newBasket.items[itemLocationInBasket].qty > 1) {
        newBasket.items[itemLocationInBasket].qty -= 1;
        newBasket.totalQty -= 1;
      } else {
        await removeItem(itemName);
        return;
      }
      await updateTotalPrice(newBasket);
    }
  }, [basket, removeItem]);

  return (
    <BasketContext.Provider value={{ basket, addItem, removeItem, increaseItemQty, decreaseItemQty }}>
      {children}
    </BasketContext.Provider>
  );
}
