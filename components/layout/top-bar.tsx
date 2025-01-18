"use client";

import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();
  
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center bg-blue-2 px-8 py-4 b-blue-2 shadow-xl lg:hidden">
        <Link href="/dashboard">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <p className="text-3xl font-bold text-sky-700">Mizou</p>
          </div>
        </Link>
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className={`flex gap-4 text-body-medium hover:text-sky-600 ${pathname === link.url ? "text-blue-1 font-bold" : ""}`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="relative flex gap-4 text-body-medium items-center  cursor-pointer">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-blue-2 shadow-xl rounded-lg ">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className={`flex gap-4 text-body-medium hover:text-sky-600 ${pathname === link.url ? "text-blue-1" : ""}`}
              >
               {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};
