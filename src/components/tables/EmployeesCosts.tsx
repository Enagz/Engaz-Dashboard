import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  employeeNumber: number;
  employeeName: string;
  department: string;
  monthlySalary: string;
  annualSalary: string;
  bonuses: string;
  discounts: string;
  billingState: string;
}

const EmployeesCosts: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    {
      employeeNumber: 101,
      employeeName: "أحمد الزهراني",
      department: "ترجمة",
      monthlySalary: "2,000 ر.س",
      annualSalary: "24,000 ر.س",
      bonuses: "1,000 ر.س",
      discounts: "200ر.س",
      billingState: "مدفوع",
    },
    {
      employeeNumber: 102,
      employeeName: "خالد السعيد",
      department: "طباعة",
      monthlySalary: "3,000 ر.س",
      annualSalary: "36,000 ر.س",
      bonuses: "700 ر.س",
      discounts: "100 ر.س",
      billingState: "غير مدفوع",
    },
    {
      employeeNumber: 103,
      employeeName: "ماجد العتيبي",
      department: "ترجمة",
      monthlySalary: "2,000 ر.س",
      annualSalary: "24,000 ر.س",
      bonuses: "500 ر.س",
      discounts: "100 ر.س",
      billingState: "مدفوع",
    },
    {
      employeeNumber: 104,
      employeeName: "ياسين المصري",
      department: "طباعة",
      monthlySalary: "4,000 ر.س",
      annualSalary: "48,000 ر.س",
      bonuses: "1,100 ر.س",
      discounts: "300 ر.س",
      billingState: "غير مدفوع",
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "رقم الطلب",
      field: "employeeNumber",
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
      headerName: "اللغة (من/إلى)",
      field: "monthlySalary",
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
      field: "employeeName",
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
      field: "annualSalary",
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
      field: "bonuses",
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
      field: "discounts",
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
      headerName: "ملاحظات إضافية",
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

export default EmployeesCosts;
