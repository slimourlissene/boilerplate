import { SidebarItem } from "@/types/interfaces";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Key } from "react";
import Link from "next/link";

export default function SidebarGroups({
  title,
  items,
}: {
  title: string;
  items: SidebarItem[];
}) {
  return (
    <SidebarGroup title={title}>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: SidebarItem, key: Key) => (
          <SidebarMenuItem key={key}>
            {item.url ? (
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  {item.icon}
                  <span> {item.title} </span>
                </Link>
              </SidebarMenuButton>
            ) : (
              item.component
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
