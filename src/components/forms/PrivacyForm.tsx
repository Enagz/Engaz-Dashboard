import { useState } from "react";
import FormDialog from "./FormDialog";
import SuccessDialog from "./SuccessDialog";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

const PrivacyForm = ({
  open,
  setOpen,
  initialValues,
  submitHandler,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues: any;
  submitHandler: (values: any) => void;
}) => {
  const [successOpen, setSuccessOpen] = useState(false);
  const t = useTranslations("privacyForm");
  const te = useTranslations("privacyForm.errors");

  const schema = Yup.object({
    type: Yup.string()
      .required(te("typeRequired"))
      .oneOf(["conditions", "privacy", "usage"], te("invalidType")),

    arabicConditions: Yup.string().when("type", {
      is: "conditions",
      then: (schema) => schema.required(te("arabicConditions")),
      otherwise: (schema) => schema.strip(),
    }),

    englishConditions: Yup.string().when("type", {
      is: "conditions",
      then: (schema) => schema.required(te("englishConditions")),
      otherwise: (schema) => schema.strip(),
    }),

    arabicPrivacy: Yup.string().when("type", {
      is: "privacy",
      then: (schema) => schema.required(te("arabicPrivacy")),
      otherwise: (schema) => schema.strip(),
    }),

    englishPrivacy: Yup.string().when("type", {
      is: "privacy",
      then: (schema) => schema.required(te("englishPrivacy")),
      otherwise: (schema) => schema.strip(),
    }),

    arabicUsage: Yup.string().when("type", {
      is: "usage",
      then: (schema) => schema.required(te("arabicUsage")),
      otherwise: (schema) => schema.strip(),
    }),

    englishUsage: Yup.string().when("type", {
      is: "usage",
      then: (schema) => schema.required(te("englishUsage")),
      otherwise: (schema) => schema.strip(),
    }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: initialValues.type || "conditions",
      arabicConditions: initialValues.arabicConditions || "",
      englishConditions: initialValues.englishConditions || "",
      arabicPrivacy: initialValues.arabicPrivacy || "",
      englishPrivacy: initialValues.englishPrivacy || "",
      arabicUsage: initialValues.arabicUsage || "",
      englishUsage: initialValues.englishUsage || "",
    },
  });

  const type = watch("type");

  const onSubmit = (data: any) => {
    try {
      submitHandler(data);
      setOpen(false);
      setSuccessOpen(true);
      console.log("Submitted:", { data });
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  return (
    <div>
      <FormDialog open={open} setOpen={setOpen}>
        <div className="p-0">
          <p className="text-xl font-bold">{t(`title.${type}`)}</p>

          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            {/* Arabic Field */}
            <div className="mb-6 flex flex-col gap-2">
              <label className="font-bold">{t("arabicLabel")}</label>
              <textarea
                rows={4}
                {...register(
                  type === "conditions"
                    ? "arabicConditions"
                    : type === "privacy"
                    ? "arabicPrivacy"
                    : "arabicUsage"
                )}
                className="px-3 py-2 rounded-[14px] border border-line-break text-text-normal"
              />
              {type === "conditions" && errors.arabicConditions && (
                <span className="text-red-500">
                  {typeof errors.arabicConditions?.message === "string" &&
                    errors.arabicConditions.message}
                </span>
              )}
              {type === "privacy" && errors.arabicPrivacy && (
                <span className="text-red-500">
                  {typeof errors.arabicPrivacy?.message === "string" &&
                    errors.arabicPrivacy.message}
                </span>
              )}
              {type === "usage" && errors.arabicUsage && (
                <span className="text-red-500">
                  {typeof errors.arabicUsage?.message === "string" &&
                    errors.arabicUsage.message}
                </span>
              )}
            </div>

            {/* English Field */}
            <div className="mb-10 flex flex-col gap-2">
              <label className="font-bold">{t("englishLabel")}</label>
              <textarea
                rows={4}
                {...register(
                  type === "conditions"
                    ? "englishConditions"
                    : type === "privacy"
                    ? "englishPrivacy"
                    : "englishUsage"
                )}
                className="px-3 py-2 rounded-[14px] border border-line-break text-text-normal"
              />
              {type === "conditions" && errors.englishConditions && (
                <span className="text-red-500">
                  {typeof errors.englishConditions?.message === "string" &&
                    errors.englishConditions.message}
                </span>
              )}
              {type === "privacy" && errors.englishPrivacy && (
                <span className="text-red-500">
                  {typeof errors.englishPrivacy?.message === "string" &&
                    errors.englishPrivacy.message}
                </span>
              )}
              {type === "usage" && errors.englishUsage && (
                <span className="text-red-500">
                  {typeof errors.englishUsage?.message === "string" &&
                    errors.englishUsage.message}
                </span>
              )}
            </div>

            {/* Buttons */}
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
        message={t("successMessage")}
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
            {t("close")}
          </button>
        </div>
      </SuccessDialog>
    </div>
  );
};

export default PrivacyForm;
