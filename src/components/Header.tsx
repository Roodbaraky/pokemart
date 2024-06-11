'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const navLinks = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'My Pokémon',
        href: '/mypokemon'
    },
    {
        name: 'PokéMart',
        href: '/pokemart'
    },
]


export const Header = () => {
const currentPath = usePathname()

    return (
    <header className='flex  items-center justify-between p-2 px-4 fixed w-full max-w-[1200px] border-b bg-slate-50'> 
       <Link
       href={'/'}
       >
            <Image
            src={'https://cdn1.iconfinder.com/data/icons/andriod-app-logo/32/icon_k-512.png'}
            className='h-14 w-14'
            width={50}
            height={50}
            alt='Logo'
    
            />
       </Link>
        <nav>
            <ul className='flex items-center gap-4'>
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link href={link.href} className={currentPath===link.href.toLowerCase()?'text-to-black':'text-zinc-500'}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
  )
}
