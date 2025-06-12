"use client";

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
import { useStatistics } from "@/hooks/apis/useStatistics";
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

function generateBlueShades(count: number): string[] {
  const shades: string[] = [];
  for (let i = 0; i < count; i++) {
    // Vary the lightness from 40% to 80%
    const lightness = 40 + (40 * i) / Math.max(count - 1, 1);
    // HSL for blue is 210 (can adjust for more/less purple)
    const h = 210,
      s = 80;
    // Convert HSL to hex
    shades.push(hslToHex(h, s, lightness));
  }
  return shades;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1))),
    );
  return `#${f(0).toString(16).padStart(2, "0")}${f(8)
    .toString(16)
    .padStart(2, "0")}${f(4).toString(16).padStart(2, "0")}`;
}

const resgistrationChartConfig = {
  count: {
    label: "New Users",
  },
} satisfies ChartConfig;

const postChartConfig = {
  count: {
    label: "Post uploaded",
  },
} satisfies ChartConfig;

export default function AdminStatisticsPage() {
  const { data: registrationTraffic } =
    useStatistics().useGetMonthlyUserRegistration();

  const { data: postUploadTraffic } = useStatistics().useGetMonthlyPostUpload();

  const { data: tagDistribution } = useStatistics().useGetTagDistribution();

  const { data: posts } = useStatistics().useGetTopInteractivePost();

  const shadesOfBlue = tagDistribution
    ? generateBlueShades(tagDistribution?.length)
    : [];
  const tagChartData =
    tagDistribution?.map((tag, idx) => ({
      name: tag.name, // label for the pie
      count: tag.count, // value for the pie
      fill: shadesOfBlue[idx], // assign color
    })) ?? [];

  const tagChartConfig = {
    count: {
      label: "Posts",
    },
    ...tagChartData?.reduce((acc, tag) => {
      acc[tag.name] = {
        label: tag.name,
        color: tag.fill,
      };
      return acc;
    }, {} as ChartConfig),
  };

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
    <div className="grid size-full grid-flow-row grid-cols-2 gap-5 p-8">
      {/* user resgistration traffic */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>User Resgistration Traffic</CardTitle>
          <CardDescription className="text-muted-foreground">
            Newly registered account this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={resgistrationChartConfig} className="p-3">
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
    </div>
  );
}
