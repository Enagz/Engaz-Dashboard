"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { useTranslations } from "next-intl";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  taskNumber: string;
  client: string;
  task: string;
  language: string;
  method: string;
  status: "Finished" | "In Progress" | "Under Review" | "Cancelled";
  deliveryDate: string;
  comments: string;
}

const StatusCellRenderer = (props: any) => {
  const t = useTranslations("tasks.statuses");
  const status = props.value;

  let color = "";
  let background = "";
  let icon = "•";

  let text = t(status.toLowerCase().replace(" ", "") as keyof typeof t);

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
        {text}
      </div>
    </div>
  );
};

const Tasks = ({ rowData }: { rowData: RowData[] }) => {
  const t = useTranslations("tasks");

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: t("taskNumber"),
      field: "taskNumber",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("task"),
      field: "task",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("language"),
      field: "language",
      minWidth: 120,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("client"),
      field: "client",
      minWidth: 140,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("method"),
      field: "method",
      minWidth: 140,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("deliveryDate"),
      field: "deliveryDate",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("status"),
      field: "status",
      minWidth: 120,
      cellRenderer: StatusCellRenderer,
      cellStyle: { fontSize: ".75rem", textAlign: "center", fontWeight: "600" },
    },
    {
      headerName: t("comments"),
      field: "comments",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: "500",
        fontSize: ".875rem",
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

export default Tasks;
