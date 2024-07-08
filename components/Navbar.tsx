"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Image } from "@nextui-org/image";
import { siteConfig } from "@/config/site";
import { getCurrentUser, signOut } from "@/auth";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import {
  FaUser as PersonIcon,
  FaHome as HomeIcon,
  FaMicrochip as ComponentsIcon,
  FaFileInvoice as EstimateIcon,
  FaStar as FavoritesIcon,
  FaSignInAlt as LoginIcon,
  FaSignOutAlt as LogoutIcon,
} from "react-icons/fa";

interface User {
  username: string;
  name: string;
}

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

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
      console.log("Initiating sign out");
      await signOut();
      setUser(null);
      setIsMenuOpen(false);
      window.location.href = "/";
      console.log("Sign out completed, redirecting to home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
    } else {
      router.push(href);
    }
    setIsMenuOpen(false);
  };

  return (
    <NextUINavbar
      maxWidth="2xl"
      position="sticky"
      className="bg-black text-white border-b-2 border-white"
    >
      <NavbarMenuToggle
        onClick={handleMenuToggle}
        className="lg:hidden text-white"
      />
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
          <ul className="hidden lg:flex gap-4 lg:gap-40 h-full justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                {["관심 부품", "견적 내기", "내 견적"].includes(item.label) ? (
                  <a
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium text-white text-[16px] lg:text-[22px] font-semibold"
                    )}
                    href={item.href}
                    onClick={(e) => handleNavItemClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                ) : (
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
                )}
              </NavbarItem>
            ))}
          </ul>
        </div>
        <div className="ml-auto flex items-center gap-4 lg:gap-8">
          {user ? (
            <Dropdown>
              <DropdownTrigger>
                <button className="flex items-center text-white">
                  <PersonIcon size={24} />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="name" className="cursor-default">
                  {user.name}
                </DropdownItem>
                <DropdownItem key="logout" onClick={handleSignOut}>
                  로그아웃
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-2">
              <NextLink href="/login" className="text-white text-sm lg:text-lg">
                로그인
              </NextLink>
              <span className="text-white">|</span>
              <NextLink
                href="/signin"
                className="text-white text-sm lg:text-lg"
              >
                회원가입
              </NextLink>
            </div>
          )}
        </div>
      </NavbarContent>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg z-30 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={handleMenuToggle}
        >
          Close
        </button>
        <ul className="mt-16 px-4 bg-gray-900">
          {siteConfig.navItems.map((item) => (
            <li key={item.href} className="py-2">
              {["관심 부품", "견적 내기", "내 견적"].includes(item.label) ? (
                <a
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-white flex items-center"
                  )}
                  href={item.href}
                  onClick={(e) => handleNavItemClick(e, item.href)}
                >
                  <span className="mr-2">
                    {item.label === "관심 부품" && <FavoritesIcon size={20} />}
                    {item.label === "견적 내기" && <EstimateIcon size={20} />}
                    {item.label === "내 견적" && <ComponentsIcon size={20} />}
                  </span>
                  {item.label}
                </a>
              ) : (
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-white flex items-center"
                  )}
                  color="foreground"
                  href={item.href}
                  onClick={(e) => handleNavItemClick(e, item.href)}
                >
                  <span className="mr-2">
                    {item.label === "홈" && <HomeIcon size={20} />}
                  </span>
                  {item.label}
                </NextLink>
              )}
              <hr className="my-2 border-gray-700" />
            </li>
          ))}
          <li className="py-2">
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center w-full text-white"
              >
                <LogoutIcon size={20} className="mr-2" />
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/login"
                  className="flex items-center w-full text-white"
                >
                  <LoginIcon size={20} className="mr-2" />
                  Login
                </NextLink>
                <span className="text-white">|</span>
                <NextLink
                  href="/signin"
                  className="flex items-center w-full text-white"
                >
                  <LoginIcon size={20} className="mr-2" />
                  회원가입
                </NextLink>
              </div>
            )}
            <hr className="my-2 border-gray-700" />
          </li>
        </ul>
      </div>
    </NextUINavbar>
  );
};
