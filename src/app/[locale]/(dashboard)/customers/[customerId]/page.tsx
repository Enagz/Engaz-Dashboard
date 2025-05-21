"use client";

import { use, useEffect, useState } from "react";
import CustomerStatistics from "@/components/charts/CustomerStatistics";
import CustomerDetailsForm from "@/components/forms/CustomerDetailsForm";
import OrderHistory from "@/components/tables/OrderHistory";
import { enjazService } from "@/services/enjazService";
import { CustomerFormData } from "@/lib/schemas";
import { useTranslations } from "next-intl";

type Params = Promise<{ customerId: string }>;

export default function CustomerDetails(props: { params: Params }) {
  const params = use(props.params);
  const customerId = params.customerId;
  const t = useTranslations("customerDetails");

  const [customerData, setCustomerData] = useState<CustomerFormData | null>(
    null
  );
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await enjazService.getClientInfo(customerId);
        const data = response.data.client;

        setCustomerData({
          name: data.name,
          email: data.email,
          countrycode: data.countrycode,
          phone: data.phone,
          type: data.type,
          joindate: data.joindate ? new Date(data.joindate) : new Date(),
        });
      } catch (error) {
        console.error("Error fetching customer info:", error);
        setGeneralError(t("errors.fetchFailed"));
      }
    };

    fetchCustomer();
  }, [customerId, t]);

  return (
    <div>
      <div className="mb-8 flex gap-1 text-lg text-text-normal">
        <span>{t("breadcrumbs.customers")}</span>
        <span>/</span>
        <span className="text-primary-color">{t("breadcrumbs.details")}</span>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
        <div className="grow flex flex-col gap-y-8">
          <p className="font-semibold text-2xl">{t("title")}</p>

          {customerData ? (
            <CustomerDetailsForm initialData={customerData} />
          ) : (
            <p className="text-center mt-10">{t("loading")}</p>
          )}
          {generalError && (
            <div className="text-red-500 text-sm mb-4">{generalError}</div>
          )}
        </div>

        <div className="lg:w-fit flex flex-col gap-y-8">
          <p className="font-semibold text-2xl">{t("statistics.title")}</p>

          <CustomerStatistics customerId={customerId} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">{t("orderHistory.title")}</p>

        <OrderHistory customerId={customerId} />
      </div>
    </div>
  );
}
