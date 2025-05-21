"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import Link from "next/link";
import OrdersForm from "../forms/OrdersForm";
import ConfirmDialog from "../forms/ConfirmDialog";
import SuccessDialog from "../forms/SuccessDialog";
import { enjazService } from "@/services/enjazService";
import { Icons } from "./Icons";

ModuleRegistry.registerModules([AllCommunityModule]);

interface CurrentOrdersProps {
  orders: any[];
  loading: boolean;
}

const CurrentOrders: React.FC<CurrentOrdersProps> = ({ orders, loading }) => {
  const t = useTranslations("currentOrders");
  const locale = useLocale() as "ar" | "en";

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
      default:
        return "inProgress";
    }
  };

  const StatusCellRenderer = (props: any) => {
    const status = props.value;
    let color = "";
    let background = "";
    let text = t(status);

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
      default:
        color = "var(--color-yellow-color)";
        background = "var(--color-yellow-hover)";
    }

    return (
      <div dir="rtl" className="flex h-full items-center justify-center">
        <div
          className="font-bold flex items-center gap-1 px-2 py-1 rounded-full"
          style={{ background, color }}
        >
          <span className="text-lg mr-1">•</span>
          {text}
        </div>
      </div>
    );
  };

  const AmountRenderer = (props: any) => (
    <div className="flex items-center justify-center">
      {props.data.amount} {t("currency")}
    </div>
  );

  const LettersNumberRenderer = (props: any) => (
    <div className="flex items-center justify-center">
      {props.data.lettersNumber} {t("lettersUnit")}
    </div>
  );

  const EmployeeCellRenderer = (props: any) => (
    <div className="flex items-center justify-start font-bold gap-1.5">
      {props.data.employee}
    </div>
  );

  const ActionsCellRenderer = (props: any) => {
    const [formOpen, setFormOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const { requestId, lettersNumber, status, amount } = props.data;

    const deleteHandler = async () => {
      try {
        await enjazService.deleteOrder(requestId);
        setOpenConfirm(false);
        setOpenSuccess(true);
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    };

    return (
      <div className="h-full flex gap-2 justify-center items-center">
        <OrdersForm
          open={formOpen}
          setOpen={setFormOpen}
          initialValues={{
            numberofletters: lettersNumber.toString(),
            status,
            cost: amount.toString(),
            id: requestId,
          }}
        />

        <ConfirmDialog
          open={openConfirm}
          setOpen={setOpenConfirm}
          message={{
            title: t("deleteConfirmTitle"),
            description: t("deleteConfirmDescription"),
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={deleteHandler}
              className="px-6 py-2.5 bg-error-color text-white rounded-sm"
            >
              {t("delete")}
            </button>
            <button
              onClick={() => setOpenConfirm(false)}
              className="px-6 py-2.5 border rounded-sm"
            >
              {t("cancel")}
            </button>
          </div>
        </ConfirmDialog>

        <SuccessDialog
          open={openSuccess}
          setOpen={setOpenSuccess}
          message={t("successMessage")}
        >
          <div className="grid gap-4">
            <Link
              href="/orders"
              className="px-6 py-2.5 bg-primary-color text-white rounded-sm"
            >
              {t("continue")}
            </Link>
          </div>
        </SuccessDialog>

        <button onClick={() => setOpenConfirm(true)} className="border-none">
          <Icons.trash />
        </button>
        <button className="border-none">
          <a
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/order/download/${requestId}`}
          >
            <Icons.download />
          </a>
        </button>
        <button onClick={() => setFormOpen(true)} className="border-none">
          <Icons.edit />
        </button>
      </div>
    );
  };

  const [columnDefs] = useState<ColDef[]>([
    { headerName: t("requestId"), field: "requestId", minWidth: 100 },
    { headerName: t("customer"), field: "customer", minWidth: 120 },
    {
      headerName: t("lettersNumber"),
      field: "lettersNumber",
      cellRenderer: LettersNumberRenderer,
      minWidth: 160,
    },
    {
      headerName: t("status"),
      field: "status",
      cellRenderer: StatusCellRenderer,
      minWidth: 120,
    },
    { headerName: t("orderDate"), field: "orderDate", minWidth: 120 },
    {
      headerName: t("amount"),
      field: "amount",
      cellRenderer: AmountRenderer,
      minWidth: 140,
    },
    {
      headerName: t("employee"),
      field: "employee",
      cellRenderer: EmployeeCellRenderer,
      minWidth: 140,
    },
    {
      headerName: t("actions"),
      field: "actions",
      cellRenderer: ActionsCellRenderer,
      minWidth: 100,
    },
  ]);

  const rowData = orders.map((order) => ({
    requestId: order.number,
    orderDate: new Date(order.createdAt).toLocaleDateString(
      locale === "ar" ? "ar-SA" : "en-US"
    ),
    status: mapStatus(order.status),
    employee: order.employeename || t("unassigned"),
    amount: order.cost || 0,
    customer: order.user || t("unassigned"),
    lettersNumber:
      order.numberofletters ||
      (order.details
        ? order.details.reduce(
            (total: number, detail: any) => total + (detail.pages || 0),
            0
          )
        : 0),
  }));

  if (loading) return <div>{t("loading")}</div>;
  if (!orders?.length) return <div>{t("empty")}</div>;

  return (
    <div className="ag-theme-alpine" style={{ width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
        onGridReady={(params: GridReadyEvent) => params.api.sizeColumnsToFit()}
        domLayout="autoHeight"
        headerHeight={44}
        rowHeight={50}
      />
    </div>
  );
};

export default CurrentOrders;
