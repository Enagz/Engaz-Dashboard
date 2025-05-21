"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "@/components/forms/ConfirmDialog";
import SuccessDialog from "@/components/forms/SuccessDialog";
import { enjazService } from "@/services/enjazService";
import { getRelativeTime } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

type Notification = {
  id: string;
  employeeId: string;
  type: string;
  serviceId: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

export default function Notifications() {
  const t = useTranslations("notificationsPage");
  const locale = useLocale();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await enjazService.getNotifications();
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  async function handleNotificationClick(notification: Notification) {
    if (!notification.isRead) {
      try {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
        await enjazService.readNotification(notification.id);
      } catch (error) {
        console.error("Failed to mark as read:", error);
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, isRead: false } : n
          )
        );
      }
    }
  }

  async function handleDelete() {
    try {
      await enjazService.deleteAllNotificationa();
      setNotifications([]);
      setOpenConfirm(false);
      setOpenSuccess(true);
    } catch (error) {
      console.error("Failed to delete notifications:", error);
    }
  }

  const filteredNotifications = notifications.filter((note) => {
    if (activeTab === "read") return note.isRead;
    if (activeTab === "unread") return !note.isRead;
    return true;
  });

  return (
    <div>
      <div className="flex gap-1 text-lg text-text-normal">
        <span>{t("breadcrumbHome")}</span>
        <span>/</span>
        <span className="text-primary-color">
          {t("breadcrumbNotifications")}
        </span>
      </div>

      <p className="mt-8 mb-10 font-semibold text-2xl text-left rtl:text-right">
        {t("pageTitle")}
      </p>

      <div className="max-w-3xl bg-white rounded-xl shadow p-6">
        <div className="flex flex-col gap-y-10 border-b pb-3 mb-3">
          <h2 className="text-xl font-bold text-left rtl:text-right">
            {t("sectionTitle")}
          </h2>

          <div className="flex gap-10 text-lg font-medium text-text-normal">
            {["all", "read", "unread"].map((tab) => (
              <button
                key={tab}
                className={`pb-1 border-b-2 ${
                  activeTab === tab
                    ? "border-primary-color text-primary-color text-xl font-semibold"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {t(tab)}
              </button>
            ))}
          </div>
        </div>

        <ul className="space-y-4">
          {loading && <div className="text-center">{t("loading")}</div>}

          {!loading &&
            filteredNotifications.map((note, i) => (
              <li key={i} className="text-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 flex flex-col gap-y-2 text-left rtl:text-right">
                    <div className="flex items-center gap-x-2">
                      <div
                        className={`size-2.5 min-w-2.5 rounded-full ${
                          !note.isRead ? "bg-primary-color" : "bg-text-normal"
                        }`}
                      />
                      <p
                        onClick={() => handleNotificationClick(note)}
                        className="font-bold mb-1 cursor-pointer"
                      >
                        {note.title}
                      </p>
                    </div>
                    <p className="text-text-normal">{note.body}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {getRelativeTime(note.createdAt, locale)}
                  </span>
                </div>
              </li>
            ))}
        </ul>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setOpenConfirm(true)}
            className="cursor-pointer text-white bg-error-color px-5 py-2 rounded-md hover:bg-error-color/90 text-sm"
          >
            {t("deleteAll")}
          </button>

          <ConfirmDialog
            open={openConfirm}
            setOpen={setOpenConfirm}
            message={{
              title: t("confirmDelete.title"),
              description: t("confirmDelete.description"),
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleDelete}
                className="inline-block text-center font-semibold px-6 py-2.5 bg-error-color text-white rounded-sm hover:bg-error-color/90 cursor-pointer"
              >
                {t("deleteAll")}
              </button>
              {/* <button
                onClick={() => setOpenConfirm(false)}
                className="inline-block text-center font-semibold px-6 py-2.5 border border-text-normal text-text-normal rounded-sm hover:bg-global-bg cursor-pointer"
              >
                إلغاء
              </button> */}
            </div>
          </ConfirmDialog>

          <SuccessDialog
            open={openSuccess}
            setOpen={setOpenSuccess}
            message={t("successDelete")}
          >
            <div className="grid gap-4">
              <Link
                href="/"
                className="inline-block text-center font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90 cursor-pointer"
              >
                {t("continue")}
              </Link>
            </div>
          </SuccessDialog>
        </div>
      </div>
    </div>
  );
}
