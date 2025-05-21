"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/components/forms/Input";
import { User, Mail, Phone, CalendarDays, Users } from "lucide-react";
import { formatDateInput } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";
import { CustomerFormData, getCustomerSchema } from "@/lib/schemas";

const CustomerForm = ({
  initialData,
  mode,
  onSubmit,
  generalError,
}: {
  initialData?: CustomerFormData;
  mode: "add" | "edit" | "remove";
  onSubmit: (data: CustomerFormData) => void;
  generalError?: string;
}) => {
  const t = useTranslations("addCustomer.form");
  const router = useRouter();

  const isReadOnly = mode === "remove";

  const schema = getCustomerSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CustomerFormData>({
    defaultValues: {
      ...initialData,
    },
    resolver: mode === "remove" ? undefined : yupResolver(schema),
  });

  const buttons = () => {
    if (mode === "add" || mode === "edit") {
      return (
        <>
          <button
            type="submit"
            className="font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
          >
            {t("submit")}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="font-semibold px-6 py-2.5 bg-error-color text-white rounded-sm hover:bg-error-color/90 cursor-pointer"
          >
            {t("cancel")}
          </button>
        </>
      );
    } else if (mode === "remove") {
      return (
        <button
          type="submit"
          className="font-semibold px-6 py-2.5 bg-error-color text-white rounded-sm hover:bg-error-color/90 cursor-pointer"
        >
          {t("delete")}
        </button>
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-2xl shadow-sm max-w-2xl"
    >
      <div className="grid grid-cols-1 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="name">
            {t("name")}
          </label>
          <Input icon={<User />}>
            <input
              id="name"
              {...register("name")}
              readOnly={isReadOnly}
              placeholder={t("namePlaceholder")}
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">{errors.name?.message}</span>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="email">
            {t("email")}
          </label>
          <Input icon={<Mail />}>
            <input
              id="email"
              {...register("email")}
              readOnly={isReadOnly}
              placeholder={t("emailPlaceholder")}
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">{errors.email?.message}</span>
        </div>

        {/* Country Code */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="countrycode">
            {t("countryCode")}
          </label>
          <Input icon={<Phone />}>
            <input
              id="countrycode"
              {...register("countrycode")}
              readOnly={isReadOnly}
              placeholder={t("countryCodePlaceholder")}
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">
            {errors.countrycode?.message}
          </span>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="phone">
            {t("phone")}
          </label>
          <Input icon={<Phone />}>
            <input
              id="phone"
              {...register("phone")}
              readOnly={isReadOnly}
              placeholder={t("phonePlaceholder")}
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">{errors.phone?.message}</span>
        </div>

        {/* Join Date */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="joindate">
            {t("joinDate")}
          </label>
          <Input icon={<CalendarDays />}>
            <input
              type="date"
              id="joindate"
              {...register("joindate")}
              readOnly={isReadOnly}
              value={
                watch("joindate")
                  ? formatDateInput(new Date(watch("joindate")))
                  : ""
              }
              className="bg-global-bg text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">
            {errors.joindate?.message}
          </span>
        </div>
      </div>

      {/* Type */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="type">
          {t("type")}
        </label>
        <Input icon={<Users />}>
          <select
            id="type"
            {...register("type")}
            disabled={isReadOnly}
            className="bg-global-bg text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
          >
            <option value="">{t("typeSelect")}</option>
            <option value="عميل متكرر">{t("typeRepeated")}</option>
            <option value="عميل جديد">{t("typeNew")}</option>
          </select>
        </Input>
        <span className="text-red-500 text-xs">{errors.type?.message}</span>
      </div>

      {/* General Error */}
      {generalError && (
        <div className="text-red-500 text-sm mb-4">{generalError}</div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-x-4">{buttons()}</div>
    </form>
  );
};

export default CustomerForm;
