"use client";

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { Star } from "lucide-react";
import Image from "next/image";
import { enjazService } from "@/services/enjazService";
import { useTranslations, useLocale } from "next-intl";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  rank: string;
  clientName: string;
  email: string;
  phone: string;
  orders: string;
  registrationDate: string;
  totalPayments: string;
  rating: number;
}

const RankCellRenderer = (props: any) => {
  const rank = props.value;
  let src = "/assets/illustrations/gold.png";

  if (rank.includes("Second") || rank.includes("الثاني")) {
    src = "/assets/illustrations/silver.png";
  } else if (rank.includes("Third") || rank.includes("الثالث")) {
    src = "/assets/illustrations/bronze.png";
  }

  return (
    <div dir="rtl" className="flex items-center justify-center gap-2">
      <span className="font-bold text-primary-color">{rank}</span>
      <div className="size-9 min-w-9 rounded-full flex items-center justify-center bg-[#3E97D114]">
        <Image
          src={src}
          width={22}
          height={32}
          className="h-8 w-auto"
          alt={`${rank} badge`}
        />
      </div>
    </div>
  );
};

const RatingCellRenderer = (props: any) => {
  const rating = props.value || 0;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`size-5 ${
          i < rating
            ? "fill-yellow-500 stroke-yellow-500"
            : "fill-none stroke-yellow-500"
        }`}
      />
    );
  }

  return <div className="flex justify-center gap-1">{stars}</div>;
};

const ClientCellRenderer = (props: any) => {
  const { email } = props.data;
  const name = props.value;

  return (
    <div dir="rtl" className="flex flex-col items-end">
      <div className="font-bold text-black text-sm">{name}</div>
      <div className="text-text-normal text-xs">{email}</div>
    </div>
  );
};

const BestCustomers: React.FC = () => {
  const t = useTranslations("bestCustomers");
  const locale = useLocale();
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestClients = async () => {
      try {
        const response = await enjazService.getBestClients();
        const apiData = response.data?.bestClients || [];

        const mappedData: RowData[] = apiData.map((client: any) => {
          const rankMap: Record<number, string> = {
            1: t("first"),
            2: t("second"),
            3: t("third"),
          };

          const rankText =
            rankMap[client.rank] || t("times", { count: client.rank });

          return {
            rank: rankText,
            clientName: client.name,
            email: client.email,
            phone: `${client.countrycode ?? ""}${client.phone}`,
            orders:
              client.ordersCounter > 0
                ? t("ordersCount", { count: client.ordersCounter })
                : t("none"),
            registrationDate: new Date(client.createdAt).toLocaleDateString(
              locale === "ar" ? "ar-SA" : "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            ),
            totalPayments:
              client.totalRevenue > 0
                ? t("currency", {
                    amount: client.totalRevenue.toLocaleString(),
                  })
                : t("none"),
            rating: Math.round(client.rateAvg) || 0,
          };
        });

        setRowData(mappedData);
      } catch (err) {
        console.error("Failed to load best clients", err);
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchBestClients();
  }, [t, locale]);

  const [columnDefs] = useState<ColDef<RowData>[]>([
    {
      headerName: t("rank"),
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
      headerName: t("clientName"),
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
      headerName: t("phone"),
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
      headerName: t("orders"),
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
      headerName: t("registrationDate"),
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
      headerName: t("totalPayments"),
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
      headerName: t("rating"),
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

  if (loading) return <div>{t("loading")}</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

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
