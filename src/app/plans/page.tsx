import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function PlansPage() {
  return (
    <div className="flex flex-row justify-center py-10 md:px-20">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">Pro Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-center text-3xl font-bold">
            10.000 VND
          </CardTitle>
          <CardDescription className="mt-4">
            Unlock the full potential of your blogging journey with our Pro
            plan. Get unlimited access to all premium features, collaborate with
            others, and create content without any restrictions.
          </CardDescription>
          <ul className="mt-6 flex flex-col gap-3">
            <li className="flex gap-1">
              <span className="text-green-500">✓</span>
              <p>Unlimited access to all features</p>
            </li>
            <li className="flex gap-1">
              <span className="text-green-500">✓</span>
              <p>Access to limited posts</p>
            </li>
            <li className="flex gap-1">
              <span className="text-green-500">✓</span>
              <p>Unlimited words for your post</p>
            </li>
            <li className="flex gap-1">
              <span className="text-green-500">✓</span>
              <p>Blog writing collaboration</p>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Link
            href={"/plans/payment"}
            className="w-full rounded-md bg-foreground py-1 text-center text-lg text-background hover:bg-foreground/90"
          >
            Get Now
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
