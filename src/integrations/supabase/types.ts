export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      care_assessments: {
        Row: {
          additional_notes: string | null
          adl_status: string | null
          age: number | null
          conversational_id: string | null
          created_at: string
          funding_source: string | null
          id: string
          medical_complexity: string | null
          memory_status: string | null
          mobility_status: string | null
          monthly_budget_range: string | null
          patient_name: string | null
          preferred_location: string | null
          search_executed: boolean | null
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          adl_status?: string | null
          age?: number | null
          conversational_id?: string | null
          created_at?: string
          funding_source?: string | null
          id?: string
          medical_complexity?: string | null
          memory_status?: string | null
          mobility_status?: string | null
          monthly_budget_range?: string | null
          patient_name?: string | null
          preferred_location?: string | null
          search_executed?: boolean | null
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          adl_status?: string | null
          age?: number | null
          conversational_id?: string | null
          created_at?: string
          funding_source?: string | null
          id?: string
          medical_complexity?: string | null
          memory_status?: string | null
          mobility_status?: string | null
          monthly_budget_range?: string | null
          patient_name?: string | null
          preferred_location?: string | null
          search_executed?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      care_recommendations: {
        Row: {
          confirmed_at: string | null
          final_level: string | null
          form_id: string | null
          id: string
          recommended_level: string
        }
        Insert: {
          confirmed_at?: string | null
          final_level?: string | null
          form_id?: string | null
          id?: string
          recommended_level: string
        }
        Update: {
          confirmed_at?: string | null
          final_level?: string | null
          form_id?: string | null
          id?: string
          recommended_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_recommendations_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "placement_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_history: {
        Row: {
          contact_id: string | null
          created_at: string | null
          id: string
          note: string
          user_id: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          note: string
          user_id?: string | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          id?: string
          note?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_history_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string
          facility: string | null
          id: string
          name: string
          phone: string | null
          role: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          facility?: string | null
          id?: string
          name: string
          phone?: string | null
          role: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          facility?: string | null
          id?: string
          name?: string
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_threads: {
        Row: {
          created_at: string | null
          elevenlabs_thread_id: string | null
          external_conversation_id: string | null
          id: string
          openai_thread_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          elevenlabs_thread_id?: string | null
          external_conversation_id?: string | null
          id?: string
          openai_thread_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          elevenlabs_thread_id?: string | null
          external_conversation_id?: string | null
          id?: string
          openai_thread_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_threads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      enriched_facilities: {
        Row: {
          address: string | null
          city: string | null
          id: string
          last_enriched_at: string | null
          lat: number | null
          lng: number | null
          name: string
          original_query: string | null
          overview: string | null
          phone: string | null
          source: string | null
          state: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          id?: string
          last_enriched_at?: string | null
          lat?: number | null
          lng?: number | null
          name: string
          original_query?: string | null
          overview?: string | null
          phone?: string | null
          source?: string | null
          state?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          id?: string
          last_enriched_at?: string | null
          lat?: number | null
          lng?: number | null
          name?: string
          original_query?: string | null
          overview?: string | null
          phone?: string | null
          source?: string | null
          state?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      event_attendees: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          status: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_attendees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string
          description: string | null
          id: string
          is_virtual: boolean | null
          location: string
          time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date: string
          description?: string | null
          id?: string
          is_virtual?: boolean | null
          location: string
          time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string | null
          id?: string
          is_virtual?: boolean | null
          location?: string
          time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          address: string
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          rating: number | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          rating?: number | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          rating?: number | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facilities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_amenities: {
        Row: {
          amenity: string
          facility_id: string | null
          id: string
        }
        Insert: {
          amenity: string
          facility_id?: string | null
          id?: string
        }
        Update: {
          amenity?: string
          facility_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_amenities_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_availability: {
        Row: {
          available: number
          care_type: string
          facility_id: string | null
          id: string
          total: number
          unit_type: string
          updated_at: string | null
          waitlist: boolean | null
        }
        Insert: {
          available?: number
          care_type: string
          facility_id?: string | null
          id?: string
          total?: number
          unit_type: string
          updated_at?: string | null
          waitlist?: boolean | null
        }
        Update: {
          available?: number
          care_type?: string
          facility_id?: string | null
          id?: string
          total?: number
          unit_type?: string
          updated_at?: string | null
          waitlist?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "facility_availability_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_care_types: {
        Row: {
          care_type: string
          facility_id: string | null
          id: string
        }
        Insert: {
          care_type: string
          facility_id?: string | null
          id?: string
        }
        Update: {
          care_type?: string
          facility_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_care_types_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_changes: {
        Row: {
          approved: boolean | null
          created_at: string
          facility_id: string
          id: string
          new_address: string | null
          new_description: string | null
          new_name: string | null
          new_rating: number | null
        }
        Insert: {
          approved?: boolean | null
          created_at?: string
          facility_id: string
          id?: string
          new_address?: string | null
          new_description?: string | null
          new_name?: string | null
          new_rating?: number | null
        }
        Update: {
          approved?: boolean | null
          created_at?: string
          facility_id?: string
          id?: string
          new_address?: string | null
          new_description?: string | null
          new_name?: string | null
          new_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "facility_changes_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_photos: {
        Row: {
          created_at: string | null
          description: string | null
          facility_id: string | null
          id: string
          is_primary: boolean | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          facility_id?: string | null
          id?: string
          is_primary?: boolean | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          facility_id?: string | null
          id?: string
          is_primary?: boolean | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_photos_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_reviews: {
        Row: {
          content: string
          created_at: string | null
          facility_id: string | null
          id: string
          rating: number
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          facility_id?: string | null
          id?: string
          rating: number
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          facility_id?: string | null
          id?: string
          rating?: number
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facility_reviews_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facility_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: number
          latitude: number | null
          longitude: number | null
          name: string | null
          phone: number | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          phone?: number | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          phone?: number | null
        }
        Relationships: []
      }
      NATION_WIDE: {
        Row: {
          address: string | null
          id: string
          name: string | null
          phone: string | null
          tags: string | null
        }
        Insert: {
          address?: string | null
          id: string
          name?: string | null
          phone?: string | null
          tags?: string | null
        }
        Update: {
          address?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          tags?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          facility: string
          id: string
          payment_date: string | null
          resident: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          facility: string
          id?: string
          payment_date?: string | null
          resident: string
          status: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          facility?: string
          id?: string
          payment_date?: string | null
          resident?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      placement_forms: {
        Row: {
          additional_notes: string | null
          age: number | null
          care_needs: string
          created_at: string | null
          diagnosis: string | null
          family_contact_email: string | null
          family_contact_name: string | null
          family_contact_phone: string | null
          id: string
          insurance_type: string | null
          location_preference: string | null
          mobility_level: string | null
          patient_name: string
        }
        Insert: {
          additional_notes?: string | null
          age?: number | null
          care_needs: string
          created_at?: string | null
          diagnosis?: string | null
          family_contact_email?: string | null
          family_contact_name?: string | null
          family_contact_phone?: string | null
          id?: string
          insurance_type?: string | null
          location_preference?: string | null
          mobility_level?: string | null
          patient_name: string
        }
        Update: {
          additional_notes?: string | null
          age?: number | null
          care_needs?: string
          created_at?: string | null
          diagnosis?: string | null
          family_contact_email?: string | null
          family_contact_name?: string | null
          family_contact_phone?: string | null
          id?: string
          insurance_type?: string | null
          location_preference?: string | null
          mobility_level?: string | null
          patient_name?: string
        }
        Relationships: []
      }
      tag_links: {
        Row: {
          created_at: string
          id: number
          location: string | null
          tags: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          location?: string | null
          tags?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          location?: string | null
          tags?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tag_links_tags_fkey"
            columns: ["tags"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: number
          tag: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          tag?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          tag?: string | null
        }
        Relationships: []
      }
      thread_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          openai_message_id: string | null
          role: string
          thread_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          openai_message_id?: string | null
          role: string
          thread_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          openai_message_id?: string | null
          role?: string
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "thread_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "conversation_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      Tools: {
        Row: {
          created_at: string
          id: number
          initiated_from: string | null
          tool_description: string | null
          tool_function_name: string | null
          tool_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          initiated_from?: string | null
          tool_description?: string | null
          tool_function_name?: string | null
          tool_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          initiated_from?: string | null
          tool_description?: string | null
          tool_function_name?: string | null
          tool_name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          address: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          password: string
          phone: string | null
          role: string
          updated_at: string | null
          voice_passphrase: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          password: string
          phone?: string | null
          role: string
          updated_at?: string | null
          voice_passphrase?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          password?: string
          phone?: string | null
          role?: string
          updated_at?: string | null
          voice_passphrase?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
