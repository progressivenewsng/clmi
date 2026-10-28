alter table public.publications
  add column if not exists publication_type text not null default 'ktc'
    check (publication_type in ('ktc', 'leadership_nuggets', 'word_for_you')),
  add column if not exists page_image_urls text[] not null default '{}',
  add column if not exists verse_text text,
  add column if not exists verse_reference text;

create index if not exists publications_type_status_date_idx
  on public.publications(publication_type, status, publication_date desc);
