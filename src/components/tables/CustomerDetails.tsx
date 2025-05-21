"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
  AllCommunityModule,
} from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { useTranslations, useLocale } from "next-intl";

import { Icons } from "./lcons";
import Link from "next/link";
import { enjazService } from "@/services/enjazService";

ModuleRegistry.registerModules([AllCommunityModule]);

interface ClientData {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  orderCount: string;
  status: "active" | "inactive";
  registrationDate: string;
  lastActivity: string;
  totalPayments: string;
}

const ClientCellRenderer = (props: any) => {
  if (!props.data) return null;
  const { name, email } = props.data;
  return (
    <div className="flex flex-col items-end" dir="rtl">
      <div className="font-bold text-sm">{name}</div>
      <div className="text-text-normal text-xs">{email}</div>
    </div>
  );
};

const StatusCellRenderer = (props: any) => {
  const t = useTranslations("customerDetailsTable");
  const status = props.value;
  let color = "",
    background = "",
    text = "",
    icon = "•";

  if (status === "active") {
    color = "var(--color-green-color, #28a745)";
    background = "var(--color-green-hover, #e9f5ec)";
    text = t("active");
  } else if (status === "inactive") {
    color = "var(--color-red-color, #dc3545)";
    background = "var(--color-red-hover, #fdeaed)";
    text = t("inactive");
  }

  return (
    <div className="flex h-full items-center justify-center" dir="rtl">
      <div
        className="font-bold flex items-center gap-1 px-2 py-3 h-0 rounded-full"
        style={{ background, color }}
      >
        <span className="text-lg mr-1">{icon}</span>
        {text}
      </div>
    </div>
  );
};

const ActionsCellRenderer = (props: any) => {
  if (!props.data) return null;
  const { id } = props.data;
  return (
    <div className="h-full flex gap-2 justify-center items-center">
      <Link
        href={`/customers/${id}/remove`}
        className="cursor-pointer p-1 hover:bg-gray-200 rounded"
      >
        <Icons.trash />
      </Link>
      <a
        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/clients/download/${id}`}
        className="cursor-pointer p-1 hover:bg-gray-200 rounded"
      >
        <Icons.download />
      </a>
      <Link
        href={`/customers/${id}/edit`}
        className="cursor-pointer p-1 hover:bg-gray-200 rounded"
      >
        <Icons.edit />
      </Link>
    </div>
  );
};

const PAGINATION_PAGE_SIZE = 4;

const CustomerDetails: React.FC = () => {
  const t = useTranslations("customerDetailsTable");
  const locale = useLocale() as "ar" | "en";

  const gridRef = useRef<AgGridReact>(null);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: t("customerName"),
      field: "name",
      cellRenderer: ClientCellRenderer,
      minWidth: 180,
      cellStyle: { textAlign: "right" },
      headerClass: "text-right",
    },
    {
      headerName: t("phoneNumber"),
      field: "phone",
      minWidth: 150,
      cellStyle: { textAlign: "center", color: "#555", fontSize: ".875rem" },
    },
    {
      headerName: t("orderCount"),
      field: "orderCount",
      minWidth: 120,
      cellStyle: { textAlign: "center", color: "#555", fontSize: ".875rem" },
    },
    {
      headerName: t("status"),
      field: "status",
      minWidth: 120,
      cellRenderer: StatusCellRenderer,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: t("registrationDate"),
      field: "registrationDate",
      minWidth: 150,
      cellStyle: { textAlign: "center", color: "#555", fontSize: ".875rem" },
      sort: "desc",
    },
    {
      headerName: t("lastActivity"),
      field: "lastActivity",
      minWidth: 150,
      cellStyle: { textAlign: "center", color: "#555", fontSize: ".875rem" },
    },
    {
      headerName: t("totalPayments"),
      field: "totalPayments",
      minWidth: 150,
      cellStyle: {
        textAlign: "center",
        color: "#0091FF",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("actions"),
      field: "actions",
      minWidth: 120,
      cellRenderer: ActionsCellRenderer,
      cellStyle: { textAlign: "center" },
      sortable: false,
      filter: false,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      headerClass: "text-center",
      headerStyle: {
        backgroundColor: "#f0f0f0",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    }),
    []
  );

  const dataSource = useMemo(
    (): IDatasource => ({
      getRows: async (params: IGetRowsParams) => {
        const pageToFetch =
          Math.floor(params.startRow / PAGINATION_PAGE_SIZE) + 1;
        try {
          const response = await enjazService.getClients(pageToFetch);
          const clients = response.data?.clients || [];
          const totalPagesFromAPI = response.data?.totalPages || 0;

          const mappedData: ClientData[] = clients.map((client: any) => ({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: `${client.countrycode || ""}${client.phone || ""}`,
            orderCount:
              client.ordersCounter > 0
                ? `${client.ordersCounter} ${t("orders")}`
                : t("noOrders"),
            status: client.isActive ? "active" : "inactive",
            registrationDate: client.createdAt
              ? new Date(client.createdAt).toLocaleDateString(
                  locale === "ar" ? "ar-SA" : "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )
              : t("notAvailable"),
            lastActivity: client.lastOrder
              ? new Date(client.lastOrder).toLocaleDateString(
                  locale === "ar" ? "ar-SA" : "en-US"
                )
              : t("noActivity"),
            totalPayments:
              client.totalRevenue > 0
                ? `${client.totalRevenue.toLocaleString()} ${t("sar")}`
                : t("noPayments"),
          }));

          const lastRow =
            totalPagesFromAPI > 0
              ? pageToFetch >= totalPagesFromAPI
                ? (totalPagesFromAPI - 1) * PAGINATION_PAGE_SIZE +
                  mappedData.length
                : totalPagesFromAPI * PAGINATION_PAGE_SIZE
              : mappedData.length === 0 && pageToFetch === 1
              ? 0
              : -1;

          params.successCallback(mappedData, lastRow);
        } catch (err) {
          console.error("AG Grid: Failed to load client data", err);
          params.failCallback();
        }
      },
    }),
    [locale, t]
  );

  const onGridReady = (params: GridReadyEvent) => {
    // Optional: auto-sizing logic
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-white px-4 py-2 rounded-t border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#333]">{t("allCustomers")}</h2>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "300px", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowModelType="infinite"
          datasource={dataSource}
          pagination={true}
          paginationPageSize={PAGINATION_PAGE_SIZE}
          cacheBlockSize={PAGINATION_PAGE_SIZE}
          infiniteInitialRowCount={PAGINATION_PAGE_SIZE}
          rowSelection="multiple"
          headerHeight={50}
          enableRtl={locale === "ar"}
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
