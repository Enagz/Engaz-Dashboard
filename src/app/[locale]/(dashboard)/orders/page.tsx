"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import OrderStatistics from "@/components/charts/OrderStatistics";
import ServicesCompletion from "@/components/charts/ServicesCompletion";
import CurrentOrders from "@/components/tables/CurrentOrders";
import { enjazService } from "@/services/enjazService";

export default function Orders() {
  const t = useTranslations("ordersPage");

  const [orderType, setOrderType] = useState<"translation" | "printing">(
    "translation"
  );
  const [orderStatus, setOrderStatus] = useState<
    "new" | "inprogress" | "finished" | "cancelled"
  >("new");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await enjazService.getOrders(orderType, orderStatus);
        if (response && response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.warn("Unexpected response format:", response);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orderType, orderStatus]);

  return (
    <div className="flex flex-col gap-y-9">
      {/* Statistics section */}
      <div className="flex flex-col xl:flex-row justify-stretch gap-8 xl:gap-12">
        <div className="flex-1 flex flex-col gap-y-6">
          <p className="font-semibold text-2xl">{t("orderStats")}</p>
          <OrderStatistics />
        </div>

        <div className="flex-[1.3] flex flex-col gap-y-6">
          <p className="font-semibold text-2xl">{t("orderStats")}</p>
          <ServicesCompletion />
        </div>
      </div>

      {/* Orders section */}
      <div className="flex-1 flex flex-col gap-y-6">
        <div className="flex items-center gap-8">
          <p className="font-semibold text-2xl">{t("currentOrders")}</p>
          <OrdersTabs
            activeTab={orderType}
            setActiveTab={(tab) =>
              setOrderType(tab as "translation" | "printing")
            }
          />
        </div>

        <FilterTabs
          activeTab={orderStatus}
          setActiveTab={(tab) =>
            setOrderStatus(
              tab as "new" | "inprogress" | "finished" | "cancelled"
            )
          }
        />

        <CurrentOrders orders={orders} loading={loading} />
      </div>
    </div>
  );
}

interface OrdersTabsProps {
  activeTab: "translation" | "printing";
  setActiveTab: (tab: "translation" | "printing") => void;
}

const OrdersTabs = ({ activeTab, setActiveTab }: OrdersTabsProps) => {
  const t = useTranslations("ordersPage");

  const tabs = [
    { id: "translation", title: t("translationOrders") },
    { id: "printing", title: t("printingOrders") },
  ];

  return (
    <div className="flex gap-1 bg-button-hover px-4 py-2 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as "translation" | "printing")}
          className={`w-fit px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all ${
            activeTab === tab.id
              ? "bg-primary-color text-white"
              : "hover:bg-primary-color/50 text-black"
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

interface FilterTabsProps {
  activeTab: "new" | "inprogress" | "finished" | "cancelled";
  setActiveTab: (tab: "new" | "inprogress" | "finished" | "cancelled") => void;
}

const FilterTabs = ({ activeTab, setActiveTab }: FilterTabsProps) => {
  const t = useTranslations("ordersPage");

  const tabs = [
    { id: "new", title: t("new") },
    { id: "inprogress", title: t("inprogress") },
    { id: "finished", title: t("finished") },
    { id: "cancelled", title: t("cancelled") },
  ];

  return (
    <div className="flex gap-4 xl:gap-16">
      {tabs.map((tab) => (
        <p
          key={tab.id}
          onClick={() =>
            setActiveTab(
              tab.id as "new" | "inprogress" | "finished" | "cancelled"
            )
          }
          className={`w-fit px-2.5 py-1 border-b-2 text-lg cursor-pointer transition-all ${
            activeTab === tab.id
              ? "text-primary-color border-primary-color font-bold"
              : "hover:text-primary-color border-transparent text-black font-medium"
          }`}
        >
          {tab.title}
        </p>
      ))}
    </div>
  );
};
