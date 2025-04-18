"use client";

import { AvatarMenu } from "@/components/header-menu/avatar-menu";
import { MobileMenu } from "@/components/header-menu/mobile-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/editor/ui/Icon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import Loading from "@/components/loading/loading";

export default function RightSection() {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {user ? (
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-5">
          <div className="lg:pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/draft");
              }}
              size={"sm"}
              className="mr-2 hidden text-black lg:flex"
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
      <MobileMenu />
    </>
  );
}
