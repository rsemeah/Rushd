-- Create user events table for behavioral tracking
create table if not exists public.user_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  page text,
  metadata jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.user_events enable row level security;

-- RLS Policies (users can only see and insert their own events)
create policy "events_select_own" on public.user_events 
  for select using (auth.uid() = user_id);

create policy "events_insert_own" on public.user_events 
  for insert with check (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists idx_user_events_user_id on public.user_events(user_id);
create index if not exists idx_user_events_event_type on public.user_events(event_type);
create index if not exists idx_user_events_created_at on public.user_events(created_at desc);
