"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FavoritesPage() {
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
            <Button size="sm">Browse Content</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    The Future of Web Development
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4 fill-primary" />
                  </Button>
                </div>
                <CardDescription>
                  By Sarah Johnson • March 8, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  Exploring upcoming trends and technologies that will shape the
                  future of web development.
                </p>
              </CardContent>
              <div className="flex items-center justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Added to favorites
                  </span>{" "}
                  on Mar 9
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    Building Accessible UIs
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4 fill-primary" />
                  </Button>
                </div>
                <CardDescription>
                  By Michael Chen • March 3, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  A comprehensive guide to creating accessible user interfaces
                  that work for everyone.
                </p>
              </CardContent>
              <div className="flex items-center justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Added to favorites
                  </span>{" "}
                  on Mar 5
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-center pt-4">
            <Button variant="outline">View All Favorites</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
