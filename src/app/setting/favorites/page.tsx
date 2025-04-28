"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavorite } from "@/hooks/apis/useFavorite";
import BlogCard from "@/components/blog/read/blog-card";
import LoadBlogIndicator from "@/components/blog/read/load-blog-indicator";

export default function FavoritesPage() {
  const { data, isLoading } = useFavorite().useGetFavoriteers();
  const favs = data?.pages[0].data;
  console.log("my favs: ", favs);
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadBlogIndicator isLoading={isLoading} />
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorites</CardTitle>
        <CardDescription>View your favorite content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Your Favorite Content</h3>
          </div>
          <div className="mt-4 flex flex-col gap-5">
            {favs?.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No favorites yet. Start exploring and add some content to your
                favorites!
              </p>
            )}
            {!isLoading &&
              favs?.map((fav, index) => {
                return (
                  // <Card key={fav.post.id}>
                  //   <CardHeader className="p-4">
                  //     <div className="flex items-center justify-between">
                  //       <CardTitle className="text-base">
                  //         {fav.post.title}
                  //       </CardTitle>
                  //       <Button variant="ghost" size="icon" className="h-8 w-8">
                  //         <Heart className="h-4 w-4 fill-primary" />
                  //       </Button>
                  //     </div>
                  //     <CardDescription>
                  //       By {fav.post.author.displayName} •{" "}
                  //       {formatDateFromISOString(fav.post.createdAt)}
                  //     </CardDescription>
                  //   </CardHeader>
                  //   <CardContent className="p-4 pt-0">
                  //     <p className="line-clamp-2 text-sm text-muted-foreground">
                  //       {firstSentenceJson(fav.post.content)}
                  //     </p>
                  //   </CardContent>
                  //   <div className="flex items-center justify-between border-t p-4">
                  //     <div className="text-sm text-muted-foreground">
                  //       <span className="font-medium text-foreground">
                  //         Added to favorites
                  //       </span>{" "}
                  //       on Mar 9
                  //     </div>
                  //     <div className="flex space-x-2">
                  //       <Button variant="outline" size="sm">
                  //         View
                  //       </Button>
                  //       <Button variant="outline" size="sm">
                  //         Remove
                  //       </Button>
                  //     </div>
                  //   </div>
                  // </Card>
                  <BlogCard
                    post={fav.post}
                    index={index}
                    key={fav.post.id}
                  ></BlogCard>
                );
              })}
          </div>

          <div className="flex justify-center pt-4">
            <Button variant="outline">View All Favorites</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
