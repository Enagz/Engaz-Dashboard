"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [
  { month: "orders", completed: 15, incompleted: 9, time: "2:30" },
];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#3E97D1",
  },
  incompleted: {
    label: "Incompleted",
    color: "#E0FCEF",
  },
} satisfies ChartConfig;

export default function CompletionTime() {
  return (
    <CardContent className="-mt-10 -mb-32 flex flex-1 items-center pb-0">
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
                          {chartData[0].time.toLocaleString()}
                        </tspan>
                        <tspan> ساعة</tspan>
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
  );
}
