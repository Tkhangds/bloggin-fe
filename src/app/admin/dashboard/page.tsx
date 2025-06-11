"use client";
import CommentPagination from "@/components/blog/detail/comment/comment-pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePost } from "@/hooks/apis/usePost";
import {
  Calendar,
  FileText,
  Heart,
  MessageCircle,
  MousePointer2,
  Tag,
  Users,
} from "lucide-react";

const posts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    author: "Sarah Chen",
    status: "published",
    views: "12.4K",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Technology",
  },
  {
    id: 2,
    title: "Building Scalable React Applications: Best Practices",
    author: "Mike Johnson",
    status: "draft",
    views: "0",
    date: "2024-01-14",
    readTime: "12 min read",
    category: "Development",
  },
  {
    id: 3,
    title: "Design Systems: Creating Consistency Across Products",
    author: "Emma Wilson",
    status: "published",
    views: "8.7K",
    date: "2024-01-13",
    readTime: "6 min read",
    category: "Design",
  },
  {
    id: 4,
    title: "The Art of Technical Writing: A Complete Guide",
    author: "David Park",
    status: "published",
    views: "15.2K",
    date: "2024-01-12",
    readTime: "10 min read",
    category: "Writing",
  },
  {
    id: 5,
    title: "Understanding User Experience: Psychology Behind Design",
    author: "Lisa Rodriguez",
    status: "review",
    views: "0",
    date: "2024-01-11",
    readTime: "7 min read",
    category: "UX",
  },
];

export default function AdminDashboardPage() {
  const {
    data: posts,
    fetchNextPage,
    fetchPreviousPage,
  } = usePost().useGetAllPosts(1);

  console.log("posts: ", posts?.pages);

  const stats = [
    {
      title: "Total Posts",
      value: posts?.pages[0].meta.total,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Total Users",
      value: "1,234",
      change: "+8%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Topics",
      value: "45.2K",
      change: "+23%",
      icon: Tag,
      color: "text-purple-600",
    },
    {
      title: "Total Interactions",
      value: "68%",
      change: "+5%",
      icon: MousePointer2,
      color: "text-orange-600",
    },
  ];
  return (
    <main className="flex w-full p-8">
      <div className="w-2/3">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-primary">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening.
          </p>
        </div>

        {/* Stats Grid */}
        <h3 className="mb-2 text-2xl font-bold text-primary">Overall</h3>
        <div className="flex gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="w-full rounded-none border-0 border-r-2 shadow-none"
            >
              <CardContent className="p-0 py-3 pr-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`rounded-full bg-gray-50 p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* content tabs */}
        <h3 className="mb-2 mt-8 text-2xl font-bold text-primary">
          Recent posts
        </h3>
        <section className="">
          <AdminTable
            onNextPage={fetchNextPage}
            onPrevPage={fetchPreviousPage}
          ></AdminTable>
        </section>
      </div>
    </main>
  );
}

const AdminTable = ({
  onNextPage,
  onPrevPage,
}: {
  onNextPage: () => void;
  onPrevPage: () => void;
}) => {
  return (
    <div>
      <Table>
        {/* table headers */}
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className="font-medium text-primary">Title</TableHead>
            <TableHead className="font-medium text-primary">Author</TableHead>
            <TableHead className="font-medium text-primary">Likes</TableHead>
            <TableHead className="font-medium text-primary">Comments</TableHead>
            <TableHead className="font-medium text-primary">Date</TableHead>
          </TableRow>
        </TableHeader>

        {/* table body */}
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              className="cursor-pointer border-muted hover:bg-muted/50"
            >
              <TableCell className="py-4">
                <div>
                  <h3 className="mb-1 line-clamp-1 font-medium text-primary">
                    {post.title}
                  </h3>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="text-xs">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900">
                    {post.author}
                  </span>
                </div>
              </TableCell>

              <TableCell className="py-4">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Heart className="mr-1 h-3 w-3" />
                  <span>10</span>
                </div>
              </TableCell>

              <TableCell className="py-4">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <MessageCircle className="mr-1 h-3 w-3" />
                  <span>10</span>
                </div>
              </TableCell>

              <TableCell className="py-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" />
                  {post.date}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* pagination */}
      <Pagination>
        <PaginationContent>
          {/* prev button */}
          <PaginationItem onClick={onPrevPage}>
            <PaginationPrevious />
          </PaginationItem>

          {/* items */}
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>

          {/* elipsis */}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          {/* next button */}
          <PaginationItem onClick={onNextPage}>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
