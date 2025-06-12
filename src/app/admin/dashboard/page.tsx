"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
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
import { useStatistics } from "@/hooks/apis/useStatistics";
import { useTag } from "@/hooks/apis/useTag";
import { useUser } from "@/hooks/apis/useUser";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import _, { over } from "lodash";
import {
  Calendar,
  FileText,
  Heart,
  MessageCircle,
  MousePointer2,
  Tag,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminDashboardPage() {
  const {
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
  } = usePost().useGetAllPosts(5);
  const { data: overallStats } = useStatistics().useGetOverallStatistics();
  console.log("Overall Stats", overallStats);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleNextPageChange = async () => {
    await fetchNextPage();
    if (!isFetchingNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPageChange = async () => {
    await fetchPreviousPage();
    if (!isFetchingPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const paginatedPosts = posts?.pages[currentPage].data;
  const hasNext = posts?.pages[currentPage].meta.nextPage !== null;
  const hasPrevious = posts?.pages[currentPage].meta.prevPage !== null;
  const totalPage = posts?.pages[currentPage].meta.totalPages || 0;

  const stats = [
    {
      title: "Total Posts",
      value: posts?.pages[0].meta.total,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Total Users",
      value: overallStats?.usersCount || "N/A",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Topics",
      value: overallStats?.tagsCount || "N/A",
      icon: Tag,
      color: "text-purple-600",
    },
    {
      title: "Total Interactions",
      value: overallStats?.interactionCount || "N/A",
      icon: MousePointer2,
      color: "text-orange-600",
    },
  ];

  return (
    <main className="flex w-full p-8">
      <div className="w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-primary">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's been happening.
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
          <AdminTable posts={paginatedPosts}></AdminTable>
          <Pagination>
            <PaginationContent>
              {/* prev button */}
              {hasPrevious && (
                <PaginationItem onClick={handlePrevPageChange}>
                  <PaginationPrevious className="cursor-pointer" />
                </PaginationItem>
              )}

              {/* items */}
              <PaginationItem>
                {currentPage + 1}{" "}
                <span className="text-muted-foreground">of</span> {totalPage}
              </PaginationItem>

              {/* next button */}
              {hasNext && (
                <PaginationItem onClick={handleNextPageChange}>
                  <PaginationNext className="cursor-pointer" />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </section>
      </div>
    </main>
  );
}

const AdminTable = ({ posts }: { posts?: Post[] }) => {
  const router = useRouter();
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
          {posts &&
            posts.map((post) => (
              <TableRow
                key={post.id}
                className="border-muted hover:bg-muted/50"
              >
                <TableCell
                  className="group cursor-pointer py-4"
                  onClick={() => {
                    router.push(`/blog/${post.id}`);
                  }}
                >
                  <div>
                    <h3 className="mb-1 line-clamp-1 font-medium text-primary group-hover:underline group-hover:underline-offset-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="group cursor-pointer py-4"
                  onClick={() => {
                    router.push(`/profile/${post.authorId}`);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback className="text-xs">
                        {post.author.displayName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900 group-hover:underline group-hover:underline-offset-2">
                      {post.author.displayName}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Heart className="mr-1 h-3 w-3" />
                    <span>{post.likeCount}</span>
                  </div>
                </TableCell>

                <TableCell className="py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageCircle className="mr-1 h-3 w-3" />
                    <span>{post.commentCount}</span>
                  </div>
                </TableCell>

                <TableCell className="py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDateFromISOString(post.createdAt)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
