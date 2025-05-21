"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Icons } from "./Icons";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  serviceNumber: number;
  serviceType: string;
  tasksNumber: number;
  serviceCost: string;
  totalCost: string;
  completionDate: string;
  billingState: string;
}

// Custom cell renderer for action buttons
const ActionsCellRenderer = () => {
  return (
    <div className="h-full flex gap-2 justify-center items-center">
      <button className="bg-none border-none cursor-pointer">
        <Icons.trash />
      </button>
      <button className="bg-none border-none cursor-pointer">
        <Icons.download />
      </button>
      <button className="bg-none border-none cursor-pointer">
        <Icons.edit />
      </button>
    </div>
  );
};

const ServicesCosts: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    {
      serviceNumber: 201,
      serviceType: "ترجمة",
      tasksNumber: 75,
      serviceCost: "150 ر.س",
      totalCost: "11,250 ر.س",
      completionDate: "2025-03-29",
      billingState: "مدفوع",
    },
    {
      serviceNumber: 202,
      serviceType: "طباعة",
      tasksNumber: 52,
      serviceCost: "100 ر.س",
      totalCost: "5,200 ر.س",
      completionDate: "2025-03-28",
      billingState: "غير مدفوع",
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "رقم الخدمة",
      field: "serviceNumber",
      minWidth: 100,
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
    },
    {
      headerName: "نوع الخدمة",
      field: "serviceType",
      minWidth: 100,
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
    },
    {
      headerName: "عدد المهام الشهرية",
      field: "tasksNumber",
      minWidth: 100,
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
    },
    {
      headerName: "تكلفة المهمة",
      field: "serviceCost",
      minWidth: 120,
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
    },
    {
      headerName: "التكلفة الكلية",
      field: "totalCost",
      minWidth: 140,
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
    },
    {
      headerName: "تاريخ الإنجاز",
      field: "completionDate",
      minWidth: 100,
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
    },
    {
      headerName: "حالة الدفع",
      field: "billingState",
      minWidth: 100,
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
    },
    {
      headerName: "الإجراءات",
      field: "actions",
      minWidth: 100,
      cellRenderer: ActionsCellRenderer,
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
    <div
      className="ag-theme-alpine"
      style={{
        height: "auto",
        width: "100%",
      }}
    >
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

export default ServicesCosts;
