
import React from "react";
import ItemCard from "./ItemCard";
//https://pokeapi.co/api/v2/item/

export default async function ItemsContainer() {
  const response = await fetch('https://pokeapi.co/api/v2/item/?limit=200')
  const preList = await response.json()
  const itemsList = preList.results
  const shuffledItems = itemsList.sort(() => 0.5 - Math.random());
  const items = shuffledItems.slice(0, 3).map((item)=>item.name);
  console.log(items);
  const fetchedItems = await Promise.all(
    items.map( (item) =>  fetch(`https://pokeapi.co/api/v2/item/${item}`))
  );
  console.log(fetchedItems)
  const convertedItems = await Promise.all(
    fetchedItems.map(async (item) => await (await item.json()))
  );
console.log(convertedItems)
  return (
    <section className="flex flex-wrap content-center my-3">
     { convertedItems.map((item)=> <ItemCard key={item.name} item={item}/> )}
    </section>
  );
}
