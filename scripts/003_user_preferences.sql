-- Create user preferences table
create table if not exists public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  study_depth text default 'balanced',
  notification_frequency text default 'daily',
  daily_reminder_time time default '08:00:00',
  interests text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable Row Level Security
alter table public.user_preferences enable row level security;

-- RLS Policies
create policy "preferences_select_own" on public.user_preferences 
  for select using (auth.uid() = user_id);

create policy "preferences_insert_own" on public.user_preferences 
  for insert with check (auth.uid() = user_id);

create policy "preferences_update_own" on public.user_preferences 
  for update using (auth.uid() = user_id);

create policy "preferences_delete_own" on public.user_preferences 
  for delete using (auth.uid() = user_id);
