"use client";
import { BasketContext } from "@/contexts/basket";
import { BasketItem } from "@/types/basket";
import { MinusSquareIcon, PlusSquareIcon, SquareXIcon } from "lucide-react";
import { useContext } from "react";

export default function ItemTile({ item }: { item: BasketItem }) {
  const description = item.effect || "";
  const { removeItem, increaseItemQty, decreaseItemQty } =
    useContext(BasketContext);

  const handleRemoveItem = (itemName: string) => {
    removeItem(itemName);
  };

  const handleIncreaseItemQty = (itemName: string) => {
    increaseItemQty(itemName);
  };

  const handleDecreaseItemQty = (itemName: string) => {
    decreaseItemQty(itemName);
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
        <a
          onClick={() => {
            handleIncreaseItemQty(item.name);
          }}
          id="plus"
        >
          <PlusSquareIcon className="pointer-events-none" />
        </a>
        <a
          onClick={() => {
            handleDecreaseItemQty(item.name);
          }}
          id="minus"
        >
          <MinusSquareIcon className="pointer-events-none" />
        </a>
        <a
          onClick={() => {
            handleRemoveItem(item.name);
          }}
          id="delete"
        >
          <SquareXIcon className="pointer-events-none" />
        </a>
      </div>
    </article>
  );
}
