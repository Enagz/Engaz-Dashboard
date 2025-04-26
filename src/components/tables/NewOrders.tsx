import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Icons } from "./Icons";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  requestId: string;
  client: string;
  service: string;
  charCount: string | number;
  status: "completed" | "rejected" | "inProgress";
  date: string;
  amount: string;
}

// Custom cell renderer for status column
const StatusCellRenderer = (props: any) => {
  const status = props.value;
  let color = "";
  let background = "";
  let text = "";
  let icon = "•";

  if (status === "completed") {
    color = "var(--color-green-color)";
    background = "var(--color-green-hover)";
    text = "مكتمل";
  } else if (status === "rejected") {
    color = "var(--color-red-color)";
    background = "var(--color-red-hover)";
    text = "مرفوض";
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

// Custom cell renderer for amounts with currency
const AmountCellRenderer = (props: any) => {
  const amount = props.value;

  return (
    <div
      dir="rtl"
      className="flex items-center justify-center text-primary-color font-medium"
    >
      {amount}
    </div>
  );
};

const NewOrdes: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    {
      requestId: "#12345",
      client: "أحمد الزهراني",
      service: "طباعة PDF",
      charCount: "———",
      status: "completed",
      date: "قبل 5 ساعات",
      amount: "500 ر.س",
    },
    {
      requestId: "#12346",
      client: "خالد السعيد",
      service: "ترجمة إنجليزي",
      charCount: "800حرف",
      status: "rejected",
      date: "قبل ساعة",
      amount: "750 ر.س",
    },
    {
      requestId: "#12347",
      client: "ماجد العتيبي",
      service: "طباعة PDF",
      charCount: "———",
      status: "completed",
      date: "قبل 6 ساعات",
      amount: "300 ر.س",
    },
    {
      requestId: "#12348",
      client: "فهد الدوسري",
      service: "ترجمة فرنسي",
      charCount: "1000حرف",
      status: "inProgress",
      date: "قبل 3 ساعات",
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
      headerName: "العميل",
      field: "client",
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
      headerName: "الخدمة",
      field: "service",
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
      headerName: "عدد الأحرف",
      field: "charCount",
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
      headerName: "الحالة",
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
      headerName: "التاريخ",
      field: "date",
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
      headerName: "المبلغ",
      field: "amount",
      minWidth: 100,
      cellRenderer: AmountCellRenderer,
      cellStyle: {
        textAlign: "center",
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

export default NewOrdes;
