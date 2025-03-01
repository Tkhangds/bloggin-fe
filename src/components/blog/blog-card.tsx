import Image from "next/image";
import Link from "next/link";
import { Bookmark, MoreHorizontal } from "lucide-react";

export default function BlogCard() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      {/* Blog Post Card */}
      <div className="border-b py-3 sm:py-4">
        {/* Author Info */}
        <div className="mb-2 flex items-center">
          <div className="mr-2 h-5 w-5 rounded-sm bg-gray-900 sm:h-6 sm:w-6"></div>
          <span className="text-xs">
            In The Slow Life by{" "}
            <Link href="#" className="font-medium">
              Scott-Ryan Abt
            </Link>
          </span>
        </div>

        {/* Post Content */}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="order-2 flex-1 sm:order-1 sm:pr-4">
            <h2 className="mb-1 mt-3 text-lg font-bold sm:mt-0 sm:text-xl">
              Bye Bye, Spotify
            </h2>
            <p className="mb-3 text-sm text-gray-600">
              And see ya later, all you subscription services in my little
              empire
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:gap-3">
              <div className="flex items-center">
                <span className="mr-1.5 text-amber-500">★</span>
                <span>Aug 20, 2023</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">👁️</span>
                <span>25K</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">💬</span>
                <span>555</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="rounded-full p-0.5 hover:bg-gray-100">
                  <span className="sr-only">Dislike</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300">
                    <span className="text-gray-400">−</span>
                  </div>
                </button>
                <button className="p-0.5">
                  <span className="sr-only">Bookmark</span>
                  <Bookmark className="h-4 w-4 text-gray-400" />
                </button>
                <button className="p-0.5">
                  <span className="sr-only">More options</span>
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 h-32 w-full flex-shrink-0 sm:order-2 sm:w-32">
            <div className="relative h-full w-full overflow-hidden rounded-sm bg-gray-900">
              <Image
                src="https://placehold.co/400.png"
                alt="Spotify logo"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 128px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
