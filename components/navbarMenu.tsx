"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const linkClasses = (path: string) =>
    `block px-4 py-2 ${
      pathname === path
        ? "text-primaryColor font-semibold"
        : "hover:text-primaryColor"
    }`;

  return (
    <div className="flex items-center">
      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden p-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 rounded"
        onClick={toggleMenu}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      {/* Menu Links */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-12 left-0 w-full bg-white md:bg-transparent dark:bg-gray-900 md:static md:flex md:items-center md:gap-4`}
      >
        <Link href="/about" className={linkClasses("/about")}>
          About
        </Link>
        <Link href="/features" className={linkClasses("/features")}>
          Features
        </Link>
        <Link href="/contact" className={linkClasses("/contact")}>
          Contact
        </Link>
        <Link href="/login" className={linkClasses("/login")}>
          Login
        </Link>
      </nav>
    </div>
  );
};
