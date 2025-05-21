"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { enjazService } from "@/services/enjazService";

interface Service {
  name: string;
  percent: number;
}

export default function ServicesCompletion() {
  const [services, setServices] = useState<Service[]>([]);
  const t = useTranslations("servicesCompletion");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await enjazService.getOrdersRate();

        const data: Service[] = [
          {
            name: "translation",
            percent: res.data.translationpercentage ?? 0,
          },
          {
            name: "printing",
            percent: res.data.printingpercentage ?? 0,
          },
          {
            name: "late",
            percent: res.data.lateorderspercentage ?? 0,
          },
        ];

        setServices(data);
      } catch (error) {
        console.error("Failed to fetch order rates:", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="bg-white flex flex-col gap-y-6 p-8 rounded-3xl">
      {services.map((service) => {
        const color = service.name === "late" ? "#E31D1C" : "#16A34A";
        const bg = service.name === "late" ? "#FFD3D2" : "#D0FFE1";

        return (
          <div key={service.name} className="flex flex-col gap-y-6">
            <div className="text-text-normal flex justify-between">
              <p className="font-bold">{t(service.name)}</p>
              <span>{service.percent}%</span>
            </div>

            <div className="relative h-2 w-full rounded-full overflow-hidden">
              <div
                className="z-10 absolute left-0 inset-y-0 h-2"
                style={{ background: color, width: `${service.percent}%` }}
              />
              <div
                className="absolute left-0 inset-y-0 h-2 w-full"
                style={{ background: bg }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
