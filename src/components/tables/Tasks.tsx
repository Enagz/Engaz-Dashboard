import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  taskNumber: string;
  client: string;
  task: string;
  language: string;
  method: string;
  status: "completed" | "inProgress";
  startDate: string;
  deliveryDate: string;
  comments: string;
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
    text = "مكتملة";
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

const Tasks: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    {
      taskNumber: "001",
      client: "أحمد الزهراني",
      task: "ترجمة تقرير",
      language: "عربي/إنجليزي",
      method: "موقع الشركة",
      status: "completed",
      startDate: "2025-03-29",
      deliveryDate: "2025-04-02",
      comments: "لا توجد ملاحظات",
    },
    {
      taskNumber: "002",
      client: "خالد السعيد",
      task: "ترجمة مستندات",
      language: "إنجليزي/فرنسي",
      method: "دليفري",
      status: "completed",
      startDate: "2025-03-28",
      deliveryDate: "2025-04-01",
      comments: "تم التسليم بنجاح",
    },
    {
      taskNumber: "003",
      client: "ماجد العتيبي",
      task: "ترجمة مقالة",
      language: "فرنسي/عربي",
      method: "موقع الشركة",
      status: "inProgress",
      startDate: "2025-03-27",
      deliveryDate: "2025-03-30",
      comments: "بحاجة إلى مراجعة",
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "رقم الطلب",
      field: "taskNumber",
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
      headerName: "المهمة",
      field: "task",
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
      headerName: "اللغة (من/إلى)",
      field: "language",
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
      headerName: "اسم العميل",
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
      headerName: "طريقة الاستلام",
      field: "method",
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
      headerName: "تاريخ البدء",
      field: "startDate",
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
      headerName: "تاريخ التسليم",
      field: "deliveryDate",
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
      headerName: "حالة المهمة",
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

export default Tasks;
