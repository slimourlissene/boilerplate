import { ToggleTheme } from "@/components/navigation/toggleTheme";
import { SidebarItem } from "@/types/interfaces";
import { Home } from "lucide-react";
import { User } from "next-auth";

export function computeGeneralItems({
  user,
}: {
  user: User | undefined;
}): SidebarItem[] {
  return [
    {
      title: "Accueil",
      url: "/",
      icon: <Home />,
    },
    {
      component: <ToggleTheme />,
    },
  ];
}
