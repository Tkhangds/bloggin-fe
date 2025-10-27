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

  const router = useRouter();

  console.log("potential", potentiallyViolatedPosts);
  console.log("violated", violatedPosts);

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
            <TableRow key={"1"} className="border-muted hover:bg-muted/50">
              <TableCell className="group cursor-pointer py-4">
                <div>
                  <h3 className="mb-1 line-clamp-1 font-medium text-primary group-hover:underline group-hover:underline-offset-2">
                    Post title
                  </h3>
                </div>
              </TableCell>

              <TableCell className="group cursor-pointer py-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900 group-hover:underline group-hover:underline-offset-2">
                    Username
                  </span>
                </div>
              </TableCell>

              <TableCell className="py-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" />
                  Jun 6th, 2024
                </div>
              </TableCell>

              <TableCell className="max-w-20">
                <Button variant="destructive_outline" size="sm">
                  Mark violated
                </Button>
              </TableCell>
            </TableRow>
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
            <TableRow key={"1"} className="border-muted hover:bg-muted/50">
              <TableCell className="group cursor-pointer py-4">
                <div>
                  <h3 className="mb-1 line-clamp-1 font-medium text-primary group-hover:underline group-hover:underline-offset-2">
                    Post title
                  </h3>
                </div>
              </TableCell>

              <TableCell className="group cursor-pointer py-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900 group-hover:underline group-hover:underline-offset-2">
                    Username
                  </span>
                </div>
              </TableCell>

              <TableCell className="py-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" />
                  Jun 6th, 2024
                </div>
              </TableCell>

              <TableCell className="max-w-20">
                <Button variant="outline" size="sm">
                  Unflag post
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
