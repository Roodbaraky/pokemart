"use client";
import Image from "next/image";
import React from "react";

export default function Pokedex() {
  return (
    <section className="absolute w-[480px] h-[720px] min-w-[480px] top-[18%] left-0 right-0 mx-auto z-10 grid-rows-3 grid-cols-3">
        <Image
        className="relative z-50 mx-auto top-52  "
        alt={` pikachu `}
        src={'/assets/image.png'}
        width={200}
        height={200}
        />
      <Image
        className="absolute w-[960px] h-[720px] top-0 left-0 right-0 mx-auto z-0 object-cover"
        src={`/assets/pokedex.png`}
        width={1280}
        height={960}
        alt="pokedex"
      />
    </section>
  );
}
