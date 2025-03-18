import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            403 - Forbidden
          </CardTitle>
          <CardDescription className="text-center">
            You don't have permission to access this resource
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-center text-sm text-muted-foreground">
            You are authenticated but don't have the necessary permissions to
            view this page.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/blog">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
