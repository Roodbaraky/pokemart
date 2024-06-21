"use client";
import { LoginLink, LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserMenu from "./UserMenu";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "My Pokémon",
    href: "/mypokemon",
  },
  {
      name: "PokéMart",
      href: "/pokemart",
      },
      ];
      
      export const Header = () => {
    const currentPath = usePathname();
    const {
        permissions,
        isLoading,
        user,
        accessToken,
        organization,
        userOrganizations,
        getPermission,
        getBooleanFlag,
        getIntegerFlag,
        getFlag,
        getStringFlag,
        getClaim,
        getAccessToken,
        getToken,
        getIdToken,
        getOrganization,
        getPermissions,
        getUserOrganizations
      } = useKindeBrowserClient();
    
    //   console.log(getPermission("eat:chips"));
    //   console.log(getBooleanFlag("flag", false));
    //   console.log(getIntegerFlag("eat:chips", 1));
    //   console.log(getStringFlag("eat:chips", "ds"));
    //   console.log(getFlag("eat:chips", false, "b"));
    //   console.log("accessToken", accessToken);
    //   console.log(getClaim("aud"));
      if (isLoading) return <div>Loading...</div>;
      console.log(user)

  return (
    <header className="flex  items-center justify-between p-2 px-4 fixed w-full max-w-[1200px] border-b bg-slate-50">
      <Link href={"/"}>
        <Image
          src={
            "https://cdn1.iconfinder.com/data/icons/andriod-app-logo/32/icon_k-512.png"
          }
          className="h-14 w-14"
          width={50}
          height={50}
          alt="Logo"
        />
      </Link>
      <nav>
        <ul className="flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={
                  currentPath === link.href.toLowerCase()
                    ? "text-to-black"
                    : "text-zinc-500"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            
           
           {!user
           ? (<LoginLink id="login-nav"
            className="text-zinc-500"
            onClick={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.className = "text-to-black";
            }}
            onBlur={() => {
              const target = document.getElementById('login-nav') as HTMLAnchorElement;
              target.className = "text-zinc-500";
            }}
            postLoginRedirectURL="/pokemart">

              Log in
            </LoginLink>)
            :(<UserMenu username={user.given_name}/>)}
            {/* !loggedIn?LoginLink : LogoutLink */}
            
          </li>
        </ul>
      </nav>
    </header>
  );
};
