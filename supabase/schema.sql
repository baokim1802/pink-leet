-- Leet Study: your code and progress in Supabase (Postgres).
--
-- Paste this whole file into Supabase → SQL Editor → New query → Run. Safe to run again.
-- It can share a project with Systems Study: every table here starts with leet_ (Systems uses system_), so they don't mix,
-- and one sign-in works for both sites.
--
-- Every table has a user_id, and Row Level Security (RLS) makes sure each signed-in person
-- only ever sees and changes their own rows. Logged-out visitors (the "anon" role) get nothing.

-- ---------- tables ----------

-- One row per person: name and goals.
create table if not exists public.leet_profiles (
  user_id         uuid primary key default auth.uid() references auth.users on delete cascade,
  name            text not null default '',
  daily_problems  smallint not null default 2 check (daily_problems between 0 and 50),
  weekly_problems smallint not null default 10 check (weekly_problems between 0 and 300),
  target_date     date,
  target_label    text not null default '',
  custom_goals    jsonb not null default '[]', -- [{ id, text, done }]: a small list we never query, so JSON is fine
  updated_at      timestamptz not null default now()
);

-- Where you are on each problem.
create table if not exists public.leet_problems (
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  problem_id  text not null,       -- '02-arrays-and-hashing/two-sum'
  status      text not null default 'todo' check (status in ('todo', 'attempted', 'solved', 'review')),
  attempts    int not null default 0,
  solved_at   date,
  last_run_at timestamptz,
  notes       text not null default '',
  starred     boolean not null default false,
  primary key (user_id, problem_id)
);

-- Your code for each problem. Its own table, so saving code on one device never overwrites
-- a status or note you changed on another.
create table if not exists public.leet_solutions (
  user_id    uuid not null default auth.uid() references auth.users on delete cascade,
  problem_id text not null,
  code       text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, problem_id)
);

-- Lessons you've finished.
create table if not exists public.leet_lessons (
  user_id   uuid not null default auth.uid() references auth.users on delete cascade,
  lesson_id text not null,         -- '02-arrays-and-hashing'
  done      boolean not null default false,
  done_at   date,
  primary key (user_id, lesson_id)
);

-- What you did each day (streaks and the heatmap).
create table if not exists public.leet_activity (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  day     date not null,
  solved  int not null default 0,  -- problems solved for the first time
  runs    int not null default 0,  -- test runs
  lessons int not null default 0,  -- lessons finished
  primary key (user_id, day)
);

-- Your edits to the built-in cheat sheets, and cheat sheets you added (is_new).
create table if not exists public.leet_cheatsheets (
  user_id    uuid not null default auth.uid() references auth.users on delete cascade,
  sheet_id   text not null,
  markdown   text not null default '',
  is_new     boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, sheet_id)
);

-- ---------- security: everyone sees only their own rows ----------

do $$
declare t text;
begin
  foreach t in array array['leet_profiles', 'leet_problems', 'leet_solutions', 'leet_lessons', 'leet_activity', 'leet_cheatsheets'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "own rows" on public.%I', t);
    -- (select auth.uid()) instead of auth.uid(): Postgres runs it once per query, not once per row
    execute format('create policy "own rows" on public.%I for all to authenticated
                      using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', t);
    execute format('revoke all on public.%I from anon', t);
    -- grant explicitly, so it works with "Automatically expose new tables" turned off
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

-- ---------- adding to today's activity ----------

-- Adds to a day's counters in one statement, so two devices counting at the same time
-- both get added (reading the row, adding in JavaScript and writing it back could lose one).
create or replace function public.leet_bump_activity(
  p_day date, p_solved int default 0, p_runs int default 0, p_lessons int default 0
) returns void
language sql
security invoker -- runs as the caller, so the RLS policy above still applies
set search_path = ''
as $$
  insert into public.leet_activity (user_id, day, solved, runs, lessons)
  values (auth.uid(), p_day, p_solved, p_runs, p_lessons)
  on conflict (user_id, day) do update set
    solved  = public.leet_activity.solved  + excluded.solved,
    runs    = public.leet_activity.runs    + excluded.runs,
    lessons = public.leet_activity.lessons + excluded.lessons;
$$;

revoke execute on function public.leet_bump_activity(date, int, int, int) from public, anon;
grant execute on function public.leet_bump_activity(date, int, int, int) to authenticated;
