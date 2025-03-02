import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  return (
    <div className="fixed z-50 mt-[-52px] flex w-full flex-col border-b-[1px] border-black/20 bg-white px-4 py-1 sm:px-6 lg:px-20 lg:py-[10px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              width={120}
              height={240}
              src={`/image/Blogging-ngang.svg`}
              alt="logo"
              className="w-24 sm:w-32 lg:w-[150px]"
            />
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

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex lg:justify-end lg:gap-1">
          <Button variant={"secondary"} className="py-1 font-semibold">
            <Link className="text-xs" href="/sign-up">
              Sign Up
            </Link>
          </Button>
          <Button className="py-1 font-semibold">
            <Link className="text-xs" href="/sign-in">
              Log In
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
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
            <div className="flex flex-col gap-4 pt-8">
              <Button
                variant={"ghost"}
                className="w-full justify-start font-semibold"
              >
                Trending
              </Button>
              <Button
                variant={"ghost"}
                className="w-full justify-start font-semibold"
              >
                Category
              </Button>
              <Separator className="my-2" />
              <Button variant={"secondary"} className="w-full font-semibold">
              <Link  href="/sign-up">
              Sign Up
            </Link>
              </Button>
              <Button className="w-full font-semibold">
              <Link  href="/sign-in">
              Log In
            </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
