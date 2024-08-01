import { BasketWrapper } from "@/contexts/basket";
import { Item } from "@/types/item";
import { GETitems } from "@/utils/utils"; 
import Basket from "./Basket";
import ItemCard from "./ItemCard";
//https://pokeapi.co/api/v2/item/

export default async function ItemsContainer(this: any) {
  // const itemsResponse = await fetch("https://pokemart-be.onrender.com/items");
 try{
  const itemsResponse = await GETitems()

 

  const items = await itemsResponse.json()
  const coffeeItem: Item = {
    id: 8008135,
    name: "coffee",
    effect: "a refreshing, AFFORDABLE cup of coffee",
    sprite: "/assets/nobgcoffee.png",
    cost: 4,
  };
  const smallCoffeeItem: Item = {
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
        {[coffeeItem, smallCoffeeItem, ...items].map((item: Item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </section>
    </BasketWrapper>
  );

}catch(err){
  console.log(err)
 }
}
