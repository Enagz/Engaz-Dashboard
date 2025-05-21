"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { enjazService } from "@/services/enjazService";
import { usePathname } from "@/i18n/navigation";
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

const NotificationsBar = () => {
  const t = useTranslations("notifications");
  const locale = useLocale() as "ar" | "en";
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [loading, setLoading] = useState(true);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "completed":
        return (
          <svg
            width={16}
            height={17}
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m6.367 10.6 5.65-5.65a.64.64 0 0 1 .466-.2.64.64 0 0 1 .467.2q.2.2.2.475a.65.65 0 0 1-.2.475l-6.117 6.133a.64.64 0 0 1-.466.2.64.64 0 0 1-.467-.2L3.033 9.167a.62.62 0 0 1-.192-.475.68.68 0 0 1 .209-.475.65.65 0 0 1 .475-.2q.275 0 .475.2z"
              fill="#1D1D1D"
            />
          </svg>
        );
      case "Order Message":
        return (
          <svg
            width={16}
            height={17}
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.019 1.584c.297-.195.659-.25.981-.25s.684.055.981.25c.33.215.519.564.519 1 0 .31-.094.63-.247.906a5.07 5.07 0 0 1 3.807 4.645l.015.331c.015.361.028.676.093.977.079.36.223.643.517.863.513.385.815.989.815 1.63 0 .92-.725 1.731-1.7 1.731h-2.35a2.5 2.5 0 0 1-4.9 0H3.2c-.975 0-1.7-.81-1.7-1.731 0-.641.302-1.245.815-1.63.294-.22.438-.503.517-.863.065-.301.078-.616.093-.977l.015-.33A5.07 5.07 0 0 1 6.747 3.49a1.9 1.9 0 0 1-.247-.906c0-.436.19-.785.519-1m-.434 12.083a1.5 1.5 0 0 0 2.83 0zm6.215-1c.382 0 .7-.321.7-.731 0-.327-.154-.634-.415-.83-.537-.403-.78-.927-.894-1.451-.086-.395-.103-.825-.118-1.198l-.011-.27a4.067 4.067 0 0 0-8.124 0l-.012.27c-.014.373-.031.803-.117 1.198-.114.524-.357 1.048-.894 1.451a1.04 1.04 0 0 0-.415.83c0 .41.318.731.7.731zm-4.494-9.55c-.13.175-.248.217-.306.217s-.176-.042-.306-.216a.97.97 0 0 1-.194-.534.25.25 0 0 1 .021-.117.1.1 0 0 1 .046-.047c.065-.042.203-.086.433-.086s.368.044.433.086a.1.1 0 0 1 .046.047.25.25 0 0 1 .021.117.97.97 0 0 1-.194.534"
              fill="#1D1D1D"
            />
          </svg>
        );
      case "Support Message":
        return (
          <svg
            width={16}
            height={17}
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 9.668a.504.504 0 0 1-.5-.5V5.835c0-.274.227-.5.5-.5s.5.226.5.5v3.333c0 .273-.227.5-.5.5m.007 2.167a.67.67 0 0 1-.667-.667c0-.367.293-.667.667-.667.366 0 .666.3.666.667s-.3.667-.666.667"
              fill="#1D1D1D"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.887 15.668H8l.007.007h.12c.7-.054 1.14-.554 1.493-.96.227-.26.44-.5.667-.587.23-.085.557-.06.905-.034h.015c.607.047 1.36.1 1.92-.46.573-.573.513-1.32.46-1.92v-.009c-.034-.363-.066-.712.047-.95.1-.214.326-.414.573-.627.453-.393 1.02-.893.96-1.727-.053-.7-.553-1.14-.96-1.493l-.034-.03c-.241-.216-.47-.42-.553-.637-.087-.219-.063-.526-.038-.85l.005-.063c.053-.6.113-1.347-.46-1.927-.573-.573-1.327-.513-1.927-.46l-.015.001c-.34.027-.662.051-.898-.034-.224-.08-.435-.321-.66-.578l-.007-.01-.012-.013c-.35-.398-.789-.894-1.488-.947h-.226c-.7.054-1.14.554-1.494.96-.226.26-.44.5-.666.587-.22.088-.527.064-.85.038L4.82 2.94c-.6-.053-1.353-.113-1.926.46-.56.56-.507 1.314-.46 1.92v.015c.027.348.052.675-.034.905-.085.224-.328.436-.584.66l-.009.007c-.46.393-1.02.887-.96 1.72.053.7.553 1.14.96 1.493.26.227.5.44.587.667.085.23.06.557.034.905l-.001.015-.002.03c-.04.602-.089 1.34.462 1.89.566.566 1.308.508 1.904.462l.037-.003c.342-.026.662-.051.899.034.224.08.435.322.66.579l.007.008c.353.407.793.907 1.493.96m-1.813-2.493a2.2 2.2 0 0 0-.774-.12h-.006c-.158 0-.31.012-.456.024l-.118.009c-.553.047-.906.06-1.14-.173-.22-.22-.206-.58-.166-1.14.033-.447.066-.907-.094-1.347-.169-.456-.53-.772-.85-1.053l-.023-.02c-.373-.327-.6-.54-.62-.814-.02-.32.207-.533.62-.893.327-.28.7-.607.873-1.073.16-.44.127-.9.094-1.347-.04-.56-.054-.92.166-1.14.24-.233.587-.22 1.14-.173h.012c.417.034.892.071 1.335-.094.464-.172.783-.536 1.069-.86l.004-.006c.327-.374.54-.6.807-.62h.093c.274.02.487.246.814.62l.036.04c.278.31.59.66 1.037.826.443.165.918.128 1.335.095l.012-.001c.553-.047.906-.06 1.14.173.233.24.22.587.173 1.14l-.001.012c-.033.417-.07.892.094 1.335.18.464.543.783.868 1.068l.006.005c.373.327.6.54.62.813.026.32-.22.554-.62.9l-.005.005c-.299.258-.636.55-.822.955-.219.478-.174.995-.134 1.453v.007c.047.547.06.9-.173 1.134-.22.22-.58.206-1.14.166-.446-.033-.906-.066-1.346.094-.464.172-.783.536-1.069.86l-.005.006c-.326.374-.54.6-.813.62H7.96c-.273-.02-.486-.246-.813-.62L7.11 14c-.277-.31-.59-.66-1.036-.826"
              fill="#1D1D1D"
            />
          </svg>
        );
      default:
        return (
          <svg
            width={16}
            height={17}
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.019 1.584c.297-.195.659-.25.981-.25s.684.055.981.25c.33.215.519.564.519 1 0 .31-.094.63-.247.906a5.07 5.07 0 0 1 3.807 4.645l.015.331c.015.361.028.676.093.977.079.36.223.643.517.863.513.385.815.989.815 1.63 0 .92-.725 1.731-1.7 1.731h-2.35a2.5 2.5 0 0 1-4.9 0H3.2c-.975 0-1.7-.81-1.7-1.731 0-.641.302-1.245.815-1.63.294-.22.438-.503.517-.863.065-.301.078-.616.093-.977l.015-.33A5.07 5.07 0 0 1 6.747 3.49a1.9 1.9 0 0 1-.247-.906c0-.436.19-.785.519-1m-.434 12.083a1.5 1.5 0 0 0 2.83 0zm6.215-1c.382 0 .7-.321.7-.731 0-.327-.154-.634-.415-.83-.537-.403-.78-.927-.894-1.451-.086-.395-.103-.825-.118-1.198l-.011-.27a4.067 4.067 0 0 0-8.124 0l-.012.27c-.014.373-.031.803-.117 1.198-.114.524-.357 1.048-.894 1.451a1.04 1.04 0 0 0-.415.83c0 .41.318.731.7.731zm-4.494-9.55c-.13.175-.248.217-.306.217s-.176-.042-.306-.216a.97.97 0 0 1-.194-.534.25.25 0 0 1 .021-.117.1.1 0 0 1 .046-.047c.065-.042.203-.086.433-.086s.368.044.433.086a.1.1 0 0 1 .046.047.25.25 0 0 1 .021.117.97.97 0 0 1-.194.534"
              fill="#1D1D1D"
            />
          </svg>
        );
    }
  };

  useEffect(() => {
    async function fetchNotifications() {
      const res = await enjazService.getNotifications();
      setNotifications(res.data.slice(0, 5));
    }

    try {
      setLoading(true);
      fetchNotifications();
    } catch (error) {
      console.error("Error fetching employees:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const pathname = usePathname();

  const hiddenRoutes = ["/employees", "/customers", "/notifications", "/chat"];

  const shouldHideDiv =
    hiddenRoutes.includes(pathname) || pathname.startsWith("/orders/");

  if (shouldHideDiv) {
    return null;
  }
  const chevronClass = locale === "ar" ? "rotate-180" : "";

  return (
    <div className="bg-white h-screen min-w-[16rem] fixed py-8 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <p
          className={`font-semibold ${
            locale === "en" ? "text-xl" : "text-2xl"
          }`}
        >
          {t("title")}
        </p>
        <Link
          href="/notifications"
          className="text-primary-color flex items-center gap-2 underline"
        >
          {t("viewAll")}
          <ChevronRight className={`size-5 ${chevronClass}`} />
        </Link>
      </div>

      <div className="space-y-6">
        {loading && <div>{t("loading")}</div>}
        {!loading &&
          notifications.map((n, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 rounded-xl bg-primary-color/35">
                {getNotificationIcon(n.type)}
              </div>
              <div>
                <h4 className="font-medium text-lg">{n.title}</h4>
                <p className="text-xs text-text-normal">{n.body}</p>
              </div>
            </div>
          ))}
        {!loading && notifications.length === 0 && (
          <div>{t("noNotifications")}</div>
        )}
      </div>
    </div>
  );
};

export default NotificationsBar;
