"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Star } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  department: string;
  completed: number;
  late: number;
  completion: string;
  bestEmployee: string;
  latestTaskDate: string;
  rate: number;
  comments: string;
}

// Custom cell renderer for rating column with stars
const RatingCellRenderer = (props: any) => {
  const rating = props.value;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const filled = i < rating;
    stars.push(
      <span
        key={i}
        className="flex gap-2"
        style={{
          fill: filled ? "var(--color-yellow-color)" : "transparent",
          stroke: "var(--color-yellow-color)",
        }}
      >
        <Star className="size-5 stroke-yellow-color fill-inherit" />
      </span>
    );
  }

  return <div className="flex justify-center gap-2">{stars}</div>;
};

const DepartmentsProductivity: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    {
      department: "ترجمة",
      completed: 25,
      late: 3,
      completion: "85%",
      bestEmployee: "أحمد الزهراني",
      latestTaskDate: "2025-03-29",
      rate: 5,
      comments: "يحتاج لتحسين الدقة",
    },
    {
      department: "طباعة",
      completed: 30,
      late: 1,
      completion: "90%",
      bestEmployee: "خالد السعيد",
      latestTaskDate: "2025-03-28",
      rate: 5,
      comments: "أداء ممتاز",
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "القسم",
      field: "department",
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
      headerName: "مهام منجزة",
      field: "completed",
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
      headerName: "مهام متأخرة",
      field: "late",
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
      headerName: "نسبة الإنجاز ",
      field: "completion",
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
      headerName: "أفضل موظف",
      field: "bestEmployee",
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
      headerName: "تاريخ آخر مهمة",
      field: "latestTaskDate",
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
      headerName: "التقييم",
      field: "rate",
      minWidth: 100,
      cellRenderer: RatingCellRenderer,
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
      headerName: "ملاحظات إضافية",
      field: "comments",
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

export default DepartmentsProductivity;
