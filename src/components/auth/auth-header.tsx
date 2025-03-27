import Image from "next/image";
import Link from "next/link";

export const AuthHeader = () => {
  return (
    <div className="absolute z-50 flex w-full flex-col border-b-[0.5px] border-black/5 bg-muted px-4 py-1 dark:bg-neutral-950 sm:px-6 lg:px-20 lg:py-[10px]">
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
        </div>
      </div>
    </div>
  );
};
