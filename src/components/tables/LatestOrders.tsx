"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Icons } from "./Icons";
import { enjazService } from "../../services/enjazService";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  requestId: string;
  client: string;
  service: string;
  status: "completed" | "rejected" | "inProgress" | "offerSent" | "underReview";
  date: string;
  employee: string;
}
//
const StatusCellRenderer = (props: any) => {
  const status = props.value;
  const t = useTranslations("latestOrders.statusText");
  const locale = useLocale();

  let color = "";
  let background = "";

  switch (status) {
    case "completed":
      color = "var(--color-green-color)";
      background = "var(--color-green-hover)";
      break;
    case "rejected":
      color = "var(--color-red-color)";
      background = "var(--color-red-hover)";
      break;
    case "offerSent":
      color = "var(--color-blue-color)";
      background = "var(--color-blue-hover)";
      break;
    case "underReview":
      color = "var(--color-purple-color)";
      background = "var(--color-purple-hover)";
      break;
    case "inProgress":
    default:
      color = "var(--color-yellow-color)";
      background = "var(--color-yellow-hover)";
  }

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="flex h-full items-center justify-center"
    >
      <div
        className="font-bold flex items-center gap-1 px-2 py-3 h-0 rounded-full"
        style={{ background, color }}
      >
        <span className="text-lg mr-1">•</span>
        {t(status)}
      </div>
    </div>
  );
};

const EmployeeCellRenderer = (props: any) => {
  const employee = props.data.employee;
  const locale = useLocale();

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="flex items-center font-bold"
    >
      {employee}
    </div>
  );
};

const ActionsCellRenderer = (props: any) => {
  const { requestId } = props.data;

  return (
    <div className="h-full flex gap-2 justify-center items-center">
      <button className="bg-none border-none cursor-pointer">
        <Link href={`/orders/${requestId.replace("#", "")}`}>
          <Icons.view />
        </Link>
      </button>
      <button className="bg-none border-none cursor-pointer">
        <a
          target="_blank"
          href={`${
            process.env.NEXT_PUBLIC_API_BASE_URL
          }/api/dashboard/order/download/${requestId.replace("#", "")}`}
        >
          <Icons.download />
        </a>
      </button>
    </div>
  );
};

const LatestOrders: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("latestOrders");
  const locale = useLocale();

  const mapStatus = (status: string) => {
    const normalizedStatus = status.toLowerCase().trim();

    switch (normalizedStatus) {
      case "finished":
      case "مكتمل":
        return "completed";
      case "cancelled":
      case "ملغي":
        return "rejected";
      case "offer sent":
      case "تم إرسال العرض":
        return "offerSent";
      case "under review":
      case "قيد المراجعة":
        return "underReview";
      case "inprogress":
      case "قيد التنفيذ":
      case "new":
      case "جديد":
      default:
        return "inProgress";
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);

    if (diffMinutes < 1) return t("now");
    if (diffMinutes < 60) return t("minutesAgo", { count: diffMinutes });
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return t("hoursAgo", { count: diffHours });
    const diffDays = Math.floor(diffHours / 24);
    return t("daysAgo", { count: diffDays });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await enjazService.getLastOrdersOverview();

        const mappedData: RowData[] = response.data.map((order: any) => ({
          requestId: `#${order.number}`,
          client: order.client || t("unknown"),
          service: order.service,
          status: mapStatus(order.status),
          date: formatTimeAgo(order.date),
          employee: order.employee || t("unassigned"),
        }));

        setRowData(mappedData);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [t]);

  const cellStyle = {
    textAlign: "center",
    color: "var(--color-text-normal)",
    fontWeight: "500",
    fontSize: ".875rem",
  };

  const statusCellStyle = {
    fontSize: ".75rem",
    textAlign: "center",
    fontWeight: "600",
  };

  const employeeCellStyle = {
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
    fontSize: ".875rem",
  };

  const headerStyle = {
    fontSize: ".75rem",
    fontWeight: 600,
    backgroundColor: "var(--color-table-border)",
    color: "#000",
  };

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: t("requestId"),
        field: "requestId",
        minWidth: 100,
        cellStyle: cellStyle,
        headerStyle: headerStyle,
      },
      {
        headerName: t("client"),
        field: "client",
        minWidth: 100,
        cellStyle: cellStyle,
        headerStyle: headerStyle,
      },
      {
        headerName: t("service"),
        field: "service",
        minWidth: 100,
        cellStyle: cellStyle,
        headerStyle: headerStyle,
      },
      {
        headerName: t("status"),
        field: "status",
        minWidth: 100,
        cellRenderer: StatusCellRenderer,
        cellStyle: statusCellStyle,
        headerStyle: headerStyle,
      },
      {
        headerName: t("date"),
        field: "date",
        minWidth: 100,
        cellStyle: cellStyle,
        headerStyle: headerStyle,
      },
      {
        headerName: t("employee"),
        field: "employee",
        minWidth: 140,
        cellRenderer: EmployeeCellRenderer,
        cellStyle: employeeCellStyle,
        headerStyle: headerStyle,
      },
      {
        headerName: t("actions"),
        field: "actions",
        minWidth: 100,
        cellRenderer: ActionsCellRenderer,
        cellStyle: cellStyle,
        headerStyle: headerStyle,
      },
    ],
    [t]
  );

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "auto", width: "100%" }}>
      {loading && (
        <div dir={locale === "ar" ? "rtl" : "ltr"}>{t("loading")}</div>
      )}
      {error && (
        <div dir={locale === "ar" ? "rtl" : "ltr"} className="text-red-500">
          {error}
        </div>
      )}
      {!loading && !error && (
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          domLayout="autoHeight"
          headerHeight={44}
        />
      )}
    </div>
  );
};

export default LatestOrders;
