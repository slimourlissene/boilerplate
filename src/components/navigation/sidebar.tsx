"use client";

import { User } from "next-auth";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import { SidebarItem } from "@/types/interfaces";
import { computeGeneralItems } from "@/utils/navigation/computeSidebar";
import SidebarGroups from "./sidebarGroup";

export default function AppSidebar({
  user,
  ...props
}: { user: User | undefined } & React.ComponentProps<typeof Sidebar>) {
  const generalItems: SidebarItem[] = computeGeneralItems({ user });

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <SidebarGroups title="Général" items={generalItems} />
      </SidebarContent>
    </Sidebar>
  );
}
