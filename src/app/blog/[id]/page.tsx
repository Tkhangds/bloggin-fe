"use client";

import {
  Heart,
  MessageCircle,
  Play,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Reply,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/editor/ui/Textarea";
import { usePost } from "@/hooks/apis/usePost";
import { useParams } from "next/navigation";
import { formatDate } from "@/utils/date-convert";
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "@tiptap/core";
import ExtensionKit from "@/extensions/extension-kit";
import { AnyExtension } from "@tiptap/react";

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

const json: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        id: "a13a39e2-264a-47d1-a67b-e39f89e53477",
        "data-toc-id": "43a4e6de-660c-41f7-8026-c6c5c7527ecd",
        textAlign: "left",
        level: 1,
      },
      content: [
        { type: "emoji", attrs: { name: "fire" } },
        { type: "text", text: " Welcome to Bloggin" },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "4c25996d-9258-4bbb-82e2-20f3165e851a",
        class: null,
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Welcome to Bloggin – our React Block Editor built on top of ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null,
              },
            },
          ],
          text: "Tiptap",
        },
        { type: "text", text: ", " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://nextjs.org/",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null,
              },
            },
          ],
          text: "Next.js",
        },
        { type: "text", text: " and " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tailwindcss.com/",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null,
              },
            },
          ],
          text: "Tailwind",
        },
        {
          type: "text",
          text: ". This project serves as a great starting point for a great content creation experience.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "123c0fa4-adf5-4452-a03c-fe4e67755cd1",
        class: null,
        textAlign: "left",
      },
      content: [{ type: "text", text: "This editor includes features like:" }],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "be515a3f-db48-443a-88fd-7a4ed79d0413",
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A DragHandle including a DragHandle menu",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "44bed70e-3e02-47d0-ab54-5e7d61b77a6c",
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A Slash menu that can be triggered via typing a ",
                },
                { type: "text", marks: [{ type: "code" }], text: "/" },
                {
                  type: "text",
                  text: " into an empty paragraph or by using the ",
                },
                { type: "text", marks: [{ type: "bold" }], text: "+ Button" },
                { type: "text", text: " next to the drag handle" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "f7b9ca32-2f04-4c2d-b424-081b6ea36e81",
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A TextFormatting menu that allows you to change the ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontSize: "18px",
                        fontFamily: null,
                        color: null,
                      },
                    },
                  ],
                  text: "font size",
                },
                { type: "text", text: ", " },
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "font weight",
                },
                { type: "text", text: ", " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontSize: null,
                        fontFamily: "Georgia",
                        color: null,
                      },
                    },
                  ],
                  text: "font family",
                },
                { type: "text", text: ", " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontSize: null,
                        fontFamily: null,
                        color: "#b91c1c",
                      },
                    },
                  ],
                  text: "color",
                },
                { type: "text", text: ", " },
                {
                  type: "text",
                  marks: [{ type: "highlight", attrs: { color: "#7e7922" } }],
                  text: "highlight",
                },
                { type: "text", text: " and more" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "c322ea95-c367-4ab6-ac08-5355150c9781",
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A Table of Contents that can be viewed via ",
                },
                { type: "text", marks: [{ type: "code" }], text: "clicking" },
                { type: "text", text: " on the button on the top left corner" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        id: "33bf07f5-397e-4456-9fa3-93c051ba1b26",
        language: "javascript",
      },
      content: [{ type: "text", text: "La Khang Do" }],
    },
  ],
};

export default function BlogReadingPage() {
  const { useGetPostById } = usePost();
  const params = useParams<{ id: string }>();

  const { data, isPending } = useGetPostById(params.id);

  const html = generateHTML(
    json,
    [...ExtensionKit({})].filter((e): e is AnyExtension => e !== undefined),
  );

  const [content, setContent] = useState<string>(html);

  useEffect(() => {
    if (data) {
      setContent(
        generateHTML(
          JSON.parse(data.content),
          [...ExtensionKit({})].filter(
            (e): e is AnyExtension => e !== undefined,
          ),
        ),
      );
    }
  }, [data]);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (!data || isPending) {
    return <h1>No posts found</h1>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Article Title */}
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        {data?.title || "Article Title"}
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
            <span>
              {data?.createdAt ? formatDate(data.createdAt) : "Nov 15, 2024"}
            </span>
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
            <Play className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {/*Featured Image*/}
      {/* <div className="mb-8">
        <Image
          src="https://placehold.co/800x450/png"
          alt="Code snippet showing React code"
          width={800}
          height={450}
          className="w-full rounded-lg object-cover"
        />
      </div> */}
      {/* Article Content */}
      {/* <div className="prose prose-lg max-w-none">
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
      </div> */}
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
