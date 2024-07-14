import React from "react";
import CheckoutButton from "./CheckoutButton";
import ItemTile from "./ItemTile";
import { BasketContainerProps, BasketItem } from "@/types/basket";

export default function BasketContainer({
  isBasketOpen,
  basket,
}: BasketContainerProps) {
  return (
    <>
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
    </>
  );
}
