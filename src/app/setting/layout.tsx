"use client";

import type React from "react";

import { FileText, NotepadTextDashed, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LandingHeaderLayout } from "@/components/layouts/landing-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <LandingHeaderLayout>
      <div className="container mx-auto px-4 py-8 xl:px-48">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Left Column - Navigation */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>
                  Manage your profile and content
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 xl:p-2">
                <div className="space-y-1">
                  <Button
                    variant={
                      pathname === "/setting/profile" ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/setting/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant={
                      pathname === "/setting/posts" ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/setting/posts">
                      <FileText className="mr-2 h-4 w-4" />
                      My Posts
                    </Link>
                  </Button>
                  <Button
                    variant={
                      pathname === "/setting/drafts" ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/setting/drafts">
                      <NotepadTextDashed className="mr-2 h-4 w-4" />
                      Draft
                    </Link>
                  </Button>
                  {/* <Button
                    variant={
                      pathname === "/setting/favorites" ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/setting/favorites">
                      <Heart className="mr-2 h-4 w-4" />
                      Favorites
                    </Link>
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </LandingHeaderLayout>
  );
}
