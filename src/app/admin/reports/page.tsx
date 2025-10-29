"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostMonitoringStatus } from "@/enums/post-monitoring-status.enum";
import { useAdmin } from "@/hooks/apis/useAdmin";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminReportsPage() {
  const { data: potentiallyViolatedPosts, isFetched: potentialFetched } =
    useAdmin().useGetPostByMonitoringStatus(
      PostMonitoringStatus.POTENTIAL_VIOLATION,
    );
  const { data: violatedPosts, isFetched: violatedFetched } =
    useAdmin().useGetPostByMonitoringStatus(PostMonitoringStatus.VIOLATED);

  const flagPostAction = useAdmin().useFlagPost();
  const unflagPostAction = useAdmin().useUnflagPost();

  const router = useRouter();

  const handleRouting = (url: string) => {
    router.push(url);
  };

  const handleFlagPost = async (postId: string) => {
    try {
      await flagPostAction.mutateAsync(postId);
    } catch (error) {
      console.log("Error flagging post:", error);
    }
  };

  const handleUnflagPost = async (postId: string) => {
    try {
      await unflagPostAction.mutateAsync(postId);
    } catch (error) {
      console.log("Error flagging post:", error);
    }
  };

  return (
    <main className="flex w-full flex-col gap-4 p-8">
      {/* Header */}
      <section>
        <h1 className="mb-2 text-3xl font-bold text-primary">Reports</h1>
        <p className="text-muted-foreground">
          See posts that potentially violated community guidelines
        </p>
      </section>

      {/* Potentially violated posts section */}
      <section>
        <h3 className="mb-2 mt-8 text-2xl font-bold text-primary">
          Potentially violated posts
        </h3>

        <Table>
          {/* table headers */}
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="font-medium text-primary">Title</TableHead>
              <TableHead className="font-medium text-primary">Author</TableHead>
              <TableHead className="font-medium text-primary">Date</TableHead>
            </TableRow>
          </TableHeader>

          {/* table body */}
          <TableBody>
            {potentialFetched && potentiallyViolatedPosts?.length === 0 && (
              <TableRow>
                <TableCell className="w-full py-3 text-center" colSpan={4}>
                  <span className="italic text-muted-foreground">
                    No potentially violated post found yet
                  </span>
                </TableCell>
              </TableRow>
            )}
            {potentialFetched &&
              potentiallyViolatedPosts?.length !== 0 &&
              potentiallyViolatedPosts?.map((post: Post) => {
                return (
                  <TableRow
                    key={post.id}
                    className="border-muted hover:bg-muted/50"
                  >
                    <TableCell className="group max-w-28 cursor-pointer py-4">
                      <button
                        onClick={() => handleRouting(`/blog/${post.id}`)}
                        className="mb-1 line-clamp-1 font-medium text-primary group-hover:underline group-hover:underline-offset-2"
                      >
                        {post.title}
                      </button>
                    </TableCell>

                    <TableCell className="group cursor-pointer py-4">
                      <button
                        className="flex items-center space-x-2"
                        onClick={() =>
                          handleRouting(`/profile/${post.authorId}`)
                        }
                      >
                        <Avatar className="h-6 w-6 border border-border">
                          <AvatarImage
                            src={
                              post.author.avatarUrl ??
                              `https://api.dicebear.com/9.x/initials/svg?seed=${post.author.displayName}`
                            }
                            alt={post.author.username}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {`https://api.dicebear.com/9.x/initials/svg?seed=${post.author.displayName}`}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900 group-hover:underline group-hover:underline-offset-2">
                          {post.author.displayName}
                        </span>
                      </button>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDateFromISOString(post.createdAt)}
                      </div>
                    </TableCell>

                    <TableCell className="max-w-20 gap-2">
                      <Button
                        variant="destructive_outline"
                        size="sm"
                        onClick={() => handleFlagPost(post.id)}
                      >
                        Mark violated
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => handleUnflagPost(post.id)}
                      >
                        Unflag post
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </section>

      {/* Violated posts section */}
      <section>
        <h3 className="mb-2 mt-8 text-2xl font-bold text-primary">
          Violating posts
        </h3>

        <Table>
          {/* table headers */}
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="font-medium text-primary">Title</TableHead>
              <TableHead className="font-medium text-primary">Author</TableHead>
              <TableHead className="font-medium text-primary">Date</TableHead>
            </TableRow>
          </TableHeader>

          {/* table body */}
          <TableBody>
            {violatedFetched && violatedPosts?.length === 0 && (
              <TableRow>
                <TableCell className="w-full py-3 text-center" colSpan={4}>
                  <span className="italic text-muted-foreground">
                    No violated post found yet
                  </span>
                </TableCell>
              </TableRow>
            )}
            {violatedFetched &&
              violatedPosts?.length !== 0 &&
              violatedPosts?.map((post: Post) => {
                return (
                  <TableRow
                    key={post.id}
                    className="border-muted hover:bg-muted/50"
                  >
                    <TableCell className="group max-w-28 cursor-pointer py-4">
                      <button
                        onClick={() => handleRouting(`/blog/${post.id}`)}
                        className="mb-1 line-clamp-1 font-medium text-primary group-hover:underline group-hover:underline-offset-2"
                      >
                        {post.title}
                      </button>
                    </TableCell>

                    <TableCell className="group cursor-pointer py-4">
                      <button
                        onClick={() =>
                          handleRouting(`/profile/${post.authorId}`)
                        }
                        className="flex items-center space-x-2"
                      >
                        <Avatar className="h-6 w-6">
                          <Avatar className="h-6 w-6 border border-border">
                            <AvatarImage
                              src={
                                post.author.avatarUrl ??
                                `https://api.dicebear.com/9.x/initials/svg?seed=${post.author.displayName}`
                              }
                              alt={post.author.username}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {`https://api.dicebear.com/9.x/initials/svg?seed=${post.author.displayName}`}
                            </AvatarFallback>
                          </Avatar>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900 group-hover:underline group-hover:underline-offset-2">
                          {post.author.displayName}
                        </span>
                      </button>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDateFromISOString(post.createdAt)}
                      </div>
                    </TableCell>

                    <TableCell className="max-w-20">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnflagPost(post.id)}
                      >
                        Unflag post
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
