import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Image } from "@nextui-org/image"; // Import Image component

import { siteConfig } from "@/config/site";
import {
  PersonIcon,
  SearchIcon,
} from "@/components/icons"; // Import icons

export const Navbar = () => {

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-gradient-to-b  bg-gradient-to-b from-black  to-white"
    >
      <NavbarContent className="flex justify-between items-center w-full">
        <div className="flex items-center gap-44">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Image
                src="/spoid_logo.png"
                alt="SPOID Logo"
                width={230}
                height={100}
              />
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-40 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-white text-[22px] font-semibold"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
            <NavbarItem className="hidden sm:flex">
            <PersonIcon size={30} />
          </NavbarItem>
          </ul>
        </div>
        <div className="flex  gap-20">
          
        </div>
      </NavbarContent>
    </NextUINavbar>
  );
};
