"use client";
import React, { useContext } from "react";
import { Item } from "./Showcase";
import Image from "next/image";
import { BasketContext } from "../context/context";

export default function ItemCard({ item }: { item: Item }) {
  const { basket, setBasket } = useContext(BasketContext);
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
  console.log(item)
    setBasket([...basket, {...item, key:item.id}])
    console.log([...basket, item])
  };
  return (
    <article
      className={`bg-slate-300 p-8 rounded-xl m-2 self-center min-w-56 ${extra}  `}
      onClick={handleClick}
    >
      <h2 className="text-center text-xl">{capitalisedName}</h2>
      <Image
        src={item.sprites.default || ""}
        width={500}
        height={500}
        alt={item.altText||item.effect_entries[0].effect}
        className="p-4 rounded-xl size-40"
      />
      <h2 className="text-center text-2xl">{item.cost || 100000}</h2>
    </article>
  );
}
