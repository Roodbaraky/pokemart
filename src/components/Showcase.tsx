import Image from "next/image";
import React from "react";

export interface Item {
  name: string;
  altText: string;
  sprites: { default: string };
  cost: string;
  effect_entries: { 0: { effect: string } };
  id: number | string;
}
export interface NewItem {
  id: number;
  name: string;
  effect: string;
  sprite: string;
  cost: string;
}

export default async function Showcase() {
  const randomId = 200 - Math.round(Math.random() * 100);
  const response = await fetch(`https://pokeapi.co/api/v2/item/${randomId}`);
  const item = await response.json();

  return (
    <article className="bg-slate-300 p-10 rounded-xl">
      <h2 className="text-center text-xl">Item of the day:</h2>
      <Image
        src={item.sprites.default}
        width={500}
        height={500}
        alt={item.name}
        className="p-4 rounded-full"
      />
      <h2 className="text-center text-2xl">{item.name.toUpperCase()}</h2>
      <p className="text-center">{`£${item.cost || 10}`}</p>
    </article>
  );
}
