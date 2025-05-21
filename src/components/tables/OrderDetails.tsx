"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { useTranslations, useLocale } from "next-intl";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  requestId: string;
  serviceType: string;
  papersNumber: number;
  status: "Finished" | "Cancelled" | "In Progress" | "Under Review" | "—";
  amount: number;
  deliveryMethod: string;
  employee: string;
}

const StatusCellRenderer = (props: any) => {
  const t = useTranslations("orderDetails.statuses");
  const status = props.value;
  let color = "",
    background = "",
    icon = "•";

  if (status === "Finished") {
    color = "var(--color-green-color)";
    background = "var(--color-green-hover)";
  } else if (status === "Cancelled") {
    color = "var(--color-red-color)";
    background = "var(--color-red-hover)";
  } else if (status === "In Progress" || status === "Under Review") {
    color = "var(--color-yellow-color)";
    background = "var(--color-yellow-hover)";
  }

  return (
    <div dir="rtl" className="flex h-full items-center justify-center">
      <div
        className="font-bold flex items-center gap-1 px-2 py-3 h-0 rounded-full"
        style={{ background, color }}
      >
        <span className="text-lg mr-1">{icon}</span>
        {t(status)}
      </div>
    </div>
  );
};

const PapersNumberRenderer = (props: any) => {
  const t = useTranslations("orderDetails");
  return (
    <div className="flex items-center justify-center">
      {props.value} {t("paperUnit")}
    </div>
  );
};

const AmountCellRenderer = (props: any) => {
  const t = useTranslations("orderDetails");
  return (
    <div className="flex items-center justify-center text-primary-color font-medium">
      {props.value} {t("currency")}
    </div>
  );
};

const OrderDetails: React.FC<{ data: RowData[] }> = ({ data }) => {
  const t = useTranslations("orderDetails");

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: t("requestId"),
      field: "requestId",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: 500,
        fontSize: ".875rem",
      },
      headerStyle: {
        fontSize: ".75rem",
        fontWeight: 600,
        backgroundColor: "var(--color-table-border)",
        color: "#000",
      },
    },
    {
      headerName: t("serviceType"),
      field: "serviceType",
      minWidth: 120,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: 500,
        fontSize: ".875rem",
      },
      headerStyle: {
        fontSize: ".75rem",
        fontWeight: 600,
        backgroundColor: "var(--color-table-border)",
        color: "#000",
      },
    },
    {
      headerName: t("papersNumber"),
      field: "papersNumber",
      minWidth: 100,
      cellRenderer: PapersNumberRenderer,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: 500,
        fontSize: ".875rem",
      },
      headerStyle: {
        fontSize: ".75rem",
        fontWeight: 600,
        backgroundColor: "var(--color-table-border)",
        color: "#000",
      },
    },
    {
      headerName: t("status"),
      field: "status",
      minWidth: 100,
      cellRenderer: StatusCellRenderer,
      cellStyle: {
        fontSize: ".75rem",
        textAlign: "center",
        fontWeight: "600",
      },
      headerStyle: {
        fontSize: ".75rem",
        fontWeight: 600,
        backgroundColor: "var(--color-table-border)",
        color: "#000",
      },
    },
    {
      headerName: t("amount"),
      field: "amount",
      minWidth: 100,
      cellRenderer: AmountCellRenderer,
      cellStyle: {
        textAlign: "center",
        fontWeight: 500,
        fontSize: ".875rem",
      },
      headerStyle: {
        fontSize: ".75rem",
        fontWeight: 600,
        backgroundColor: "var(--color-table-border)",
        color: "#000",
      },
    },
    {
      headerName: t("deliveryMethod"),
      field: "deliveryMethod",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        fontWeight: 500,
        fontSize: ".875rem",
      },
      headerStyle: {
        fontSize: ".75rem",
        fontWeight: 600,
        backgroundColor: "var(--color-table-border)",
        color: "#000",
      },
    },
    {
      headerName: t("employee"),
      field: "employee",
      minWidth: 120,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: 500,
        fontSize: ".875rem",
      },
      headerStyle: {
        fontSize: ".75rem",
        fontWeight: 600,
        backgroundColor: "var(--color-table-border)",
        color: "#000",
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

  return (
    <div className="ag-theme-alpine" style={{ height: "auto", width: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        domLayout="autoHeight"
        headerHeight={44}
      />
    </div>
  );
};

export default OrderDetails;
