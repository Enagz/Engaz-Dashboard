"use client";

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { useTranslations } from "next-intl";

import { enjazService } from "@/services/enjazService";

ModuleRegistry.registerModules([AllCommunityModule]);

const StatusCellRenderer = (props: any) => {
  const t = useTranslations("urgentOrders");
  const status = props.value;

  let color = "";
  let background = "";
  let text = "";
  let icon = "•";

  switch (status) {
    case "completed":
      color = "var(--color-green-color)";
      background = "var(--color-green-hover)";
      text = t("completed");
      break;
    case "rejected":
      color = "var(--color-red-color)";
      background = "var(--color-red-hover)";
      text = t("rejected");
      break;
    case "offerSent":
      color = "var(--color-blue-color)";
      background = "var(--color-blue-hover)";
      text = t("offerSent");
      break;
    case "underReview":
      color = "var(--color-purple-color)";
      background = "var(--color-purple-hover)";
      text = t("underReview");
      break;
    case "inProgress":
    default:
      color = "var(--color-yellow-color)";
      background = "var(--color-yellow-hover)";
      text = t("inProgress");
  }

  return (
    <div dir="rtl" className="flex h-full items-center justify-center">
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

const ActionsCellRenderer = () => {
  const t = useTranslations("urgentOrders");

  return (
    <div className="h-full flex justify-center items-center">
      <button className="cursor-pointer bg-primary-color text-white rounded px-4 py-2 text-sm">
        {t("executeNow")}
      </button>
    </div>
  );
};

const UrgentOrders: React.FC = () => {
  const t = useTranslations("urgentOrders");
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [columnDefs] = useState<ColDef[]>([
    { headerName: t("requestId"), field: "requestId", minWidth: 100 },
    { headerName: t("service"), field: "service", minWidth: 100 },
    { headerName: t("pageCount"), field: "pageCount", minWidth: 120 },
    { headerName: t("client"), field: "client", minWidth: 140 },
    { headerName: t("deadline"), field: "deadline", minWidth: 140 },
    {
      headerName: t("status"),
      field: "status",
      minWidth: 120,
      cellRenderer: StatusCellRenderer,
    },
    { headerName: t("amount"), field: "amount", minWidth: 100 },
    {
      headerName: t("actions"),
      field: "actions",
      minWidth: 120,
      cellRenderer: ActionsCellRenderer,
    },
  ]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    cellStyle: {
      textAlign: "center",
      color: "var(--color-text-normal)",
      fontWeight: "500",
      fontSize: ".875rem",
    },
    headerStyle: {
      fontSize: ".75rem",
      fontWeight: 600,
      backgroundColor: "var(--color-table-border)",
      color: "#000",
    },
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

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

  useEffect(() => {
    const fetchUrgentOrders = async () => {
      try {
        const response = await enjazService.getUrgentOrders();

        const mappedData = response.data.map((order: any) => ({
          requestId: `#${order.number}`,
          service: order.type === "translation" ? t("translate") : t("print"),
          pageCount: `${order.numberofletters} ${t("pages")}`,
          client: order.client,
          deadline: t("within", { deadline: order.deadline }),
          status: mapStatus(order.status),
          amount: `${order.cost} ر.س`,
        }));

        setRowData(mappedData);
      } catch (err) {
        console.error("Failed to fetch urgent orders", err);
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchUrgentOrders();
  }, [t]);

  if (loading) return <div>{t("loading")}</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: "auto", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        domLayout="autoHeight"
        headerHeight={44}
      />
    </div>
  );
};

export default UrgentOrders;
