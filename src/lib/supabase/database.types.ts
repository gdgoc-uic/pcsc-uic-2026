export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          user_id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      stakeholders: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      certificate_templates: {
        Row: {
          id: string;
          file_path: string;
          template_width: number;
          template_height: number;
          text_x: number;
          text_y: number;
          text_position_x: number;
          text_position_y: number;
          font_size: number;
          font_family: string;
          font_color: string;
          text_align: "left" | "center" | "right";
          rotation: number;
          is_active: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          file_path: string;
          template_width?: number;
          template_height?: number;
          text_x?: number;
          text_y?: number;
          text_position_x?: number;
          text_position_y?: number;
          font_size?: number;
          font_family?: string;
          font_color?: string;
          text_align?: "left" | "center" | "right";
          rotation?: number;
          is_active?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          file_path?: string;
          template_width?: number;
          template_height?: number;
          text_x?: number;
          text_y?: number;
          text_position_x?: number;
          text_position_y?: number;
          font_size?: number;
          font_family?: string;
          font_color?: string;
          text_align?: "left" | "center" | "right";
          rotation?: number;
          is_active?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      evaluation_submissions: {
        Row: {
          id: string;
          stakeholder_id: string;
          submitted_name: string;
          email: string;
          answers: Json;
          comment: string | null;
          certificate_path: string | null;
          certificate_download_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          stakeholder_id: string;
          submitted_name: string;
          email: string;
          answers?: Json;
          comment?: string | null;
          certificate_path?: string | null;
          certificate_download_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          stakeholder_id?: string;
          submitted_name?: string;
          email?: string;
          answers?: Json;
          comment?: string | null;
          certificate_path?: string | null;
          certificate_download_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      generated_certificates: {
        Row: {
          id: string;
          submission_id: string;
          stakeholder_id: string;
          template_id: string;
          file_path: string;
          signed_download_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_id: string;
          stakeholder_id: string;
          template_id: string;
          file_path: string;
          signed_download_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          submission_id?: string;
          stakeholder_id?: string;
          template_id?: string;
          file_path?: string;
          signed_download_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      evaluation_questions: {
        Row: {
          id: string;
          question_text: string;
          question_type: "rating" | "text" | "textarea" | "select" | "multiple";
          question_key: string;
          is_required: boolean;
          display_order: number;
          meta: Json;
          is_active: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question_text: string;
          question_type: "rating" | "text" | "textarea" | "select" | "multiple";
          question_key: string;
          is_required?: boolean;
          display_order?: number;
          meta?: Json;
          is_active?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question_text?: string;
          question_type?: "rating" | "text" | "textarea" | "select" | "multiple";
          question_key?: string;
          is_required?: boolean;
          display_order?: number;
          meta?: Json;
          is_active?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
