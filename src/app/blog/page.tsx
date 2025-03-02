"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import BlogCard from "@/components/blog/blog-card";
import { LandingHeaderLayout } from "@/components/layouts/landing-header";

export default function BlogBrowsing() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  const loadMorePosts = () => {
    setLoading(true);
    // Simulate loading more posts
    setTimeout(() => {
      setPosts((prevPosts) => [...prevPosts, ...morePosts]);
      setLoading(false);
    }, 1500);
  };

  return (
    <LandingHeaderLayout>
      <div className="flex min-h-screen flex-col bg-white px-4 text-gray-900 sm:px-6 lg:px-20">
        {/* Main Content */}
        <main className="container flex flex-1 flex-col gap-8 py-6 md:flex-row md:py-8">
          {/* Blog Posts */}
          <div className="flex-1">
            <h1 className="mb-6 text-2xl font-bold">For You</h1>

            <div className="grid grid-cols-1 gap-8">
              {posts.map((post, index) => (
                <BlogCard key={index} post={post} index={index}></BlogCard>
              ))}

              {/* Loader for infinite scroll */}
              <div ref={loaderRef} className="flex justify-center py-4">
                {loading && (
                  <div className="flex items-center justify-center space-x-2">
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full space-y-8 md:sticky md:top-20 md:w-80 md:self-start lg:w-96">
            {/* Trending Topics */}
            <div className="rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-lg font-bold">Trending Topics</h2>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <Link
                    href="#"
                    key={index}
                    className="group flex items-center gap-3"
                  >
                    <span className="text-sm font-medium text-gray-400">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-medium transition-colors group-hover:text-gray-700">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {topic.reads} readers
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended Writers */}
            <div className="rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-lg font-bold">Recommended Writers</h2>
              <div className="space-y-4">
                {recommendedWriters.map((writer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={writer.avatar} alt={writer.name} />
                        <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{writer.name}</h3>
                        <p className="text-sm text-gray-500">{writer.bio}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-full"
                    >
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics to Follow */}
            <div className="rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-lg font-bold">Topics to Follow</h2>
              <div className="flex flex-wrap gap-2">
                {topicsToFollow.map((topic, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer bg-white px-3 py-1 hover:bg-gray-100"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
              <Button
                variant="ghost"
                className="mt-4 w-full text-gray-500 hover:text-gray-700"
              >
                See More Topics
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </aside>
        </main>
      </div>
    </LandingHeaderLayout>
  );
}

// Sample Data
const initialPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: What to Expect in 2025",
    excerpt:
      "As we approach 2025, the landscape of web development continues to evolve at a rapid pace. New frameworks, tools, and methodologies are emerging that promise to revolutionize how we build for the web. In this article, we'll explore the most significant trends that are shaping the future of web development.",
    author: {
      name: "Alex Johnson",
      avatar: "https://placehold.co/40/png",
    },
    date: "Mar 1, 2025",
    readTime: 8,
    image: "https://placehold.co/600x400/png",
    tags: ["Web Development", "Technology", "Future"],
    likes: 243,
    comments: 42,
  },
  {
    id: "2",
    title: "Mastering Productivity: 7 Techniques That Actually Work",
    excerpt:
      "In a world full of distractions, maintaining productivity can be challenging. This article breaks down seven science-backed techniques that can help you reclaim your time and focus. From time-blocking to the two-minute rule, these strategies have been proven to boost efficiency.",
    author: {
      name: "Sarah Chen",
      avatar: "https://placehold.co/40/png",
    },
    date: "Feb 28, 2025",
    readTime: 6,
    image: "https://placehold.co/600x400/png",
    tags: ["Productivity", "Self Improvement", "Work"],
    likes: 189,
    comments: 31,
  },
  {
    id: "3",
    title: "The Hidden Psychology Behind Successful Marketing Campaigns",
    excerpt:
      "What makes some marketing campaigns go viral while others fall flat? This deep dive explores the psychological principles that underpin the most successful marketing strategies of the past decade. Learn how top brands leverage human psychology to create memorable and effective campaigns.",
    author: {
      name: "Michael Torres",
      avatar: "https://placehold.co/40/png",
    },
    date: "Feb 26, 2025",
    readTime: 10,
    image: "https://placehold.co/600x400/png",
    tags: ["Marketing", "Psychology", "Business"],
    likes: 312,
    comments: 57,
  },
  {
    id: "4",
    title: "Sustainable Living: Small Changes with Big Impact",
    excerpt:
      "Living sustainably doesn't have to mean overhauling your entire lifestyle overnight. This practical guide focuses on small, manageable changes that collectively make a significant environmental impact. From reducing food waste to smarter shopping habits, these tips are both eco-friendly and budget-conscious.",
    author: {
      name: "Emma Wilson",
      avatar: "https://placehold.co/40/png",
    },
    date: "Feb 24, 2025",
    readTime: 7,
    tags: ["Sustainability", "Lifestyle", "Environment"],
    likes: 276,
    comments: 48,
  },
];

const morePosts: BlogPost[] = [
  {
    id: "5",
    title: "The Art of Mindful Leadership in Fast-Paced Organizations",
    excerpt:
      "In today's high-speed business environment, mindful leadership has emerged as a powerful approach to managing teams and driving results. This article explores how incorporating mindfulness practices can transform leadership effectiveness and create more resilient, innovative organizations.",
    author: {
      name: "David Park",
      avatar: "https://placehold.co/40/png",
    },
    date: "Feb 22, 2025",
    readTime: 9,
    image: "https://placehold.co/600x400/png",
    tags: ["Leadership", "Mindfulness", "Business"],
    likes: 198,
    comments: 36,
  },
  {
    id: "6",
    title: "Decoding the Latest Advances in Artificial Intelligence",
    excerpt:
      "Artificial intelligence continues to evolve at a breathtaking pace. This comprehensive overview breaks down the most significant recent developments in AI research and applications, explaining complex concepts in accessible terms for non-technical readers.",
    author: {
      name: "Priya Sharma",
      avatar: "https://placehold.co/40/png",
    },
    date: "Feb 20, 2025",
    readTime: 11,
    image: "https://placehold.co/600x400/png",
    tags: ["Artificial Intelligence", "Technology", "Future"],
    likes: 327,
    comments: 63,
  },
];

const trendingTopics = [
  { title: "The Rise of AI in Creative Industries", reads: "12.5K" },
  { title: "Sustainable Finance: Investing for the Future", reads: "8.3K" },
  { title: "Remote Work Culture: Lessons from 2024", reads: "7.1K" },
  { title: "Digital Privacy in the Age of Big Data", reads: "6.8K" },
  { title: "The Science of Habit Formation", reads: "5.4K" },
];

const recommendedWriters = [
  {
    name: "Jamie Rodriguez",
    bio: "Tech journalist & AI researcher",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Nora Kim",
    bio: "Bestselling author on productivity",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Marcus Lee",
    bio: "Climate scientist & educator",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const topicsToFollow = [
  "Technology",
  "Startups",
  "Self Improvement",
  "Writing",
  "Relationships",
  "Machine Learning",
  "Productivity",
  "Politics",
  "Health",
];
