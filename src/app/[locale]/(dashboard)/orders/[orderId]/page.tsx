"use client";

import DataDisplay from "@/components/forms/DataDisplay";
import OrderInfo from "@/components/tables/OrderDetails";
import { enjazService } from "@/services/enjazService";
import { use, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Params = Promise<{ orderId: string }>;

export default function OrderDetails(props: { params: Params }) {
  const params = use(props.params);
  const orderId = params.orderId;

  const t = useTranslations("orderDetailsPage");

  const [orderDetails, setOrderDetails] = useState({
    client: {},
    order_details: {
      number: undefined,
      employee: undefined,
      type: undefined,
      status: undefined,
      cost: undefined,
      delivery: undefined,
      numberofletters: undefined,
    },
    summary: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await enjazService.getOrderDetails(orderId);
        setOrderDetails(response.data);
      } catch (err: any) {
        setError(t("error"));
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, t]);

  if (loading) return <div>{t("loading")}</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="mb-8 flex gap-1 text-lg text-text-normal">
        <span>{t("breadcrumbOrders")}</span>
        <span>/</span>
        <span className="text-primary-color">{t("breadcrumbDetails")}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grow flex flex-col items-start gap-y-6">
          <p className="font-semibold text-2xl">{t("summary")}</p>
          <DataDisplay data={orderDetails.summary} />
        </div>

        <div className="grow flex flex-col items-start gap-y-6">
          <p className="font-semibold text-2xl">{t("clientData")}</p>
          <DataDisplay data={orderDetails.client} />
        </div>
      </div>

      <div className="mt-8 grow flex flex-col items-start gap-y-6">
        <p className="font-semibold text-2xl">{t("details")}</p>

        <OrderInfo
          data={[
            {
              requestId: orderDetails.order_details?.number ?? "—",
              employee: orderDetails.order_details?.employee ?? "—",
              serviceType: orderDetails.order_details?.type ?? "—",
              status: orderDetails.order_details?.status ?? "—",
              amount: orderDetails.order_details?.cost ?? 0,
              deliveryMethod: orderDetails.order_details?.delivery ?? "—",
              papersNumber: orderDetails.order_details?.numberofletters ?? 0,
            },
          ]}
        />
      </div>
    </div>
  );
}
