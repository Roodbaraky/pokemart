"use client";
import { MinusSquareIcon, PlusSquareIcon, SquareXIcon } from "lucide-react";
import { MouseEvent, useContext } from "react";
import { BasketContext } from "@/contexts/basket";
import {
  decreaseItemQTY,
  increaseItemQTY,
  removeItemFromBasket,
} from "@/utils/utils";
import { BasketItem } from "@/types/basket";

export default function ItemTile({ item }: { item: BasketItem }) {
  const description = item.effect || "";
  const { basket, setBasket } = useContext(BasketContext);
  const handleClick = (e: MouseEvent) => {
    const targetBtn = (e.target as HTMLButtonElement).id;
    if (targetBtn === "plus") {
      const newBasket = increaseItemQTY(basket, item.name);
      setBasket(newBasket);
    }
    if (targetBtn === "minus") {
      const newBasket = decreaseItemQTY(basket, item.name);
      setBasket(newBasket);
    }
    if (targetBtn === "delete") {
      const newBasket = removeItemFromBasket(basket, item.name);
      setBasket(newBasket);
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
          {item.name.includes("coffee") ? "£" : "₽"}
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
