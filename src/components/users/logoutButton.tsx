import { LogOut } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <SidebarMenuButton onClick={() => signOut()}>
      <LogOut />
      <span> Se déconnecter </span>
    </SidebarMenuButton>
  );
}
