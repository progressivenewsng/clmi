create extension if not exists "pgcrypto";

create type public.content_status as enum ('draft', 'published', 'archived');
create type public.media_type as enum ('image', 'video');
create type public.form_type as enum ('join', 'prayer_request', 'call_to_salvation', 'counselling');
create type public.user_role as enum ('admin', 'editor');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text,
  role public.user_role not null default 'editor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body jsonb not null default '{}'::jsonb,
  author text not null default '',
  cover_image_url text,
  video_url text,
  publication_date date,
  status public.content_status not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table public.news_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body jsonb not null default '{}'::jsonb,
  cover_image_url text,
  video_url text,
  media_type public.media_type not null default 'image',
  publication_date date,
  status public.content_status not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table public.testimonies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  quote text not null,
  photo_url text,
  video_url text,
  media_type public.media_type not null default 'image',
  status public.content_status not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization text not null default '',
  quote text not null,
  photo_url text,
  video_url text,
  media_type public.media_type not null default 'image',
  status public.content_status not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  caption text not null default '',
  media_url text,
  thumbnail_url text,
  media_type public.media_type not null default 'image',
  alt_text text not null default '',
  sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_type public.form_type not null,
  name text not null,
  email text not null,
  phone text,
  location text,
  occupation text,
  ministry text,
  message text not null default '',
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'archived')),
  admin_notes text,
  created_at timestamptz not null default now()
);

create index publications_status_date_idx on public.publications(status, publication_date desc);
create index news_items_status_date_idx on public.news_items(status, publication_date desc);
create index testimonies_status_idx on public.testimonies(status);
create index reviews_status_idx on public.reviews(status);
create index gallery_items_status_order_idx on public.gallery_items(status, sort_order);
create index form_submissions_status_created_idx on public.form_submissions(status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['profiles', 'publications', 'news_items', 'testimonies', 'reviews', 'gallery_items'] loop
    execute format('create trigger %I_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end;
$$;

create or replace function public.is_admin_or_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

alter table public.profiles enable row level security;
alter table public.publications enable row level security;
alter table public.news_items enable row level security;
alter table public.testimonies enable row level security;
alter table public.reviews enable row level security;
alter table public.gallery_items enable row level security;
alter table public.form_submissions enable row level security;

create policy "Public can read published publications" on public.publications for select using (status = 'published');
create policy "Public can read published news" on public.news_items for select using (status = 'published');
create policy "Public can read published testimonies" on public.testimonies for select using (status = 'published');
create policy "Public can read published reviews" on public.reviews for select using (status = 'published');
create policy "Public can read published gallery" on public.gallery_items for select using (status = 'published');

create policy "Staff can manage publications" on public.publications for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "Staff can manage news" on public.news_items for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "Staff can manage testimonies" on public.testimonies for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "Staff can manage reviews" on public.reviews for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "Staff can manage gallery" on public.gallery_items for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "Staff can read profiles" on public.profiles for select using (user_id = auth.uid() or public.is_admin_or_editor());
create policy "Staff can read form submissions" on public.form_submissions for select using (public.is_admin_or_editor());
create policy "Staff can update form submissions" on public.form_submissions for update using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

insert into storage.buckets (id, name, public)
values ('clmi-media', 'clmi-media', true)
on conflict (id) do nothing;

create policy "Public can read published media" on storage.objects for select using (bucket_id = 'clmi-media');
create policy "Staff can upload media" on storage.objects for insert with check (bucket_id = 'clmi-media' and public.is_admin_or_editor());
create policy "Staff can update media" on storage.objects for update using (bucket_id = 'clmi-media' and public.is_admin_or_editor()) with check (bucket_id = 'clmi-media' and public.is_admin_or_editor());
create policy "Staff can delete media" on storage.objects for delete using (bucket_id = 'clmi-media' and public.is_admin_or_editor());
