import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export default function FavoriteItemCard() {
  return (
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
        <CardDescription>By Sarah Johnson • March 8, 2025</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          Exploring upcoming trends and technologies that will shape the future
          of web development.
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
  );
}
