"use client";
import { BasketItem } from "@/components/ItemTile";
import React, { createContext, useState } from "react";

export const BasketContext = createContext<{
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
}>({
  basket: [],
  setBasket: () => {},
});

export function BasketWrapper({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}

