"use client";

import { useState } from "react";
import Input from "@/components/forms/Input";
import { User } from "lucide-react";
import { FormInfo } from "@/app/[locale]/(dashboard)/employees/[employeeId]/page";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getEmployeeDetailsSchema } from "@/lib/schemas";

const EmployeeDetailsForm = ({ info }: { info: FormInfo }) => {
  const t = useTranslations("addEmployee.form");

  const schema = getEmployeeDetailsSchema(t);

  const [disabled, setDisabled] = useState(true);
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: info.fullName,
      phoneNumber: info.phoneNumber,
      department: info.department,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("✅ Submitted Data:", data);
    setDisabled(true);
  };

  return (
    <div>
      <div className="bg-white py-6 px-8 rounded-2xl shadow-[0_0_4px_rgba(62,151,209,0.25)]">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex gap-x-4 items-start">
            <img
              src="/assets//userImage/user.jpg"
              alt="username"
              className="w-10 aspect-square rounded-full"
            />
            <div dir="rtl" className="flex flex-col items-end">
              <div className="font-bold text-xl">{info.fullName}</div>
              <div className="text-text-normal text-xs">
                {info.email || "-"}
              </div>
            </div>
          </div>

          <Link
            href={`${pathname}/edit`}
            className="font-semibold px-6 py-2.5 cursor-pointer bg-primary-color text-white rounded-sm hover:bg-primary-color/90"
          >
            {t("edit")}
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-6">
            {/* Full Name Field */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="fullname">
                {t("name")} :
              </label>
              <Input icon={<User />}>
                <input
                  disabled={disabled}
                  id="fullname"
                  {...register("fullName")}
                  placeholder="سالم علي الدوسري"
                  className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
                />
              </Input>
              <span className="text-red-500 text-xs">
                {errors.fullName?.message}
              </span>
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="phoneNumber">
                {t("phone")} :
              </label>
              <Input icon={<User />}>
                <input
                  disabled={disabled}
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="966 501234567"
                  className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
                />
              </Input>
              <span className="text-red-500 text-xs">
                {errors.phoneNumber?.message}
              </span>
            </div>

            {/* Department Field */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="department">
                {t("department")} :
              </label>
              <Input icon={<User />}>
                <select
                  disabled={disabled}
                  id="department"
                  {...register("department")}
                  className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
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
          </div>

          {!disabled && (
            <div className="mt-6 flex gap-x-6">
              <button
                type="submit"
                className="font-semibold px-6 py-2.5 cursor-pointer bg-primary-color text-white rounded-sm hover:bg-primary-color/90"
              >
                {t("save")}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                  setDisabled(true);
                }}
                className="font-semibold px-6 py-2.5 cursor-pointer bg-error-color text-white rounded-sm hover:bg-error-color/90"
              >
                {t("cancel")}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetailsForm;
