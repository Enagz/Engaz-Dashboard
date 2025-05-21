"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { useLocale, useTranslations } from "next-intl";

import { Icons } from "./Icons";
import OrdersForm from "../forms/OrdersForm";
import { enjazService } from "@/services/enjazService";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  requestId: string;
  client: string;
  service: string;
  charCount: string | number;
  status: "completed" | "rejected" | "inProgress" | "offerSent" | "underReview";
  date: string;
  amount: number;
}

const StatusCellRenderer = (props: any) => {
  const t = useTranslations("newOrders");
  const status = props.value;

  let color = "",
    background = "",
    text = "",
    icon = "•";

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

const ActionsCellRenderer = (props: any) => {
  const [formOpen, setFormOpen] = useState(false);
  const { requestId, charCount, status, amount } = props.data;

  return (
    <div className="h-full flex gap-2 justify-center items-center">
      <OrdersForm
        open={formOpen}
        setOpen={setFormOpen}
        initialValues={{
          numberofletters: charCount,
          status: status,
          cost: amount,
          id: requestId,
        }}
      />
      <button className="bg-none border-none cursor-pointer">
        <Link href={`/orders/${requestId.replace("#", "")}`}>
          <Icons.view />
        </Link>
      </button>
      <button
        className="bg-none border-none cursor-pointer"
        onClick={() => setFormOpen(true)}
      >
        <Icons.edit />
      </button>
    </div>
  );
};

const AmountCellRenderer = (props: any) => {
  const t = useTranslations("newOrders");
  const amount = props.value;

  return (
    <div
      dir="rtl"
      className="flex items-center justify-center text-primary-color font-medium"
    >
      {amount} {t("sar")}
    </div>
  );
};

const NewOrders: React.FC = () => {
  const t = useTranslations("newOrders");
  const locale = useLocale() as "ar" | "en";

  const [rowData, setRowData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const baseStyle = {
    textAlign: "center",
    fontWeight: "500",
    fontSize: ".875rem",
    color: "var(--color-text-normal)",
  };

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: t("requestId"),
      field: "requestId",
      minWidth: 100,
      cellStyle: baseStyle,
    },
    {
      headerName: t("client"),
      field: "client",
      minWidth: 120,
      cellStyle: baseStyle,
    },
    {
      headerName: t("service"),
      field: "service",
      minWidth: 120,
      cellStyle: baseStyle,
    },
    {
      headerName: t("status"),
      field: "status",
      minWidth: 100,
      cellRenderer: StatusCellRenderer,
      cellStyle: baseStyle,
    },
    {
      headerName: t("date"),
      field: "date",
      minWidth: 100,
      cellStyle: baseStyle,
    },
    {
      headerName: t("amount"),
      field: "amount",
      minWidth: 100,
      cellRenderer: AmountCellRenderer,
      cellStyle: baseStyle,
    },
    {
      headerName: t("actions"),
      field: "actions",
      minWidth: 100,
      cellRenderer: ActionsCellRenderer,
      cellStyle: baseStyle,
    },
  ]);

  const defaultColDef = { sortable: true, filter: true, resizable: true };
  const onGridReady = (params: GridReadyEvent) => params.api.sizeColumnsToFit();

  const mapStatus = (status: string) => {
    const normalized = status.toLowerCase().trim();
    switch (normalized) {
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
        return "inProgress";
      default:
        return "inProgress";
    }
  };

  useEffect(() => {
    const fetchNewOrders = async () => {
      try {
        const response = await enjazService.getOrders("translation", "new");
        const mapped: RowData[] = response.data.map((order: any) => ({
          requestId: `#${order.number}`,
          client: order.client || "———",
          service: order.service,
          charCount: order.litternumber || "———",
          status: mapStatus(order.status),
          date: order.date || "———",
          amount: order.cost,
        }));
        setRowData(mapped);
      } catch (err) {
        console.error("Failed to fetch new orders", err);
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };
    fetchNewOrders();
  }, []);

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
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[5, 10, 20]}
      />
    </div>
  );
};

export default NewOrders;
