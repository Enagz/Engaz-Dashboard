"use client";

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import CostsForm from "@/components/forms/CostsForm";

import { enjazService } from "@/services/enjazService";
import { getUserRole } from "@/app/utils/auth.utils";
import { useLocale, useTranslations } from "next-intl";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  id: string;
  service: string;
  price: number;
  language: string;
  otherLanguage: string;
  serviceType: string;
}

const ServicesPrices = () => {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("servicesPrices");

  const [rowData, setRowData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formOpen, setFormOpen] = useState(false);
  const role = getUserRole();

  const readOnly = role === "employee";
  const ITEMS_PER_PAGE = 10;

  // Price cell renderer with translations
  const PriceRenderer = (props: any) => (
    <div className="flex gap-1 justify-center">
      <span className="text-primary-color">
        {t("priceDisplay", { price: props.data.price })}
      </span>
    </div>
  );

  // Actions cell renderer
  const ActionsCellRenderer = (props: any) => {
    const [formOpen, setFormOpen] = useState(false);

    return (
      <div className="h-full flex gap-2 justify-center items-center">
        <button
          onClick={() => setFormOpen(true)}
          className="bg-none border-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500 hover:text-blue-700"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>

        <CostsForm
          open={formOpen}
          setOpen={setFormOpen}
          initialValues={{
            service: props.data.serviceType || "language",
            cost: props.data.price,
            languge:
              locale === "en"
                ? props.data.language
                : props.data.otherLanguage || "",
            arabiclanguge:
              locale === "ar"
                ? props.data.language
                : props.data.otherLanguage || "",
            color:
              locale === "en"
                ? props.data.language
                : props.data.otherLanguage || "",
            arabiccolor:
              locale === "ar"
                ? props.data.language
                : props.data.otherLanguage || "",
            cover:
              locale === "en"
                ? props.data.language
                : props.data.otherLanguage || "",
            arabiccover:
              locale === "ar"
                ? props.data.language
                : props.data.otherLanguage || "",
            serviceType: props.data.serviceType || "",
            id: props.data.id || "",
          }}
          mode="edit"
        />
      </div>
    );
  };

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const response = await enjazService.getCosts();
        const data = response.data;

        const mappedData: RowData[] = [];

        // Map printngcover
        if (Array.isArray(data.printngcover)) {
          data.printngcover.forEach((item: any) =>
            mappedData.push({
              id: item.id,
              service: locale === "ar" ? "طباعة الغلاف" : "Cover Printing",
              price: item.cost,
              language:
                locale === "ar"
                  ? item.arabicname || item.name
                  : item.name || item.arabicname,
              otherLanguage:
                locale === "en"
                  ? item.arabicname || item.name
                  : item.name || item.arabicname,
              serviceType: "covering",
            })
          );
        }

        // Map printingcolors
        if (Array.isArray(data.printingcolors)) {
          data.printingcolors.forEach((item: any) =>
            mappedData.push({
              id: item.id,
              service: locale === "ar" ? "طباعة ألوان" : "Color Printing",
              price: item.cost,
              language:
                locale === "ar"
                  ? item.ArabicColor || item.color
                  : item.color || item.ArabicColor,
              otherLanguage:
                locale === "en"
                  ? item.ArabicColor || item.color
                  : item.color || item.ArabicColor,
              serviceType: "printing",
            })
          );
        }

        // Map langugescosts
        if (Array.isArray(data.langugescosts)) {
          data.langugescosts.forEach((item: any) =>
            mappedData.push({
              id: item.id,
              service: locale === "ar" ? "ترجمة" : "Translation",
              price: item.cost,
              language:
                locale === "ar"
                  ? item.Arabicname || item.name
                  : item.name || item.Arabicname,
              otherLanguage:
                locale === "en"
                  ? item.Arabicname || item.name
                  : item.name || item.Arabicname,
              serviceType: "language",
            })
          );
        }

        setRowData(mappedData);
      } catch (error) {
        console.error("Failed to fetch costs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCosts();
  }, [locale]);

  // Pagination logic
  const totalPages = Math.ceil(rowData.length / ITEMS_PER_PAGE);
  const paginatedData = rowData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Column definitions with translations
  const columnDefs = [
    {
      headerName: t("tableHeaders.service"),
      field: "service",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: 500,
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
      headerName: t("tableHeaders.pricePerWordPage"),
      field: "price",
      minWidth: 140,
      cellRenderer: PriceRenderer,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: 500,
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
      headerName: t("tableHeaders.languagePrintType"),
      field: "language",
      minWidth: 100,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal)",
        fontWeight: 500,
        fontSize: ".875rem",
      },
      headerStyle: {
        fontSize: ".75rem",
        fontWeight: 600,
        backgroundColor: "var(--color-table-border)",
        color: "#000",
      },
    },
    ...(readOnly
      ? []
      : [
          {
            headerName: t("tableHeaders.actions"),
            field: "actions",
            minWidth: 100,
            cellRenderer: ActionsCellRenderer,
            cellStyle: {
              textAlign: "center",
              color: "var(--color-text-normal)",
              fontWeight: 500,
              fontSize: ".875rem",
            },
            headerStyle: {
              fontSize: ".75rem",
              fontWeight: 600,
              backgroundColor: "var(--color-table-border)",
              color: "#000",
            },
          },
        ]),
  ] satisfies ColDef[];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  if (loading) return <p>{t("loading")}</p>;

  return (
    <div className="space-y-4">
      <div className="flex-1 flex flex-col gap-y-8">
        {role !== "employee" ? (
          <div className="flex justify-end">
            <button
              onClick={() => setFormOpen(true)}
              className="inline-block font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
            >
              {t("addNewService")}
            </button>
          </div>
        ) : null}

        {role !== "employee" && (
          <CostsForm
            open={formOpen}
            setOpen={setFormOpen}
            initialValues={{
              service: "language",
              cost: 0,
              languge: "",
              arabiclanguge: "",
              color: "",
              arabiccolor: "",
            }}
            mode="add"
          />
        )}

        <p className="font-semibold text-2xl">
          {role !== "employee" ? t("serviceCosts") : t("servicePrices")}
        </p>

        {/* Table */}
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "auto" }}
        >
          <AgGridReact
            rowData={paginatedData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            domLayout="autoHeight"
            headerHeight={44}
            rowHeight={64}
          />
        </div>

        {/* Paginator */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 text-sm">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              {t("previous")}
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-primary-color text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPrices;
