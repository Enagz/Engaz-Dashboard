"use client";

import { useEffect, useState } from "react";
import { Icons } from "@/components/tables/lcons";
import PrivacyForm from "@/components/forms/PrivacyForm";
import { getUserRole } from "@/app/utils/auth.utils";
import { enjazService } from "@/services/enjazService";
import { useLocale, useTranslations } from "next-intl";

export default function Privacy() {
  const role = getUserRole();
  const t = useTranslations("privacy");
  const locale = useLocale() as "ar" | "en";

  const [formOpen, setFormOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    type: "privacy",
    arabicConditions: "",
    englishConditions: "",
    arabicPrivacy: "",
    englishPrivacy: "",
    arabicUsage: "",
    englishUsage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [conditions, privacy, usage] = await Promise.all([
          enjazService.getConditions(),
          enjazService.getPrivacy(),
          enjazService.getUsage(),
        ]);

        setInitialValues((prev) => ({
          ...prev,
          arabicConditions: conditions.data.terms.ArabicTerms,
          englishConditions: conditions.data.terms.EnglishTerms,
          arabicPrivacy: privacy.data.privacy.ArabicPrivacy,
          englishPrivacy: privacy.data.privacy.EnglishPrivacy,
          arabicUsage: usage.data.usage.ArabicUsage,
          englishUsage: usage.data.usage.EnglishUsage,
        }));
      } catch (err) {
        console.error("Failed to fetch terms data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      switch (values.type) {
        case "privacy":
          await enjazService.editPrivacy(
            values.arabicPrivacy,
            values.englishPrivacy
          );
          break;
        case "conditions":
          await enjazService.editConditions(
            values.arabicConditions,
            values.englishConditions
          );
          break;
        case "usage":
          await enjazService.editUsage(values.arabicUsage, values.englishUsage);
          break;
        default:
          throw new Error("Unknown type");
      }

      setFormOpen(false); // Close modal
    } catch (err) {
      console.error("Failed to save changes:", err);
    }
  };

  return (
    <div>
      {role !== "employee" && (
        <PrivacyForm
          open={formOpen}
          setOpen={setFormOpen}
          initialValues={initialValues}
          submitHandler={handleSubmit}
        />
      )}

      <p className="mb-6 font-semibold text-2xl">{t("privacyPolicy")}</p>
      <div className="p-4 bg-white rounded-2xl grid gap-y-1">
        {role !== "employee" && (
          <button
            onClick={() => {
              setInitialValues((prev) => ({ ...prev, type: "privacy" }));
              setFormOpen(true);
            }}
            className="cursor-pointer justify-self-end p-1"
          >
            <Icons.edit />
            <span className="sr-only">{t("edit")}</span>
          </button>
        )}
        <p className="text-text-normal text-lg">
          {locale === "ar"
            ? initialValues.arabicPrivacy
            : initialValues.englishPrivacy}
        </p>
      </div>

      <p className="mt-8 mb-6 font-semibold text-2xl">{t("termsConditions")}</p>
      <div className="p-4 bg-white rounded-2xl grid gap-y-1">
        {role !== "employee" && (
          <button
            onClick={() => {
              setInitialValues((prev) => ({ ...prev, type: "conditions" }));
              setFormOpen(true);
            }}
            className="cursor-pointer justify-self-end p-1"
          >
            <Icons.edit />
            <span className="sr-only">{t("edit")}</span>
          </button>
        )}
        <p className="text-text-normal text-lg">
          {locale === "ar"
            ? initialValues.arabicConditions
            : initialValues.englishConditions}
        </p>
      </div>

      <p className="mt-8 mb-6 font-semibold text-2xl">{t("usagePolicy")}</p>
      <div className="p-4 bg-white rounded-2xl grid gap-y-1">
        {role !== "employee" && (
          <button
            onClick={() => {
              setInitialValues((prev) => ({ ...prev, type: "usage" }));
              setFormOpen(true);
            }}
            className="cursor-pointer justify-self-end p-1"
          >
            <Icons.edit />
            <span className="sr-only">{t("edit")}</span>
          </button>
        )}
        <p className="text-text-normal text-lg">
          {locale === "ar"
            ? initialValues.arabicUsage
            : initialValues.englishUsage}
        </p>
      </div>
    </div>
  );
}
