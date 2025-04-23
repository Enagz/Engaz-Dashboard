import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Star } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  rank: string;
  clientName: string;
  email: string;
  phone: string;
  city: string;
  orders: string;
  registrationDate: string;
  totalPayments: string;
  rating: number;
}

// Custom cell renderer for rank column with badge
const RankCellRenderer = (props: any) => {
  const rank = props.value;
  let badgeColor = "";

  if (rank === "الأول") {
    badgeColor = "#FFD700"; // Gold
  } else if (rank === "الثاني") {
    badgeColor = "#C0C0C0"; // Silver
  } else if (rank === "الثالث") {
    badgeColor = "#CD7F32"; // Bronze
  }

  return (
    <div dir="rtl" className="flex items-center justify-center gap-2">
      <span className="font-bold text-primary-color">{rank}</span>
      <div
        className="size-6 rounded-full"
        style={{ backgroundColor: badgeColor }}
      ></div>
    </div>
  );
};

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

// Custom cell renderer for client name column
const ClientCellRenderer = (props: any) => {
  const { email } = props.data;
  const name = props.value;

  return (
    <div dir="rtl" className="flex flex-col items-end">
      <div className="font-bold text-black text-sm">{name}</div>
      <div className="text-gray-500 text-xs">{email}</div>
    </div>
  );
};

const BestCustomers: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    {
      rank: "الأول",
      clientName: "عبد الله القحطاني",
      email: "abdallah2@email.com",
      phone: "0501234567",
      city: "الرياض",
      orders: "18 طلب",
      registrationDate: "Feb 19, 2023",
      totalPayments: "7,200 ر.س",
      rating: 5,
    },
    {
      rank: "الثاني",
      clientName: "فهد الدوسري",
      email: "fahd.d3@email.com",
      phone: "0559876543",
      city: "جدة",
      orders: "17 طلب",
      registrationDate: "May 22, 2023",
      totalPayments: "6,300 ر.س",
      rating: 4,
    },
    {
      rank: "الثالث",
      clientName: "نايف المطيري",
      email: "naif.98@email.com",
      phone: "0587654321",
      city: "الدمام",
      orders: "12 طلب",
      registrationDate: "Jun 19, 2024",
      totalPayments: "2,100 ر.س",
      rating: 3,
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "الترتيب",
      field: "rank",
      minWidth: 100,
      cellRenderer: RankCellRenderer,
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
      field: "clientName",
      minWidth: 180,
      cellRenderer: ClientCellRenderer,
      cellStyle: {
        textAlign: "right",
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
      headerName: "رقم الهاتف",
      field: "phone",
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
      headerName: "المدينة",
      field: "city",
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
      headerName: "عدد الطلبات",
      field: "orders",
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
      headerName: "تاريخ التسجيل",
      field: "registrationDate",
      minWidth: 130,
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
      headerName: "إجمالي المدفوعات",
      field: "totalPayments",
      minWidth: 140,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-primary-color)",
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
      field: "rating",
      minWidth: 140,
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

export default BestCustomers;
