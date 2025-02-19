import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDialogStore } from "@/store/dialogStore";
import { KeyRound } from "lucide-react";
import { Separator } from "../ui/separator";
import { SidebarMenuButton } from "../ui/sidebar";
import LoginForm from "./loginForm";
import MagicLinkForm from "./magicLinkForm";
import RegisterForm from "./registerForm";

export default function AuthForm() {
  const { open, setOpen } = useDialogStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <KeyRound />
          <span>S'authentifier</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <Tabs className="mt-3" defaultValue="login">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="login">Se connecter</TabsTrigger>
            <TabsTrigger value="register">S'inscrire</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <MagicLinkForm />
            <div className="flex items-center gap-4 my-5">
              <Separator className="flex-1" />
              <span className="text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
