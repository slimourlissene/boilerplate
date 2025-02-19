import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { SidebarMenuButton } from "../ui/sidebar";

export default function LogoutButton() {
  return (
    <SidebarMenuButton
      onClick={() =>
        signOut({
          redirectTo: "/?logout=true",
        })
      }
    >
      <LogOut />
      <span> Se déconnecter </span>
    </SidebarMenuButton>
  );
}
