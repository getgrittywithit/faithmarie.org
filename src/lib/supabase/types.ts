export type UserRole = 'admin' | 'board_member' | 'contributor';

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
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          topics?: string[];
          source?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          topics?: string[];
          source?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      submission_status: 'new' | 'reviewed' | 'responded' | 'archived';
      submission_type: 'volunteer' | 'partner' | 'general';
    };
  };
}
