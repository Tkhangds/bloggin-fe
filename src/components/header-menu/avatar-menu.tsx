"use client";

import {
  BadgeHelp,
  FileText,
  Gem,
  LogOut,
  MailCheck,
  Moon,
  NotepadTextDashed,
  Settings,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import { RoleEnum } from "@/enums/role.enum";

export function AvatarMenu({}) {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const { user, logout } = useAuthContext();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    await logout();
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
          <div className="flex flex-col space-y-1 text-end">
            <div className="flex items-center justify-end">
              <p className="text-sm font-medium leading-none">
                {user.displayName}
              </p>
              {user.role === RoleEnum.PRO_USER && <Gem className="max-h-4" />}

              {user.role === RoleEnum.ADMIN && <Shield className="max-h-4" />}
            </div>

            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
          <Button
            variant="ghost"
            className="relative hidden h-10 w-10 rounded-full lg:flex"
          >
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage
                src={
                  user.avatarUrl ??
                  `https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`
                }
                alt={user.username}
              />
              <AvatarFallback className="bg-primary/10 text-primary">
                {`https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="modal-open w-56" align="end" forceMount>
        <DropdownMenuGroup>
          {!user.isVerified && user.role !== RoleEnum.ADMIN && (
            <div className="relative">
              <div className="absolute right-0 z-50 aspect-square size-3 animate-ping rounded-full bg-red-300"></div>
              <div className="absolute right-0 z-50 aspect-square size-3 rounded-full bg-red-400"></div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/setting/profile")}
              >
                <MailCheck className="mr-2 h-4 w-4" />
                <span className="font-semibold">Verify Account Now!</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          )}

          {user.isVerified && user.role === RoleEnum.USER && (
            <div className="relative">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/plans")}
              >
                <Gem className="mr-2 max-h-4" />
                <span className="font-semibold">Upgrade to Pro</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          )}

          {user.role === RoleEnum.ADMIN && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push("/admin/dashboard")}
            >
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/profile/${user.id}`)}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/setting/profile`)}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/setting/posts")}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Your Blog</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/setting/drafts")}
          >
            <NotepadTextDashed className="mr-2 h-4 w-4" />
            <span>Your Draft</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="mr-2 h-4 w-4" />
            ) : (
              <Sun className="mr-2 h-4 w-4" />
            )}
            <span>
              {theme === "light" ? "Dark Mode (wip)" : "Light Mode (wip)"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/")}
          >
            <BadgeHelp className="mr-2 h-4 w-4" />
            <span>About Us</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
