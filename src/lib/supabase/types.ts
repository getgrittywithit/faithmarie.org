export type UserRole = 'admin' | 'board_member' | 'contributor';

// Content & Newsletter enums
export type ContentStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived';
export type DistributionChannel = 'website' | 'newsletter' | 'both';
export type NewsletterSendStatus = 'pending' | 'sending' | 'sent' | 'failed' | 'cancelled';

// Memorial-specific enums
export type MemorialStatus = 'draft' | 'pending_moderation' | 'published' | 'rejected' | 'taken_down';
export type PrivacyMode = 'public' | 'password';
export type TributeStatus = 'pending' | 'approved' | 'rejected' | 'hidden';
export type ProofType = 'obituary_url' | 'funeral_home' | 'newspaper_link' | 'upload' | 'hardship_attestation';
export type RelationshipType = 'parent' | 'spouse' | 'child' | 'sibling' | 'grandchild' | 'other_family' | 'close_friend' | 'other';
export type FundingType = 'paid' | 'hardship' | 'sponsored' | 'pay_it_forward' | 'grant';

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
      };
      research_digests: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string;
          content: string;
          topic: string;
          source_url: string | null;
          source_title: string | null;
          published: boolean;
          published_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary: string;
          content: string;
          topic: string;
          source_url?: string | null;
          source_title?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string;
          content?: string;
          topic?: string;
          source_url?: string | null;
          source_title?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      donations: {
        Row: {
          id: string;
          stripe_session_id: string;
          amount_cents: number;
          donor_email: string | null;
          donor_name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          stripe_session_id: string;
          amount_cents: number;
          donor_email?: string | null;
          donor_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          stripe_session_id?: string;
          amount_cents?: number;
          donor_email?: string | null;
          donor_name?: string | null;
          created_at?: string;
        };
      };
      subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          topics: string[];
          source: string | null;
          subscribed_at: string;
          unsubscribed_at: string | null;
          resend_contact_id: string | null;
          bounce_count: number;
          last_email_sent_at: string | null;
          last_email_opened_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          topics?: string[];
          source?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          resend_contact_id?: string | null;
          bounce_count?: number;
          last_email_sent_at?: string | null;
          last_email_opened_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          topics?: string[];
          source?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          resend_contact_id?: string | null;
          bounce_count?: number;
          last_email_sent_at?: string | null;
          last_email_opened_at?: string | null;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          body: string;
          body_html: string | null;
          topics: string[];
          featured_image_url: string | null;
          reading_time_minutes: number | null;
          distribution: DistributionChannel;
          status: ContentStatus;
          published_at: string | null;
          email_subject: string | null;
          email_preheader: string | null;
          scheduled_publish_at: string | null;
          scheduled_send_at: string | null;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          body: string;
          body_html?: string | null;
          topics?: string[];
          featured_image_url?: string | null;
          reading_time_minutes?: number | null;
          distribution?: DistributionChannel;
          status?: ContentStatus;
          published_at?: string | null;
          email_subject?: string | null;
          email_preheader?: string | null;
          scheduled_publish_at?: string | null;
          scheduled_send_at?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          body?: string;
          body_html?: string | null;
          topics?: string[];
          featured_image_url?: string | null;
          reading_time_minutes?: number | null;
          distribution?: DistributionChannel;
          status?: ContentStatus;
          published_at?: string | null;
          email_subject?: string | null;
          email_preheader?: string | null;
          scheduled_publish_at?: string | null;
          scheduled_send_at?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletter_sends: {
        Row: {
          id: string;
          post_id: string | null;
          target_topics: string[];
          target_all_subscribers: boolean;
          status: NewsletterSendStatus;
          scheduled_at: string | null;
          started_at: string | null;
          completed_at: string | null;
          total_recipients: number;
          sent_count: number;
          delivered_count: number;
          opened_count: number;
          clicked_count: number;
          bounced_count: number;
          resend_batch_id: string | null;
          sent_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id?: string | null;
          target_topics?: string[];
          target_all_subscribers?: boolean;
          status?: NewsletterSendStatus;
          scheduled_at?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          total_recipients?: number;
          sent_count?: number;
          delivered_count?: number;
          opened_count?: number;
          clicked_count?: number;
          bounced_count?: number;
          resend_batch_id?: string | null;
          sent_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string | null;
          target_topics?: string[];
          target_all_subscribers?: boolean;
          status?: NewsletterSendStatus;
          scheduled_at?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          total_recipients?: number;
          sent_count?: number;
          delivered_count?: number;
          opened_count?: number;
          clicked_count?: number;
          bounced_count?: number;
          resend_batch_id?: string | null;
          sent_by?: string | null;
          created_at?: string;
        };
      };
      newsletter_recipients: {
        Row: {
          id: string;
          send_id: string | null;
          subscriber_id: string | null;
          resend_email_id: string | null;
          sent_at: string | null;
          delivered_at: string | null;
          opened_at: string | null;
          clicked_at: string | null;
          bounced_at: string | null;
        };
        Insert: {
          id?: string;
          send_id?: string | null;
          subscriber_id?: string | null;
          resend_email_id?: string | null;
          sent_at?: string | null;
          delivered_at?: string | null;
          opened_at?: string | null;
          clicked_at?: string | null;
          bounced_at?: string | null;
        };
        Update: {
          id?: string;
          send_id?: string | null;
          subscriber_id?: string | null;
          resend_email_id?: string | null;
          sent_at?: string | null;
          delivered_at?: string | null;
          opened_at?: string | null;
          clicked_at?: string | null;
          bounced_at?: string | null;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          type: 'volunteer' | 'partner' | 'general';
          name: string;
          email: string;
          organization: string | null;
          message: string;
          status: 'new' | 'reviewed' | 'responded' | 'archived';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: 'volunteer' | 'partner' | 'general';
          name: string;
          email: string;
          organization?: string | null;
          message: string;
          status?: 'new' | 'reviewed' | 'responded' | 'archived';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: 'volunteer' | 'partner' | 'general';
          name?: string;
          email?: string;
          organization?: string | null;
          message?: string;
          status?: 'new' | 'reviewed' | 'responded' | 'archived';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      // ============================================
      // MEMORIAL TABLES
      // ============================================
      memorial_users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          stripe_customer_id: string | null;
          banned_at: string | null;
          ban_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          phone?: string | null;
          stripe_customer_id?: string | null;
          banned_at?: string | null;
          ban_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string | null;
          stripe_customer_id?: string | null;
          banned_at?: string | null;
          ban_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      memorials: {
        Row: {
          id: string;
          slug: string;
          creator_id: string;
          deceased_full_name: string;
          deceased_dob: string;
          deceased_dod: string;
          deceased_city: string | null;
          deceased_state: string | null;
          deceased_country: string | null;
          epitaph: string | null;
          obituary_text: string | null;
          hero_photo_id: string | null;
          privacy: PrivacyMode;
          privacy_password_hash: string | null;
          status: MemorialStatus;
          funded_by: FundingType | null;
          sponsor_user_id: string | null;
          sponsor_display_name: string | null;
          sponsor_show_credit: boolean;
          hosting_paid_until: string | null;
          theme_accent: string;
          created_at: string;
          updated_at: string;
          published_at: string | null;
          last_edited_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          creator_id: string;
          deceased_full_name: string;
          deceased_dob: string;
          deceased_dod: string;
          deceased_city?: string | null;
          deceased_state?: string | null;
          deceased_country?: string | null;
          epitaph?: string | null;
          obituary_text?: string | null;
          hero_photo_id?: string | null;
          privacy?: PrivacyMode;
          privacy_password_hash?: string | null;
          status?: MemorialStatus;
          funded_by?: FundingType | null;
          sponsor_user_id?: string | null;
          sponsor_display_name?: string | null;
          sponsor_show_credit?: boolean;
          hosting_paid_until?: string | null;
          theme_accent?: string;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
          last_edited_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          creator_id?: string;
          deceased_full_name?: string;
          deceased_dob?: string;
          deceased_dod?: string;
          deceased_city?: string | null;
          deceased_state?: string | null;
          deceased_country?: string | null;
          epitaph?: string | null;
          obituary_text?: string | null;
          hero_photo_id?: string | null;
          privacy?: PrivacyMode;
          privacy_password_hash?: string | null;
          status?: MemorialStatus;
          funded_by?: FundingType | null;
          sponsor_user_id?: string | null;
          sponsor_display_name?: string | null;
          sponsor_show_credit?: boolean;
          hosting_paid_until?: string | null;
          theme_accent?: string;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
          last_edited_at?: string;
        };
      };
      memorial_editors: {
        Row: {
          memorial_id: string;
          user_id: string;
          relationship: RelationshipType;
          invited_by: string;
          invited_at: string;
          accepted_at: string | null;
          removed_at: string | null;
        };
        Insert: {
          memorial_id: string;
          user_id: string;
          relationship?: RelationshipType;
          invited_by: string;
          invited_at?: string;
          accepted_at?: string | null;
          removed_at?: string | null;
        };
        Update: {
          memorial_id?: string;
          user_id?: string;
          relationship?: RelationshipType;
          invited_by?: string;
          invited_at?: string;
          accepted_at?: string | null;
          removed_at?: string | null;
        };
      };
      memorial_photos: {
        Row: {
          id: string;
          memorial_id: string;
          storage_path: string;
          original_filename: string | null;
          caption: string | null;
          sort_order: number;
          uploaded_by: string;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          memorial_id: string;
          storage_path: string;
          original_filename?: string | null;
          caption?: string | null;
          sort_order?: number;
          uploaded_by: string;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          memorial_id?: string;
          storage_path?: string;
          original_filename?: string | null;
          caption?: string | null;
          sort_order?: number;
          uploaded_by?: string;
          uploaded_at?: string;
        };
      };
      life_events: {
        Row: {
          id: string;
          memorial_id: string;
          event_date: string | null;
          title: string;
          description: string | null;
          photo_id: string | null;
          sort_order: number;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          memorial_id: string;
          event_date?: string | null;
          title: string;
          description?: string | null;
          photo_id?: string | null;
          sort_order?: number;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          memorial_id?: string;
          event_date?: string | null;
          title?: string;
          description?: string | null;
          photo_id?: string | null;
          sort_order?: number;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tributes: {
        Row: {
          id: string;
          memorial_id: string;
          visitor_email: string;
          visitor_email_verified: boolean;
          visitor_name: string;
          visitor_relationship: string | null;
          message: string;
          photo_id: string | null;
          status: TributeStatus;
          submitted_at: string;
          moderated_by: string | null;
          moderated_at: string | null;
          ip_address: string | null;
          honeypot_triggered: boolean;
        };
        Insert: {
          id?: string;
          memorial_id: string;
          visitor_email: string;
          visitor_email_verified?: boolean;
          visitor_name: string;
          visitor_relationship?: string | null;
          message: string;
          photo_id?: string | null;
          status?: TributeStatus;
          submitted_at?: string;
          moderated_by?: string | null;
          moderated_at?: string | null;
          ip_address?: string | null;
          honeypot_triggered?: boolean;
        };
        Update: {
          id?: string;
          memorial_id?: string;
          visitor_email?: string;
          visitor_email_verified?: boolean;
          visitor_name?: string;
          visitor_relationship?: string | null;
          message?: string;
          photo_id?: string | null;
          status?: TributeStatus;
          submitted_at?: string;
          moderated_by?: string | null;
          moderated_at?: string | null;
          ip_address?: string | null;
          honeypot_triggered?: boolean;
        };
      };
      proof_of_death: {
        Row: {
          id: string;
          memorial_id: string;
          type: ProofType;
          obituary_url: string | null;
          funeral_home_name: string | null;
          funeral_home_city: string | null;
          newspaper_url: string | null;
          upload_path: string | null;
          hardship_note: string | null;
          verified: boolean;
          verified_by: string | null;
          verified_at: string | null;
          verification_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          memorial_id: string;
          type: ProofType;
          obituary_url?: string | null;
          funeral_home_name?: string | null;
          funeral_home_city?: string | null;
          newspaper_url?: string | null;
          upload_path?: string | null;
          hardship_note?: string | null;
          verified?: boolean;
          verified_by?: string | null;
          verified_at?: string | null;
          verification_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          memorial_id?: string;
          type?: ProofType;
          obituary_url?: string | null;
          funeral_home_name?: string | null;
          funeral_home_city?: string | null;
          newspaper_url?: string | null;
          upload_path?: string | null;
          hardship_note?: string | null;
          verified?: boolean;
          verified_by?: string | null;
          verified_at?: string | null;
          verification_notes?: string | null;
          created_at?: string;
        };
      };
      attestations: {
        Row: {
          id: string;
          memorial_id: string;
          user_id: string;
          relationship: RelationshipType;
          attestation_text: string;
          signed_at: string;
          ip_address: string;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          memorial_id: string;
          user_id: string;
          relationship: RelationshipType;
          attestation_text: string;
          signed_at?: string;
          ip_address: string;
          user_agent?: string | null;
        };
        Update: {
          id?: string;
          memorial_id?: string;
          user_id?: string;
          relationship?: RelationshipType;
          attestation_text?: string;
          signed_at?: string;
          ip_address?: string;
          user_agent?: string | null;
        };
      };
      pay_it_forward_credits: {
        Row: {
          id: string;
          funded_by_donation_id: string | null;
          funded_by_user_id: string | null;
          consumed_by_memorial_id: string | null;
          consumed_at: string | null;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          funded_by_donation_id?: string | null;
          funded_by_user_id?: string | null;
          consumed_by_memorial_id?: string | null;
          consumed_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          funded_by_donation_id?: string | null;
          funded_by_user_id?: string | null;
          consumed_by_memorial_id?: string | null;
          consumed_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
      };
      moderation_actions: {
        Row: {
          id: string;
          memorial_id: string | null;
          tribute_id: string | null;
          target_user_id: string | null;
          moderator_id: string;
          action: string;
          reason: string | null;
          internal_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          memorial_id?: string | null;
          tribute_id?: string | null;
          target_user_id?: string | null;
          moderator_id: string;
          action: string;
          reason?: string | null;
          internal_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          memorial_id?: string | null;
          tribute_id?: string | null;
          target_user_id?: string | null;
          moderator_id?: string;
          action?: string;
          reason?: string | null;
          internal_notes?: string | null;
          created_at?: string;
        };
      };
      memorial_reports: {
        Row: {
          id: string;
          memorial_id: string;
          reporter_email: string;
          reporter_relationship: string | null;
          is_immediate_family: boolean;
          nature_of_concern: string;
          message: string | null;
          status: string;
          resolved_by: string | null;
          resolved_at: string | null;
          resolution_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          memorial_id: string;
          reporter_email: string;
          reporter_relationship?: string | null;
          is_immediate_family?: boolean;
          nature_of_concern: string;
          message?: string | null;
          status?: string;
          resolved_by?: string | null;
          resolved_at?: string | null;
          resolution_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          memorial_id?: string;
          reporter_email?: string;
          reporter_relationship?: string | null;
          is_immediate_family?: boolean;
          nature_of_concern?: string;
          message?: string | null;
          status?: string;
          resolved_by?: string | null;
          resolved_at?: string | null;
          resolution_notes?: string | null;
          created_at?: string;
        };
      };
      memorial_audit_log: {
        Row: {
          id: string;
          actor_user_id: string | null;
          actor_admin_id: string | null;
          entity_type: string;
          entity_id: string;
          action: string;
          field_changed: string | null;
          old_value: Record<string, unknown> | null;
          new_value: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_user_id?: string | null;
          actor_admin_id?: string | null;
          entity_type: string;
          entity_id: string;
          action: string;
          field_changed?: string | null;
          old_value?: Record<string, unknown> | null;
          new_value?: Record<string, unknown> | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_user_id?: string | null;
          actor_admin_id?: string | null;
          entity_type?: string;
          entity_id?: string;
          action?: string;
          field_changed?: string | null;
          old_value?: Record<string, unknown> | null;
          new_value?: Record<string, unknown> | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_available_pif_credits: {
        Args: Record<string, never>;
        Returns: number;
      };
      is_memorial_editor: {
        Args: { memorial_uuid: string };
        Returns: boolean;
      };
      is_memorial_creator: {
        Args: { memorial_uuid: string };
        Returns: boolean;
      };
      is_memorial_public: {
        Args: { memorial_uuid: string };
        Returns: boolean;
      };
    };
    Enums: {
      user_role: UserRole;
      submission_status: 'new' | 'reviewed' | 'responded' | 'archived';
      submission_type: 'volunteer' | 'partner' | 'general';
      memorial_status: MemorialStatus;
      privacy_mode: PrivacyMode;
      tribute_status: TributeStatus;
      proof_type: ProofType;
      relationship_type: RelationshipType;
      funding_type: FundingType;
      content_status: ContentStatus;
      distribution_channel: DistributionChannel;
      newsletter_send_status: NewsletterSendStatus;
    };
  };
}

// Convenience type aliases for memorial tables
export type Memorial = Database['public']['Tables']['memorials']['Row'];
export type MemorialInsert = Database['public']['Tables']['memorials']['Insert'];
export type MemorialUpdate = Database['public']['Tables']['memorials']['Update'];

export type MemorialUser = Database['public']['Tables']['memorial_users']['Row'];
export type MemorialPhoto = Database['public']['Tables']['memorial_photos']['Row'];
export type LifeEvent = Database['public']['Tables']['life_events']['Row'];
export type Tribute = Database['public']['Tables']['tributes']['Row'];
export type ProofOfDeath = Database['public']['Tables']['proof_of_death']['Row'];
export type Attestation = Database['public']['Tables']['attestations']['Row'];
export type PayItForwardCredit = Database['public']['Tables']['pay_it_forward_credits']['Row'];
export type ModerationAction = Database['public']['Tables']['moderation_actions']['Row'];
export type MemorialReport = Database['public']['Tables']['memorial_reports']['Row'];

// Content & Newsletter type aliases
export type Post = Database['public']['Tables']['posts']['Row'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];

export type NewsletterSend = Database['public']['Tables']['newsletter_sends']['Row'];
export type NewsletterSendInsert = Database['public']['Tables']['newsletter_sends']['Insert'];
export type NewsletterSendUpdate = Database['public']['Tables']['newsletter_sends']['Update'];

export type NewsletterRecipient = Database['public']['Tables']['newsletter_recipients']['Row'];
export type Subscriber = Database['public']['Tables']['subscribers']['Row'];
