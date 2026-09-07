alter table public.publications
  add column if not exists pdf_url text;

alter table public.publications
  drop column if exists excerpt,
  drop column if exists body,
  drop column if exists video_url;
