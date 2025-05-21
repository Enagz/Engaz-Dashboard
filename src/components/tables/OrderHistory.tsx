"use client";

import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
  AllCommunityModule,
} from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

// Assuming Icons and enjazService are correctly set up in your project
import { Icons } from "./Icons";
import { enjazService } from "@/services/enjazService";
import OrdersForm from "../forms/OrdersForm";
import ConfirmDialog from "../forms/ConfirmDialog";
import SuccessDialog from "../forms/SuccessDialog";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  requestId: string;
  orderDate: string;
  serviceType: string;
  status: "completed" | "rejected" | "inProgress" | "underReview";
  executionTime: string;
  employee: string;
  notes: string;
  totalPayments: string;
  rawId: number | string;
}

const PAGINATION_PAGE_SIZE = 10;

// Main component
const OrderHistory: React.FC<{ customerId: string }> = ({ customerId }) => {
  const gridRef = useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = useState<any>(null);

  // Get translations and locale
  const t = useTranslations("orderHistory");
  const locale = useLocale() as "ar" | "en";

  // Custom cell renderer for status column
  const StatusCellRenderer = (props: any) => {
    if (!props.data) return null;
    const status = props.value;
    let color = "";
    let background = "";
    let text = "";
    const icon = "•";

    const fallbackGreenColor = "#28a745";
    const fallbackGreenHover = "#e9f5ec";
    const fallbackRedColor = "#dc3545";
    const fallbackRedHover = "#fdeaed";
    const fallbackYellowColor = "#ffc107";
    const fallbackYellowHover = "#fff8e1";
    const fallbackBlueColor = "#007bff";
    const fallbackBlueHover = "#e6f2ff";

    if (status === "completed") {
      color = `var(--color-green-color, ${fallbackGreenColor})`;
      background = `var(--color-green-hover, ${fallbackGreenHover})`;
      text = t("status.completed");
    } else if (status === "rejected") {
      color = `var(--color-red-color, ${fallbackRedColor})`;
      background = `var(--color-red-hover, ${fallbackRedHover})`;
      text = t("status.rejected");
    } else if (status === "inProgress") {
      color = `var(--color-yellow-color, ${fallbackYellowColor})`;
      background = `var(--color-yellow-hover, ${fallbackYellowHover})`;
      text = t("status.inProgress");
    } else if (status === "underReview") {
      color = `var(--color-blue-color, ${fallbackBlueColor})`;
      background = `var(--color-blue-hover, ${fallbackBlueHover})`;
      text = t("status.underReview");
    } else {
      color = `var(--color-text-normal, #555)`;
      background = `var(--color-gray-hover, #f0f0f0)`;
      text = status || t("status.unknown");
    }

    return (
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="flex h-full items-center justify-center"
      >
        <div
          className="font-bold flex items-center gap-1 px-2 py-1 rounded-full text-xs"
          style={{ background, color: color }}
        >
          <span className="text-lg mr-1">{icon}</span>
          {text}
        </div>
      </div>
    );
  };

  // Custom cell renderer for employee column
  const EmployeeCellRenderer = (props: any) => {
    if (!props.data) return null;
    const employee = props.data.employee;
    return (
      <div className="flex items-center justify-start font-bold gap-1.5">
        {employee}
      </div>
    );
  };

  const ActionsCellRenderer = (props: any) => {
    const [formOpen, setFormOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const { requestId, status } = props.data;

    const deleteHandler = async () => {
      try {
        const response = await enjazService.deleteOrder(requestId);

        console.log(response.data);
        setOpenConfirm(false);
        setOpenSuccess(true);
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    };

    return (
      <div className="h-full flex gap-2 justify-center items-center">
        <OrdersForm
          open={formOpen}
          setOpen={setFormOpen}
          initialValues={{
            numberofletters: "",
            status: status,
            cost: "",
            id: requestId.replace("#", ""),
          }}
        />

        <ConfirmDialog
          open={openConfirm}
          setOpen={setOpenConfirm}
          message={{
            title: "هل أنت متأكد من حذف هذا الطلب؟",
            description:
              'سيتم إزالة جميع بيانات الطلب نهائيًا، ولن يمكن استرجاعها. إذا كنت متأكدًا، اضغط على "حذف"',
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => deleteHandler()}
              className="inline-block text-center font-semibold px-6 py-2.5 bg-error-color text-white rounded-sm hover:bg-error-color/90 cursor-pointer"
            >
              حذف
            </button>
            <button
              onClick={() => setOpenConfirm(false)}
              className="inline-block text-center font-semibold px-6 py-2.5 border border-text-normal text-text-normal rounded-sm hover:bg-global-bg cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </ConfirmDialog>

        <SuccessDialog
          open={openSuccess}
          setOpen={setOpenSuccess}
          message={"تهانينا ! تم حذف الطلب بنجاح"}
        >
          <div className="grid gap-4">
            <Link
              href="/orders"
              className="inline-block text-center font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
            >
              متابعة
            </Link>
          </div>
        </SuccessDialog>

        <button
          onClick={() => setOpenConfirm(true)}
          title={t("actionTitles.delete")}
          className="bg-none border-none cursor-pointer"
        >
          <Icons.trash />
        </button>
        <button
          title={t("actionTitles.view")}
          className="bg-none border-none cursor-pointer"
        >
          <a
            target="_blank"
            href={`${
              process.env.NEXT_PUBLIC_API_BASE_URL
            }/api/dashboard/order/download/${requestId.replace("#", "")}`}
          >
            <Icons.download />
          </a>
          {/* <Link href={`/orders/${requestId}`}>
            <Icons.view />
          </Link> */}
        </button>
        <button
          className="bg-none border-none cursor-pointer"
          title={t("actionTitles.edit")}
          onClick={() => setFormOpen(true)}
        >
          <Icons.edit />
        </button>
      </div>
    );
  };

  // Column definitions
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: t("tableHeaders.requestId"),
      field: "requestId",
      minWidth: 120,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal, #333)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("tableHeaders.orderDate"),
      field: "orderDate",
      minWidth: 150,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal, #555)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("tableHeaders.serviceType"),
      field: "serviceType",
      minWidth: 180,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal, #555)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("tableHeaders.status"),
      field: "status",
      minWidth: 150,
      cellRenderer: StatusCellRenderer,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: t("tableHeaders.totalPayments"),
      field: "totalPayments",
      minWidth: 150,
      cellStyle: {
        color: "var(--color-primary-color, #007bff)",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("tableHeaders.employee"),
      field: "employee",
      minWidth: 150,
      cellRenderer: EmployeeCellRenderer,
      cellStyle: {
        textAlign: "center",
        color: "#000",
        fontWeight: "600",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("tableHeaders.executionTime"),
      field: "executionTime",
      minWidth: 130,
      cellStyle: {
        textAlign: "center",
        color: "var(--color-text-normal, #555)",
        fontWeight: "500",
        fontSize: ".875rem",
      },
    },
    {
      headerName: t("tableHeaders.notes"),
      field: "notes",
      minWidth: 200,
      cellStyle: {
        textAlign: locale === "ar" ? "right" : "left",
        color: "var(--color-text-normal, #555)",
        fontWeight: "500",
        fontSize: ".875rem",
        paddingRight: locale === "ar" ? "10px" : "0",
        paddingLeft: locale === "ar" ? "0" : "10px",
      },
      headerClass: locale === "ar" ? "text-right" : "text-left",
    },
    {
      headerName: t("tableHeaders.actions"),
      field: "actions",
      minWidth: 120,
      cellRenderer: ActionsCellRenderer,
      cellStyle: { textAlign: "center" },
      sortable: false,
      filter: false,
    },
  ]);

  // Default column definition
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      headerClass: "text-center",
      headerStyle: {
        fontSize: ".75rem",
        fontWeight: 600,
        backgroundColor: "var(--color-table-border, #f0f0f0)",
        color: "#000",
      },
    }),
    []
  );

  const dataSource = useMemo((): IDatasource => {
    return {
      getRows: async (params: IGetRowsParams) => {
        console.log(
          `AG Grid (OrderHistory): Requesting rows from ${params.startRow} to ${params.endRow} for customer ${customerId}`
        );
        const pageToFetch =
          Math.floor(params.startRow / PAGINATION_PAGE_SIZE) + 1;

        try {
          const response = await enjazService.getClientOrders(
            customerId,
            pageToFetch
          );

          if (
            response.data &&
            response.data.message === "page number is out of range"
          ) {
            console.warn(
              `AG Grid (OrderHistory): Page ${pageToFetch} is out of range. Assuming no more rows.`
            );
            params.successCallback([], pageToFetch === 1 ? 0 : params.startRow);
            return;
          }

          const orders = response.data?.orders || [];
          const totalPagesFromAPI = response.data?.totalPages || 0;

          const mappedData: RowData[] = orders.map((order: any) => {
            let currentStatus: RowData["status"] = "inProgress"; // Default
            if (order.status?.toLowerCase() === "completed")
              currentStatus = "completed";
            else if (order.status?.toLowerCase() === "rejected")
              currentStatus = "rejected";
            else if (order.status?.toLowerCase() === "under review")
              currentStatus = "underReview";

            return {
              rawId: order.id,
              requestId: `#${order.id}`,
              orderDate: order.createdAt
                ? new Date(order.createdAt).toLocaleDateString(
                    locale === "ar" ? "ar-SA" : "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )
                : t("placeholders.notAvailable"),
              serviceType: order.type || t("placeholders.notSpecified"),
              status: currentStatus,
              executionTime: order.time || t("placeholders.notSpecified"),
              employee: order.employee || t("placeholders.notAssigned"),
              notes: order.additionalNote || t("placeholders.none"),
              totalPayments:
                order.cost && order.cost !== "Not decided yet"
                  ? locale === "ar"
                    ? `${parseFloat(order.cost).toLocaleString()} ر.س`
                    : `${parseFloat(order.cost).toLocaleString()} SAR`
                  : t("placeholders.notDecided"),
            };
          });

          let lastRow = -1;

          if (totalPagesFromAPI > 0) {
            const totalPossibleRows = totalPagesFromAPI * PAGINATION_PAGE_SIZE;
            if (pageToFetch >= totalPagesFromAPI) {
              lastRow =
                (totalPagesFromAPI - 1) * PAGINATION_PAGE_SIZE +
                mappedData.length;
            } else {
              lastRow = totalPossibleRows;
            }
            if (
              mappedData.length === 0 &&
              pageToFetch > totalPagesFromAPI &&
              totalPagesFromAPI > 0
            ) {
              lastRow = totalPossibleRows;
            }
          } else if (mappedData.length === 0 && pageToFetch === 1) {
            lastRow = 0;
          }

          console.log(
            `AG Grid (OrderHistory): Loaded ${mappedData.length} orders for page ${pageToFetch}. Last row: ${lastRow}`
          );
          params.successCallback(mappedData, lastRow);
        } catch (err: any) {
          console.error(
            "AG Grid (OrderHistory): Failed to load order data",
            err
          );
          if (
            err.response &&
            err.response.data &&
            err.response.data.message === "page number is out of range"
          ) {
            params.successCallback([], pageToFetch === 1 ? 0 : params.startRow);
          } else {
            params.failCallback();
          }
        }
      },
    };
  }, [customerId, t, locale]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between"
        style={{
          backgroundColor: "white",
          padding: "10px 16px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          borderBottom: "1px solid var(--color-table-border, #e0e0e0)",
        }}
      >
        <h2 className="text-xl font-bold text-[#333]">{t("title")}</h2>
      </div>

      <div
        className="ag-theme-alpine"
        style={{
          height: "300px",
          width: "100%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowModelType="infinite"
          datasource={dataSource}
          pagination={true}
          paginationPageSize={PAGINATION_PAGE_SIZE}
          cacheBlockSize={PAGINATION_PAGE_SIZE}
          infiniteInitialRowCount={PAGINATION_PAGE_SIZE}
          headerHeight={44}
          rowHeight={50}
          enableRtl={locale === "ar"} // Enable RTL based on locale
        />
      </div>
    </div>
  );
};

export default OrderHistory;
