create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.stakeholders (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  stakeholder_role text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certificate_templates (
  id uuid primary key default gen_random_uuid(),
  file_path text not null,
  text_x integer not null default 960,
  text_y integer not null default 540,
  font_size integer not null default 56,
  font_family text not null default 'Arial',
  font_color text not null default '#ffffff',
  text_align text not null default 'center' check (text_align in ('left', 'center', 'right')),
  is_active boolean not null default false,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.evaluation_submissions (
  id uuid primary key default gen_random_uuid(),
  stakeholder_id uuid not null references public.stakeholders (id) on delete cascade,
  submitted_name text not null,
  email text not null,
  answers jsonb not null default '{}'::jsonb,
  comment text,
  certificate_path text,
  certificate_download_url text,
  created_at timestamptz not null default now(),
  unique (stakeholder_id)
);

create table if not exists public.generated_certificates (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references public.evaluation_submissions (id) on delete cascade,
  stakeholder_id uuid not null references public.stakeholders (id) on delete cascade,
  template_id uuid not null references public.certificate_templates (id) on delete cascade,
  file_path text not null,
  signed_download_url text,
  created_at timestamptz not null default now()
);

create or replace function public.set_current_timestamp_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_stakeholders_updated_at on public.stakeholders;
create trigger set_stakeholders_updated_at
before update on public.stakeholders
for each row execute function public.set_current_timestamp_updated_at();

drop trigger if exists set_certificate_templates_updated_at on public.certificate_templates;
create trigger set_certificate_templates_updated_at
before update on public.certificate_templates
for each row execute function public.set_current_timestamp_updated_at();

alter table public.admin_users enable row level security;
alter table public.stakeholders enable row level security;
alter table public.certificate_templates enable row level security;
alter table public.evaluation_submissions enable row level security;
alter table public.generated_certificates enable row level security;

-- Minimal policies for authenticated admin checks and service role operations.
drop policy if exists "admin_users_select_self" on public.admin_users;
create policy "admin_users_select_self"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
select 'certificate-templates', 'certificate-templates', false
where not exists (
  select 1 from storage.buckets where id = 'certificate-templates'
);

insert into storage.buckets (id, name, public)
select 'generated-certificates', 'generated-certificates', false
where not exists (
  select 1 from storage.buckets where id = 'generated-certificates'
);

drop policy if exists "admins_manage_template_bucket_objects" on storage.objects;
create policy "admins_manage_template_bucket_objects"
on storage.objects
for all
using (
  bucket_id = 'certificate-templates'
  and exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  )
)
with check (
  bucket_id = 'certificate-templates'
  and exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  )
);

drop policy if exists "admins_manage_generated_bucket_objects" on storage.objects;
create policy "admins_manage_generated_bucket_objects"
on storage.objects
for all
using (
  bucket_id = 'generated-certificates'
  and exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  )
)
with check (
  bucket_id = 'generated-certificates'
  and exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  )
);
