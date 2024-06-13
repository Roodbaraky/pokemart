"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { BasketContext } from "../context/context";
import { BasketItem } from "./ItemTile";

export interface Item {
  id: string;
  name: string;
  sprites: {
    default: string;
  };
  altText?: string;
  effect_entries: { effect: string }[];
  cost: string;
}

export default function ItemCard({ item }: { item: Item }) {
  const { basket, setBasket } = useContext(BasketContext) as unknown as {
    basket: BasketItem[];
    setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  };

  const capitalisedName =
    item.name === "coffee"
      ? "Buy me a coffee"
      : item.name[0].toUpperCase() + item.name.slice(1);
  const extra =
    capitalisedName === "Buy me a coffee"
      ? " border border-yellow-300 shadow-xl font-semibold"
      : "";

  const handleClick = () => {
    console.log("clicking");
    let itemFound = false;

    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === item.id) {
        const tempBasket: BasketItem[] = [
          ...basket.slice(0, i),
          {
            ...item,
            qty: basket[i].qty + 1,
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
  };

  return (
    <article
      className={`bg-slate-300 p-8 rounded-xl m-2 self-center min-w-56 ${extra}`}
      onClick={handleClick}
    >
      <h2 className="text-center text-xl">{capitalisedName}</h2>
      <Image
        src={item.sprites.default || ""}
        width={500}
        height={500}
        alt={item.altText || item.effect_entries[0].effect}
        className="p-4 rounded-xl size-40"
      />
      <h2 className="text-center text-2xl">{item.cost || 100000}</h2>
    </article>
  );
}
