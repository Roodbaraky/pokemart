import Basket from "@/components/Basket";
import ItemsContainer from "@/components/ItemsContainer";
import { BasketWrapper } from "@/context/context";
import React from "react";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
      <ItemsContainer />
    </main>
  );
}
