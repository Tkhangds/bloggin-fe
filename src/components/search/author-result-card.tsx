import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FollowButton } from "../shared/follow-button";
import { User } from "@/types/user";
import { twMerge } from "tailwind-merge";

export const AuthorResultCard = ({
  writer,
  className,
}: {
  writer: User;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "border-muted-backgound flex flex-col justify-between rounded-lg border p-4 sm:h-48 sm:w-52",
        className,
      )}
    >
      <>
        <div className="flex items-start justify-between gap-y-4">
          <Link
            href={`/profile/${writer.id}`}
            className="flex items-center space-x-3"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={writer.avatarUrl || "/placeholder.svg"}
                alt={writer.displayName}
              />
              <AvatarFallback>
                {writer.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="truncate font-semibold text-primary">
                {writer.displayName}
              </h3>
              <p className="text-sm text-gray-500">{writer.username}</p>
            </div>
          </Link>
          <FollowButton
            userId={writer.id}
            className="sm:hidden sm:size-0"
          ></FollowButton>
        </div>
        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-muted-foreground">
          {writer.specialties ? writer.specialties : "N/A."}
        </p>
      </>

      <div className="hidden sm:block">
        <FollowButton
          userId={writer.id}
          alwaysShow={true}
          className="h-9 w-full"
        />
      </div>
    </div>
  );
};
