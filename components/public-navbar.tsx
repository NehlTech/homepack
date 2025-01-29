import Link from "next/link";
import { LogoLink } from "./sidebar";
import { ThemeSwitcher } from "./theme-switcher";
import { NavbarMenu } from "./navbarMenu";

export const PublicNavbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-[url('/background.avif')] bg-cover bg-center shadow-md dark:bg-gray-900/40 dark:bg-none backdrop-blur-sm">
      <div className="w-full flex items-center justify-center">
        <div className="max-w-6xl w-full px-6 py-3 flex items-center justify-between">
          <LogoLink />

          {/* <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link
              href={"/about"}
              className="text-gray-900 dark:text-gray-100 transition-colors"
            >
              About
            </Link>
            <Link
              href={"/features"}
              className="text-gray-900 dark:text-gray-100 transition-colors"
            >
              Features
            </Link>
            <Link
              href={"/contact"}
              className="text-gray-900 dark:text-gray-100 transition-colors"
            >
              Contact
            </Link>
            <Link
              href={"/login"}
              className="text-gray-900 dark:text-gray-100 transition-colors"
            >
              Login
            </Link>
          </div> */}
          <NavbarMenu />

          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
