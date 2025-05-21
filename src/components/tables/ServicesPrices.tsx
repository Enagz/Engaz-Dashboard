"use client";

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";

import { Icons } from "./lcons";

import { enjazService } from "@/services/enjazService"; // Adjust path as needed

import CostsForm from "../forms/CostsForm";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  service: string;
  price: number;
  language: string;
}

const PriceRenderer = (props: any) => {
  return (
    <div className="flex gap-1 justify-center">
      <span className="text-primary-color">{props.data.price}</span>
      <span>ر.س لكل كلمة</span>
    </div>
  );
};

// Custom cell renderer for action buttons
const ActionsCellRenderer = (props: any) => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="h-full flex gap-2 justify-center items-center">
      <button
        onClick={() => setFormOpen(true)}
        className="bg-none border-none cursor-pointer"
      >
        <Icons.edit />
      </button>

      <CostsForm
        open={formOpen}
        setOpen={setFormOpen}
        initialValues={{
          service: "printing",
          cost: 50,
          languge: "",
          arabiclanguge: "",
          color: "black & white printing",
          arabiccolor: "طباعة ابيض واسود",
        }}
        mode="edit"
      />
    </div>
  );
};

const ServicesPrices = ({ readOnly }: { readOnly?: boolean }) => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const response = await enjazService.getCosts();
        const data = response.data;

        // Transform the API response into grid-compatible rows
        const mappedData: RowData[] = [];

        // Handle printing covers
        if (data.printngcover && Array.isArray(data.printngcover)) {
          data.printngcover.forEach((item: any) => {
            mappedData.push({
              service: item.name || item.arabicname,
              price: item.cost,
              language: "طباعة الغلاف",
            });
          });
        }

        // Handle printing colors
        if (data.printingcolors && Array.isArray(data.printingcolors)) {
          data.printingcolors.forEach((item: any) => {
            mappedData.push({
              service: "طباعة ألوان",
              price: item.cost,
              language: item.color || item.ArabicColor,
            });
          });
        }

        // Handle languages costs
        if (data.langugescosts && Array.isArray(data.langugescosts)) {
          data.langugescosts.forEach((item: any) => {
            mappedData.push({
              service: "ترجمة",
              price: item.cost,
              language: item.Arabicname || item.name,
            });
          });
        }

        setRowData(mappedData);
      } catch (error) {
        console.error("Failed to fetch costs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCosts();
  }, []);

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
    ...(!readOnly
      ? [
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
        ]
      : []),
  ]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  if (loading) {
    return <p>جاري التحميل...</p>;
  }

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
        rowHeight={64}
      />
    </div>
  );
};

export default ServicesPrices;
