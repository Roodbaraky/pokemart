import React from 'react'

export interface BasketItem{
    name:string
    cost:string
    effect_entries:{0:{effect:string}}
    id:string
}
export default function ItemTile({item}:{item:BasketItem}) {
  const description = item.effect_entries[0].effect
    return (
    <article className='w-full'>
        <p>{item.name}</p>
        <p>{item.cost}</p>
        <p>{description}</p>

    </article>
  )
}
