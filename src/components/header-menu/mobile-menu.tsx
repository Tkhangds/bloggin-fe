"use client";

import {
  Bell,
  BookOpen,
  Home,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  TrendingUpIcon as Trending,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthContext } from "@/context/AuthContext";

export function MobileMenu() {
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {/* User Profile Section */}
        {user && (
          <>
            <div className="flex items-center gap-4 py-6">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatarUrl} alt={user?.displayName} />
                <AvatarFallback>{"N/A"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.displayName}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 pt-4">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Home className="h-5 w-5" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Trending className="h-5 w-5" />
            Trending
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BookOpen className="h-5 w-5" />
            Category
          </Button>
        </div>
        <Separator className="my-4" />

        {user == null ? (
          <div className="flex flex-col gap-4">
            <Button variant={"secondary"} className="w-full font-semibold">
              <Link className="h-full w-full" href="/sign-up">
                Sign Up
              </Link>
            </Button>
            <Button className="w-full font-semibold">
              <Link className="h-full w-full" href="/sign-in">
                Log In
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* User Actions */}
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() => router.push(`/profile/${user?.id}`)}
                className="w-full justify-start gap-2"
              >
                <User className="h-5 w-5" />
                Profile
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push(`/setting/profile`)}
                className="w-full justify-start gap-2"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push(`/setting/posts`)}
                className="w-full justify-start gap-2"
              >
                <Bell className="h-5 w-5" />
                Your Blog
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push(`/setting/drafts`)}
                className="w-full justify-start gap-2"
              >
                <Bell className="h-5 w-5" />
                Your Draft
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </Button>
              <Button
                onClick={() => router.push(`/`)}
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <Bell className="h-5 w-5" />
                About Us
              </Button>
            </div>
            <Separator className="my-4" />

            {/* Logout Button */}
            <Button
              variant="destructive"
              className="w-full justify-start gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
