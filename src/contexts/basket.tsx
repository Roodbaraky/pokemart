"use client";
import React, { createContext, useEffect, useState } from "react";
import { Basket } from "../types/basket";

export const BasketContext = createContext<{
  basket: Basket;
  setBasket: React.Dispatch<React.SetStateAction<Basket>>;
}>({
  basket: {
    items: [],
    totalQty: 0,
    totalPrice: 0,
  },
  setBasket: () => {},
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

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}