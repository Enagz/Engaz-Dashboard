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
  status: "present" | "late" | "absent";
  section: string;
  attendanceTime: string;
  leaveTime: string;
}

// Custom cell renderer for employee name and email
const EmployeeCellRenderer = (props: any) => {
  const { name, email } = props.data;

  return (
    <div className="flex flex-col items-start">
      <div className="font-bold text-sm">{name}</div>
      <div className="text-gray-500 text-xs">{email}</div>
    </div>
  );
};

// Custom cell renderer for status
const StatusCellRenderer = (props: any) => {
  const status = props.value;
  let color = "";
  let background = "";
  let text = "";
  let icon;

  if (status === "present") {
    color = "var(--color-green-color)";
    background = "var(--color-green-hover)";
    text = "حاضر";
    icon = <Icons.present />;
  } else if (status === "late") {
    color = "var(--color-yellow-color)";
    background = "var(--color-yellow-hover)";
    text = "متأخر";
    icon = <Icons.late />;
  } else if (status === "absent") {
    color = "var(--color-red-color)";
    background = "var(--color-red-hover)";
    text = "غائب";
    icon = <Icons.absent />;
  }

  return (
    <div className="flex h-full items-center justify-center">
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

const EmployeesAttendance: React.FC = () => {
  const [rowData] = useState<EmployeeData[]>([
    {
      id: 1,
      name: "عبد الله القحطاني",
      email: "abdallah2@email.com",
      section: "الترجمة",
      status: "present",
      attendanceTime: "08:00 صباحًا",
      leaveTime: "04:00 مساءً",
    },
    {
      id: 2,
      name: "فهد الدوسري",
      email: "fahd.d3@email.com",
      section: "الطباعة",
      status: "late",
      attendanceTime: "09:15 صباحًا",
      leaveTime: "05:15 مساءً",
    },
    {
      id: 3,
      name: "نايف المطيري",
      email: "naif.98@email.com",
      section: "الترجمة",
      status: "absent",
      attendanceTime: "لم يسجل",
      leaveTime: "لم يسجل",
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
      headerName: "القسم",
      field: "section",
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
      headerName: "وقت الحضور",
      field: "attendanceTime",
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
      headerName: "وقت الانصراف",
      field: "leaveTime",
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

export default EmployeesAttendance;
