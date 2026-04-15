"use client";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAdmin } from "@/hooks/apis/useAdmin";
import { usePost } from "@/hooks/apis/usePost";
import { generateBlueShades } from "@/utils/color";
import { FileText, MousePointer2, Tag, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

const registrationChartConfig = {
  count: {
    label: "New Users",
  },
} satisfies ChartConfig;

const postChartConfig = {
  count: {
    label: "Post uploaded",
  },
} satisfies ChartConfig;

export default function AdminDashboardPage() {
  const { data: totalPosts } = usePost().useGetAllPosts(1);

  const { data: overallStats } = useAdmin().useGetOverallStatistics();

  const { data: registrationTraffic } =
    useAdmin().useGetMonthlyUserRegistration();

  const { data: postUploadTraffic } = useAdmin().useGetMonthlyPostUpload();

  const { data: tagDistribution } = useAdmin().useGetTagDistribution();

  const { data: posts } = useAdmin().useGetTopInteractivePost();

  const stats = useMemo(
    () => [
      {
        title: "Total Posts",
        value: totalPosts?.pages[0].meta.total,
        icon: FileText,
        color: "text-blue-600",
      },
      {
        title: "Total Users",
        value: overallStats?.usersCount || "N/A",
        icon: Users,
        color: "text-green-600",
      },
      {
        title: "Total Topics",
        value: overallStats?.tagsCount || "N/A",
        icon: Tag,
        color: "text-purple-600",
      },
      {
        title: "Total Interactions",
        value: overallStats?.interactionCount || "N/A",
        icon: MousePointer2,
        color: "text-orange-600",
      },
    ],
    [totalPosts, overallStats],
  );

  const shadesOfBlue = useMemo(
    () => (tagDistribution ? generateBlueShades(tagDistribution.length) : []),
    [tagDistribution],
  );

  const tagChartData = useMemo(
    () =>
      tagDistribution?.map((tag, idx) => ({
        name: tag.name,
        count: tag.count,
        fill: shadesOfBlue[idx],
      })) ?? [],
    [tagDistribution, shadesOfBlue],
  );

  const tagChartConfig = useMemo<ChartConfig>(
    () => ({
      count: { label: "Posts" },
      ...tagChartData.reduce(
        (acc, tag) => {
          acc[tag.name] = { label: tag.name, color: tag.fill };
          return acc;
        },
        {} as ChartConfig,
      ),
    }),
    [tagChartData],
  );

  const postBarChartConfig = {
    title: {
      label: "Top Interactive Posts",
    },
    commentCount: {
      label: "Comments",
    },
    favoriteCount: {
      label: "Favorites",
    },
  };

  return (
    <main className="flex w-full p-8">
      <div className="w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-primary">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s been happening.
          </p>
        </div>

        {/* Stats Grid */}
        <h3 className="mb-2 text-2xl font-bold text-primary">Overall</h3>
        <div className="flex gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="w-full rounded-none border-0 border-r-2 shadow-none"
            >
              <CardContent className="p-0 py-3 pr-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`rounded-full bg-gray-50 p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* statistics tabs */}
        <h3 className="mb-2 mt-8 text-2xl font-bold text-primary">
          Statistics
        </h3>
        <section className="grid grid-flow-row grid-cols-2 gap-5 py-5">
          {/* user resgistration traffic */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>User Registration Traffic</CardTitle>
              <CardDescription className="text-muted-foreground">
                Newly registered account this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={registrationChartConfig} className="p-3">
                <LineChart
                  accessibilityLayer
                  data={registrationTraffic ?? []}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    interval={"preserveStartEnd"}
                    tickMargin={10}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="count"
                    label="New Users"
                    type="monotone"
                    stroke="#006400"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* post update traffic */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Post Upload Traffic</CardTitle>
              <CardDescription className="text-muted-foreground">
                Blogs uploaded this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="" config={postChartConfig}>
                <LineChart
                  accessibilityLayer
                  data={postUploadTraffic ?? []}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    interval={"preserveStartEnd"}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="count"
                    type="monotone"
                    stroke="#DC143C"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* tag distribution */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
              <CardDescription className="text-muted-foreground">
                Number of posts per topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="" config={tagChartConfig}>
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie data={tagDistribution} dataKey="count" nameKey="name">
                    {tagChartData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* top interactive post */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Popular Blogs</CardTitle>
              <CardDescription className="text-muted-foreground">
                Blogs with the most interactivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="" config={postBarChartConfig}>
                <BarChart accessibilityLayer data={posts}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="title"
                    tickLine={false}
                    interval={"preserveStartEnd"}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="favoriteCount"
                    stackId="a"
                    fill="#add8e6"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="commentCount"
                    stackId="a"
                    fill="#87ceeb"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
