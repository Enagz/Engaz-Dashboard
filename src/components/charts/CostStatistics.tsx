"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const chartConfig = {
  printing: {
    label: "Printing",
    color: "var(--color-primary-color)",
  },
  translation: {
    label: "Translation",
    color: "var(--color-green-color)",
  },
} satisfies ChartConfig;

export default function CostStatistics() {
  const [selectedPeriod, setSelectedPeriod] = useState(6);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Full dataset (7 months)
  const fullData = [
    { month: "يناير", printing: 70, translation: 53 },
    { month: "فبراير", printing: 66, translation: 57 },
    { month: "مارس", printing: 68, translation: 61 },
    { month: "أبريل", printing: 78, translation: 64 },
    { month: "مايو", printing: 95, translation: 66 },
    { month: "يونيه", printing: 94, translation: 68 },
    { month: "يوليو", printing: 75, translation: 72 },
  ];

  // Filter data based on selection
  const chartData = fullData.slice(fullData.length - selectedPeriod);

  return (
    <Card className="w-full rounded-3xl bg-white p-0 py-8 border-none ">
      <CardContent className="flex flex-col">
        <div className="relative w-fit">
          <button
            className="mb-2 flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="listbox"
          >
            {selectedPeriod === 6 ? "آخر 6 شهور" : "آخر 3 شهور"}
            <ChevronDown className="h-4 w-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 z-10 w-32 right-0 rtl:left-0">
              <ul className="py-1" role="listbox">
                <li
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                    selectedPeriod === 3 ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedPeriod(3);
                    setIsDropdownOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedPeriod === 3}
                >
                  آخر 3 شهور
                </li>
                <li
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                    selectedPeriod === 6 ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedPeriod(6);
                    setIsDropdownOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedPeriod === 6}
                >
                  آخر 6 شهور
                </li>
              </ul>
            </div>
          )}
        </div>
        <ChartContainer className="max-h-[410px] grow" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[25, 100]}
              ticks={[25, 50, 75, 100]}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="printing"
              type="natural"
              stroke="var(--color-printing)"
              strokeWidth={1}
              dot={{
                stroke: "var(--color-printing)",
                strokeWidth: 1,
                r: 5,
                fill: "var(--color-printing)",
              }}
              activeDot={{ r: 7 }}
            />
            <Line
              dataKey="translation"
              type="natural"
              stroke="var(--color-translation)"
              strokeWidth={1}
              dot={{
                stroke: "var(--color-translation)",
                strokeWidth: 1,
                r: 5,
                fill: "var(--color-translation)",
              }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
