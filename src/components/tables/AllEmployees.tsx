"use client";

import React from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Icons } from "./Icons";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

ModuleRegistry.registerModules([AllCommunityModule]);

interface EmployeeData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  currentOrders: number;
}

interface AllEmployeesProps {
  employees: EmployeeData[];
  loading: boolean;
  loadingText?: string;
}

const AllEmployees: React.FC<AllEmployeesProps> = ({
  employees,
  loading,
  loadingText = "Loading employees...",
}) => {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("employees.table");

  // Custom cell renderer for employee name and email
  const EmployeeCellRenderer = (props: any) => {
    const { name, email } = props.data;

    return (
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={`flex flex-col ${
          locale === "ar" ? "items-end" : "items-start"
        }`}
      >
        <div className="font-bold text-sm">{name}</div>
        <div className="text-gray-500 text-xs">{email}</div>
      </div>
    );
  };

  // Custom cell renderer for orders
  const OrderSellRenderer = (props: any) => {
    const { currentOrders } = props.data;

    return (
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="flex justify-center gap-x-1"
      >
        <div className="text-primary-color">{currentOrders}</div>
        <div className="">{t("order")}</div>
      </div>
    );
  };

  // Custom cell renderer for actions
  const ActionsCellRenderer = (props: any) => {
    const { id } = props.data;

    return (
      <div className="h-full flex gap-2 justify-center items-center">
        <Link
          href={`employees/${id}/remove`}
          className="bg-none border-none cursor-pointer"
          title={t("delete")}
        >
          <Icons.trash />
        </Link>
        <Link
          href={`employees/${id}/edit`}
          className="bg-none border-none cursor-pointer"
          title={t("edit")}
        >
          <Icons.edit />
        </Link>
      </div>
    );
  };

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: t("employeeName"),
      field: "name",
      cellRenderer: EmployeeCellRenderer,
      minWidth: 150,
      cellStyle: {
        textAlign: locale === "ar" ? "right" : "left",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: locale === "ar" ? "right" : "left",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
    {
      headerName: t("phoneNumber"),
      field: "phone",
      minWidth: 120,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontSize: ".875rem",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "center",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
    {
      headerName: t("currentOrders"),
      field: "currentOrders",
      minWidth: 100,
      cellRenderer: OrderSellRenderer,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontSize: ".875rem",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "center",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
    {
      headerName: t("actions"),
      field: "actions",
      minWidth: 100,
      cellRenderer: ActionsCellRenderer,
      cellStyle: {
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "center",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
  ]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  if (loading) {
    return <div>{loadingText}</div>;
  }

  if (!employees || employees.length === 0) {
    return <div>{t("noEmployees")}</div>;
  }

  return (
    <div className="flex flex-col" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div
        className="ag-theme-alpine"
        style={{
          height: "auto",
          width: "100%",
        }}
      >
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          domLayout="autoHeight"
          headerHeight={50}
          enableRtl={locale === "ar"}
        />
      </div>
    </div>
  );
};

export default AllEmployees;
