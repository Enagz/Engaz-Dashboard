"use client";

import { formatDate } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

interface DataDisplayProps {
  data: {
    [key: string]: any;
  };
}

export default function DataDisplay({ data }: DataDisplayProps) {
  const locale = useLocale();
  const t = useTranslations("orderSummary");

  function formatValue(value: any) {
    if (typeof value === "string" || value instanceof Date) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return formatDate(date, locale);
      }
    }

    return String(value);
  }

  return (
    <div className="w-full max-w-3xl p-4 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => {
          const label = t(String(key)) || key;
          const formattedValue =
            value !== null && value !== undefined ? formatValue(value) : "—";

          return (
            <div key={key} className="flex flex-col">
              <label className="font-bold mb-2 text-black">{label} :</label>
              <div className="bg-gray-50 p-4 rounded-lg text-text-normal border border-gray-200">
                {formattedValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
