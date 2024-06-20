"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Image } from "@nextui-org/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { PersonIcon } from "@/components/icons";
import { getCurrentUser, signOut } from "@/auth";

interface User {
  username: string;
  name: string;
}

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          console.log("Current User:", currentUser);
        }
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setShowDropdown(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <NextUINavbar
      maxWidth="2xl" // Increased maxWidth for a wider navbar
      position="sticky"
      className="bg-gradient-to-b from-black to-white"
    >
      <NavbarContent className="flex justify-between items-center w-full">
        <div className="flex items-center gap-8 lg:gap-44">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Image
                src="/spoid_logo.png"
                alt="SPOID Logo"
                width={230}
                height={100}
              />
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 lg:gap-40 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-white text-[16px] lg:text-[22px] font-semibold"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </div>
        <div className="ml-auto flex items-center gap-4 lg:gap-8">
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center">
                <PersonIcon size={24} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <span className="block px-4 py-2 text-sm text-gray-700">
                    {user.name}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NextLink href="/login" className="text-white text-sm lg:text-lg">
              로그인
            </NextLink>
          )}
        </div>
      </NavbarContent>
    </NextUINavbar>
  );
};
