"use client";

import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Link href="/dashboard">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <p className="text-3xl font-bold text-sky-700">Mizou</p>
        </div>
      </Link>
      <div className="flex flex-col gap-12 mt-[-20px]">
        {navLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className={`flex gap-4 text-body-medium hover:text-sky-600 ${
              pathname === link.url ? "text-blue-1 font-bold" : ""
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-body-medium items-center hover:text-sky-600 cursor-pointer">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
