"use client";
import BlogCard from "@/components/blog/read/blog-card";
import LoadBlogIndicator from "@/components/blog/read/load-blog-indicator";
import { FollowButton } from "@/components/shared/follow-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useFollow } from "@/hooks/apis/useFollow";
import { usePost } from "@/hooks/apis/usePost";
import { useUser } from "@/hooks/apis/useUser";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { data: posts, isLoading: isLoadingPost } =
    usePost().useGetPostByAuthor(params.id);
  const { data: author, isLoading: isLoadingAuthor } = useUser().useGetUserById(
    params.id,
  );
  const { user } = useAuthContext();
  const isProfileOwner = user?.id === params.id;
  const { data: authorFollower } = useFollow().useGetFollower(params.id, 1);
  const { data: authorFollowing } = useFollow().useGetFollowing(params.id, 1);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-8 py-8 md:py-14 md:pl-8 lg:pl-20 xl:pl-[16.5rem]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10">
          {/* Right Column - Content */}
          <main className="md:col-span-2">
            <div className="flex w-full flex-col justify-center space-y-8">
              {/* Article cards */}
              {isLoadingPost && <LoadBlogIndicator isLoading={isLoadingPost} />}

              {posts?.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-accent bg-muted/75 px-4 py-16 text-center">
                  <div className="mb-4 rounded-full border border-gray-100 bg-background p-4 shadow-sm">
                    <BookOpen className="h-8 w-8 text-foreground" />
                  </div>

                  <h3 className="mb-2 text-xl font-medium text-foreground">
                    {author && isProfileOwner
                      ? "You haven't"
                      : `${author?.displayName} hasn't`}{" "}
                    written any stories yet
                  </h3>

                  <div className="text-muted-foreground">
                    {user && isProfileOwner ? (
                      <Button
                        className="mt-3"
                        onClick={() => {
                          router.push("/draft");
                        }}
                      >
                        Write now!
                      </Button>
                    ) : (
                      <p>
                        When they publish a story, it will appear here on their
                        profile.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {posts?.map((post, index) => {
                return <BlogCard index={index} key={post.id} post={post} />;
              })}
            </div>
          </main>

          {/* Left Column - Profile Info */}
          <div className="row-start-1 mb-5 md:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-20">
              {/* author info */}
              <div className="space-y-4 bg-background pb-2">
                <Avatar className="h-24 w-24 border-2 border-accent">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${author?.displayName}`}
                    alt="Author"
                    className="rounded-full"
                  />
                  <AvatarFallback>N/A</AvatarFallback>
                </Avatar>

                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <h1 className="text-3xl font-bold">
                      {author?.displayName}
                    </h1>
                    {author && <FollowButton userId={author.id}></FollowButton>}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span className="font-medium text-primary">
                        {authorFollower && authorFollower.pages[0].meta.total}
                      </span>{" "}
                      Followers
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span className="font-medium text-primary">
                        {authorFollowing && authorFollowing.pages[0].meta.total}
                      </span>{" "}
                      Following
                    </div>
                  </div>
                </div>
              </div>

              {/* specializes */}
              <p className="text-sm">
                {!isLoadingAuthor && author?.specialties ? (
                  author.specialties
                ) : isProfileOwner ? (
                  <Link
                    href={`/setting/profile`}
                    className="italic text-blue-600 underline underline-offset-4"
                  >
                    Add your specialties now
                  </Link>
                ) : (
                  <span className="italic text-muted-foreground">
                    No information
                  </span>
                )}
              </p>

              <div className="border-t pt-4">
                <h3 className="mb-3 font-semibold">About</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {!isLoadingAuthor && author?.about ? (
                    author.about
                  ) : isProfileOwner ? (
                    <Link
                      href={`/setting/profile`}
                      className="italic text-blue-600 underline underline-offset-4"
                    >
                      Add your profile now
                    </Link>
                  ) : (
                    <span className="italic">No information</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
