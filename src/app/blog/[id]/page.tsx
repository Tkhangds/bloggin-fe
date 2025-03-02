import Image from "next/image";
import { Heart, MessageCircle, Bookmark, Play, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function BlogReadingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Article Title */}
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        Things only senior React engineers know
      </h1>

      {/* Author Info */}
      <div className="mb-8 flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-1">
            <span className="font-medium">John Doe</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 font-medium text-green-600"
            >
              Follow
            </Button>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>3 min read</span>
            <span className="mx-1">·</span>
            <span>Nov 15, 2024</span>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Heart className="mr-1 h-5 w-5" />
              <span>506</span>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <MessageCircle className="mr-1 h-5 w-5" />
              <span>10</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Play className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-8">
        <Image
          src="https://placehold.co/800x450/png"
          alt="Code snippet showing React code"
          width={800}
          height={450}
          className="w-full rounded-lg object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <p className="mb-8 text-xl leading-relaxed">
          React can be tricky for beginners. However, understanding a few
          underlying principles or tricks can make becoming a senior React
          engineer easier.
        </p>

        <h2 className="mb-4 mt-10 text-2xl font-bold">
          1. The useEffect clean-up callback executes on every render
        </h2>

        <p className="mb-6">
          Most people think it executes only when the component unmounts, but it
          actually runs before every effect execution and when the component
          unmounts. This is crucial for preventing memory leaks and unexpected
          behavior.
        </p>

        <h2 className="mb-4 mt-10 text-2xl font-bold">
          2. React.memo doesn't always prevent re-renders
        </h2>

        <p className="mb-6">
          While React.memo can help optimize performance by memoizing
          components, it only performs a shallow comparison of props. If you
          pass objects or functions that are recreated on each render, your
          component will still re-render.
        </p>

        <h2 className="mb-4 mt-10 text-2xl font-bold">
          3. The useState setter function is stable
        </h2>

        <p className="mb-6">
          The setter function returned by useState maintains the same reference
          across renders. This means you don't need to include it in useEffect
          dependency arrays, which is a common mistake that leads to infinite
          loops.
        </p>

        <h2 className="mb-4 mt-10 text-2xl font-bold">
          4. Event handlers are recreated on every render
        </h2>

        <p className="mb-6">
          When you define an event handler inside a component, a new function is
          created on every render. This can lead to unnecessary re-renders in
          child components. Using useCallback can help maintain a stable
          reference.
        </p>

        <h2 className="mb-4 mt-10 text-2xl font-bold">
          5. The virtual DOM isn't what makes React fast
        </h2>

        <p className="mb-6">
          Contrary to popular belief, the virtual DOM itself doesn't make React
          fast. What makes React efficient is its reconciliation algorithm and
          the ability to batch updates. The virtual DOM is just an
          implementation detail.
        </p>
      </div>
    </div>
  );
}
