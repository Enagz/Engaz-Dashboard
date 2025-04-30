import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Trash2, Edit2, Download, Sliders } from "lucide-react";
import { Link } from 'react-router-dom';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ClientData {
  id: number;
  name: string;
  email: string;
  phone: string;
  orderCount: string;
  status: "active" | "inactive";
  registrationDate: string;
  lastActivity: string;
  totalPayments: string;
}

// Custom cell renderer for client name and email
const ClientCellRenderer = (props: any) => {
  const { id, name } = props.data;

  return (
    <div dir="rtl" className="flex flex-col items-end">
      {/* <div className="font-bold text-sm">{name}</div> */}
      <Link to={`/customers/${id}`} className="font-bold text-sm hover:underline">
        {name}
      </Link>
      <div className="text-gray-500 text-xs">{props.data.email}</div>
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

const CustomerDetails: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData] = useState<ClientData[]>([
    {
      id: 1,
      name: "عبد الله القحطاني",
      email: "abdallah2@email.com",
      phone: "0501234567",
      orderCount: "18 طلب",
      status: "active",
      registrationDate: "Jul 13, 2023",
      lastActivity: "Mar 15, 2025",
      totalPayments: "7,200 ر.س",
    },
    {
      id: 2,
      name: "فهد الدوسري",
      email: "fahd.d3@email.com",
      phone: "0559876543",
      orderCount: "17 طلب",
      status: "inactive",
      registrationDate: "Jul 13, 2023",
      lastActivity: "Mar 19, 2025",
      totalPayments: "6,300 ر.س",
    },
    {
      id: 3,
      name: "نايف المطيري",
      email: "naif.98@email.com",
      phone: "0587654321",
      orderCount: "12 طلب",
      status: "active",
      registrationDate: "Jul 13, 2023",
      lastActivity: "Mar 13, 2025",
      totalPayments: "2,100 ر.س",
    },
    {
      id: 4,
      name: "راكان الشمري",
      email: "rakan.r@email.com",
      phone: "0512345678",
      orderCount: "15 طلب",
      status: "inactive",
      registrationDate: "Jul 13, 2023",
      lastActivity: "Mar 20, 2025",
      totalPayments: "1,200 ر.س",
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "اسم العميل",
      field: "name",
      cellRenderer: ClientCellRenderer,
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
      headerName: "عدد الطلبات",
      field: "orderCount",
      minWidth: 100,
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
      headerName: "حالة العميل",
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
      headerName: "تاريخ التسجيل",
      field: "registrationDate",
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
      sort: "desc",
    },
    {
      headerName: "آخر نشاط",
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
      headerName: "إجمالي المدفوعات",
      field: "totalPayments",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-primary-color, #0091FF)",
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
    
      <div className="flex items-center justify-between" style={{ backgroundColor: 'white', padding: '10px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}> {/* إضافة نمط الخلفية */}
        <h2 className="text-xl font-bold text-[#333]">كل العملاء</h2>
        <Sliders size={24} color="#888" />
      </div>

      <div
        className="ag-theme-alpine"
        style={{
          height: "auto",
          width: "100%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection={{ mode: "multiRow", groupSelects: "descendants" }}
          paginationAutoPageSize={true}
          pagination={true}
          domLayout="autoHeight"
          headerHeight={50}
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
