"use client";
import { BasketContext } from "@/context/context";
import { ShoppingBasket } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ItemTile, { BasketItem } from "./ItemTile";
import { Button } from "./ui/button";
export default function Basket() {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const { basket } = useContext(BasketContext);
  const handleBasketClick = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  return (
    <section className="fixed top-18 right-6">
      <Button onClick={handleBasketClick}>
        <ShoppingBasket />
      </Button>
      <section
        id="basket-container"
        className={`transition-all delay-200 ease-in-out fixed top-24 right-20 p-2 m-2 bg-slate-400 w-64 rounded-xl max-h-[80%] overflow-scroll ${
          isBasketOpen ? "visible" : "hidden"
        }`}
      >
        {basket?.map((item: BasketItem) => (
          <ItemTile key={item.id} item={item} />
        ))}
      </section>
    </section>
  );
}
