"use client";

import BestCustomers from "@/components/tables/BestCustomers";
import CustomerDetails from "@/components/tables/CustomerDetails";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { enjazService } from "@/services/enjazService";
import { useTranslations } from "next-intl";

interface CustomerStats {
  clientsCounter: number;
  activeClintsCounter: number;
  newClintsCounter: number;
  avgRate: number | null;
  InteractionPercentage: number;
}

export default function Home() {
  const t = useTranslations("customers");

  const [customerStats, setCustomerStats] = useState<CustomerStats>({
    clientsCounter: 0,
    activeClintsCounter: 0,
    newClintsCounter: 0,
    avgRate: null,
    InteractionPercentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await enjazService.getClientsOverview();
        setCustomerStats(response.data);
      } catch (error: any) {
        console.error("Error fetching customer stats:", error);
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerStats();
  }, [t]);

  // Dynamic version of customersData using fetched values
  const customersData = [
    {
      title: t("stats.totalCustomers"),
      number: customerStats.clientsCounter,
      icon: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.125 11.25a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0ZM5 4.375a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"
            fill="#000"
            fillOpacity={0.04}
          />
          <path
            d="M19.125 11.75a.625.625 0 0 1-.875-.126A4.03 4.03 0 0 0 15 10a.625.625 0 0 1 0-1.25 1.875 1.875 0 1 0-1.816-2.343.626.626 0 0 1-1.21-.313 3.125 3.125 0 1 1 5.135 3.087c.85.368 1.589.952 2.143 1.694a.624.624 0 0 1-.127.875m-4.21 4.812a.623.623 0 0 1-.454.947.62.62 0 0 1-.627-.322 4.454 4.454 0 0 0-7.668 0 .625.625 0 1 1-1.082-.625 5.63 5.63 0 0 1 2.636-2.338 3.75 3.75 0 1 1 4.56 0 5.63 5.63 0 0 1 2.636 2.338M10 13.749a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M5.625 9.374A.625.625 0 0 0 5 8.75a1.875 1.875 0 1 1 1.816-2.343.625.625 0 1 0 1.21-.313A3.125 3.125 0 1 0 2.892 9.18 5.3 5.3 0 0 0 .75 10.874a.625.625 0 0 0 1 .75A4.03 4.03 0 0 1 5 10a.625.625 0 0 0 .625-.625"
            fill="#3E97D1"
          />
        </svg>
      ),
      numberTitle: t("stats.customerSuffix"),
      color: "#EDEEFC",
    },
    {
      title: t("stats.activeCustomers"),
      number: customerStats.activeClintsCounter,
      icon: (
        <svg
          width={21}
          height={20}
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 17.5H8.833c-2.75 0-4.125 0-4.979-.854S3 14.416 3 11.666V2.5m3.333.833h.834m-.834 2.5h3.334"
            stroke="#3E97D1"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.667 16.667c.891-1.622 2.102-5.817 4.421-5.817 1.604 0 2.019 2.044 3.59 2.044 2.703 0 2.311-4.56 5.322-4.56"
            stroke="#3E97D1"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      numberTitle: t("stats.customerSuffix"),
      color: "#EDEEFC",
    },
    {
      title: t("stats.newCustomers"),
      number: customerStats.newClintsCounter,
      icon: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.833 8.333a.833.833 0 1 0 0 1.667.833.833 0 0 0 0-1.667m10-3.333H15V2.5a.834.834 0 0 0-.834-.833H5.833A.833.833 0 0 0 5 2.5V5h-.833a2.5 2.5 0 0 0-2.5 2.5v5a2.5 2.5 0 0 0 2.5 2.5H5v2.5a.833.833 0 0 0 .833.833h8.334A.833.833 0 0 0 15 17.5V15h.833a2.5 2.5 0 0 0 2.5-2.5v-5a2.5 2.5 0 0 0-2.5-2.5M6.666 3.333h6.667V5H6.667zm6.667 13.334H6.667v-3.334h6.666zm3.333-4.167a.833.833 0 0 1-.833.833H15V12.5a.834.834 0 0 0-.834-.833H5.833A.833.833 0 0 0 5 12.5v.833h-.833a.833.833 0 0 1-.834-.833v-5a.833.833 0 0 1 .833-.833h11.667a.833.833 0 0 1 .833.833z"
            fill="#3E97D1"
          />
        </svg>
      ),
      numberTitle: t("stats.customerSuffix"),
      color: "#EDEEFC",
    },
    {
      title: t("stats.customerSatisfaction"),
      number: customerStats.avgRate ?? 4.7,
      icon: (
        <svg
          width={23}
          height={22}
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.5 14.942-3.392 2.59a.8.8 0 0 1-.55.195.96.96 0 0 1-.527-.173 1.06 1.06 0 0 1-.354-.435.77.77 0 0 1-.012-.596l1.306-4.24-3.323-2.36a.78.78 0 0 1-.344-.481.95.95 0 0 1 .023-.55q.092-.252.32-.448a.82.82 0 0 1 .55-.194H9.3l1.33-4.4a1 1 0 0 1 .355-.493.87.87 0 0 1 .515-.171q.274 0 .516.172a.98.98 0 0 1 .355.492l1.329 4.4h4.102a.82.82 0 0 1 .55.195q.23.196.32.447.093.25.024.55-.069.299-.344.481l-3.323 2.36 1.306 4.24a.77.77 0 0 1-.01.596 1.05 1.05 0 0 1-.356.435.97.97 0 0 1-.527.173.8.8 0 0 1-.55-.196z"
            fill="#FECA00"
          />
        </svg>
      ),
      color: "#EDEEFC",
    },
    {
      title: t("stats.customerInteraction"),
      number: customerStats.InteractionPercentage,
      color: "#EDEEFC",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-primary-color font-semibold">{t("loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button className="inline-block font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer">
          <Link href="/customers/add">{t("addCustomer")}</Link>
        </button>
      </div>

      {/* section */}
      <div className="flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">{t("statistics")}</p>

        <div className="flex flex-row flex-wrap items-center gap-4 md:gap-8">
          {customersData.slice(0, 3).map((customer) => (
            <Card key={customer.title} {...customer} />
          ))}

          <div
            className="grow py-4 px-2.5 flex flex-col items-center justify-center gap-y-2 rounded-2xl"
            style={{ background: customersData[3].color }}
          >
            <div className="flex items-center gap-x-2">
              <span>{customersData[3].icon}</span>
              <span className="font-bold text-sm">
                {customersData[3].title}
              </span>
            </div>

            <p className="font-semibold text-sm text-primary-color flex gap-x-1">
              {t("stats.average")}{" "}
              <span>
                {Number.isFinite(customersData[3].number)
                  ? customersData[3].number.toFixed(1)
                  : t("stats.noData")}
              </span>
              {t("stats.outOf5")}
            </p>
          </div>

          <div
            className="grow py-4 px-2.5 flex flex-col items-start justify-center gap-y-6 rounded-2xl"
            style={{ background: customersData[4].color }}
          >
            <div className="w-full flex items-center justify-between gap-x-2">
              <span className="font-bold text-sm">
                {customersData[4].title}
              </span>
              <span className="text-text-normal text-sm">
                {Number.isFinite(customersData[4].number)
                  ? `${customersData[4].number}%`
                  : "———"}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-[#D0FFE1]">
              <div
                className="h-full rounded-full"
                style={{
                  width: Number.isFinite(customersData[4].number)
                    ? `${customersData[4].number}%`
                    : "0%",
                  background:
                    "linear-gradient(90deg, #FF0A09 0%, #06FD3C 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* section - Customer Details */}
      <div className="mt-8 flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">{t("customerDetails")}</p>
        <CustomerDetails />
      </div>

      {/* section - Best Customers */}
      <div className="mt-8 flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">{t("bestPerformingCustomers")}</p>
        <BestCustomers />
      </div>
    </div>
  );
}

// Card Component
const Card = (data: {
  title: string;
  number: number | null;
  icon?: JSX.Element;
  numberTitle?: string;
  color: string;
}) => {
  return (
    <div
      className="grow py-4 px-2.5 flex flex-col items-center justify-center gap-y-2 rounded-2xl"
      style={{ background: data.color }}
    >
      <div className="flex items-center gap-x-2">
        <span>{data.icon}</span>
        <span className="font-bold text-sm">{data.title}</span>
      </div>

      <p className="font-semibold text-sm text-primary-color flex gap-x-1">
        <span>{data.number}</span>
        <span>{data.numberTitle ?? ""}</span>
      </p>
    </div>
  );
};
