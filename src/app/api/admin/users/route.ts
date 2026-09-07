import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeUserRole, requireAdminAccess } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdminAccess();
    const supabase = createAdminClient();
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const users = (data?.users || []).map((user) => ({
      id: user.id,
      email: user.email,
      role: normalizeUserRole(user.user_metadata?.role),
      last_sign_in_at: user.last_sign_in_at,
      created_at: user.created_at,
      email_confirmed_at: user.email_confirmed_at,
    }));

    return Response.json({ users }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to load users." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminAccess();
    const payload = await request.json();
    const email = String(payload.email || "").trim().toLowerCase();
    const password = String(payload.password || "").trim();
    const role = normalizeUserRole(payload.role);

    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role },
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(
      {
        user: {
          id: data.user?.id,
          email: data.user?.email,
          role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to create user." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const admin = await requireAdminAccess();
    const payload = await request.json();
    const id = String(payload.id || "");
    const password = typeof payload.password === "string" ? payload.password.trim() : "";
    const role = payload.role === undefined ? undefined : normalizeUserRole(payload.role);

    if (!id || (!password && !role)) {
      return Response.json({ error: "A user and a new password or role are required." }, { status: 400 });
    }
    if (password && password.length < 8) {
      return Response.json({ error: "Passwords must be at least 8 characters." }, { status: 400 });
    }

    const updates: { password?: string; user_metadata?: { role: "admin" | "editor" } } = {};
    if (password) updates.password = password;

    const supabase = createAdminClient();
    if (role) {
      const { data: target, error: lookupError } = await supabase.auth.admin.getUserById(id);
      if (lookupError || !target.user) return Response.json({ error: "User not found." }, { status: 404 });
      updates.user_metadata = { ...target.user.user_metadata, role };
    }

    const { error } = await supabase.auth.admin.updateUserById(id, updates);
    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to update user." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await requireAdminAccess();
    const { id } = await request.json();
    if (typeof id !== "string" || !id) return Response.json({ error: "A user id is required." }, { status: 400 });
    if (id === admin.id) return Response.json({ error: "You cannot delete the account you are currently using." }, { status: 403 });

    const supabase = createAdminClient();
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to delete user." }, { status: 500 });
  }
}
