"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import { usePost } from "@/hooks/apis/usePost";
import BlogCard from "@/components/blog/read/blog-card";
import LoadBlogIndicator from "@/components/blog/read/load-blog-indicator";
import { useUser } from "@/hooks/apis/useUser";
import { useAuthContext } from "@/context/AuthContext";
import { useFollow } from "@/hooks/apis/useFollow";
import { useRouter } from "next/navigation";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { data: posts, isLoading: isLoadingPost } =
    usePost().useGetPostByAuthor(params.id);
  const { data: author, isLoading: isLoadingAuthor } = useUser().useGetUserById(
    params.id,
  );
  const { user } = useAuthContext();
  const isProfileOwner = user?.id === params.id;

  const { data: following, isLoading } = useFollow().useGetFollowing();
  const followAction = useFollow().useCreateFollow();
  const unfollowAction = useFollow().useDeleteFollow();
  const isFollowing = following?.pages[0].data.some((following) => {
    return following.author.id === params.id;
  });

  const { data: authorFollower } = useFollow().useGetFollower(params.id, 1);
  const { data: authorFollowing } = useFollow().useGetFollowing(params.id, 1);

  const router = useRouter();

  const handleFollow = async () => {
    const authorId = params.id;
    try {
      if (isFollowing) {
        await unfollowAction.mutateAsync({
          data: {
            authorId,
          },
        });
        return;
      } else {
        await followAction.mutateAsync({
          data: {
            authorId,
          },
        });
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-8 py-8 md:py-14 md:pl-8 lg:pl-20 xl:pl-[16.5rem]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10">
          {/* Left Column - Content */}
          <main className="md:col-span-2">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="h-auto w-full justify-start gap-7 rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="posts"
                  className="rounded-none border-b-2 border-transparent pb-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="rounded-none border-b-2 border-transparent pb-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                >
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="pt-8">
                <div className="flex w-full flex-col justify-center space-y-8">
                  {/* Article cards */}
                  {isLoadingPost && (
                    <LoadBlogIndicator isLoading={isLoadingPost} />
                  )}

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
                            When they publish a story, it will appear here on
                            their profile.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {posts?.map((post, index) => {
                    return <BlogCard index={index} key={post.id} post={post} />;
                  })}
                </div>
              </TabsContent>

              <TabsContent value="about" className="pt-8 text-muted-foreground">
                <p className="mb-3 text-sm">
                  Jane is a writer and researcher with over 10 years of
                  experience in the tech industry. She specializes in writing
                  about emerging technologies, productivity systems, and
                  personal development.
                </p>
                <p className="text-sm">
                  Previously, Jane worked as a Senior Content Strategist at Tech
                  Company and as a Research Lead at Innovation Labs. She holds a
                  Master's degree in Digital Media from University College.
                </p>
              </TabsContent>
            </Tabs>
          </main>

          {/* Right Column - Profile Info */}
          <div className="relative row-start-1 md:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-20">
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
                  <h1 className="text-3xl font-bold">{author?.displayName}</h1>
                  {user && !isProfileOwner && (
                    <Button
                      className="rounded-full shadow-none"
                      size={"sm"}
                      variant={isFollowing ? "outline" : "default"}
                      onClick={handleFollow}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                  )}
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
                {/* specializes */}
                <p className="text-muted-foreground">
                  Writer, researcher, and tech enthusiast. I write about
                  technology, productivity, and personal development. Previously
                  worked at Tech Company and Innovation Labs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
