import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";
import { Heart, MessageCircle, Play, Share2 } from "lucide-react";

export default function Metric({ data }: { data: Post }): JSX.Element {
  return (
    <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Heart className="mr-1 h-5 w-5" />
            <span>506</span>
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <MessageCircle className="mr-1 h-5 w-5" />
            <span>{data.commentCount}</span>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Play className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
