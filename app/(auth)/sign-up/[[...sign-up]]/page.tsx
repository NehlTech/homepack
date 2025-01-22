"use client";

import { useTheme } from "@/hooks/theme-provider";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SignUpPage = () => {
  const { theme } = useTheme();

  return (
    <SignUp
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          formButtonPrimary: "py-2.5",
          formFieldInput: "py-3",
        },
      }}
    />
  );
};
export default SignUpPage;
