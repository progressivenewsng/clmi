import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { normalizeUserRole } from "@/lib/auth";

const navigation = [
  { label: "Overview", href: "/admin" },
  { label: "Publications", href: "/admin/publications" },
  { label: "News", href: "/admin/news" },
  { label: "Testimonies", href: "/admin/testimonies" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Users", href: "/admin/users" },
];

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const isAdmin = normalizeUserRole(user.user_metadata?.role) === "admin";

  return (
    <div className="min-h-screen bg-parchment text-ink">
      <aside className="border-b border-line bg-ink text-parchment lg:fixed lg:inset-y-0 lg:w-64 lg:border-b-0 lg:border-r lg:border-white/10">
        <div className="flex items-center justify-between px-6 py-6 lg:block">
          <div>
            <Link href="/" className="font-display text-xl font-semibold text-parchment">
              CLMI <span className="text-gold-light">Admin</span>
            </Link>
            <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-parchment/45">Signed in</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[11px] uppercase tracking-widest text-gold-light hover:text-parchment lg:mt-8 lg:inline-block">
              View site
            </Link>
            <form action="/admin/logout" method="POST">
              <button type="submit" className="text-[11px] uppercase tracking-widest text-parchment/80 hover:text-gold-light">
                Logout
              </button>
            </form>
          </div>
        </div>
        <nav aria-label="Admin navigation" className="flex gap-1 overflow-x-auto px-4 pb-4 lg:block lg:px-4 lg:py-2">
          {navigation.filter((item) => item.href !== "/admin/users" || isAdmin).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block whitespace-nowrap px-3 py-2.5 text-[12px] font-semibold uppercase tracking-widest text-parchment/60 transition-colors hover:bg-white/10 hover:text-gold-light"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="lg:ml-64">{children}</main>
    </div>
  );
}
