"use client";
import { BasketContext } from "@/contexts/basket";
import { Item, ItemCardProps } from "@/types/item";
import Image from "next/image";
import { useContext } from "react";
import { Button } from "./ui/button";

export default function ItemCard({ item }: ItemCardProps) {
  const { addItem } = useContext(BasketContext);

  const capitalisedName = item.name.includes("coffee")
    ? `Buy me a ${item.name}`
    : item.name[0].toUpperCase() + item.name.slice(1);
  const extra =
    capitalisedName === `Buy me a ${item.name}`
      ? " border border-yellow-300 shadow-xl font-semibold"
      : "";

  const handleAddItem = (item: Item) => {
    addItem({ ...item, qty: 1 });
  };

  return (
    <article
    className={`bg-slate-300 p-6 rounded-xl m-2 self-center min-w-56 w-56 h-64 ${extra} cursor-pointer`}
    onClick={() => {
      handleAddItem(item);
    }}
  >
    <div className="group relative w-full h-full">
      {/* Hover effect */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl z-10">
        <p className="text-white">Add to basket</p>
      </div>
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
      </div>
    </article>
  );
}
