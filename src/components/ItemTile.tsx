import { MinusSquareIcon, PlusSquareIcon, SquareXIcon } from "lucide-react";

import Image from "next/image";
import { Item } from "./ItemCard";

export interface BasketItem extends Item {
  qty: number;
  key: string;
  
}
export default function ItemTile({ item }: { item: BasketItem }) {
  const description = item.effect_entries?.[0]?.effect || "";
  return (
    <article className="w-full p-2">
      <p className="font-semibold">{item.name.toUpperCase()}</p>
      <p className="line-clamp-2 text-ellipsis italic">{description}</p>
      <div className="flex flex-row gap-2">
        <p className="">
          {item.cost[0] !== "£" ? (
            <Image
              src="/assets/Pokémon_Dollar_sign.svg"
              alt="pokedollar symbol"
              width={80}
              height={80}
              className="w-3 inline"
            />
          ) : (
            <></>
          )}
          {item.cost}
        </p>
        <p className="">QTY: {item.qty || 1} </p>
        <div className="flex self-end justify-end">
          <a>
            <PlusSquareIcon />
          </a>
          <a>
            <MinusSquareIcon />
          </a>
          <a>
            <SquareXIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
