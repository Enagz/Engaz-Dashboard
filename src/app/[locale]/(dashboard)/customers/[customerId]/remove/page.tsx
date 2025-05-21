"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import CustomerForm from "@/components/forms/CustomerForm";
import SuccessDialog from "@/components/forms/SuccessDialog";
import ConfirmDialog from "@/components/forms/ConfirmDialog";
import { enjazService } from "@/services/enjazService";
import { useTranslations } from "next-intl";
import { CustomerFormData } from "@/lib/schemas";

type Params = Promise<{ customerId: string }>;

export default function RemoveCustomer(props: { params: Params }) {
  const t = useTranslations("removeCustomer");
  const params = use(props.params);
  const customerId = params.customerId;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
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
        setGeneralError(t("error.loadCustomer"));
      }
    };

    fetchCustomer();
  }, [customerId, t]);

  if (!customerData) {
    return <p className="text-center mt-10">{t("loading")}</p>;
  }

  return (
    <div>
      <div className="flex gap-1 text-lg text-text-normal">
        <span>{t("breadcrumb.customers")}</span>
        <span>/</span>
        <span className="text-primary-color">
          {t("breadcrumb.removeCustomer")}
        </span>
      </div>

      <p className="mt-8 mb-10 font-semibold text-2xl">{t("title")}</p>

      <CustomerForm
        initialData={customerData}
        mode="remove"
        generalError={generalError}
        onSubmit={() => setOpenConfirm(true)}
      />

      <ConfirmDialog
        open={openConfirm}
        setOpen={setOpenConfirm}
        message={{
          title: t("confirm.title"),
          description: t("confirm.description"),
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={async (e) => {
              e.preventDefault();
              try {
                await enjazService.deleteClient(customerId);
                setOpenConfirm(false);
                setOpenSuccess(true);
              } catch (error: any) {
                console.error("Failed to delete client:", error);
                setGeneralError(
                  error?.response?.data?.message || t("error.deleteFailed")
                );
                setOpenConfirm(false);
              }
            }}
            className="inline-block text-center font-semibold px-6 py-2.5 bg-error-color text-white rounded-sm hover:bg-error-color/90 cursor-pointer"
          >
            {t("confirm.delete")}
          </button>
          <button
            onClick={() => setOpenConfirm(false)}
            className="inline-block text-center font-semibold px-6 py-2.5 border border-text-normal text-text-normal rounded-sm hover:bg-global-bg cursor-pointer"
          >
            {t("confirm.cancel")}
          </button>
        </div>
      </ConfirmDialog>

      <SuccessDialog
        open={openSuccess}
        setOpen={setOpenSuccess}
        message={t("success")}
      >
        <div className="grid gap-4">
          <Link
            href="/customers"
            className="inline-block text-center font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
          >
            {t("continue")}
          </Link>
        </div>
      </SuccessDialog>
    </div>
  );
}
