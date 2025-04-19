"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [{ month: "oreders", completed: 56, incompleted: 9 }];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#1B8354",
  },
  incompleted: {
    label: "Incompleted",
    color: "#E0FCEF",
  },
} satisfies ChartConfig;

export default function CompletedOrders() {
  const totalVisitors = chartData[0].completed + chartData[0].incompleted;

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={100}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          <tspan className="fill-primary-color">
                            {chartData[0].completed.toLocaleString()}
                          </tspan>
                          <tspan> Order</tspan>
                          <tspan className="fill-muted-foreground text-sm font-normal">
                            {" "}
                            {(
                              (chartData[0].completed / totalVisitors) *
                              100
                            ).toFixed()}
                            %
                          </tspan>
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-completed)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="incompleted"
              fill="var(--color-incompleted)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
