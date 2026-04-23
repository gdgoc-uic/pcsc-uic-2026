import "server-only";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AdminSession = {
  userId: string;
  email: string;
};

export const requireAdmin = async () => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id || !user.email) {
    return { ok: false as const, status: 401, message: "Unauthorized" };
  }

  const adminClient = createAdminSupabaseClient();
  const { data, error } = await adminClient
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return {
      ok: false as const,
      status: 500,
      message: "Unable to validate admin access",
    };
  }

  if (!data) {
    return { ok: false as const, status: 403, message: "Forbidden" };
  }

  return {
    ok: true as const,
    session: {
      userId: user.id,
      email: user.email,
    } satisfies AdminSession,
  };
};
