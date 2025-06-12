"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useStatistics } from "@/hooks/apis/useStatistics";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const resgistrationChartConfig = {
  count: {
    label: "New Users",
    color: "#000000",
  },
} satisfies ChartConfig;

const postChartConfig = {
  count: {
    label: "Post uploaded",
    color: "#000000",
  },
} satisfies ChartConfig;

export default function AdminStatisticsPage() {
  const { data: registrationTraffic } =
    useStatistics().useGetMonthlyUserRegistration();

  const { data: postUploadTraffic } = useStatistics().useGetMonthlyPostUpload();

  const { data: tagDistribution } = useStatistics().useGetTagDistribution();
  console.log("registrationTraffic", tagDistribution);

  return (
    <div className="grid size-full grid-flow-row grid-cols-2 gap-5 p-8">
      {/* user resgistration traffic */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>User resgistration traffic</CardTitle>
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
          <CardTitle>Post upload traffic</CardTitle>
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
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
