import React from 'react'
import { Item } from './Showcase'
import Image from 'next/image'

export default function ItemCard({item}:{item:Item}) {
  return (
    <article className="bg-slate-300 p-10 rounded-xl">
    <h2 className="text-center text-xl">Item of the day:</h2>
          <Image src={item.sprites.default||''} width={500} height={500} alt={item.altText}  className="p-4 rounded-full"/>
          <h2 className="text-center text-2xl">{item.title}</h2>
        </article>
  )
}
