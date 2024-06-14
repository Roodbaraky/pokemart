"use client";
import { BasketItem } from "@/components/ItemTile";
import React, { createContext, useEffect, useState } from "react";

export const BasketContext = createContext<{
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
}>({
  basket: [],
  setBasket: () => {},
});

export function BasketWrapper({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  useEffect(() => {
    const storedBasket = localStorage.getItem("basket");
    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);
  //
  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
