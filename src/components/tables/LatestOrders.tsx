import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Trash2, Download, Edit2 } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  requestId: string;
  client: string;
  service: string;
  status: "completed" | "rejected" | "inProgress";
  date: string;
  employee: string;
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

// Custom cell renderer for employee column with avatar
const EmployeeCellRenderer = (props: any) => {
  const employee = props.data.employee;

  return (
    <div dir="rtl" className="flex items-center font-bold">
      <div
        className="text-white size-8 rounded-full flex items-center justify-center ml-2.5"
        style={{
          backgroundColor: "var(--color-primary-color)",
        }}
      ></div>
      {employee}
    </div>
  );
};

// Custom cell renderer for action buttons
const ActionsCellRenderer = () => {
  return (
    <div className="h-full flex gap-2 justify-center items-center">
      <button className="bg-none border-none cursor-pointer">
        <Trash2 size={18} color="#FF3333" />
      </button>
      <button className="bg-none border-none cursor-pointer">
        <Download size={18} color="#3366FF" />
      </button>
      <button className="bg-none border-none cursor-pointer">
        <Edit2 size={18} color="#4BB543" />
      </button>
    </div>
  );
};

const LatestOrders: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    {
      requestId: "#12567",
      client: "فهد القحطاني",
      service: "طباعة PDF",
      status: "completed",
      date: "قبل 10 دقائق",
      employee: "سعود الحربي",
    },
    {
      requestId: "#12567",
      client: "عبدالله المطيري",
      service: "ترجمة إنجليزي",
      status: "rejected",
      date: "قبل ساعة",
      employee: "فهد الدوسري",
    },
    {
      requestId: "#12567",
      client: "نايف العتيبي",
      service: "طباعة PDF",
      status: "completed",
      date: "قبل 3 ساعات",
      employee: "خالد القامدي",
    },
    {
      requestId: "#12567",
      client: "سالم الدوسري",
      service: "ترجمة فرنسي",
      status: "inProgress",
      date: "قبل 5 ساعات",
      employee: "تركي الشمري",
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
      headerName: "الموظف",
      field: "employee",
      minWidth: 140,
      cellRenderer: EmployeeCellRenderer,
      cellStyle: {
        textAlign: "center",
        color: "#000",
        fontWeight: "600",
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

export default LatestOrders;
