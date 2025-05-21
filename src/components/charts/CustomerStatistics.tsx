"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { enjazService } from "@/services/enjazService";

type StatItem = {
  name: string;
  color: string;
  percentage: number;
};

export default function CustomerStatistics({
  customerId,
}: {
  customerId: string;
}) {
  const [data, setData] = useState<StatItem[]>([]);
  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await enjazService.getClientStatistics(customerId);

        const stats = res.data.statistics;

        const total =
          stats.translationOrders +
          stats.printingOrders +
          stats.completedOrders +
          stats.canceledOrders +
          stats.inProggressOrders;

        setTotalRequests(total);

        const percentage = (value: number) =>
          total > 0 ? Math.round((value / total) * 100) : 0;

        const formattedData: StatItem[] = [
          {
            name: "طلبات الترجمة",
            color: "#3b82f6",
            percentage: percentage(stats.translationOrders),
          },
          {
            name: "طلبات الطباعة",
            color: "#eab308",
            percentage: percentage(stats.printingOrders),
          },
          {
            name: "طلبات ملغاة",
            color: "#ef4444",
            percentage: percentage(stats.canceledOrders),
          },
          {
            name: "معدل الإكمال",
            color: "#22c55e",
            percentage: percentage(stats.completedOrders),
          },
        ];

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [customerId]);

  const calculateCircumference = (radius: number) => 2 * Math.PI * radius;

  const renderArc = (item: StatItem, index: number, radius: number) => {
    const circumference = calculateCircumference(radius);
    const strokeDashoffset = circumference * (1 - item.percentage / 100);
    const rotation = -180;

    return (
      <circle
        key={index}
        cx="150"
        cy="150"
        r={radius}
        fill="none"
        stroke={item.color}
        strokeWidth="12"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(${rotation} 150 150)`}
        className="transition-all duration-1000 ease-in-out"
      />
    );
  };

  if (loading) return <div className="text-center py-10">جاري التحميل...</div>;

  return (
    <Card className="w-full h-full rounded-3xl bg-white p-0 border-none">
      <CardContent className="flex flex-col md:flex-row items-center justify-center gap-6 flex-grow">
        {/* Radial Chart */}
        <div className="relative w-72 h-72">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {renderArc(data[3], 3, 120)}
            {renderArc(data[1], 1, 100)}
            {renderArc(data[0], 0, 80)}
            {renderArc(data[2], 2, 60)}
            <text
              x="150"
              y="150"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xl font-bold fill-black"
            >
              {totalRequests} طلب
            </text>
          </svg>
        </div>

        {/* Legend */}
        <ul className="flex flex-col space-y-2 text-sm">
          {data.map((item, index) => (
            <li key={index} className="flex items-center">
              <span
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></span>
              ({item.percentage}%) {item.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
