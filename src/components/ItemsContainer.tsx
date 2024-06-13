import React from "react";
import ItemCard from "./ItemCard";
import { Item } from "./Showcase";
import { BasketWrapper } from "@/context/context";
import Basket from "./Basket";
//https://pokeapi.co/api/v2/item/

export default async function ItemsContainer(this: any) {
  const response = await fetch("https://pokeapi.co/api/v2/item/?limit=200");
  const preList = await response.json();
  const itemsList = preList.results;
  const shuffledItems = itemsList.sort(() => 0.5 - Math.random());
  const items = shuffledItems
    .slice(0, 68)
    .map((item: { name: string }) => item.name);
  const fetchedItems = await Promise.all(
    items.map((item: Item) => fetch(`https://pokeapi.co/api/v2/item/${item}`))
  );

  const convertedItems = await Promise.all(
    fetchedItems.map(async (item) => await item.json())
  );
  const coffeeItem: Item = {
    id:8008135,
    name: "coffee",
    altText: "a refreshing, AFFORDABLE cup of coffee",
    effect_entries: [{ effect: "a refreshing, AFFORDABLE cup of coffee" }],
    sprites: {
      default: "/assets/nobgcoffee.png",
    },
    cost: "£4",
  };

  return (
    <BasketWrapper >
      <Basket />
      <section className="flex flex-wrap content-evenly my-3 mx-auto self-center justify-center w-full">
        {[coffeeItem, ...convertedItems].map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </section>
    </BasketWrapper>
  );
}
