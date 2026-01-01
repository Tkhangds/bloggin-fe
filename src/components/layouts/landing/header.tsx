import Image from "next/image";
import Link from "next/link";
import RightSection from "./right-section";
import { SearchBar } from "@/components/search/search-bar";
import { Suspense } from "react";

export const Header = ({
  showSearchBar = true,
}: {
  showSearchBar?: boolean;
}) => {
  return (
    <div className="sflex sticky top-0 z-50 w-full flex-col border-b-[1px] border-foreground/25 bg-background px-7 py-1 sm:px-6 lg:px-20 lg:py-[10px]">
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

          {/* Searchbar */}
          <div className="hidden md:block">
            <Suspense>
              <SearchBar showSearchBar={showSearchBar} />
            </Suspense>
          </div>
        </div>
        <RightSection />
      </div>
    </div>
  );
};
