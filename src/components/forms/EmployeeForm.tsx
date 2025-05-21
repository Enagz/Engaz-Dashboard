"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "@/components/forms/Input";
import { User, Mail, Phone, Users, LockIcon, EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { EmployeeFormData, getEmployeeSchema } from "@/lib/schemas";

type EmployeeFormProps = {
  initialData: EmployeeFormData;
  mode: "add" | "edit" | "remove";
  onSubmit: (data: EmployeeFormData) => void;
  generalError?: string;
};

const EmployeeForm = ({
  initialData,
  mode,
  onSubmit,
  generalError,
}: EmployeeFormProps) => {
  const t = useTranslations("addEmployee.form");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const isReadOnly = mode === "remove";

  const schema = getEmployeeSchema(t);

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: { ...initialData },
    resolver: mode === "remove" ? undefined : yupResolver(schema),
  });

  const buttons = (mode: string) => {
    if (mode === "add" || mode === "edit") {
      return (
        <>
          <button
            type="submit"
            className="font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
          >
            {t("save")}
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
      onSubmit={
        mode === "edit"
          ? async (e) => {
              e.preventDefault();

              const data = getValues();

              // Determine which fields to validate
              const fieldsToValidate: (
                | "department"
                | "email"
                | "password"
                | "name"
                | "phone"
              )[] =
                data.password === ""
                  ? (Object.keys(data).filter(
                      (field) => field !== "password"
                    ) as (
                      | "department"
                      | "email"
                      | "password"
                      | "name"
                      | "phone"
                    )[])
                  : (Object.keys(data) as (
                      | "department"
                      | "email"
                      | "password"
                      | "name"
                      | "phone"
                    )[]);

              const isValid = await trigger(fieldsToValidate);

              if (!isValid) return;

              if (data.password === "") {
                const { password, ...rest } = data;
                onSubmit(rest as EmployeeFormData);
              } else {
                onSubmit(data);
              }
            }
          : handleSubmit(onSubmit)
      }
      className="bg-white p-6 rounded-2xl shadow-sm max-w-2xl"
    >
      <div className="grid grid-cols-1 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="name">
            {t("name")} :
          </label>
          <Input icon={<User />}>
            <input
              id="name"
              {...register("name")}
              readOnly={isReadOnly}
              placeholder="عبدالله محمد السالم"
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">{errors.name?.message}</span>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="email">
            {t("email")} :
          </label>
          <Input icon={<Mail />}>
            <input
              id="email"
              {...register("email")}
              readOnly={isReadOnly}
              placeholder="abdllah@email.com"
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">{errors.email?.message}</span>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="phone">
            {t("phone")} :
          </label>
          <Input icon={<Phone />}>
            <input
              id="phone"
              {...register("phone")}
              readOnly={isReadOnly}
              placeholder="+966 55 123 4567"
              className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <span className="text-red-500 text-xs">{errors.phone?.message}</span>
        </div>

        {/* Password */}
        <div className="relative flex flex-col gap-2">
          <label className="font-semibold" htmlFor="password">
            {t("password")} :
          </label>
          <Input icon={<LockIcon />}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              readOnly={isReadOnly}
              className="bg-global-bg text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            />
          </Input>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 bottom-1/2 translate-y-1/2 top-1/2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <span className="text-red-500 text-xs">
            {errors.password?.message}
          </span>
        </div>

        {/* Department */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="department">
            {t("department")} :
          </label>
          <Input icon={<Users />}>
            <select
              id="department"
              {...register("department")}
              disabled={isReadOnly}
              className="bg-global-bg text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
            >
              <option value="">{t("selectDepartment")}</option>
              <option value="translation">{t("translation")}</option>
              <option value="printing">{t("printing")}</option>
            </select>
          </Input>
          <span className="text-red-500 text-xs">
            {errors.department?.message}
          </span>
        </div>

        {generalError && (
          <div className="text-red-500 text-sm mb-4">{generalError}</div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-x-4">{buttons(mode)}</div>
    </form>
  );
};

export default EmployeeForm;
