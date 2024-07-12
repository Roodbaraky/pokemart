import { BasketWrapper } from "@/context/context";
import Basket from "./Basket";
import NewItemCard, { NewItem } from "./NewItemCard";
//https://pokeapi.co/api/v2/item/

export default async function ItemsContainer(this: any) {
  const itemsResponse = await fetch("https://pokemart-be.onrender.com/items");
 

  const items = await itemsResponse.json();
  const coffeeItem: NewItem = {
    id: 8008135,
    name: "coffee",
    effect: "a refreshing, AFFORDABLE cup of coffee",
    sprite: "/assets/nobgcoffee.png",
    cost: 4,
  };
  const smallCoffeeItem: NewItem = {
    id: 800813,
    name: "small coffee",
    effect: "a refreshing, AFFORDABLE cup of coffee",
    sprite: "/assets/nobgcoffee.png",
    cost: 2.50,
  };


  return (
    <BasketWrapper>
      <Basket />
      <section className="flex flex-wrap content-evenly my-3 mx-auto self-center justify-center w-full">
        {[coffeeItem, smallCoffeeItem, ...items].map((item: NewItem) => (
          <NewItemCard key={item.name} item={item} />
        ))}
      </section>
    </BasketWrapper>
  );
}
