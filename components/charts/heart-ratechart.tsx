"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Button } from "../ui/button";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface DataProps {
  average: string;
  data: {
    label: string;
    value1: number;
    value2: number;
  }[];
}

export function HeartRateChart2({ data, average }: DataProps) {
  const lastData = data[data?.length - 1];

  return (
    <Card>
      <CardHeader className="px-2 md:px-4 lg:px-6">
        <CardTitle className="text-base md:text-lg">
          Heart Rate (Pulse)
        </CardTitle>
        <CardDescription>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-base md:text-lg xl:text-xl font-semibold">
                {lastData?.value1 || 0}-{lastData?.value2 || 0}
              </p>
              <p className="text-xs md:text-sm text-gray-500">Recent Reading</p>
            </div>
            <div>
              <p className="text-base md:text-lg xl:text-xl font-semibold">
                {average}
              </p>
              <p className="text-xs md:text-sm text-gray-500">Average Rate</p>
            </div>
            <Button size="sm" variant="outline" className="hidden lg:flex">
              See Insights
            </Button>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 md:px-4 lg:px-6">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            // margin={{
            //   left: 12,
            //   right: 12,
            // }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="value1"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="value2"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
