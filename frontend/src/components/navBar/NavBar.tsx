"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Beneficios", href: "/" },
  { name: "Precios", href: "/#membership-types" },
  { name: "Contacto", href: "/" },
  { name: "Iniciar Sesión", href: "/auth/login" },
];

export const NavBar = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = !!session?.user;
  const path = usePathname();
  const isPageLogin = path === "/auth/login";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isBordered
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="md:py-5 md:pl-14 md:pr-8 bg-primary-400/90"
      maxWidth="full"
    >
      <NavbarContent className="w-full h-full justify-between">
        {/* logo desktop */}
        <NavbarContent className="hidden md:flex pr-3" justify="start">
          <NavbarBrand>
            <Link href="/dashboard">
              <Image
                src="/images/StAnaLogo.png"
                alt="Saint Anna Logo"
                width={300}
                height={80}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        {/* logo mobile */}
        <NavbarContent className="md:hidden pr-3 " justify="start">
          <NavbarBrand className="w-16 h-16">
            <Link href="/dashboard" className="w-16 h-16">
              <Image
                className="w-full h-full"
                src="/images/St-ana-logo.svg"
                alt="Saint Anna Logo"
                width={80}
                height={80}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* links */}
        <NavbarContent className="hidden sm:flex">
          {menuItems.map((item, index) => (
            <NavbarItem
              className="flex text-white w-full text-xl font-medium"
              key={`${item.name}-${index}`}
            >
              {item.name === "Iniciar Sesión" ? (
                <>
                  {status === "loading" ? (
                    <Button
                      isDisabled={isPageLogin}
                      className="w-[152px] animate-pulse self-end text-[#CC6600] rounded-2xl bg-white p-6 border-2 border-[#CC6600]"
                    >
                      <Link href={item.href}></Link>
                    </Button>
                  ) : (
                    <>
                      {!isAuthenticated ? (
                        <Button
                          isDisabled={isPageLogin}
                          className="self-end text-[#CC6600] rounded-2xl bg-white p-6 border-2 border-[#CC6600]"
                        >
                          <Link href={item.href}>{item.name}</Link>
                        </Button>
                      ) : (
                        <Button className="self-end text-[#CC6600] rounded-2xl bg-white p-6 border-2 border-[#CC6600]">
                          <Link href={"/dashboard"}>Dashboard</Link>
                        </Button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Link className="w-full" href={item.href} size="lg">
                  {item.name}
                </Link>
              )}
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* menu burger */}
        <NavbarContent className=" sm:hidden" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="filter invert sm:hidden"
          />
          <NavbarMenu className="pt-10">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={index}>
                <Link className="text-black" href={item.href}>
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
};

