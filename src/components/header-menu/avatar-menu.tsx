"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Moon,
  Sun,
  User,
  FileText,
  Heart,
  BadgeHelp,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuthProvider } from "@/context/AuthContext";

export function AvatarMenu({}) {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const { user, logout } = useAuthProvider();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    await logout();
  };

  // Get initials from name
  function initials(str: string): string {
    return str
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }

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
            <AvatarImage src={"/typescript.svg"} alt={user.username} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials(user.username)}
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
          <DropdownMenuItem onClick={() => router.push("/setting/favorites")}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Favorite</span>
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
