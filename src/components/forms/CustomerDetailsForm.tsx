"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/forms/Input";
import { User, Mail, Phone, CalendarDays, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CustomerFormData, getCustomerSchema } from "@/lib/schemas";
import { useLocale, useTranslations } from "next-intl";

const CustomerDetailsForm = ({
  initialData,
}: {
  initialData: CustomerFormData;
}) => {
  const { customerId } = useParams();
  const t = useTranslations("customerDetails.form");
  const locale = useLocale();

  const schema = getCustomerSchema(t);

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<CustomerFormData>({
    defaultValues: {
      ...initialData,
      joindate: initialData.joindate
        ? new Date(initialData.joindate)
        : new Date(),
    },
    resolver: yupResolver(schema),
  });

  return (
    <form className="bg-white p-6 rounded-2xl shadow-sm">
      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-x-4">
        <Link
          href={`${customerId}/edit`}
          className="font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
        >
          {t("editButton")}
        </Link>
        <Link
          href={`${customerId}/remove`}
          className="font-semibold px-6 py-2.5 bg-error-color text-white rounded-sm hover:bg-error-color/90 cursor-pointer"
        >
          {t("removeButton")}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="name">
            {t("labels.name")}
          </label>
          <Input icon={<User />}>
            <input
              disabled
              id="name"
              {...register("name")}
              placeholder={t("placeholders.name")}
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">{errors.name?.message}</span>
        </div>

        {/* Country Code */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="countrycode">
            {t("labels.countrycode")}
          </label>
          <Input icon={<Phone />}>
            <input
              disabled
              id="countrycode"
              {...register("countrycode")}
              placeholder={t("placeholders.countrycode")}
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
            {t("labels.phone")}
          </label>
          <Input icon={<Phone />}>
            <input
              disabled
              id="phone"
              {...register("phone")}
              placeholder={t("placeholders.phone")}
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">{errors.phone?.message}</span>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="type">
            {t("labels.type")}
          </label>
          <Input icon={<Users />}>
            <select
              disabled
              id="type"
              {...register("type")}
              className="bg-global-bg text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            >
              <option value="">{t("placeholders.type")}</option>
              <option value="عميل متكرر">{t("types.regular")}</option>
              <option value="عميل جديد">{t("types.new")}</option>
            </select>
          </Input>
          <span className="text-red-500 text-xs">{errors.type?.message}</span>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="email">
            {t("labels.email")}
          </label>
          <Input icon={<Mail />}>
            <input
              disabled
              id="email"
              {...register("email")}
              placeholder={t("placeholders.email")}
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">{errors.email?.message}</span>
        </div>

        {/* Joined At */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="joindate">
            {t("labels.joindate")}
          </label>
          <Input icon={<CalendarDays />}>
            <input
              disabled
              value={
                watch("joindate")
                  ? formatDate(new Date(watch("joindate")), locale)
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
    </form>
  );
};

export default CustomerDetailsForm;
