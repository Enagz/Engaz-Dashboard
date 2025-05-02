import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Trash2, Download, Edit2, Sliders, Flag } from "lucide-react"; // استيراد أيقونة Flag للملاحظات

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
    requestId: string;
    orderDate: string;
    serviceType: string;
    status: "completed" | "rejected" | "inProgress";
    executionTime: string;
    employee: string;
    notes: string;
    totalPayments: string; // إضافة إجمالي المدفوعات
    actions: string;
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

// Custom cell renderer for notes column
const NotesCellRenderer = (props: any) => {
  const notes = props.value;
  return (
    <div dir="rtl" className="text-sm text-gray-600">{notes}</div>
  );
};


// Custom cell renderer for total payments
const TotalPaymentsCellRenderer = (props: any) => {
    const totalPayments = props.value;
    return (
      <div dir="rtl" className="text-sm font-bold text-blue-500">{totalPayments}</div>
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

const OrderHistory: React.FC = () => {
    const [rowData] = useState<RowData[]>([
        { requestId: "#12345", orderDate: "Feb 13, 2025", serviceType: "طباعة PDF", status: "completed", executionTime: "يومان", employee: "سعود الحربي", notes: "يتطلب تدقيق", totalPayments: "7,200 ر.س", actions: "" },
        { requestId: "#12346", orderDate: "Mar 10, 2025", serviceType: "ترجمة عربي - إنجليزي", status: "rejected", executionTime: "3 أيام", employee: "تركي السعدي", notes: "لا توجد ملاحظات", totalPayments: "6,300 ر.س", actions: "" },
        { requestId: "#12347", orderDate: "Jan 22, 2025", serviceType: "طباعة PDF", status: "completed", executionTime: "خمس أيام", employee: "فهد الدوسري", notes: "تعديل بسيط", totalPayments: "2,100 ر.س", actions: "" },
        { requestId: "#12348", orderDate: "Oct 17, 2024", serviceType: "ترجمة عربي - فرنسي", status: "inProgress", executionTime: "يوم", employee: "خالد القامدي", notes: "تم التسليم بنجاح", totalPayments: "1,200 ر.س", actions: "" },
        { requestId: "#12350", orderDate: "Sep 20, 2024", serviceType: "ترجمة إسباني - ألماني", status: "rejected", executionTime: "أسبوع", employee: "تركي الشمري", notes: "مشكلة في الدفع", totalPayments: "1,500 ر.س", actions: "" },
    ]);
    
    const [columnDefs] = useState<ColDef[]>([
        {
            headerName: "الإجراءات",
            field: "actions",
            minWidth: 100,
            cellRenderer: ActionsCellRenderer,
            cellStyle: { textAlign: "center", color: "var(--color-text-normal)", fontWeight: "500", fontSize: ".875rem" },
            headerStyle: { fontSize: ".75rem", fontWeight: 600, backgroundColor: "var(--color-table-border)", color: "#000" },
        },
        {
            headerName: "ملاحظات إضافة",
            field: "notes",
            minWidth: 180,
            cellRenderer: NotesCellRenderer,
            cellStyle: { textAlign: "right", color: "var(--color-text-normal)", fontWeight: "400", fontSize: ".875rem" },
            headerStyle: { fontSize: ".75rem", fontWeight: 600, backgroundColor: "var(--color-table-border)", color: "#000", textAlign: "right" },
        },
        {
            headerName: "مدة التنفيذ",
            field: "executionTime",
            minWidth: 120,
            cellStyle: { textAlign: "center", color: "var(--color-text-normal)", fontWeight: "500", fontSize: ".875rem" },
            headerStyle: { fontSize: ".75rem", fontWeight: 600, backgroundColor: "var(--color-table-border)", color: "#000" },
        },
        {
            headerName: "الموظف",
            field: "employee",
            minWidth: 140,
            cellRenderer: EmployeeCellRenderer,
            cellStyle: { textAlign: "center", color: "#000", fontWeight: "600", fontSize: ".875rem" },
            headerStyle: { fontSize: ".75rem", fontWeight: 600, backgroundColor: "var(--color-table-border)", color: "#000" },
        },
        {
            headerName: "إجمالي المدفوعات",
            field: "totalPayments",
            minWidth: 140,
            cellRenderer: TotalPaymentsCellRenderer,
            cellStyle: { textAlign: "center", fontWeight: "bold", fontSize: ".875rem" },
            headerStyle: { fontSize: ".75rem", fontWeight: 600, backgroundColor: "var(--color-table-border)", color: "#000" },
        },
        {
            headerName: "حالة الطلب",
            field: "status",
            minWidth: 120,
            cellRenderer: StatusCellRenderer,
            cellStyle: { fontSize: ".75rem", textAlign: "center", fontWeight: "600" },
            headerStyle: { fontSize: ".75rem", fontWeight: 600, backgroundColor: "var(--color-table-border)", color: "#000" },
        },
        {
            headerName: "نوع الخدمة",
            field: "serviceType",
            minWidth: 160,
            cellStyle: { textAlign: "center", color: "var(--color-text-normal)", fontWeight: "500", fontSize: ".875rem" },
            headerStyle: { fontSize: ".75rem", fontWeight: 600, backgroundColor: "var(--color-table-border)", color: "#000" },
        },
        {
            headerName: "تاريخ الطلب",
            field: "orderDate",
            minWidth: 120,
            cellStyle: { textAlign: "center", color: "var(--color-text-normal)", fontWeight: "500", fontSize: ".875rem" },
            headerStyle: { fontSize: ".75rem", fontWeight: 600, backgroundColor: "var(--color-table-border)", color: "#000" },
        },
        {
            headerName: "رقم الطلب",
            field: "requestId",
            minWidth: 100,
            cellStyle: { textAlign: "center", color: "var(--color-text-normal)", fontWeight: "500", fontSize: ".875rem" },
            headerStyle: { fontSize: ".75rem", fontWeight: 600, backgroundColor: "var(--color-table-border)", color: "#000" },
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

            <div className="flex items-center justify-between" style={{ backgroundColor: 'white', padding: '10px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}> 
                <h2 className="text-xl font-bold text-[#333]">كل الطلبات</h2>
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
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    domLayout="autoHeight"
                    headerHeight={44}
                    rowHeight={50}
                />
            </div>

        <div className="flex items-center justify-between mt-2 px-6">
            <div className="flex space-x-2">
                <button className="bg-white text-gray-500 border border-gray-300 rounded py-2 px-4 hover:bg-gray-100">
                 السابق
                </button>
                <button className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700">
                 التالي
                 </button>
                </div>
                <span className="text-sm text-gray-600">1 من 1</span>
            </div>
        </div>
    );
};
export default OrderHistory;