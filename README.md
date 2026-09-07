# CLMI — Covenant Leadership Ministry International

A complete marketing/content website for CLMI, built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## What's included

- **Home** — hero, president's welcome, ministries teaser, publications carousel, testimonies carousel
- **About CLMI** (`/about`) — accordion: Who Are We, Vision & Mission, Our Mandate, Our Strategy, Aims & Objectives, Our Doctrinal Statement (+ link to Our Beliefs)
- **Leadership** (`/leadership`) — accordion: President/Founder, Executive Council, Ministry Directors
- **Our Beliefs** (`/beliefs`)
- **Ministries** (`/ministries`) — accordion: Mercy Reach, Leadership Development, Believers in Politics
- **Publications** (`/publications`, `/publications/[slug]`) — KTC accordion + dynamic detail pages (image/video/text/links)
- **News & Updates** (`/news`, `/news/[slug]`) — Pinterest-style masonry grid, opens a dynamic detail page for images or videos
- **Testimonies** (`/testimonies`)
- **Media Gallery** (`/gallery`) — Pinterest-style masonry grid (images only) with a lightbox
- **Give/Donate** (`/donate`) — bank details with one-tap copy
- **Join CLMI** (`/join`) — membership form
- **Contact** (`/contact`) — contact info + message form

All dynamic content (publications, news, testimonies, gallery images) currently comes from `src/data/mock.ts`. Swap that file for real API calls once your backend is ready — the shapes (`Publication`, `NewsItem`, `Testimony`, `GalleryItem`) are already defined and typed, so the UI won't need to change.

## Where I used your documents

- `OUR BELIEFS.docx` → `/beliefs` page (verbatim list)
- `WHO ARE WE.docx` → About → "Who Are We" section
- `OUR STRATEGY.docx` → About → "Our Strategy" section
- `AIMS AND OBJECTIVES.docx` → About → "Aims & Objectives" section
- `OUR DOCTRINAL STATEMENT.docx` → About → "Our Doctrinal Statement" section
- `CLMI_LOGO_jpg.jpeg` → used site-wide (navbar, footer) at `public/clmi-logo.jpeg`

Not provided, so I wrote placeholder copy you should review/replace: **Vision & Mission** (About page), the president's welcome message, leadership team names/bios, ministry descriptions, all publications/news/testimonies/gallery content, bank account details on the Donate page, and every photo except the logo (all from Unsplash as mock imagery — replace with real photos before launch).

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Note: `next/font/google` needs internet access to fetch fonts (Fraunces + Inter) at build/dev time — this works automatically on Vercel and any normal dev machine.

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Import the repo in Vercel — it auto-detects Next.js, no config needed.
3. Add environment variables (see below) once your backend exists.
4. Deploy.

## Recommended stack for the `/login` admin + dynamic content

Since you'll eventually add a login-gated admin area to manage news, gallery images, testimonies, and publications:

**Database + storage: Supabase (Postgres + Storage + Auth)**
- Fits Vercel deployments well, generous free tier, and gives you three things in one: a Postgres database for content, file storage for images/videos, and built-in auth you can use directly or alongside your own login page.
- Alternative: **Neon** (serverless Postgres) + **Vercel Blob** for file storage, if you want to keep things unbundled.

**Auth for the admin `/login`**
- **Auth.js (NextAuth)** with a credentials provider (email + password) is the simplest fit for a single admin login, and works natively with Next.js App Router.
- If you want a nicer hosted admin experience (magic links, MFA, multiple admins later), **Clerk** or **Supabase Auth** are both easy to wire in with minimal code.

**Content management**
- Simplest: a few Postgres tables (`publications`, `news_items`, `testimonies`, `gallery_items`) with an authenticated `/api/*` route group (Next.js Route Handlers) doing CRUD, and an admin UI at `/login` and `/admin/*` built with the same Tailwind design system already in this project.
- If you'd rather not build CRUD screens yourself, **Sanity** or **Payload CMS** both integrate cleanly with Next.js and give you an out-of-the-box admin UI, while this frontend keeps fetching content the same way it fetches `mock.ts` today — just swap the data source.

**Images/video**
- Store uploads in Supabase Storage or Vercel Blob, and consider running images through Vercel's built-in Image Optimization (already configured in `next.config.ts` for remote images — update `remotePatterns` to include your storage domain once you pick one).

## Notes for launch

- Replace all Unsplash mock images with real CLMI photography.
- Replace the bank account details on `/donate` with real, verified account numbers.
- Update social links in `Footer.tsx` and `contact/page.tsx`.
- The "Join CLMI" and "Contact" forms currently just show a success state on submit — connect them to an email service (e.g. Resend) or your database once the backend is live.
