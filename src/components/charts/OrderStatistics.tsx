"use client";

import { Cell, Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const desktopData = [
  { name: "completed", value: 45, fill: "#27AE60" },
  { name: "new", value: 25, fill: "#3498DB" },
  { name: "inprogress", value: 20, fill: "#F39C12" },
  { name: "canceled", value: 10, fill: "#E74C3C" },
];

// Calculate the outer radius for each segment based on its value
const calculateOuterRadius = (value: number) => {
  // Map value to a radius range (60-100)
  return 60 + (value * 40) / 45; // 45 is max value
};

const chartConfig = {
  orders: {
    label: "Orders",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  new: {
    label: "New",
    color: "hsl(var(--chart-2))",
  },
  inprogress: {
    label: "Inprogress",
    color: "hsl(var(--chart-3))",
  },
  canceled: {
    label: "Canceled",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function OrderStatistics() {
  const id = "pie-interactive";

  return (
    <Card
      data-chart={id}
      className="w-full rounded-3xl bg-white p-0 border-none"
    >
      <ChartStyle id={id} config={chartConfig} />
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {desktopData.map((entry, index) => (
              <Pie
                key={`pie-${index}`}
                data={[entry]}
                cx="50%"
                cy="50%"
                startAngle={90 - index * 90}
                endAngle={90 - (index + 1) * 90}
                innerRadius={40}
                outerRadius={calculateOuterRadius(entry.value)}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={entry.fill} />
                <Label
                  value={`${entry.value}%`}
                  position="insideTop"
                  fill="white"
                  fontSize={12}
                  fontWeight={600}
                />
              </Pie>
            ))}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
