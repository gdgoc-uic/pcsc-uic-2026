alter table public.certificate_templates add column if not exists template_width integer;
alter table public.certificate_templates add column if not exists template_height integer;
alter table public.certificate_templates add column if not exists text_position_x integer;
alter table public.certificate_templates add column if not exists text_position_y integer;
alter table public.certificate_templates add column if not exists rotation integer default 0;

update public.certificate_templates
set template_width = 1920, template_height = 1080
where template_width is null and template_height is null;

alter table public.certificate_templates alter column template_width set default 1920;
alter table public.certificate_templates alter column template_height set default 1080;
alter table public.certificate_templates alter column text_position_x set default 960;
alter table public.certificate_templates alter column text_position_y set default 540;
alter table public.certificate_templates alter column rotation set default 0;