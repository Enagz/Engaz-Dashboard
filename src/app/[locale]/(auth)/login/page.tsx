"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { enjazService } from "@/services/enjazService";
import { useAuth } from "@/contexts/AuthContext";
import socket from "@/lib/socket";
import { useTranslations } from "next-intl";

export default function Login() {
  const t = useTranslations("login");

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await enjazService.login({ email, password });
      const token = res.data.token;
      const employeeId = res.data.employeeId;
      const employeeName = res.data.employeename;

      login(token, employeeId, employeeName);

      // Connect and emit to socket server
      socket.connect();
      socket.emit("employeeEnter", employeeId);
      console.log(employeeId);

      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-5 p-4 md:p-8 bg-global-bg">
      {/* Right side - Login Form */}
      <div className="bg-white w-full md:w-1/2 max-w-md rounded-[20px]">
        <div className="p-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/logo/logo.svg"
              alt="Enjaz Logo"
              width={146}
              height={54}
              priority
            />
          </div>

          {/* Login Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
            <p className="text-gray-600">{t("subtitle")}</p>
          </div>

          {/* Show Error Message */}
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-20">
            <div className="mb-6 space-y-2">
              <label htmlFor="email" className="block text-gray-700">
                {t("emailLabel")}
              </label>
              <input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-[12px] border border-[#9CA3AF]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700">
                {t("passwordLabel")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rtl:pr-4 rtl:pl-10 rounded-[12px] border border-[#9CA3AF]"
                  required
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute inset-y-0 right-3 rtl:right-auto rtl:left-3 flex items-center text-gray-400 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  <Eye />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-20 lg:mt-32 w-full bg-primary-color hover:bg-primary-color text-white py-2 rounded-md cursor-pointer transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? t("submitting") : t("submit")}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 justify-center items-center mb-8 md:mb-0">
        <div className="max-w-max">
          <Image
            src="/assets/login-in/bro.png"
            alt="Login illustration"
            width={662.3225708007812}
            height={627}
            priority
          />
        </div>
      </div>
    </div>
  );
}
