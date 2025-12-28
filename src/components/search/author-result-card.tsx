import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FollowButton } from "../shared/follow-button";
import { User } from "@/types/user";
import { twMerge } from "tailwind-merge";
import { RoleEnum } from "@/enums/role.enum";
import { Gem } from "lucide-react";

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
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  writer.avatarUrl ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${writer?.displayName}`
                }
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
              <h3 className="flex items-center gap-1 truncate font-semibold text-primary">
                {writer.displayName}
                {writer.role === RoleEnum.PRO_USER && (
                  <Gem className="h-4 w-4" />
                )}
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
