"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import EmployeeForm from "@/components/forms/EmployeeForm";
import SuccessDialog from "@/components/forms/SuccessDialog";
import { enjazService } from "@/services/enjazService";
import { EmployeeFormData } from "@/lib/schemas";

type Params = Promise<{ employeeId: string }>;

export default function EditEmployee(props: { params: Params }) {
  const t = useTranslations("editEmployee");
  const params = use(props.params);
  const employeeId = params.employeeId;

  const [initialData, setInitialData] = useState<EmployeeFormData | null>(null);
  const [open, setOpen] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();

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

  const handleUpdate = async (data: EmployeeFormData) => {
    try {
      await enjazService.updateEmployee(employeeId, data);
      setOpen(true);
      setGeneralError("");
    } catch (error) {
      console.error("Failed to update employee:", error);
      setGeneralError(t("updateError"));
    }
  };

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
        mode="edit"
        generalError={generalError}
        onSubmit={handleUpdate}
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
            onClick={() => router.back()}
            className="inline-block text-center font-semibold px-6 py-2.5 border border-primary-color text-primary-color rounded-sm hover:bg-global-bg cursor-pointer"
          >
            {t("cancel")}
          </button>
        </div>
      </SuccessDialog>
    </div>
  );
}
