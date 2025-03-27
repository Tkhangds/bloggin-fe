"use client";

import {
  BadgeHelp,
  FileText,
  LogOut,
  Moon,
  NotepadTextDashed,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative hidden h-10 w-10 rounded-full lg:flex"
        >
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`}
              alt={user.username}
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {`https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/setting/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/setting/posts")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Your Blog</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/setting/drafts")}>
            <NotepadTextDashed className="mr-2 h-4 w-4" />
            <span>Your Draft</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="mr-2 h-4 w-4" />
            ) : (
              <Sun className="mr-2 h-4 w-4" />
            )}
            <span>
              {theme === "light" ? "Dark Mode (wip)" : "Light Mode (wip)"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/")}>
            <BadgeHelp className="mr-2 h-4 w-4" />
            <span>About Us</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
