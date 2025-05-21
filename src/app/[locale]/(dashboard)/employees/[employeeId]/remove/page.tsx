"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import EmployeeForm from "@/components/forms/EmployeeForm";
import ConfirmDialog from "@/components/forms/ConfirmDialog";
import SuccessDialog from "@/components/forms/SuccessDialog";
import { enjazService } from "@/services/enjazService";
import { EmployeeFormData } from "@/lib/schemas";

type Params = Promise<{ employeeId: string }>;

export default function RemoveEmployee(props: { params: Params }) {
  const t = useTranslations("removeEmployee");
  const locale = useLocale() as "ar" | "en";
  const params = use(props.params);
  const employeeId = params.employeeId;

  const [initialData, setInitialData] = useState<EmployeeFormData | null>(null);
  const [generalError, setGeneralError] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await enjazService.getEmployeeDetails(employeeId);
        const data = response.data.profile;

        setInitialData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: "",
          department: data.department,
        });
      } catch (err) {
        console.error("Failed to fetch employee details", err);
        setGeneralError(t("fetchError"));
      }
    };

    if (employeeId) fetchEmployee();
  }, [employeeId, t]);

  if (!initialData) {
    return <p className="text-center mt-10">{t("loading")}</p>;
  }

  return (
    <div>
      <div className="flex gap-1 text-lg text-text-normal">
        <span>{t("breadcrumb")}</span>
        <span>/</span>
        <span className="text-primary-color">{t("breadcrumbAction")}</span>
      </div>

      <p className="mt-8 mb-10 font-semibold text-2xl">{t("title")}</p>

      <EmployeeForm
        initialData={initialData}
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
            onClick={async () => {
              try {
                await enjazService.removeEmployee(employeeId);
                setOpenConfirm(false);
                setOpenSuccess(true);
              } catch (error) {
                console.error("Failed to remove employee", error);
                setOpenConfirm(false);
                setGeneralError(t("removeError"));
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
        message={t("successMessage")}
      >
        <div className="grid gap-4">
          <Link
            href="/employees"
            className="inline-block text-center font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
          >
            {t("continue")}
          </Link>
        </div>
      </SuccessDialog>
    </div>
  );
}
