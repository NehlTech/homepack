"use client";

import { useTheme } from "@/hooks/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"ghost"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" && <Sun className="h-4 w-4" />}
      {theme === "dark" && <Moon className="h-4 w-4" />}
      <span className="capitalize">{theme}</span>
    </Button>
  );
}
