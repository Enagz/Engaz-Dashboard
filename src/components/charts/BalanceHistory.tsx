"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "يناير", balance: 4000 },
  { month: "فبراير", balance: 8500 },
  { month: "مارس", balance: 11000 },
  { month: "إبريل", balance: 24000 },
  { month: "مايو", balance: 7000 },
  { month: "يونيو", balance: 12000 },
  { month: "يوليو", balance: 13000 },
];

const chartConfig = {
  desktop: {
    label: "Balance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function BalanceHistory() {
  return (
    <Card className="w-full rounded-3xl bg-white p-0 border-none">
      <CardContent className="p-7 pr-9">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              type="category"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(v) => `ر.س ${v}`}
            />
            <ChartTooltip
              cursor={false}
              label={true}
              content={<ChartTooltipContent indicator="line" />}
            />

            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              dataKey="balance"
              type="natural"
              fill="url(#blueGradient)"
              fillOpacity={1}
              stroke="var(--color-primary-color)"
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
