"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AvatarMenu } from "@/components/header-menu/avatar-menu";
import { MobileMenu } from "@/components/header-menu/mobile-menu";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/editor/ui/Icon";

export const Header = () => {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="fixed z-50 mt-[-52px] flex w-full flex-col border-b-[1px] border-black/20 bg-white px-4 py-1 dark:bg-neutral-950 sm:px-6 lg:px-20 lg:py-[10px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/blog">
            <div className="w-24 overflow-hidden sm:w-32 lg:h-[40px] lg:w-[150px]">
              <Image
                width={120}
                height={240}
                src="/image/Blogging-ngang.svg"
                alt="logo"
                className="h-full w-full scale-150 object-cover transition-transform duration-300 dark:hidden"
              />
              <Image
                width={120}
                height={240}
                src="/image/Blogging-ngang-white.svg"
                alt="logo"
                className="hidden h-full w-full scale-150 object-cover transition-transform duration-300 dark:flex"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:justify-end lg:gap-1 lg:pt-2">
            <Button variant={"ghost"} className="font-semibold">
              Trending
            </Button>
            <Button variant={"ghost"} className="font-semibold">
              Category
            </Button>
          </div>
        </div>

        {user ? (
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-5">
            <div className="lg:pt-2">
              <Button
                onClick={() => {
                  router.push("/draft");
                }}
                size={"sm"}
                className="mr-2 hidden lg:flex"
              >
                Write
                <Icon name="Pen" />
              </Button>
            </div>
            <AvatarMenu />
          </div>
        ) : (
          <div className="hidden lg:flex lg:justify-end lg:gap-1">
            <Button variant="secondary" className="p-0 py-1 font-semibold">
              <Link
                className="flex h-full w-full items-center justify-center px-4 py-2 text-xs"
                href="/sign-up"
              >
                Sign Up
              </Link>
            </Button>
            <Button className="p-0 py-1 font-semibold">
              <Link
                className="flex h-full w-full items-center justify-center px-4 py-2 text-xs"
                href="/sign-in"
              >
                Log In
              </Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <MobileMenu
          user={{ name: "khang", email: "gunnyvippro111@gmail.com" }}
        />
      </div>
    </div>
  );
};
