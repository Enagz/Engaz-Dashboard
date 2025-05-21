"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const Header = () => {
  const t = useTranslations("header");
  const locale = useLocale() as "ar" | "en";
  const router = useRouter();
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    setEmployeeName(name);
  }, []);

  const toggleLanguage = (newLocale: "ar" | "en") => {
    const path = window.location.pathname;
    const pathWithoutLocale = path.replace(/^\/(en|ar)/, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="bg-global-bg py-6 px-4 md:px-10 flex items-center justify-between gap-4">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <div className="size-12 min-w-12 bg-primary-color rounded-full" />
        <div className="flex flex-col">
          <span className="text-xl font-bold">
            {t("welcome", { name: employeeName })}
          </span>
          <span className="text-text-normal">{t("motivation")}</span>
        </div>
      </div>

      {/* Search Input (Hidden on small screens) */}
      <div className="relative w-full max-w-sm hidden lg:block">
        <Search
          className={`absolute ${
            locale === "ar" ? "right-4" : "left-4"
          } top-1/2 transform -translate-y-1/2 text-gray-400`}
        />
        <input
          type="text"
          placeholder={t("search")}
          className={`bg-white w-full py-3 ${
            locale === "ar" ? "pl-4 pr-12" : "pl-12 pr-4"
          } rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color text-sm`}
        />
      </div>

      {/* Language Selector */}
      <Select
        value={locale}
        onValueChange={(value: "ar" | "en") =>
          toggleLanguage(value as "ar" | "en")
        }
      >
        <SelectTrigger className="min-w-12 w-fit border-none p-0 text-sm !bg-transparent text-gray-700">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="w-fit p-0">
          <SelectItem className="w-fit p-0 py-0.5" value="ar">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/flags/sa.svg"
                width={32}
                height={23}
                alt="Arabic"
              />
            </div>
          </SelectItem>
          <SelectItem className="w-fit p-0 py-0.5" value="en">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/flags/us.svg"
                width={32}
                height={23}
                alt="English"
              />
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Header;
