"use client";

import { useEffect, useState } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
import { useTranslations, useLocale } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { enjazService } from "@/services/enjazService";

interface OrderDataEntry {
  name: string;
  label: string;
  value: number;
  fill: string;
}

export default function OrderStatistics() {
  const id = "pie-interactive";
  const t = useTranslations("orderStatistics");

  const [data, setData] = useState<OrderDataEntry[]>([
    { name: "completed", label: t("completed"), value: 0, fill: "#27AE60" },
    { name: "canceled", label: t("canceled"), value: 0, fill: "#E74C3C" },
    { name: "inprogress", label: t("inprogress"), value: 0, fill: "#F39C12" },
    { name: "new", label: t("new"), value: 0, fill: "#3498DB" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await enjazService.getOrdersOverviewEmp();

        if (!("error" in res)) {
          setData([
            {
              name: "completed",
              label: t("completed"),
              value: res.data.completedorders ?? 0,
              fill: "#27AE60",
            },
            {
              name: "canceled",
              label: t("canceled"),
              value: res.data.cancelledorders ?? 0,
              fill: "#E74C3C",
            },
            {
              name: "inprogress",
              label: t("inprogress"),
              value: res.data.inprogressorders ?? 0,
              fill: "#F39C12",
            },
            {
              name: "new",
              label: t("new"),
              value: res.data.neworders ?? 0,
              fill: "#3498DB",
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch orders overview:", error);
      }
    };

    fetchData();
  }, [t]);

  return (
    <Card
      data-chart={id}
      className="w-full h-full rounded-3xl bg-white p-0 border-none"
    >
      <ChartStyle id={id} config={{}} />
      <CardContent className="p-4 flex flex-col md:flex-row flex-1 justify-center items-center">
        <ChartContainer
          id={id}
          config={{}}
          className="w-full h-full min-h-56 max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {data.map((entry, index) => (
              <Pie
                key={`pie-${index}`}
                data={[entry]}
                cx="50%"
                cy="50%"
                startAngle={90 - index * 90}
                endAngle={90 - (index + 1) * 90}
                innerRadius={40}
                outerRadius={60 + (entry.value * 40) / 45}
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

        {/* Legend */}
        <ul className="flex flex-col space-y-2 text-sm">
          {data.map((item, index) => (
            <li key={index} className="flex items-center">
              <span
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: item.fill }}
              ></span>
              {item.label}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
