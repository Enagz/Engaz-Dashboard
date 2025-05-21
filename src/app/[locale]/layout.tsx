import { IBM_Plex_Sans } from "next/font/google";
import { AuthProvider } from "../../contexts/AuthContext";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${ibmPlexSans.variable} antialiased bg-gray-50 ${
          locale === "ar" ? "text-right" : ""
        }`}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <AuthProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
