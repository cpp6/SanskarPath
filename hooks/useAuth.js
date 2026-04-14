"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";

export function useAuth(requireAuth = true) {
  const router = useRouter();
  const { user, token, isLoading, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!isLoading && requireAuth && !token) {
      router.push("/login");
    }
  }, [isLoading, token, requireAuth]);

  return { user, token, isLoading, isAuthenticated: !!token };
}

export function useRequireAdmin() {
  const router = useRouter();
  const { user, token, isLoading, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!token) {
        router.push("/login");
      } else if (user?.role !== "admin") {
        router.push("/dashboard/parent");
      }
    }
  }, [isLoading, token, user]);

  return { user, token, isLoading, isAdmin: user?.role === "admin" };
}
