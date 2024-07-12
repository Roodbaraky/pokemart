import React, { ReactNode } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
  
export default function UserMenu({username}:{username:string|null}):ReactNode{
  return (
    <DropdownMenu modal={false}>
    <DropdownMenuTrigger>{`Hi, ${username}`}</DropdownMenuTrigger>
    <DropdownMenuContent className='DropdownMenuContent' sideOffset={5} side='top'>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Orders</DropdownMenuItem>
      <DropdownMenuItem><LogoutLink>Log out</LogoutLink></DropdownMenuItem>

      
    </DropdownMenuContent>
  </DropdownMenu>
  
  )
}
