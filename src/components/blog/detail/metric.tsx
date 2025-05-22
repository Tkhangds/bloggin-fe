import { Button } from "@/components/ui/button";
import { useFavorite } from "@/hooks/apis/useFavorite";
import { Post } from "@/types/post";
import { Heart, Loader2, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export default function Metric({ data }: { data: Post }): JSX.Element {
  const favAction = useFavorite().useCreateFavorite();
  const unFavAction = useFavorite().useDeleteFavorite();
  const { data: favCount, isLoading } = useFavorite().useGetFavoriteCount(
    data.id,
  );
  const router = useRouter();

  const handleFavClicked = async () => {
    if (favCount?.data.isFavorite === null) {
      toast.error("Login to favorite");
      router.push("/sign-in");
      return;
    }
    try {
      if (!favCount?.data.isFavorite) {
        await favAction.mutateAsync({ data: { postId: data.id } });
      } else {
        await unFavAction.mutateAsync({
          data: { postId: data.id },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <div
        className={twMerge(
          "flex items-center gap-1",
          !isLoading && favCount?.data.isFavorite
            ? "font-bold text-red-500"
            : "",
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={handleFavClicked}
          disabled={isLoading}
        >
          <Heart className="mr-1 h-5 w-5" />
          {!isLoading ? (
            <span>{favCount?.data.count}</span>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <MessageCircle className="mr-1 h-5 w-5" />
          <span>{data.commentCount}</span>
        </Button>
      </div>
    </div>
  );
}
