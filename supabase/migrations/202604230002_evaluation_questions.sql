create table if not exists public.evaluation_questions (
  id uuid primary key default gen_random_uuid(),
  question_text text not null,
  question_type text not null check (question_type in ('rating', 'text', 'textarea', 'select', 'multiple')),
  question_key text not null unique,
  is_required boolean not null default false,
  display_order integer not null default 0,
  meta jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists evaluation_questions_display_order_idx
on public.evaluation_questions (display_order);

create index if not exists evaluation_questions_is_active_idx
on public.evaluation_questions (is_active);

drop trigger if exists set_evaluation_questions_updated_at on public.evaluation_questions;
create trigger set_evaluation_questions_updated_at
before update on public.evaluation_questions
for each row execute function public.set_current_timestamp_updated_at();

alter table public.evaluation_questions enable row level security;

drop policy if exists "admins_select_evaluation_questions" on public.evaluation_questions;
create policy "admins_select_evaluation_questions"
on public.evaluation_questions
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  )
);

drop policy if exists "admins_insert_evaluation_questions" on public.evaluation_questions;
create policy "admins_insert_evaluation_questions"
on public.evaluation_questions
for insert
to authenticated
with check (
  exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  )
);

drop policy if exists "admins_update_evaluation_questions" on public.evaluation_questions;
create policy "admins_update_evaluation_questions"
on public.evaluation_questions
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  )
);

drop policy if exists "admins_delete_evaluation_questions" on public.evaluation_questions;
create policy "admins_delete_evaluation_questions"
on public.evaluation_questions
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
  )
);

insert into public.evaluation_questions (question_text, question_type, question_key, is_required, display_order, meta)
values
  ('Overall conference experience', 'rating', 'overall', true, 1, '{"min": 1, "max": 5, "min_label": "Poor", "max_label": "Excellent", "show_numbers": true}'),
  ('Relevance of content', 'rating', 'relevance', true, 2, '{"min": 1, "max": 5, "min_label": "Poor", "max_label": "Excellent", "show_numbers": true}'),
  ('Event organization and flow', 'rating', 'organization', true, 3, '{"min": 1, "max": 5, "min_label": "Poor", "max_label": "Excellent", "show_numbers": true}')
on conflict (question_key) do nothing;