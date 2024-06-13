"use client";
import { BasketContext } from "@/context/context";
import { ShoppingBasket } from "lucide-react";
import { useContext, useState } from "react";
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
        {basket.reduce((acc, curr) => acc + curr.qty, 0)} <ShoppingBasket />
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
        <div className="flex flex-col sticky bottom-0 bg-slate-600 rounded-xl w-full px-2 pb-2 text-white italic">
          Subtotal:
         <div className="flex">
         ₽
            {basket.reduce(
              (acc, curr) =>
                acc + (!curr.name.includes("coffee") ? Number(curr.cost) * curr.qty : 0),
              0
            )}
         </div>
          <Button>Checkout</Button>
        </div>
      </section>
    </section>
  );
}
