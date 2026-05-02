import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { RelationshipType, ProofType, FundingType } from '@/lib/supabase/types';

interface CreateMemorialRequest {
  email: string;
  fullName: string;
  phone: string;
  userId: string;
  deceasedFullName: string;
  deceasedDob: string;
  deceasedDod: string;
  deceasedCity: string;
  deceasedState: string;
  deceasedCountry: string;
  relationship: RelationshipType;
  proofType: ProofType;
  obituaryUrl: string;
  funeralHomeName: string;
  funeralHomeCity: string;
  newspaperUrl: string;
  hardshipNote: string;
  attestationAccepted: boolean;
  attestationIp: string;
  donationAmount: number;
  isHardship: boolean;
  hardshipReason: string;
  confirmDuplicate?: boolean; // User confirmed they want to create despite duplicate warning
}

function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // Add a short random suffix to ensure uniqueness
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${base}-${suffix}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateMemorialRequest = await request.json();
    const supabase = await createClient();
    // Use any to bypass type checking for new tables not yet in generated types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adminSupabase = createAdminClient() as any;

    // Validate required fields
    if (!body.deceasedFullName || !body.deceasedDob || !body.deceasedDod) {
      return NextResponse.json(
        { error: 'Missing required deceased information' },
        { status: 400 }
      );
    }

    if (!body.attestationAccepted) {
      return NextResponse.json(
        { error: 'Attestation must be accepted' },
        { status: 400 }
      );
    }

    // Get the auth user ID first for rate limiting
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Rate limit: 1 memorial per account per 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { count: recentMemorials } = await adminSupabase
      .from('memorials')
      .select('*', { count: 'exact', head: true })
      .eq('creator_id', authUser.id)
      .gte('created_at', sevenDaysAgo);

    if ((recentMemorials ?? 0) >= 1) {
      return NextResponse.json(
        { error: 'You can only create one memorial per week. Please wait before creating another.' },
        { status: 429 }
      );
    }

    // Get or create memorial user
    const { data: existingUser } = await adminSupabase
      .from('memorial_users')
      .select('id')
      .eq('email', body.email)
      .maybeSingle();

    let userId: string | undefined = existingUser?.id;

    if (!userId) {
      // Create memorial user profile
      const { data: newUser, error: userError } = await adminSupabase
        .from('memorial_users')
        .insert({
          id: authUser.id,
          email: body.email,
          full_name: body.fullName,
          phone: body.phone || null,
        })
        .select('id')
        .single();

      if (userError) {
        console.error('Error creating memorial user:', userError);
        return NextResponse.json(
          { error: 'Failed to create user profile' },
          { status: 500 }
        );
      }

      userId = newUser.id;
    }

    // Check for potential duplicates (same name + DOB + DOD)
    // This is a soft check - we warn but allow if user confirms
    const { data: potentialDuplicates } = await adminSupabase
      .from('memorials')
      .select('id, slug, deceased_full_name, status')
      .eq('deceased_full_name', body.deceasedFullName)
      .eq('deceased_dob', body.deceasedDob)
      .eq('deceased_dod', body.deceasedDod)
      .neq('status', 'taken_down');

    // If duplicates exist and user hasn't confirmed, return warning
    if (potentialDuplicates && potentialDuplicates.length > 0 && !body.confirmDuplicate) {
      return NextResponse.json({
        duplicateWarning: true,
        existingMemorials: potentialDuplicates.map((m: { slug: string; status: string }) => ({
          slug: m.slug,
          status: m.status,
        })),
        message: `A memorial for ${body.deceasedFullName} with the same birth and death dates already exists. Please confirm you want to create another.`,
      }, { status: 409 });
    }

    // Generate unique slug
    const slug = generateSlug(body.deceasedFullName);

    // Determine funding type
    let fundedBy: FundingType | null = null;
    if (body.isHardship) {
      // Check for available pay-it-forward credits
      const { data: credits } = await adminSupabase
        .from('pay_it_forward_credits')
        .select('id')
        .is('consumed_by_memorial_id', null)
        .limit(1);

      if (credits && credits.length > 0) {
        fundedBy = 'pay_it_forward';
      } else {
        fundedBy = 'hardship';
      }
    } else if (body.donationAmount >= 20) {
      fundedBy = 'paid';
    }

    // Create the memorial
    const { data: memorial, error: memorialError } = await adminSupabase
      .from('memorials')
      .insert({
        slug,
        creator_id: userId,
        deceased_full_name: body.deceasedFullName,
        deceased_dob: body.deceasedDob,
        deceased_dod: body.deceasedDod,
        deceased_city: body.deceasedCity || null,
        deceased_state: body.deceasedState || null,
        deceased_country: body.deceasedCountry || 'USA',
        status: 'pending_moderation',
        privacy: 'public',
        funded_by: fundedBy,
        hosting_paid_until: fundedBy === 'paid' || fundedBy === 'pay_it_forward'
          ? new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          : null,
      })
      .select('id, slug')
      .single();

    if (memorialError) {
      console.error('Error creating memorial:', memorialError);
      return NextResponse.json(
        { error: 'Failed to create memorial' },
        { status: 500 }
      );
    }

    // Create proof of death record
    const proofData: Record<string, unknown> = {
      memorial_id: memorial.id,
      type: body.proofType,
    };

    switch (body.proofType) {
      case 'obituary_url':
        proofData.obituary_url = body.obituaryUrl;
        break;
      case 'funeral_home':
        proofData.funeral_home_name = body.funeralHomeName;
        proofData.funeral_home_city = body.funeralHomeCity;
        break;
      case 'newspaper_link':
        proofData.newspaper_url = body.newspaperUrl;
        break;
      case 'hardship_attestation':
        proofData.hardship_note = body.hardshipNote;
        break;
    }

    await adminSupabase.from('proof_of_death').insert(proofData);

    // Create attestation record
    const attestationText = `I am the ${body.relationship} of ${body.deceasedFullName}, or I have explicit permission from immediate family to create this memorial. I understand that the Faith Marie Foundation may email immediate family members named in the obituary before this memorial is published, giving them an opportunity to respond. I understand that knowingly providing false information may result in permanent removal and potential legal consequences.`;

    await adminSupabase.from('attestations').insert({
      memorial_id: memorial.id,
      user_id: userId,
      relationship: body.relationship,
      attestation_text: attestationText,
      ip_address: body.attestationIp || request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request.headers.get('user-agent'),
    });

    // If using pay-it-forward, consume a credit
    if (fundedBy === 'pay_it_forward') {
      const { data: availableCredit } = await adminSupabase
        .from('pay_it_forward_credits')
        .select('id')
        .is('consumed_by_memorial_id', null)
        .limit(1)
        .single();

      if (availableCredit) {
        await adminSupabase
          .from('pay_it_forward_credits')
          .update({
            consumed_by_memorial_id: memorial.id,
            consumed_at: new Date().toISOString(),
          })
          .eq('id', availableCredit.id);
      }
    }

    // Create audit log entry
    await adminSupabase.from('memorial_audit_log').insert({
      actor_user_id: userId,
      entity_type: 'memorial',
      entity_id: memorial.id,
      action: 'create',
    });

    return NextResponse.json({
      success: true,
      slug: memorial.slug,
      id: memorial.id,
      // If paid, include checkout URL (handled by frontend)
      requiresPayment: !body.isHardship && body.donationAmount > 0,
    });
  } catch (error) {
    console.error('Error in memorial creation:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
