"use client";
import { BasketContext } from "@/contexts/basket";
import { ShoppingBasket } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import BasketContainer from "./BasketContainer";
import { Button } from "./ui/button";

export default function Basket() {
  //useSession, signIn, signOut
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const { basket } = useContext(BasketContext);

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
    console.log(basket);
  }, [basket, pathname, saveBasketBeforeExit]);

  return (
    <section className="top-18 fixed right-5 custom-right">
      <Button onClick={handleBasketClick}>
        {basket.totalQty} <ShoppingBasket />
      </Button>
      
        <BasketContainer isBasketOpen={isBasketOpen} basket={basket} />
      
    </section>
  );
}
