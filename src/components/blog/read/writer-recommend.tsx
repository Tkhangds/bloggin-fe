import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function WriterRecommend(): JSX.Element {
  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h2 className="mb-4 text-lg font-bold">Recommended Writers</h2>
      <div className="space-y-4">
        {recommendedWriters.map((writer, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={writer.avatar} alt={writer.name} />
                <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{writer.name}</h3>
                <p className="text-sm text-gray-500">{writer.bio}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 rounded-full">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

const recommendedWriters = [
  {
    name: "Jamie Rodriguez",
    bio: "Tech journalist & AI researcher",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Nora Kim",
    bio: "Bestselling author on productivity",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Marcus Lee",
    bio: "Climate scientist & educator",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
