"use client";
import { BasketContext } from "@/context/context";
import { basketCounter, basketTotaller } from "@/utils/utils";
import { ShoppingBasket } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import CheckoutButton from "./CheckoutButton";
import ItemTile, { BasketItem } from "./ItemTile";
import { Button } from "./ui/button";

export default function Basket() {
  //useSession, signIn, signOut
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const { basket, setBasket } = useContext(BasketContext);
  const [total, setTotal] = useState({ poke: 0, gbp: 0 });
  const [basketCount, setBasketCount] = useState(0);
  const pathname = usePathname();
  const handleBasketClick = () => {
    setIsBasketOpen(!isBasketOpen);
  };
  const saveBasketBeforeExit = useCallback(() => {
    if (basket.length) {
      localStorage.clear();
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);

  const recalculateTotals = useCallback(async () => {
    const newgbp = await basketTotaller(basket, "gbp");
    const newpoke = await basketTotaller(basket, "poke");
    const newCount = await basketCounter(basket);

    setTotal({ gbp: newgbp, poke: newpoke });
    setBasketCount(newCount);
  }, [basket]);
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", saveBasketBeforeExit);
  }
  useEffect(() => {
    saveBasketBeforeExit();
    try {
      recalculateTotals();
    } catch (err) {
      console.error(err);
    } finally {
    }
  }, [basket, pathname, recalculateTotals, saveBasketBeforeExit]);
  return (
    <section className="top-18 fixed right-5 custom-right">
      <Button onClick={handleBasketClick}>
        {basketCount} <ShoppingBasket />
      </Button>
      {basketCount === 0 ? (
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
          {basket?.map((item: BasketItem) => (
            <ItemTile key={item.id} item={item} />
          ))}
          <div className="flex flex-col sticky bottom-0 bg-slate-600 rounded-xl w-full px-2 pb-2 text-white italic">
            Subtotal:
            <div className="flex justify-between">
              ₽{total.poke}
              <div>£{total.gbp}</div>
            </div>
            {/* put a ternary here for an alt Checkout if already logged in */}
            <CheckoutButton />
          </div>
        </section>
      )}
    </section>
  );
}
