"use client";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { Basket, BasketItem } from "../types/basket";
import { fetchSpecialPrice, priceCalculator } from "@/utils/utils";

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

  const addItem = useCallback(
    async (item: BasketItem) => {
      const newBasket = structuredClone(basket);
      const itemLocationInBasket = basket.items.findIndex(
        (basketItem) => basketItem.name === item.name
      );
      let previousSubtotal = 0;
      if (itemLocationInBasket >= 0) {
        previousSubtotal = basket.totalPrice;
        newBasket.items[itemLocationInBasket].qty += 1;

        const specialPrice = await fetchSpecialPrice(item.name);
        const calculatedPrice = priceCalculator(
          newBasket.items[itemLocationInBasket],
          specialPrice
        );
        newBasket.totalPrice +=
          previousSubtotal + item.cost === calculatedPrice
            ? item.cost
            : previousSubtotal + item.cost - calculatedPrice;
      } else {
        newBasket.items.push({ ...item, qty: 1 });
      }

      newBasket.totalQty += 1;
      if (!previousSubtotal) {
        newBasket.totalPrice += item.cost * item.qty;
      }

      setBasket(newBasket);
    },
    [basket]
  );

  const removeItem = useCallback(
    async (itemName: string) => {
      const newBasket = structuredClone(basket);
      const itemLocationInBasket = basket.items.findIndex(
        (basketItem) => basketItem.name === itemName
      );
      if (itemLocationInBasket >= 0) {
        const itemOfInterest = newBasket.items[itemLocationInBasket];
        const calculatedTotal = await fetchSpecialPrice(itemName);
        newBasket.totalPrice -= priceCalculator(
          itemOfInterest,
          calculatedTotal
        );
        newBasket.totalQty -= itemOfInterest.qty;
        newBasket.items = [
          ...basket.items.slice(0, itemLocationInBasket),
          ...basket.items.slice(itemLocationInBasket + 1),
        ];
      }
      setBasket(newBasket);
    },
    [basket]
  );

  const increaseItemQty = useCallback(
    async (itemName: string) => {
      const newBasket = structuredClone(basket);
      let previousSubtotal = 0;
      const itemLocationInBasket = basket.items.findIndex(
        (basketItem) => basketItem.name === itemName
      );
      if (itemLocationInBasket >= 0) {
        previousSubtotal = basket.totalPrice;
        newBasket.items[itemLocationInBasket].qty += 1;

        const specialPrice = await fetchSpecialPrice(itemName);

        const calculatedPrice = priceCalculator(
          newBasket.items[itemLocationInBasket],
          specialPrice
        );
        newBasket.totalQty += 1;
        newBasket.totalPrice +=
          previousSubtotal + newBasket.items[itemLocationInBasket].cost ===
          calculatedPrice
            ? newBasket.items[itemLocationInBasket].cost
            : previousSubtotal +
              newBasket.items[itemLocationInBasket].cost -
              calculatedPrice;
      }
      setBasket(newBasket);
    },
    [basket]
  );

  const decreaseItemQty = useCallback(
    async (itemName: string) => {
      const newBasket = structuredClone(basket);
      const itemLocationInBasket = basket.items.findIndex(
        (basketItem) => basketItem.name === itemName
      );
      let previousSubtotal = 0;
      if (itemLocationInBasket >= 0) {
        if (newBasket.items[itemLocationInBasket].qty > 1) {
          previousSubtotal = newBasket.totalPrice;
          newBasket.items[itemLocationInBasket].qty -= 1;
          newBasket.totalQty -= 1;
          const specialPrice = await fetchSpecialPrice(itemName);
          const calculatedPrice = priceCalculator(
            newBasket.items[itemLocationInBasket],
            specialPrice
          );
          const normalNewTotalPrice =
            previousSubtotal - newBasket.items[itemLocationInBasket].cost;

          const differenceBetweenExpectedAndCalculatedNewPrice = Math.abs(
            normalNewTotalPrice - calculatedPrice
          );

          newBasket.totalPrice -=
            !differenceBetweenExpectedAndCalculatedNewPrice
              ? newBasket.items[itemLocationInBasket].cost
              : differenceBetweenExpectedAndCalculatedNewPrice;
        } else {
          await removeItem(itemName);
          return;
        }
      }
      setBasket(newBasket);
    },
    [basket, removeItem]
  );

  return (
    <BasketContext.Provider
      value={{ basket, addItem, removeItem, increaseItemQty, decreaseItemQty }}
    >
      {children}
    </BasketContext.Provider>
  );
}
