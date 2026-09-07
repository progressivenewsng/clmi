alter table public.testimonies add column if not exists title text not null default '';
alter table public.testimonies add column if not exists slug text;
alter table public.testimonies add column if not exists author text not null default 'CLMI Editorial Team';
alter table public.reviews add column if not exists title text not null default '';
alter table public.reviews add column if not exists slug text;
alter table public.reviews add column if not exists author text not null default 'CLMI Editorial Team';
alter table public.news_items add column if not exists author text not null default 'CLMI Editorial Team';
alter table public.gallery_items add column if not exists author text not null default 'CLMI Editorial Team';

update public.testimonies set title = left(name, 120), slug = lower(regexp_replace(trim(name), '[^a-zA-Z0-9]+', '-', 'g')) where title = '' or slug is null;
update public.reviews set title = left(name, 120), slug = lower(regexp_replace(trim(name), '[^a-zA-Z0-9]+', '-', 'g')) where title = '' or slug is null;

update public.testimonies set slug = trim(both '-' from slug) where slug is not null;
update public.reviews set slug = trim(both '-' from slug) where slug is not null;

create unique index if not exists testimonies_slug_unique_idx on public.testimonies(slug) where slug is not null and slug <> '';
create unique index if not exists reviews_slug_unique_idx on public.reviews(slug) where slug is not null and slug <> '';
