"use client";

import { useTheme } from "@/hooks/theme-provider";
import { SignIn, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { user } = useUser();
  const { theme } = useTheme();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata?.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <SignIn
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          formButtonPrimary: "py-2.5",
          formFieldInput: "py-3",
        },
      }}
    />
  );
}
