"use client";
import { MinusSquareIcon, PlusSquareIcon, SquareXIcon } from "lucide-react";

import { Item } from "./ItemCard";
import { useContext } from "react";
import { BasketContext } from "@/context/context";
import { basketItemQTYChanger } from "@/utils/utils";

export interface BasketItem extends Item {
  qty: number;
  key: string;
  tag?: string;
}

export default function ItemTile({ item }: { item: BasketItem }) {
  const description = item.effect_entries?.[0]?.effect || "";
  const { basket, setBasket } = useContext(BasketContext);
  const handleClick = (e) => {
    const targetBtn = e.target.id;
    if (targetBtn === "plus") {
      basketItemQTYChanger(basket, setBasket, item, 1);
    }
    if (targetBtn === "minus") {
      basketItemQTYChanger(basket, setBasket, item, -1);

    }
    if (targetBtn === "delete") {
      basketItemQTYChanger(basket, setBasket, item, 0);

    } else {
      return;
    }
  };
  return (
    <article className="w-full p-2">
      <p className="font-semibold">{item.name.toUpperCase()}</p>
      <p className="line-clamp-2 text-ellipsis italic">{description}</p>
      <div className="flex flex-row gap-2">
        <p className="">
          {item.name.includes('coffee')? "£" : "₽" }
          {item.cost}
        </p>
        <p className="">QTY: {item.qty || 1} </p>
      </div>
      <div className="flex self-end justify-end">
        <a onClick={handleClick} id="plus">
          <PlusSquareIcon className="pointer-events-none" />
        </a>
        <a onClick={handleClick} id="minus">
          <MinusSquareIcon className="pointer-events-none" />
        </a>
        <a onClick={handleClick} id="delete">
          <SquareXIcon className="pointer-events-none" />
        </a>
      </div>
    </article>
  );
}
