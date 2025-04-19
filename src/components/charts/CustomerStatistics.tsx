"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function CustomerStatistics() {
  const [totalRequests] = useState(30);

  const data = [
    { name: "طلبات الترجمة", color: "#3b82f6", percentage: 30 },
    { name: "طلبات الطباعة", color: "#eab308", percentage: 70 },
    { name: "طلبات ملغاة", color: "#ef4444", percentage: 15 },
    { name: "معدل الإكمال", color: "#22c55e", percentage: 80 },
  ];

  const calculateCircumference = (radius: number) => 2 * Math.PI * radius;

  const renderArc = (item: (typeof data)[0], index: number, radius: number) => {
    const circumference = calculateCircumference(radius);
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference * (1 - item.percentage / 100);
    const rotation = -180; // from center-left

    return (
      <circle
        key={index}
        cx="150"
        cy="150"
        r={radius}
        fill="none"
        stroke={item.color}
        strokeWidth="12"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(${rotation} 150 150)`}
        className="transition-all duration-1000 ease-in-out"
      />
    );
  };

  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Radial Chart */}
        <div className="relative w-72 h-72">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {renderArc(data[3], 3, 120)} {/* معدل الإكمال */}
            {renderArc(data[1], 1, 100)} {/* طلبات الطباعة */}
            {renderArc(data[0], 0, 80)} {/* طلبات الترجمة */}
            {renderArc(data[2], 2, 60)} {/* طلبات ملغاة */}
            {/* Center Text */}
            <text
              x="150"
              y="150"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-3xl font-bold fill-black"
            >
              {totalRequests} طلب
            </text>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
