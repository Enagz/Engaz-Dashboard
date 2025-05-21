import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ar, enUS } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateInput = (date: Date) => format(date, "yyyy-MM-dd");
export const formatDate = (date: Date, locale: string) =>
  format(date, "d MMMM yyyy", { locale: locale === "ar" ? ar : enUS });

export function getRelativeTime(isoDateString: string, locale = "ar") {
  const date = parseISO(isoDateString);

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: locale === "ar" ? ar : enUS,
  });
}
