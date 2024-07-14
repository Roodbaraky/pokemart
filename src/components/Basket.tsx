"use client";
import { BasketContext } from "@/contexts/basket";
// import { basketCounter, basketTotaller } from "@/utils/utils";
import { ShoppingBasket } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import CheckoutButton from "./CheckoutButton";
import ItemTile from "./ItemTile";
import { Button } from "./ui/button";
import { BasketItem } from "@/types/basket";

export default function Basket() {
  //useSession, signIn, signOut
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const { basket, setBasket } = useContext(BasketContext);

  const pathname = usePathname();
  const handleBasketClick = () => {
    setIsBasketOpen(!isBasketOpen);
  };
  const saveBasketBeforeExit = useCallback(() => {
    if (basket.items.length) {
      localStorage.clear();
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);

  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", saveBasketBeforeExit);
  }

  useEffect(() => {
    saveBasketBeforeExit();
    console.log(basket)
  }, [basket, pathname, saveBasketBeforeExit]);

  return (
    <section className="top-18 fixed right-5 custom-right">
      <Button onClick={handleBasketClick}>
        {basket.totalQty} <ShoppingBasket />
      </Button>
      {basket.totalQty === 0 ? (
        <section
          id="basket-empty-msg"
          className={`transition-all delay-200 ease-in-out fixed top-36 right-5 custom-right p-2 m-2 bg-slate-400 w-64 rounded-xl max-h-[80%] overflow-scroll ${
            isBasketOpen ? "visible" : "hidden"
          }`}
        >
          no items!
        </section>
      ) : (
        <section
          id="basket-container"
          className={`transition-all delay-200 ease-in-out fixed top-36 right-5 custom-right p-2 pb-0 m-2 bg-slate-400 w-64 rounded-xl max-h-[80%] overflow-scroll  ${
            isBasketOpen ? "visible" : "hidden"
          }`}
        >
          {basket.items.map((item: BasketItem) => (
            <ItemTile key={item.id} item={item} />
          ))}
          <div className="flex flex-col sticky bottom-0 bg-slate-600 rounded-xl w-full px-2 pb-2 text-white italic">
            Subtotal:
            <div className="flex justify-between">₽{basket.totalPrice}</div>
            {/* put a ternary here for an alt Checkout if already logged in */}
            <CheckoutButton />
          </div>
        </section>
      )}
    </section>
  );
}
