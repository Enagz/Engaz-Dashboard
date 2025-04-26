import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Icons } from "./Icons";

ModuleRegistry.registerModules([AllCommunityModule]);

interface EmployeeData {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  phone: string;
  address: string;
  currentOrders: number;
  lastActivity: string;
}

// Custom cell renderer for employee name and email
const EmployeeCellRenderer = (props: any) => {
  const { name, email } = props.data;

  return (
    <div dir="rtl" className="flex flex-col items-end">
      <div className="font-bold text-sm">{name}</div>
      <div className="text-gray-500 text-xs">{email}</div>
    </div>
  );
};

// Custom cell renderer for employee name and email
const OrderSellRenderer = (props: any) => {
  const { currentOrders } = props.data;

  return (
    <div dir="rtl" className="flex justify-center gap-x-1">
      <div className="text-primary-color">{currentOrders}</div>
      <div className="">طلب</div>
    </div>
  );
};

// Custom cell renderer for status
const StatusCellRenderer = (props: any) => {
  const status = props.value;
  let color = "";
  let background = "";
  let text = "";
  let icon = "•";

  if (status === "active") {
    color = "var(--color-green-color)";
    background = "var(--color-green-hover)";
    text = "نشط";
  } else if (status === "inactive") {
    color = "var(--color-red-color)";
    background = "var(--color-red-hover)";
    text = "غير نشط";
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

// Custom cell renderer for actions
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

const AllEmployees: React.FC = () => {
  const [rowData] = useState<EmployeeData[]>([
    {
      id: 1,
      name: "عبد الله القحطاني",
      email: "abdallah2@email.com",
      phone: "0501234567",
      currentOrders: 18,
      status: "active",
      lastActivity: "اليوم",
      address: "الرياض",
    },
    {
      id: 2,
      name: "فهد الدوسري",
      email: "fahd.d3@email.com",
      phone: "0559876543",
      currentOrders: 12,
      status: "inactive",
      lastActivity: "منذ 3 ساعات",
      address: "جدة",
    },
    {
      id: 3,
      name: "نايف المطيري",
      email: "naif.98@email.com",
      phone: "0587654321",
      currentOrders: 7,
      status: "active",
      lastActivity: "منذ 3 ساعات",
      address: "الدمام",
    },
    {
      id: 4,
      name: "راكان الشمري",
      email: "rakan.r@email.com",
      phone: "0512345678",
      currentOrders: 3,
      status: "inactive",
      lastActivity: "منذ ساعتين",
      address: "مكة",
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "اسم العميل",
      field: "name",
      cellRenderer: EmployeeCellRenderer,
      minWidth: 150,
      cellStyle: {
        textAlign: "right",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "right",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
    {
      headerName: "الحالة",
      field: "status",
      minWidth: 100,
      cellRenderer: StatusCellRenderer,
      cellStyle: {
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "center",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
    {
      headerName: "رقم الهاتف",
      field: "phone",
      minWidth: 120,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontSize: ".875rem",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "center",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
    {
      headerName: "العنوان",
      field: "address",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "center",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
    {
      headerName: "الطلبات الحالية",
      field: "currentOrders",
      minWidth: 100,
      cellRenderer: OrderSellRenderer,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontSize: ".875rem",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "center",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
    {
      headerName: "آخر تسجيل",
      field: "lastActivity",
      minWidth: 130,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontSize: ".875rem",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "center",
        fontSize: ".875rem",
        fontWeight: 600,
      },
    },
    {
      headerName: "الإجراءات",
      field: "actions",
      minWidth: 100,
      cellRenderer: ActionsCellRenderer,
      cellStyle: {
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: "var(--color-table-border)",
        textAlign: "center",
        fontSize: ".875rem",
        fontWeight: 600,
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
    <div className="flex flex-col">
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
          headerHeight={50}
        />
      </div>
    </div>
  );
};

export default AllEmployees;
