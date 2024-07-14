"use client";
import { BasketContext } from "@/contexts/basket";
import { Basket } from "@/types/basket";
import { ItemCardProps } from "@/types/item";
import { addItemToBasket } from "@/utils/utils";
import Image from "next/image";
import React, { useContext } from "react";

export default function ItemCard({ item }: ItemCardProps) {
  const { basket, setBasket } = useContext(BasketContext) as {
    basket: Basket;
    setBasket: React.Dispatch<React.SetStateAction<Basket>>;
  };

  const capitalisedName = item.name.includes("coffee")
    ? `Buy me a ${item.name}`
    : item.name[0].toUpperCase() + item.name.slice(1);
  const extra =
    capitalisedName === `Buy me a ${item.name}`
      ? " border border-yellow-300 shadow-xl font-semibold"
      : "";

  const handleClick = () => {
    const newBasket = addItemToBasket(basket, item);
    setBasket(newBasket);
  };

  return (
    <article
      className={`bg-slate-300 p-6 rounded-xl m-2 self-center min-w-56 w-56 h-64 ${extra} justify-between`}
      onClick={handleClick}
    >
      <h2
        className={
          item.name === "small coffee"
            ? "text-center text-sm mb-2"
            : "text-center text-xl"
        }
      >
        {capitalisedName}
      </h2>
      <Image
        src={item.sprite || ""}
        width={500}
        height={500}
        alt={item.name === "small coffee" ? "Small Coffee" : item.effect}
        className="p-4 rounded-xl size-40 object-contain"
      />
      <h2 className="text-center text-2xl">
        {item.name.includes("coffee") ? "£" : "₽"}
        {+item.cost === 0 ? 10000 : item.cost}
      </h2>
    </article>
  );
}
