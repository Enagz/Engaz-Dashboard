import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  requestId: string;
  service: string;
  pageCount: string;
  client: string;
  deadline: string;
  status: "late" | "inProgress" | "veryLate";
  amount: string;
}

// Custom cell renderer for status column
const StatusCellRenderer = (props: any) => {
  const status = props.value;
  let color = "";
  let background = "";
  let text = "";
  let icon = "•";

  if (status === "late") {
    color = "var(--color-red-color)";
    background = "var(--color-red-hover)";
    text = "متأخر";
  } else if (status === "veryLate") {
    color = "var(--color-red-color)";
    background = "var(--color-red-hover)";
    text = "متأخر جدا";
  } else if (status === "inProgress") {
    color = "var(--color-yellow-color)";
    background = "var(--color-yellow-hover)";
    text = "قيد المعالجة";
  }

  return (
    <div dir="rtl" className="flex h-full items-center justify-center">
      <div
        className="font-bold flex items-center gap-1 px-2 py-3 h-0 rounded-full"
        style={{ background, color: color }}
      >
        <span className="text-lg mr-1">{icon}</span>
        {text}
      </div>
    </div>
  );
};

// Custom cell renderer for action buttons
const ActionsCellRenderer = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <button className="cursor-pointer bg-primary-color text-white rounded px-4 py-2 text-sm">
        تنفيذ الآن
      </button>
    </div>
  );
};

const UrgentOrders: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    {
      requestId: "#12345",
      service: "طباعة",
      pageCount: "30 نسخة",
      client: "أحمد الزهراني",
      deadline: "خلال 3 ساعات",
      status: "late",
      amount: "500 ر.س",
    },
    {
      requestId: "#12346",
      service: "ترجمة",
      pageCount: "15 صفحة",
      client: "خالد السعيد",
      deadline: "خلال 5 ساعات",
      status: "inProgress",
      amount: "750 ر.س",
    },
    {
      requestId: "#12347",
      service: "طباعة",
      pageCount: "45 نسخة",
      client: "ماجد العتيبي",
      deadline: "خلال ساعتين",
      status: "veryLate",
      amount: "300 ر.س",
    },
    {
      requestId: "#12348",
      service: "ترجمة",
      pageCount: "30 صفحة",
      client: "فهد الدوسري",
      deadline: "غدا - 10 صباحا",
      status: "inProgress",
      amount: "950 ر.س",
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "رقم الطلب",
      field: "requestId",
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
      headerName: "الخدمة",
      field: "service",
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
      headerName: "عدد الصفحات",
      field: "pageCount",
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
      headerName: "العميل",
      field: "client",
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
      headerName: "الموعد النهائي",
      field: "deadline",
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
      headerName: "الحالة",
      field: "status",
      minWidth: 120,
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
      headerName: "المبلغ",
      field: "amount",
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
      headerName: "الإجراء",
      field: "actions",
      minWidth: 120,
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

export default UrgentOrders;
