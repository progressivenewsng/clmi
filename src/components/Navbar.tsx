"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About CLMI",
    href: "/about",
    children: [
      { label: "Who Are We", href: "/about#who-are-we" },
      { label: "Vision & Mission", href: "/about#vision-mission" },
      { label: "Our Mandate", href: "/about#mandate" },
      { label: "Our Strategy", href: "/about#strategy" },
      { label: "Aims & Objectives", href: "/about#aims-objectives" },
      { label: "Our Doctrinal Statement", href: "/about#doctrinal-statement" },
      { label: "Our Beliefs", href: "/beliefs" },
    ],
  },
  {
    label: "Leadership",
    href: "/leadership",
    children: [
      { label: "President / Founder", href: "/leadership#president" },
      { label: "Board of Directors", href: "/leadership#executive-council" },
      { label: "Ministry Directors", href: "/leadership#directors" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
    children: [
      { label: "Join CLMI", href: "/join" },
      { label: "Prayer Request", href: "/contact/prayer-request" },
      { label: "Call to Salvation", href: "/contact/call-to-salvation" },
      { label: "Counselling", href: "/contact/counselling" },
    ],
  },
  {
    label: "Ministries",
    href: "/ministries",
    children: [
      { label: "Kingdom Care", href: "/ministries#mercy-reach" },
      { label: "Leadership Development", href: "/ministries#leadership-development" },
      { label: "Believers in Politics", href: "/ministries#believers-in-politics" },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    children: [
      { label: "Kingdom Testament Chronicles (KTC)", href: "/publications" },
      { label: "Leadership Nuggets", href: "/publications/leadership-nuggets" },
      { label: "The Word for You", href: "/publications/the-word-for-you" },
      { label: "News", href: "/news" },
      // { label: "Cast on Stone", href: "/cast-on-stone" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };
  const toggleOpen = (label: string) => {
    setOpen((current) => (current === label ? null : label));
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/97 shadow-lg shadow-black/20" : "bg-ink"
      }`}
    >
      <div className="hairline opacity-30" />
      <div className="mx-auto flex  items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src={logo}
            alt="CLMI logo"
            width={90}
            height={90}
            className="rounded-full "
          />

          <span className="navbar-brand font-display font-semibold tracking-wide text-parchment">
            COVENANT LEADERSHIP
            <span className="block tracking-[0.2em]">
              MINISTRY INTERNATIONAL
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && enter(item.label)}
              onMouseLeave={() => item.children && leave()}
            >
              {item.children ? (
                <button
                  type="button"
                  onClick={() => toggleOpen(item.label)}
                  className="flex items-center gap-1 px-3 py-2 text-[15px] font-medium tracking-wide text-parchment/85 transition-colors hover:text-gold-light"
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" className="mt-px opacity-70">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.href ?? "#"}
                  className="flex items-center gap-1 px-3 py-2 text-[15px] font-medium tracking-wide text-parchment/85 transition-colors hover:text-gold-light"
                >
                  {item.label}
                </Link>
              )}
              {item.children && open === item.label && (
                <div className="absolute left-0 top-full w-72 border border-line/40 bg-ink shadow-xl shadow-black/30">
                  <div className="h-[3px] bg-gold" />
                  <ul className="py-2">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(null)}
                          className="block px-5 py-2.5 text-[13px] text-parchment/80 transition-colors hover:bg-white/5 hover:text-gold-light"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/donate"
            className="bg-gold px-4 py-2 text-[12px] font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            Give
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center text-parchment xl:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M2 5H20M2 11H20M2 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-line/20 bg-ink px-5 pb-6 xl:hidden">
          <ul className="divide-y divide-white/5">
            {NAV.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between py-3 text-left text-[14px] font-medium text-parchment/90"
                      onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                    >
                      {item.label}
                      <span className="text-gold-light">{mobileSub === item.label ? "–" : "+"}</span>
                    </button>
                    {mobileSub === item.label && (
                      <ul className="pb-2 pl-3">
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-[13px] text-parchment/70"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[14px] font-medium text-parchment/90"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-3">
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex-1 border border-gold py-2.5 text-center text-[12px] font-semibold uppercase tracking-widest text-gold-light">
              Contact Us
            </Link>
            <Link href="/donate" onClick={() => setMobileOpen(false)} className="flex-1 bg-gold py-2.5 text-center text-[12px] font-semibold uppercase tracking-widest text-ink">
              Give
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
