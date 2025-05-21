"use client";
import LatestOrders from "@/components/tables/LatestOrders";
import NewOrdes from "@/components/tables/NewOrders";
import UrgentOrders from "@/components/tables/UrgentOrders";
import { enjazService } from "@/services/enjazService";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserRole } from "../../utils/auth.utils";
import { useTranslations } from "next-intl";

// Define the StatCard type
interface StatCard {
  title: string;
  number: number;
  percentage: number;
  color: string;
  numberTitle: string;
}

export default function Home() {
  const t = useTranslations("home");

  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<"superadmin" | "admin" | "employee" | null>(
    null
  );
  const [statsCards, setStatsCards] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch role and overview data
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const userRole = getUserRole();
        if (!userRole) {
          setError(t("unauthorized"));
          setLoading(false);
          return;
        }

        setRole(userRole);

        const response = await enjazService.getHomeOverview();
        const data = response.data;

        let mappedStats: StatCard[] = [];

        if (userRole === "superadmin" || userRole === "admin") {
          mappedStats = [
            {
              title: t("stats.totalOrders"),
              number: data.allOrders?.counter ?? 0,
              percentage: data.allOrders?.percentage ?? 0,
              color: "#EDEEFC",
              numberTitle: t("stats.ordersCountSuffix"),
            },
            {
              title: t("stats.completedOrders"),
              number: data.completedOrders?.counter ?? 0,
              percentage: data.completedOrders?.percentage ?? 0,
              color: "#EDEEFC",
              numberTitle: t("stats.ordersCountSuffix"),
            },
            {
              title: t("stats.inProgressOrders"),
              number: data.inProgress?.counter ?? 0,
              percentage: data.inProgress?.percentage ?? 0,
              color: "#EDEEFC",
              numberTitle: t("stats.ordersCountSuffix"),
            },
            {
              title: t("stats.revenue"),
              number: data.revenue?.current ?? 0,
              percentage: data.revenue?.percentage ?? 0,
              color: "#EDEEFC",
              numberTitle: t("stats.currency"),
            },
          ];
        } else if (userRole === "employee") {
          mappedStats = [
            {
              title: t("stats.receivedOrders"),
              number: data.totalorders?.count ?? 0,
              percentage: data.totalorders?.percentage ?? 0,
              color: "#EDEEFC",
              numberTitle: t("stats.ordersCountSuffix"),
            },
            {
              title: t("stats.completedOrders"),
              number: data.completedorders?.count ?? 0,
              percentage: data.completedorders?.percentage ?? 0,
              color: "#EDEEFC",
              numberTitle: t("stats.ordersCountSuffix"),
            },
            {
              title: t("stats.inProgressOrders"),
              number: data.inprogress?.count ?? 0,
              percentage: data.inprogress?.percentage ?? 0,
              color: "#EDEEFC",
              numberTitle: t("stats.ordersCountSuffix"),
            },
            {
              title: t("stats.avgCompletionTime"),
              number: Math.abs(Math.floor(data.avgtime?.time / 3600)) || 0,
              percentage: data.avgtime?.percentage ?? 0,
              color: "#EDEEFC",
              numberTitle: t("stats.hoursPerOrder"),
            },
          ];
        }

        setStatsCards(mappedStats);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load overview", err);
        setError(t("error"));
        setLoading(false);
      }
    };

    fetchOverview();
  }, [t]);

  if (loading) return <div>{t("loading")}</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Render based on role
  if (role === "superadmin" || role === "admin") {
    return (
      <div className="space-y-10">
        {/* section */}
        <div className="flex flex-col gap-y-6">
          <p className="font-semibold text-2xl">{t("overview")}</p>

          <div className="flex flex-row flex-wrap items-center gap-4 md:gap-8">
            {statsCards.map((item) => (
              <Card key={item.title} {...item} />
            ))}
          </div>
        </div>

        {/* section */}
        <div className="flex flex-col gap-y-8">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-2xl">{t("latestOrders")}</p>
            <Link
              href="/orders"
              className="text-primary-color flex items-center gap-2 underline"
            >
              {t("viewAll")}
              <ChevronRight className="size-5" />
            </Link>
          </div>

          <LatestOrders />
        </div>
      </div>
    );
  } else if (role === "employee") {
    return (
      <div className="space-y-10">
        {/* section */}
        <div className="flex flex-col gap-y-6">
          <p className="font-semibold text-2xl">{t("overview")}</p>

          <div className="flex flex-row flex-wrap items-center gap-4 md:gap-8">
            {statsCards.map((item) => (
              <Card key={item.title} {...item} />
            ))}
          </div>
        </div>

        {/* section */}
        <div className="flex flex-col gap-y-8">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-2xl">{t("newOrders")}</p>
            <Link
              href="/orders"
              className="text-primary-color flex items-center gap-2 underline"
            >
              {t("viewAll")}
              <ChevronRight className="size-5" />
            </Link>
          </div>

          <NewOrdes />
        </div>

        {/* section */}
        <div className="flex flex-col gap-y-8">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-2xl">{t("urgentOrders")}</p>
            <Link
              href="/orders"
              className="text-primary-color flex items-center gap-2 underline"
            >
              {t("viewAll")}
              <ChevronRight className="size-5" />
            </Link>
          </div>

          <UrgentOrders />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-10 text-red-500">{t("unauthorized")}</div>
  );
}

// Card Component (as inline)
const Card = ({ title, number, percentage, color, numberTitle }: any) => {
  return (
    <div
      className="grow py-4 px-2.5 flex flex-col items-center justify-center gap-y-2 rounded-2xl"
      style={{ background: color }}
    >
      <div className="flex items-center gap-x-2">
        <span className="font-bold text-sm">{title}</span>
      </div>

      <div className="font-semibold text-sm text-text-normal flex gap-x-1">
        <span>{number}</span>
        <span>{numberTitle}</span>
        {percentage !== undefined && (
          <div className="text-xs text-primary-color flex gap-x-1">
            {percentage > 0 ? (
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.455 5.608L14 4l-1.38 5.606-1.722-1.653-2.777 2.893a.5.5 0 0 1-.722 0L5.36 8.722l-3 3.124a.5.5 0 0 1-.72-.692L5 7.654a.5.5 0 0 1 .72 0l2.04 2.124 2.417-2.517z"
                  fill="#3E97D1"
                />
              </svg>
            ) : percentage < 0 ? (
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.545 10.392L2 12l1.38-5.606 1.722 1.653 2.777-2.893a.5.5 0 0 1 .722 0l2.039 2.124 3-3.124a.5.5 0 0 1 .72.692L11 8.346a.5.5 0 0 1-.72 0l-2.04-2.124L5.823 8.739z"
                  fill="#3E97D1"
                />
              </svg>
            ) : null}
            <span>{Math.abs(percentage).toFixed(2)} %</span>
          </div>
        )}
      </div>
    </div>
  );
};
