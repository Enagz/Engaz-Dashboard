"use client";

import Link from "next/link";
import { useState } from "react";
import CustomerForm from "@/components/forms/CustomerForm";
import SuccessDialog from "@/components/forms/SuccessDialog";
import { enjazService } from "@/services/enjazService";
import { useLocale, useTranslations } from "next-intl";
import { CustomerFormData } from "@/lib/schemas";

export default function AddCustomer() {
  const [open, setOpen] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const t = useTranslations("addCustomer.form");
  const page = useTranslations("addCustomer");

  return (
    <div>
      <div className="flex gap-1 text-lg text-text-normal">
        <span>{page("breadcrumbCustomers")}</span>
        <span>/</span>
        <span className="text-primary-color">{page("breadcrumbAdd")}</span>
      </div>

      <p className="mt-8 mb-10 font-semibold text-2xl">{page("pageTitle")}</p>

      <CustomerForm
        initialData={{
          name: "",
          email: "",
          countrycode: "",
          phone: "",
          type: "",
          joindate: new Date(),
        }}
        mode="add"
        onSubmit={async (data: CustomerFormData) => {
          try {
            setGeneralError("");
            await enjazService.addClient(data);
            setOpen(true);
          } catch (error: any) {
            const message = error?.response?.data?.message || t("generalError");
            setGeneralError(message);
          }
        }}
        generalError={generalError}
      />

      <SuccessDialog
        open={open}
        setOpen={setOpen}
        message={t("successMessage")}
      >
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/customers"
            className="inline-block text-center font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
          >
            {t("continue")}
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-block text-center font-semibold px-6 py-2.5 border border-primary-color text-primary-color rounded-sm hover:bg-global-bg cursor-pointer"
          >
            {t("addAnother")}
          </button>
        </div>
      </SuccessDialog>
    </div>
  );
}
