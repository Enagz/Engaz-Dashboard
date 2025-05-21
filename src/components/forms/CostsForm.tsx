import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormDialog from "./FormDialog";
import SuccessDialog from "./SuccessDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { enjazService } from "@/services/enjazService";
import { useLocale, useTranslations } from "next-intl";
import { CostsFormData, getCostsFormSchema } from "@/lib/schemas";

const CostsForm = ({
  open,
  setOpen,
  initialValues,
  mode,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues: CostsFormData;
  mode: "add" | "edit";
}) => {
  const [successOpen, setSuccessOpen] = useState(false);
  const t = useTranslations("costsForm");
  const locale = useLocale() as "ar" | "en";

  const schema = getCostsFormSchema(t);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      service: initialValues.service || "language",
      cost: initialValues.cost || 0,
      languge: initialValues.languge || "",
      arabiclanguge: initialValues.arabiclanguge || "",
      color: initialValues.color || "",
      arabiccolor: initialValues.arabiccolor || "",
      cover: initialValues.cover || "",
      arabiccover: initialValues.arabiccover || "",
      id: initialValues.id || "",
      serviceType: initialValues.serviceType || "",
    },
  });

  const service = watch("service");
  const id = watch("id");
  const serviceType = watch("serviceType");

  const onSubmit = async (data: CostsFormData) => {
    try {
      switch (data.service) {
        case "language":
          mode === "edit" && data.serviceType === "language"
            ? await enjazService.editLanguageCost(
                data.id!,
                data.languge!,
                data.arabiclanguge!,
                data.cost.toString()
              )
            : await enjazService.addLanguageCost(
                data.languge!,
                data.arabiclanguge!,
                data.cost.toString()
              );
          break;
        case "printing":
          mode === "edit" && data.serviceType === "printing"
            ? await enjazService.editPrintingColorCost(
                data.id!,
                data.color!,
                data.arabiccolor!,
                data.cost.toString()
              )
            : await enjazService.addPrintingColorCost(
                data.color!,
                data.arabiccolor!,
                data.cost.toString()
              );
          break;
        case "covering":
          mode === "edit" && data.serviceType === "covering"
            ? await enjazService.editPrintingCoverCost(
                data.id!,
                data.cover!,
                data.arabiccover!,
                data.cost.toString()
              )
            : await enjazService.addPrintingCoverCost(
                data.cover!,
                data.arabiccover!,
                data.cost.toString()
              );
          break;
      }

      setOpen(false);
      setSuccessOpen(true);
    } catch (error) {
      console.error("Failed to add service", error);
    }
  };

  return (
    <div>
      <FormDialog open={open} setOpen={setOpen}>
        <div className="p-0">
          <p className="text-xl font-bold">
            {mode === "add" ? t("addTitle") : t("editTitle")}
          </p>
          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10 grid sm:grid-cols-2 gap-6 sm:gap-x-12">
              <div className="flex flex-col gap-2">
                <label className="font-bold">{t("serviceType")}</label>
                <select
                  {...register("service")}
                  disabled={mode === "edit"}
                  className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                >
                  <option value="language">
                    {t("serviceOptions.language")}
                  </option>
                  <option value="printing">
                    {t("serviceOptions.printing")}
                  </option>
                  <option value="covering">
                    {t("serviceOptions.covering")}
                  </option>
                </select>
                {errors.service && (
                  <span className="text-red-500">{errors.service.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold">{t("price")}</label>
                <input
                  type="number"
                  {...register("cost")}
                  className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                />
                {errors.cost && (
                  <span className="text-red-500">{errors.cost.message}</span>
                )}
              </div>

              {/* Conditional Inputs */}
              {service === "language" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">{t("englishName")}</label>
                    <input
                      {...register("languge")}
                      className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                    />
                    {errors.languge && (
                      <span className="text-red-500">
                        {errors.languge.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">{t("arabicName")}</label>
                    <input
                      {...register("arabiclanguge")}
                      className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                    />
                    {errors.arabiclanguge && (
                      <span className="text-red-500">
                        {errors.arabiclanguge.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              {service === "printing" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">{t("englishName")}</label>
                    <input
                      {...register("color")}
                      className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                    />
                    {errors.color && (
                      <span className="text-red-500">
                        {errors.color.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">{t("arabicName")}</label>
                    <input
                      {...register("arabiccolor")}
                      className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                    />
                    {errors.arabiccolor && (
                      <span className="text-red-500">
                        {errors.arabiccolor.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              {service === "covering" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">{t("englishName")}</label>
                    <input
                      {...register("cover")}
                      className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                    />
                    {errors.cover && (
                      <span className="text-red-500">
                        {errors.cover.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">{t("arabicName")}</label>
                    <input
                      {...register("arabiccover")}
                      className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                    />
                    {errors.arabiccover && (
                      <span className="text-red-500">
                        {errors.arabiccover.message}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="gap-x-6 flex justify-end">
              <button
                type="submit"
                className="font-semibold px-6 py-2.5 bg-primary-color text-white rounded-[9px] hover:bg-primary-color/90 cursor-pointer"
              >
                {t("save")}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-semibold px-6 py-2.5 bg-error-color text-white rounded-[9px] hover:bg-error-color/90 cursor-pointer"
              >
                {t("cancel")}
              </button>
            </div>
          </form>
        </div>
      </FormDialog>

      <SuccessDialog
        open={successOpen}
        setOpen={setSuccessOpen}
        message={mode === "add" ? t("successAdd") : t("successEdit")}
      >
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSuccessOpen(false)}
            className="inline-block text-center font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
          >
            {t("continue")}
          </button>
          <button
            onClick={() => setSuccessOpen(false)}
            className="inline-block text-center font-semibold px-6 py-2.5 border border-primary-color text-primary-color rounded-sm hover:bg-global-bg cursor-pointer"
          >
            {t("cancel")}
          </button>
        </div>
      </SuccessDialog>
    </div>
  );
};

export default CostsForm;
