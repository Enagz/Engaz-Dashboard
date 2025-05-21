"use client";

import { useState, useEffect, JSX } from "react";
import Link from "next/link";
import AllEmployees from "@/components/tables/AllEmployees";
import { enjazService } from "@/services/enjazService";
import { getUserRole } from "@/app/utils/auth.utils";
import { redirect } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

interface CardData {
  title: string;
  number: number | null;
  icon: JSX.Element;
  color: string;
}

export default function Employees() {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("employees");

  const [activeTab, setActiveTab] = useState<number>(1);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [employeesNumber, setEmployeesNumber] = useState<number | null>(null);

  const role = getUserRole();
  if (role === "employee") {
    const employeeId = localStorage.getItem("userId");
    return redirect({ href: `/employees/${employeeId}`, locale });
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        console.log("Fetching employees for tab:", activeTab);

        let department: "translation" | "printing" | undefined;
        if (activeTab === 1) department = "translation";
        if (activeTab === 2) department = "printing";

        console.log("Department parameter:", department);

        const response = await enjazService.get_employees_by_department(
          department
        );
        console.log("Full API Response:", response);

        if (
          response &&
          response.employees &&
          Array.isArray(response.employees)
        ) {
          console.log("Employees data:", response.employees);
          setEmployees(response.employees);
        } else {
          console.warn("Unexpected response format:", response);
          setEmployees([]);
        }

        const res = await enjazService.getEmployeeNumber();
        setEmployeesNumber(res.data.employessCounter);
        console.log("Full API Response:", employeesNumber);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [activeTab]);

  // =====================data==========================
  const employeesData = [
    {
      title: t("totalEmployees"),
      number: employeesNumber,
      icon: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.625 2.5H4.375a.625.625 0 0 0-.625.625v13.75a.625.625 0 0 0 .625.625h11.25a.624.624 0 0 0 .625-.625V3.125a.625.625 0 0 0-.625-.625M10 13.125a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5"
            fill="#000"
            fillOpacity={0.04}
          />
          <path
            d="M5.874 15.5a.624.624 0 0 0 .876-.125 4.062 4.062 0 0 1 6.5 0 .623.623 0 0 0 .875.125.623.623 0 0 0 .125-.875 5.3 5.3 0 0 0-2.14-1.694 3.125 3.125 0 1 0-4.215 0 5.3 5.3 0 0 0-2.145 1.694.625.625 0 0 0 .124.875M10 8.75a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75m5.625-6.875H4.375a1.25 1.25 0 0 0-1.25 1.25v13.75a1.25 1.25 0 0 0 1.25 1.25h11.25a1.25 1.25 0 0 0 1.25-1.25V3.125a1.25 1.25 0 0 0-1.25-1.25m0 15H4.375V3.125h11.25zM6.875 5a.625.625 0 0 1 .625-.625h5a.625.625 0 1 1 0 1.25h-5A.625.625 0 0 1 6.875 5"
            fill="#3E97D1"
          />
        </svg>
      ),
      color: "#EDEEFC",
    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div className="flex justify-end">
        <Link
          href="/employees/add"
          className="inline-block font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90"
        >
          {t("addEmployee")}
        </Link>
      </div>

      {/* section */}
      <div className="flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">{t("statisticalSummary")}</p>

        <div className="flex flex-row flex-wrap items-center gap-4 md:gap-8">
          {employeesData.map((employee) => (
            <Card
              key={employee.title}
              {...employee}
              numberTitle={t("employee")}
            />
          ))}
        </div>
      </div>

      {/* section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-y-4 gap-x-8">
          <p className="font-semibold text-2xl">{t("allEmployees")}</p>

          <EmployeesTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            t={t}
          />
        </div>

        <AllEmployees
          employees={employees}
          loading={loading}
          loadingText={t("loading")}
        />
      </div>
    </div>
  );
}

const Card = ({
  title,
  number,
  icon,
  color,
  numberTitle,
}: CardData & { numberTitle: string }) => {
  return (
    <div
      className="grow py-4 px-2.5 flex flex-col items-center justify-center gap-y-2 rounded-2xl"
      style={{ background: color }}
    >
      <div className="flex items-center gap-x-2">
        <span>{icon}</span>
        <span className="font-bold text-sm">{title}</span>
      </div>

      <p className="font-semibold text-sm text-primary-color flex gap-x-1">
        <span>{number}</span>
        <span>{numberTitle}</span>
      </p>
    </div>
  );
};

interface EmployeesTabsProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  t: any;
}

const EmployeesTabs = ({ activeTab, setActiveTab, t }: EmployeesTabsProps) => {
  const tabs = [
    { id: 1, title: t("translationEmployees") },
    { id: 2, title: t("printingEmployees") },
    { id: 3, title: t("technicalSupportEmployees") },
  ];

  return (
    <div className="flex gap-1 bg-button-hover px-4 py-2 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-fit px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all ${
            activeTab === tab.id
              ? "bg-primary-color text-white"
              : "hover:bg-primary-color/50 text-black"
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};
