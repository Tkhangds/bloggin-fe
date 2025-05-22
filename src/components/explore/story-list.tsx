import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot } from "lucide-react";

const stories = [
  {
    id: "1",
    title: "The Lost Art of Traditional Craftsmanship",
    excerpt: "How ancient techniques are being preserved in the modern world",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 15",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Music Festivals: The Cultural Phenomenon",
    excerpt: "Exploring the impact of music festivals on society and culture",
    author: {
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 12",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "The Evolution of Street Art",
    excerpt: "From vandalism to respected art form: the journey of street art",
    author: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 10",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    title: "Food as Cultural Identity",
    excerpt: "How culinary traditions shape and reflect cultural values",
    author: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 8",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "5",
    title: "Food as Cultural Identity",
    excerpt: "How culinary traditions shape and reflect cultural values",
    author: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 8",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "6",
    title: "Food as Cultural Identity",
    excerpt: "How culinary traditions shape and reflect cultural values",
    author: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 8",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "7",
    title: "Food as Cultural Identity",
    excerpt: "How culinary traditions shape and reflect cultural values",
    author: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 8",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
  },
];

export function StoryList() {
  const firstTwoStories = stories.slice(0, 2);
  const restOfStories = stories.slice(2);
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Recommended stories</h2>
      {/* first two stories */}
      <div className="mb-10 grid gap-10 sm:mb-20 md:grid-cols-2">
        {firstTwoStories.map((story) => (
          <StoryCard
            key={story.id}
            id={story.id}
            title={story.title}
            excerpt={story.excerpt}
            authorAvatar={story.author.avatar}
            authorName={story.author.name}
            date={story.date}
          ></StoryCard>
        ))}
      </div>

      {/* rest of the stories */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {restOfStories.map((story) => (
          <StoryCard
            key={story.id}
            id={story.id}
            title={story.title}
            excerpt={story.excerpt}
            authorAvatar={story.author.avatar}
            authorName={story.author.name}
            date={story.date}
          ></StoryCard>
        ))}
      </div>
    </div>
  );
}

const StoryCard = ({
  id,
  title,
  excerpt,
  authorAvatar,
  authorName,
  date,
}: {
  id: string;
  title: string;
  excerpt: string;
  authorAvatar: string;
  authorName: string;
  date: string;
}) => {
  return (
    <div className="group">
      <Link href={`/story/${id}`} className="lg:grid-row-2 grid gap-4">
        {/* image */}
        <div className="overflow-hidden rounded-lg">
          <Image
            src="https://placehold.co/600x400/png"
            alt={title}
            width={600}
            height={400}
            className="aspect-video h-full w-full object-cover"
          />
        </div>
        {/* author */}
        <div className="flex items-center text-sm">
          <Avatar className="mr-3 h-8 w-8">
            <AvatarImage
              src={authorAvatar || "/placeholder.svg"}
              alt={authorName}
            />
            <AvatarFallback>{authorName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center text-sm">
            <span className="font-medium">{authorName}</span>
            <Dot></Dot>
            <div className="text-gray-500">
              <span>{date}</span>
            </div>
          </div>
        </div>

        {/* title and excerpt */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="mb-2 text-xl font-bold leading-tight group-hover:text-gray-700">
              {title}
            </h3>
            <p className="text-gray-600">{excerpt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
