import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type UserRole = "editor" | "admin";

export function normalizeUserRole(rawRole?: string | null): UserRole {
  const role = String(rawRole || "editor").trim().toLowerCase();
  return role === "admin" || role === "superadmin" ? "admin" : "editor";
}

export async function getCurrentUserRole(): Promise<UserRole> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return normalizeUserRole(user?.user_metadata?.role);
}

export async function requireUserSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireUserSession();
  const normalizedRole = normalizeUserRole(user.user_metadata?.role);

  if (!allowedRoles.includes(normalizedRole)) {
    redirect("/admin");
  }

  return { user, role: normalizedRole };
}

export async function requireAdminAccess() {
  const user = await requireUserSession();
  const role = normalizeUserRole(user.user_metadata?.role);

  if (role !== "admin") {
    redirect("/admin");
  }

  return user;
}
