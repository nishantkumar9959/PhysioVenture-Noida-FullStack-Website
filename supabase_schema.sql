-- PhysioVenture Clinic Database Schema & Migration Script
-- Target Database: Supabase PostgreSQL
-- Focus: Strict RLS enforcement and initial seeds for all 23 services

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =========================================================================
-- 1. TABLES CREATION
-- =========================================================================

-- Locations Table (multi-branch and home-visit center reference)
create table if not exists locations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  address text not null,
  phone text not null,
  gmaps_embed_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services Table
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Appointments Table (Form scheduling)
create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  patient_name text not null,
  email text,
  phone text not null,
  service_id uuid references services(id) on delete set null,
  location_id uuid references locations(id) on delete set null,
  preferred_date date not null,
  preferred_time_slot text not null check (preferred_time_slot in ('morning', 'afternoon', 'evening')),
  additional_notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact Submissions Table (Inquiry page forms)
create table if not exists contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Patient Enquiries Table (Home visit quick forms)
create table if not exists patient_enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  symptom_details text,
  source_service text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================================
-- 2. SECURITY & ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
alter table locations enable row level security;
alter table services enable row level security;
alter table appointments enable row level security;
alter table contact_submissions enable row level security;
alter table patient_enquiries enable row level security;

-- Helper function to check if the current user is an admin
create or replace function public.is_admin()
returns boolean security definer as $$
begin
  return (
    coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false)
    or
    coalesce(auth.jwt() ->> 'email' = 'admin@physioventurenoida.com', false)
  );
end;
$$ language plpgsql;

-- A. Locations Policies
create policy "Allow public select on locations" 
  on locations for select using (true);

create policy "Allow admin changes on locations" 
  on locations for all to authenticated 
  using (public.is_admin()) 
  with check (public.is_admin());

-- B. Services Policies
create policy "Allow public select on services" 
  on services for select using (true);

create policy "Allow admin changes on services" 
  on services for all to authenticated 
  using (public.is_admin()) 
  with check (public.is_admin());

-- C. Appointments Policies
create policy "Allow public inserts on appointments" 
  on appointments for insert with check (true);

create policy "Allow admin management on appointments" 
  on appointments for all to authenticated 
  using (public.is_admin()) 
  with check (public.is_admin());

-- D. Contact Submissions Policies
create policy "Allow public inserts on contact_submissions" 
  on contact_submissions for insert with check (true);

create policy "Allow admin management on contact_submissions" 
  on contact_submissions for all to authenticated 
  using (public.is_admin()) 
  with check (public.is_admin());

-- E. Patient Enquiries Policies
create policy "Allow public inserts on patient_enquiries" 
  on patient_enquiries for insert with check (true);

create policy "Allow admin management on patient_enquiries" 
  on patient_enquiries for all to authenticated 
  using (public.is_admin()) 
  with check (public.is_admin());

-- =========================================================================
-- 3. SEED INITIAL DATA
-- =========================================================================

-- Seed Sector 49 branch
insert into locations (name, slug, address, phone, gmaps_embed_url)
values (
  'Sector 49 Clinic (Home Visits Hub)',
  'sector-49-noida',
  'A-31, Block A, Sector 49, Noida, Uttar Pradesh 201303',
  '+91 89320 82549',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.743126868516!2d77.362143!3d28.577488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5d9842a201d%3A0xe96cfbfa8b14a2c!2sSector%2049%2C%20Noida%2C%20Uttar%20Pradesh%20201303!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
) on conflict do nothing;

-- Seed the 23 services
insert into services (name, slug, description)
values
  ('Aquatic Physiotherapy', 'aquatic-physiotherapy', 'Water-based physical therapy designed to reduce impact and support biomechanical joints.'),
  ('Arthritis Treatment', 'arthritis-treatment', 'Specialized therapy to manage stiffness, reduce joint swelling, and improve osteoarthritis mobility.'),
  ('Back Pain Treatment', 'back-pain-treatment', 'Comprehensive lumbar diagnosis, core alignment, and pain mitigation for slip disc and sciatica.'),
  ('Balance Exercise Therapy', 'balance-exercise-therapy', 'Targeted training for post-stroke, neurological deficits, or age-related balance challenges.'),
  ('Chiropractic Care', 'chiropractic-care', 'Manual spinal adjustment and joint mobilization techniques to restore alignment and relieve pressure.'),
  ('Foot & Ankle Pain Treatment', 'foot-ankle-pain-treatment', 'Recovery plans for heel spurs, plantar fasciitis, Achilles tendonitis, and ankle sprains.'),
  ('Geriatric Physiotherapy', 'geriatric-physiotherapy', 'Active aging rehabilitation to maintain muscle tone, flexibility, strength, and fall prevention.'),
  ('Heat Therapy', 'heat-therapy', 'Clinical application of thermal energy to improve tissue compliance, increase blood flow, and soothe spasm.'),
  ('Hip Pain Treatment', 'hip-pain-treatment', 'Specialized diagnostics and strengthening for hip bursitis, labral tears, and joint stiffness.'),
  ('Hydrotherapy Training', 'hydrotherapy-training', 'Structured water-based exercise training for active athletic recovery and strength rebuilding.'),
  ('Inpatient Physiotherapy', 'inpatient-physiotherapy', 'Short-term clinic-admitted physical therapy for intensive orthopedic and neurological healing.'),
  ('Knee Pain Treatment', 'knee-pain-treatment', 'Post-injury and osteoarthritic knee therapy for restoring full articulation, strength, and gait.'),
  ('Massage Therapy', 'massage-therapy', 'Clinical myofascial release, deep tissue therapy, and trigger point targeting for recovery.'),
  ('Neurological Physiotherapy', 'neurological-physiotherapy', 'Specialized neural plasticity programs for stroke recovery, Parkinson''s disease, and balance disorders.'),
  ('Occupational Therapy', 'occupational-therapy', 'Adapting physical tasks and biomechanics to restore functional independence in daily living.'),
  ('Orthopaedic Rehabilitation', 'orthopaedic-rehabilitation', 'Restoring range of motion, muscle strength, and bone load-bearing post-fracture or orthopaedic injury.'),
  ('Paediatric Physiotherapy', 'paediatric-physiotherapy', 'Developmental assessment and fun, therapeutic movement training for children with delays.'),
  ('Physical Therapy', 'physical-therapy', 'Standard functional assessment and recovery plans for musculoskeletal sprains and strains.'),
  ('Post-Surgery Rehabilitation', 'post-surgery-rehabilitation', 'Intensive timeline-driven protocols for recovery post joint replacement, ligament repair, or spinal surgery.'),
  ('Shoulder Pain Treatment', 'shoulder-pain-treatment', 'Focused therapy for frozen shoulder, rotator cuff tendonitis, and shoulder impingement syndrome.'),
  ('Spinal Injury Rehabilitation', 'spinal-injury-rehabilitation', 'Long-term progressive physical therapy to maximize nerve function and core strength after spinal trauma.'),
  ('Therapeutic Exercise', 'therapeutic-exercise', 'Biophysiologically customized exercise prescriptions for functional strength and posture repair.'),
  ('Vestibular Rehabilitation', 'vestibular-rehabilitation', 'Inner-ear exercises and positional maneuvers to eliminate vertigo, dizziness, and gait instability.')
on conflict do nothing;
