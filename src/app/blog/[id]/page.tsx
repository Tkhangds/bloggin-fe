"use client";

import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Play,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Reply,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Textarea } from "@/components/editor/ui/Textarea";

interface CommentType {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

interface CommentProps {
  comment: CommentType;
}

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

      {/* Comment Section */}
      <div className="mt-12">
        <Separator className="my-8" />
        <h3 className="mb-6 text-2xl font-bold">Comments (3)</h3>

        {/* Comment Form */}
        <CommentForm />

        {/* Comments List */}
        <CommentsList />
      </div>
    </div>
  );
}

function CommentForm(): JSX.Element {
  const [commentText, setCommentText] = useState<string>("");

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = (): void => {
    // Handle comment submission logic here
    console.log("Submitting comment:", commentText);
    setCommentText("");
  };

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="Your avatar"
          />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <span className="font-medium">Add a comment</span>
      </div>
      <Textarea
        placeholder="Share your thoughts..."
        className="mb-3 min-h-24"
        value={commentText}
        onChange={handleCommentChange}
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmitComment}>Post Comment</Button>
      </div>
    </div>
  );
}

function CommentsList(): JSX.Element {
  // Sample comments data
  const comments: CommentType[] = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "This is such a great article! I've been struggling with useEffect cleanup for months, and this finally cleared things up for me.",
      date: "2 days ago",
      likes: 24,
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Point #5 blew my mind. I've been telling everyone that the virtual DOM is what makes React fast. Time to update my understanding!",
      date: "3 days ago",
      likes: 17,
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I'd add another point about the importance of key props when rendering lists. So many junior devs miss this and wonder why they get strange bugs.",
      date: "4 days ago",
      likes: 32,
    },
  ];

  return (
    <div className="space-y-8">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function Comment({ comment }: CommentProps): JSX.Element {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(comment.likes);

  const handleLike = (): void => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
      if (disliked) {
        setDisliked(false);
      }
    }
  };

  const handleDislike = (): void => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {/* Comment Header */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.avatar} alt={comment.author} />
            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{comment.author}</div>
            <div className="text-sm text-gray-500">{comment.date}</div>
          </div>
        </div>

        {/* Comment Content */}
        <p className="pl-13 text-gray-800">{comment.content}</p>

        {/* Comment Actions */}
        <div className="pl-13 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 ${liked ? "text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={handleLike}
          >
            <ThumbsUp className="mr-1 h-4 w-4" />
            <span>{likesCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 ${disliked ? "text-red-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={handleDislike}
          >
            <ThumbsDown className="mr-1 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <Reply className="mr-1 h-4 w-4" />
            <span>Reply</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
