import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-col border-t-[1px] border-black/20 dark:border-neutral-700/20">
      <div className="flex flex-col px-4 py-6 lg:flex-row lg:items-start lg:gap-10 lg:px-20 lg:py-10 xl:px-48">
        <Image
          width={100}
          height={150}
          src={`/image/Blogging.svg`}
          alt="logo"
          className="mx-auto mb-6 scale-[3] dark:hidden lg:mx-0 lg:mb-0"
        />
        <Image
          width={100}
          height={150}
          src={`/image/Blogging-white.svg`}
          alt="logo"
          className="mx-auto mb-6 hidden scale-[3] dark:flex lg:mx-0 lg:mb-0"
        />

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-4">
          <div className="flex flex-1 flex-col">
            <span className="text-[20px] font-[600] text-neutral-800 underline underline-offset-2 dark:text-neutral-300">
              About Blogging
            </span>
            <div className="py-3">
              Blogging is more than just a platform—it&apos;s a thriving hub for
              sharing ideas, sparking conversations, and expanding knowledge.
              Designed with a clean, user-friendly interface, Blogging makes it
              effortless for writers to craft compelling stories and for readers
              to discover insightful content across diverse topics. Whether
              you&apos;re a seasoned blogger, an industry expert, or a curious
              reader, Blogging connects you with a global community passionate
              about learning and storytelling.
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <span className="text-[20px] font-[600] text-neutral-800 underline underline-offset-2 dark:text-neutral-300">
              Contact Us
            </span>
            <div className="flex flex-1 flex-col items-start justify-start gap-3 py-3">
              <ContactCard
                name="Trương Nguyễn Trung Khang"
                src={`/image/khang.jpg`}
                href="https://github.com/Tkhangds"
              />
              <ContactCard
                name="Nguyễn Thái Đăng Khoa"
                src={`/image/khoa.jpg`}
                href="https://github.com/NTDKhoa04"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <span className="text-[20px] font-[600] text-neutral-800 underline underline-offset-2 dark:text-neutral-300">
              Blogging Story
            </span>
            <div className="flex flex-1 flex-col items-start justify-start gap-3 py-3">
              <BlogCard
                src="/image/Blogging-ngang.svg"
                title="DevLog Day-1: What we need to do"
                href="/wip"
              />
              <BlogCard
                src="/image/Blogging-ngang.svg"
                title="DevLog Day-2: Task Distribution"
                href="/wip"
              />
              <BlogCard
                src="/image/Blogging-ngang.svg"
                title="DevLog Day-3: Setup Repository"
                href="/wip"
              />
              <div className="flex w-full justify-end">
                <Link href="/wip" className="text-primary-500">
                  <Button className="flex gap-1" variant={"link"}>
                    See more
                    <MoveRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  src,
  name,
  href,
}: {
  src: string;
  name: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-md p-2 transition hover:bg-neutral-500/20"
    >
      <Image
        width={50}
        height={50}
        className="aspect-square rounded-full"
        alt="author-logo"
        src={src || "/placeholder.svg"}
      />
      <div className="flex flex-col">
        <div className="font-semibold">{name}</div>
        <div className="text-sm">Blog Developer</div>
      </div>
    </Link>
  );
}

function BlogCard({
  src,
  title,
  href,
}: {
  src: string;
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-md px-2 py-4 transition hover:bg-neutral-500/20"
    >
      <Image
        width={120}
        height={50}
        alt="author-logo"
        className="rounded-md"
        src={src || "/placeholder.svg"}
      />
      <div className="flex flex-col">
        <div className="font-semibold">{title}</div>
        <div className="text-sm">13/2/2025</div>
      </div>
    </Link>
  );
}
