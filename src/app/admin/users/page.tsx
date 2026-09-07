import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { normalizeUserRole, requireAdminAccess } from "@/lib/auth";
import CreateUserForm from "@/components/admin/CreateUserForm";
import UserActions from "@/components/admin/UserActions";

export default async function AdminUsersPage() {
  await requireAdminAccess();
  const sessionClient = await createClient();
  const adminClient = createAdminClient();
  const { data: { user } } = await sessionClient.auth.getUser();
  const { data: allUsers, error } = await adminClient.auth.admin.listUsers();

  const users = (allUsers?.users || []).map((item) => ({
    id: item.id,
    email: item.email,
    role: normalizeUserRole(item.user_metadata?.role),
    createdAt: item.created_at,
  }));

  return (
    <div className="min-h-screen bg-parchment px-6 py-10 lg:px-10">
      <header className="mb-8 border-b border-line pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo">Admin</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">User management</h1>
        <p className="mt-2 text-[14px] text-charcoal/65">Signed in as {user?.email}</p>
      </header>

      <CreateUserForm />

      {error ? (
        <div className="border border-red-200 bg-red-50 p-4 text-[13px] text-red-800">{error.message}</div>
      ) : null}

      <div className="overflow-hidden border border-line bg-white/50">
        <table className="min-w-full text-left text-[14px]">
          <thead className="bg-white/60 text-[11px] uppercase tracking-widest text-indigo">
            <tr>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? users.map((item) => (
              <tr key={item.id} className="border-t border-line">
                <td className="px-5 py-4">{item.email}</td>
                <td className="px-5 py-4">{item.role}</td>
                <td className="px-5 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-4"><UserActions userId={item.id} isCurrentUser={item.id === user?.id} /></td>
              </tr>
            )) : (
              <tr>
                <td className="px-5 py-6 text-charcoal/60" colSpan={4}>No users yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
