"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/1CEQYMmq9W/?mibextid=wwXIfr", icon: "M13 22V12h3l1-4h-4V6c0-1.1.4-2 2-2h2V0h-3c-3 0-5 2-5 5.5V8H6v4h3v10h4Z" },
  { label: "Instagram", href: "https://instagram.com", icon: "M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6ZM12 2c-2.7 0-3.06.01-4.12.06-1.06.05-1.79.22-2.42.47-.66.26-1.22.6-1.77 1.15C3.14 4.23 2.8 4.79 2.54 5.45c-.25.64-.42 1.37-.47 2.43C2.02 8.94 2 9.3 2 12s.02 3.06.07 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.15 1.77.55.55 1.11.89 1.77 1.15.63.25 1.36.42 2.42.47C8.94 21.98 9.3 22 12 22s3.06-.02 4.12-.07c1.06-.05 1.79-.22 2.43-.47.66-.26 1.22-.6 1.77-1.15.55-.55.89-1.11 1.15-1.77.25-.64.42-1.37.47-2.43.05-1.06.07-1.42.07-4.12s-.02-3.06-.07-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77 4.9 4.9 0 0 0-1.77-1.15c-.64-.25-1.37-.42-2.43-.47C15.06 2.02 14.7 2 12 2Z" },
  // { label: "X", href: "https://x.com", icon: "M3 3l7.5 9.5L3.4 21H6l5.8-6.6L16 21h5l-7.8-9.9L20.6 3H18l-5.3 6L8 3H3Z" },
  // { label: "YouTube", href: "https://youtube.com", icon: "M22 12s0-3.2-.4-4.7a2.9 2.9 0 0 0-2-2C18 5 12 5 12 5s-6 0-7.6.3a2.9 2.9 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.9 2.9 0 0 0 2 2C6 19 12 19 12 19s6 0 7.6-.3a2.9 2.9 0 0 0 2-2C22 15.2 22 12 22 12ZM10 15V9l5.2 3-5.2 3Z" },
];

const explore = [
  { label: "About CLMI", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Ministries", href: "/ministries" },
  { label: "Publications", href: "/publications" },
  { label: "News & Updates", href: "/news" },
];

const involve = [
  { label: "Join CLMI", href: "/join" },
  { label: "Give / Donate", href: "/donate" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Media Gallery", href: "/gallery" },
  { label: "Cast on Stone", href: "/cast-on-stone" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-ink text-parchment/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/clmi-logo.jpeg" alt="CLMI logo" width={48} height={48} className="rounded-full bg-white" />
            <div className="font-display text-sm font-semibold text-parchment">
              CLMI
              <span className="block text-[10px] font-body font-normal tracking-[0.2em] text-gold-light">
                BELIEVERS IN POLITICS
              </span>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-parchment/60">
            Reconciling leaders and politicians to God through the application of His word to practical leadership realities.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-parchment/70 transition-colors hover:border-gold hover:text-gold-light"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-gold-light">Explore</h4>
          <ul className="mt-4 space-y-2.5">
            {explore.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13px] text-parchment/65 transition-colors hover:text-parchment">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-gold-light">Get Involved</h4>
          <ul className="mt-4 space-y-2.5">
            {involve.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13px] text-parchment/65 transition-colors hover:text-parchment">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-gold-light">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-[13px] text-parchment/65">
            <li className="flex gap-2">
              <span className="text-gold-light">Address —</span> Covenant House, 14 Aso Drive, Central Business District, Abuja, FCT, Nigeria
            </li>
            <li className="flex gap-2">
              <span className="text-gold-light">Phone —</span> +234 707 309 2948, +234 705 892 4014
            </li>
            <li className="flex gap-2">
              <span className="text-gold-light">Email —</span> info@clmiglobal.org
            </li>
          </ul>
        </div>
      </div>
      <div className="hairline opacity-20" />
      <div className="relative px-6 py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[12px] text-parchment/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Covenant Leadership Ministry International. All rights reserved.</p>
          <p>Fostering moral excellence and leadership development through <br /> innovative training programs and community engagement.</p>
        </div>
      </div>
    </footer>
  );
}
