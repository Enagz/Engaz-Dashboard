"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";

import FormDialog from "./FormDialog";
import SuccessDialog from "./SuccessDialog";
import { enjazService } from "@/services/enjazService";
import { getOrdersFormSchema } from "@/lib/schemas";

type OrdersFormData = {
  numberofletters: string;
  status: string;
  cost: string;
  id?: string;
};

const OrdersForm = ({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues: OrdersFormData;
}) => {
  const t = useTranslations("ordersForm");
  const [successOpen, setSuccessOpen] = useState(false);

  const schema = getOrdersFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrdersFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      numberofletters: initialValues.numberofletters || "",
      status: initialValues.status || "",
      cost: initialValues.cost || "",
      id: initialValues.id || undefined,
    },
  } as any);

  const onSubmit = async (data: OrdersFormData) => {
    try {
      if (data.id) {
        await enjazService.editOrder(data.id, {
          numberofletters: data.numberofletters,
          status: data.status,
          cost: data.cost,
        });
        setSuccessOpen(true);
      }
    } catch (error) {
      console.error("Error editing order:", error);
    }
    setOpen(false);
    setSuccessOpen(true);
  };

  return (
    <div>
      <FormDialog open={open} setOpen={setOpen}>
        <div className="p-0">
          <p className="text-xl font-bold">{t("editTitle")}</p>

          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10 grid sm:grid-cols-2 gap-6 sm:gap-x-12">
              {/* عدد الأحرف */}
              <div className="flex flex-col gap-2">
                <label htmlFor="numberofletters" className="font-bold">
                  {t("numberofletters")}
                </label>
                <input
                  type="number"
                  {...register("numberofletters")}
                  className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                />
                {errors.numberofletters && (
                  <p className="text-error-color text-sm">
                    {errors.numberofletters.message}
                  </p>
                )}
              </div>

              {/* الحالة */}
              <div className="flex flex-col gap-2">
                <label htmlFor="status" className="font-bold">
                  {t("status")}
                </label>
                <select
                  {...register("status")}
                  className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("chooseStatus")}
                  </option>
                  <option value="Under Review">
                    {t("statusOptions.under_review")}
                  </option>
                  <option value="Offer Sent">
                    {t("statusOptions.offer_sent")}
                  </option>
                  <option value="In Progress">
                    {t("statusOptions.in_progress")}
                  </option>
                  <option value="In delivery">
                    {t("statusOptions.in_delivery")}
                  </option>
                  <option value="Finished">
                    {t("statusOptions.finished")}
                  </option>
                  <option value="Cancelled">
                    {t("statusOptions.cancelled")}
                  </option>
                </select>
                {errors.status && (
                  <p className="text-error-color text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* التكلفة */}
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="cost" className="font-bold">
                  {t("cost")}
                </label>
                <input
                  type="number"
                  {...register("cost")}
                  className="px-3 py-1.5 rounded-[14px] border border-line-break text-text-normal"
                />
                {errors.cost && (
                  <p className="text-error-color text-sm">
                    {errors.cost.message}
                  </p>
                )}
              </div>
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
                onClick={() => setSuccessOpen(false)}
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
        message={t("success")}
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

export default OrdersForm;
