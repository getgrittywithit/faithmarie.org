/**
 * Seed script to create Faith Marie's memorial as memorial #1
 *
 * Run with: node scripts/seed-faith-marie-memorial.mjs
 *
 * Prerequisites:
 * - Set environment variables OR have .env.local file:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 * - Memorial tables must exist (run migrations first)
 *
 * You can also run with env vars inline:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/seed-faith-marie-memorial.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Try to load from .env.local if it exists, otherwise use process.env
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const envPath = resolve(__dirname, '..', '.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key === 'NEXT_PUBLIC_SUPABASE_URL' && !supabaseUrl) supabaseUrl = value;
      if (key === 'SUPABASE_SERVICE_ROLE_KEY' && !supabaseServiceKey) supabaseServiceKey = value;
    }
  });
}

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables.');
  console.error('');
  console.error('Either create a .env.local file with:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.error('  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  console.error('');
  console.error('Or run with inline env vars:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=xxx SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/seed-faith-marie-memorial.mjs');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const FAITH_MARIE_OBITUARY = `Faith Marie was born on June 25, 2019, as the 7th child of the Moses family. She came into the world with a complicated heart condition, facing challenges that no baby should have to endure.

In her 21 precious days, she taught her family more about strength, hope, and unconditional love than they could have ever imagined. Every moment with her was a gift. Her tiny fingers wrapped around theirs, her peaceful moments of rest, and the way she fought with everything she had — these memories remain a permanent mark on everyone who knew her.

After Faith Marie passed on July 16, 2019, her family found themselves navigating an overwhelming landscape of grief and mental health challenges. They searched for resources, for understanding, for anything that could help them make sense of their loss.

What they found was fragmented. Mental health research existed — groundbreaking studies on grief, trauma, and healing — but it was locked behind academic paywalls, written in impenetrable jargon, and disconnected from the people who needed it most.

This realization sparked a question: What if the latest mental health research could be made accessible to everyone? What if families dealing with grief, individuals struggling with PTSD, and anyone facing depression or anxiety could have the same access to cutting-edge findings as researchers themselves?

The Faith Marie Foundation was born from this vision. We read the research so families don't have to — translating complex academic findings into plain-language guidance, practical tools, and curated resources. We're building what we wished existed when we needed it most.

Faith Marie lived for 21 days, but her impact continues to ripple outward. Every research digest we publish, every person who finds understanding through our knowledge base, every moment of comfort provided by our tools — these are all part of her legacy.

No family should navigate grief, trauma, or mental health struggles without accessible, modern support. In Faith Marie's name, we're making sure they don't have to.`;

// Note: life_events.created_by is required in the DB schema
// For the seed, we'll create a memorial_user first and use that ID

const LIFE_EVENTS = [
  {
    event_date: '2019-06-25',
    title: 'Faith Marie is Born',
    description: 'Born with a complicated heart condition, Faith Marie entered the world as the 7th child of the Moses family.',
  },
  {
    event_date: '2019-07-16',
    title: '21 Days of Love',
    description: 'In her 21 precious days, Faith Marie taught her family more about strength, hope, and unconditional love than they could have ever imagined.',
  },
  {
    event_date: '2026-01-01',
    title: 'Foundation Launch',
    description: 'The Faith Marie Foundation launches — helping families find the mental health resources and guidance they need.',
  },
];

async function seedFaithMarieMemorial() {
  console.log('Starting Faith Marie memorial seed...\n');

  // Check if memorial already exists
  const { data: existingMemorial } = await supabase
    .from('memorials')
    .select('id')
    .eq('slug', 'faith-marie-moses')
    .single();

  if (existingMemorial) {
    console.log('Faith Marie memorial already exists with ID:', existingMemorial.id);
    console.log('Skipping creation.\n');
    return;
  }

  // First, we need a memorial_user for creator_id and life_events.created_by
  // Check if one exists for the foundation email, or create one
  const FOUNDATION_EMAIL = 'info@faithmarie.org';

  let { data: existingUser } = await supabase
    .from('memorial_users')
    .select('id')
    .eq('email', FOUNDATION_EMAIL)
    .single();

  let creatorId;

  if (existingUser) {
    creatorId = existingUser.id;
    console.log('Using existing memorial_user:', creatorId);
  } else {
    // Create a new memorial_user (requires auth.users entry first in production)
    // For seeding, we'll create without auth link using a generated UUID
    const newUserId = crypto.randomUUID();

    const { data: newUser, error: userError } = await supabase
      .from('memorial_users')
      .insert({
        id: newUserId,
        email: FOUNDATION_EMAIL,
        full_name: 'Faith Marie Foundation',
        phone: null,
      })
      .select('id')
      .single();

    if (userError) {
      console.error('Error creating memorial_user:', userError);
      console.log('\nNote: If auth.users FK constraint failed, you may need to:');
      console.log('1. Create an auth user first via Supabase dashboard');
      console.log('2. Or temporarily disable the FK constraint');
      process.exit(1);
    }

    creatorId = newUser.id;
    console.log('Created memorial_user with ID:', creatorId);
  }

  // Create the memorial with correct field names matching DB schema
  const { data: memorial, error: memorialError } = await supabase
    .from('memorials')
    .insert({
      slug: 'faith-marie-moses',
      creator_id: creatorId,
      deceased_full_name: 'Faith Marie Moses',
      deceased_dob: '2019-06-25',
      deceased_dod: '2019-07-16',
      epitaph: '21 days that changed everything',
      obituary_text: FAITH_MARIE_OBITUARY,
      status: 'published',
      funded_by: 'grant',
      privacy: 'public',
      theme_accent: 'teal',
      published_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (memorialError) {
    console.error('Error creating memorial:', memorialError);
    process.exit(1);
  }

  console.log('Created Faith Marie memorial with ID:', memorial.id);
  console.log('Slug: faith-marie-moses');

  // Add life events (includes required created_by field)
  const eventsWithMemorialId = LIFE_EVENTS.map((event, index) => ({
    ...event,
    memorial_id: memorial.id,
    created_by: creatorId,
    sort_order: index,
  }));

  const { error: eventsError } = await supabase
    .from('life_events')
    .insert(eventsWithMemorialId);

  if (eventsError) {
    console.error('Error creating life events:', eventsError);
  } else {
    console.log('Created', LIFE_EVENTS.length, 'life events');
  }

  // Note: moderation_actions requires moderator_id (admin_users FK)
  // Skip for seed script - this is the foundation's flagship memorial
  console.log('Skipping moderation_actions (requires admin_user)');

  console.log('\nMemorial URL: /in-memory/faith-marie-moses');
  console.log('\nNote: Photos need to be uploaded separately through the dashboard.');
  console.log('The existing photos in /public/images/ can be uploaded via the Photos manager.');
  console.log('\nSeed completed successfully!');
}

seedFaithMarieMemorial().catch(console.error);
