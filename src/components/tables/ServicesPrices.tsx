import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  service: string;
  price: number;
  language: string;
  deliveryMethod: string;
  bonusAddon: string;
}

const PriceRenderer = (props: any) => {
  return (
    <div className="flex gap-1">
      <span className="text-primary-color">{props.data.price}</span>
      <span>ر.س لكل كلمة</span>
    </div>
  );
};

const ServicesPrices: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    {
      service: "ترجمة عادية",
      price: 1.87,
      language: "من العربية إلى الإنجليزية",
      deliveryMethod: "ورقي فقط",
      bonusAddon: "20% زيادة للتسليم الإلكترونى ",
    },
    {
      service: "ترجمة عاجلة",
      price: 5.63,
      language: "من الإنجليزية إلى العربية",
      deliveryMethod: "ورقي فقط",
      bonusAddon: "50% زيادة للتسليم الإلكترونى ",
    },
    {
      service: "طباعة أسود وأبيض",
      price: 1.87,
      language: "أبيض وأسود",
      deliveryMethod: "ورقي فقط",
      bonusAddon: "10% زيادة للتسليم الإلكترونى ",
    },
    {
      service: "طباعة ملونة",
      price: 5.63,
      language: "ملونة",
      deliveryMethod: "ورقي فقط",
      bonusAddon: "60% زيادة للتسليم الإلكترونى ",
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
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
      headerName: "السعر لكل كلمة/صفحة",
      field: "price",
      minWidth: 140,
      cellRenderer: PriceRenderer,
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
      headerName: "اللغة/نوع الطباعة",
      field: "language",
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
      headerName: "طريقة التسليم",
      field: "deliveryMethod",
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
      headerName: "الإضافة العاجلة",
      field: "bonusAddon",
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

export default ServicesPrices;
