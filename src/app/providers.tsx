"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
