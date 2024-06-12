"use client";
import { BasketContext, BasketWrapper } from "@/context/context";
import { ShoppingBasket } from "lucide-react";
import {
    useContext,
    useEffect,
    useState
} from "react";
import ItemTile, { BasketItem } from "./ItemTile";
import { Button } from "./ui/button";

export default function Basket() {
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const { basket  } = useContext(BasketContext);
console.log('--->',basket)
  const handleBasketClick = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  useEffect(() => {
    
  }, [basket]);

  return (
    <section className="fixed top-18 right-6">
       
      <Button onClick={handleBasketClick}>
        <ShoppingBasket />
      </Button>
      <section
        id="basket-container"
        className={`transition-all delay-200 ease-in-out fixed top-24 right-20 p-2 m-2 bg-slate-400 w-56 rounded-xl ${
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
