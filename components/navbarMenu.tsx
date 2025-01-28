"use client";

import React, { useState } from "react";
import Link from "next/link";

export const NavbarMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden p-2 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded"
        onClick={toggleMenu}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      {/* Menu Links */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-12 left-0 w-full bg-white dark:bg-gray-900 md:static md:block md:flex md:items-center md:gap-4`}
      >
        <Link href="/about" className="block px-4 py-2 hover:underline">
          About
        </Link>
        <Link href="/features" className="block px-4 py-2 hover:underline">
          Features
        </Link>
        <Link href="/contact" className="block px-4 py-2 hover:underline">
          Contact
        </Link>
        <Link href="/login" className="block px-4 py-2 hover:underline">
          Login
        </Link>
      </nav>
    </div>
  );
};
