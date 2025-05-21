"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import CustomerForm from "@/components/forms/CustomerForm";
import SuccessDialog from "@/components/forms/SuccessDialog";
import { enjazService } from "@/services/enjazService";
import { CustomerFormData } from "@/lib/schemas";
import { useTranslations } from "next-intl";

type Params = Promise<{ customerId: string }>;

export default function EditCustomer(props: { params: Params }) {
  const t = useTranslations("editCustomer");
  const params = use(props.params);
  const customerId = params.customerId;

  const [customerData, setCustomerData] = useState<CustomerFormData | null>(
    null
  );
  const [generalError, setGeneralError] = useState("");
  const [open, setOpen] = useState(false);

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
        setGeneralError(t("error.loadCustomer"));
      }
    };

    fetchCustomer();
  }, [customerId, t]);

  if (!customerData) {
    return <p className="text-center mt-10">{t("loading")}</p>;
  }

  const handleSubmit = async (data: CustomerFormData) => {
    try {
      setGeneralError(""); // Reset error
      await enjazService.updateClient(customerId, data);
      setOpen(true);
    } catch (error: any) {
      const message = error?.response?.data?.message || t("error.updateFailed");
      setGeneralError(message);
    }
  };

  return (
    <div>
      <div className="flex gap-1 text-lg text-text-normal">
        <span>{t("breadcrumb.customers")}</span>
        <span>/</span>
        <span className="text-primary-color">
          {t("breadcrumb.editCustomer")}
        </span>
      </div>

      <p className="mt-8 mb-10 font-semibold text-2xl">{t("title")}</p>

      <CustomerForm
        initialData={customerData}
        mode="edit"
        generalError={generalError}
        onSubmit={handleSubmit}
      />

      <SuccessDialog open={open} setOpen={setOpen} message={t("success")}>
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/customers"
            className="inline-block text-center font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
          >
            {t("continue")}
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="inline-block text-center font-semibold px-6 py-2.5 border border-primary-color text-primary-color rounded-sm hover:bg-global-bg cursor-pointer"
          >
            {t("addNewCustomer")}
          </button>
        </div>
      </SuccessDialog>
    </div>
  );
}
