import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && key ? createClient(url, key) : null;
export const hasSupabase = !!supabase;

/*
  Required Supabase table (run in SQL editor):

  create table if not exists bookings (
    id uuid primary key default gen_random_uuid(),
    service_id text not null,
    service_name text not null,
    service_duration integer not null,
    barber_id text not null,
    barber_name text not null,
    date date not null,
    time text not null,
    customer_name text not null,
    customer_email text not null,
    customer_phone text not null,
    created_at timestamptz default now(),
    constraint unique_booking unique (barber_id, date, time)
  );

  alter table bookings enable row level security;
  create policy "public insert" on bookings for insert with check (true);
  create policy "public select times" on bookings for select using (true);
*/
