"use client";

import Link from "next/link";
import { useState } from "react";
import EmployeeForm from "@/components/forms/EmployeeForm";
import SuccessDialog from "@/components/forms/SuccessDialog";
import { enjazService } from "@/services/enjazService";
import { useLocale, useTranslations } from "next-intl";

export default function AddEmployee() {
  const [open, setOpen] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const t = useTranslations("addEmployee");

  return (
    <div>
      <div className="flex gap-1 text-lg text-text-normal">
        <span>{t("employees")}</span>
        <span>/</span>
        <span className="text-primary-color">{t("addEmployee")}</span>
      </div>

      <p className="mt-8 mb-10 font-semibold text-2xl">{t("addNewEmployee")}</p>

      <EmployeeForm
        initialData={{
          name: "",
          email: "",
          phone: "",
          password: "",
          department: "",
        }}
        mode="add"
        generalError={generalError}
        onSubmit={async (data) => {
          try {
            await enjazService.addEmployee(data);
            setOpen(true);
            setGeneralError("");
          } catch (error: any) {
            console.error("Failed to add employee:", error);
            setGeneralError(
              error?.response?.data?.message || t("generalError")
            );
          }
        }}
      />

      <SuccessDialog
        open={open}
        setOpen={setOpen}
        message={t("successMessage")}
      >
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/employees"
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
