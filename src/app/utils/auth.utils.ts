"use client";

import { jwtDecode } from "jwt-decode";

export const getUserRole = (): "superadmin" | "admin" | "employee" | null => {
  if (typeof window === "undefined") return null; // SSR safety check

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    const title = decoded.title?.toLowerCase(); // "superadmin", "admin", "employee"

    if (["superadmin", "admin", "employee"].includes(title)) {
      return title;
    }

    return null;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};
