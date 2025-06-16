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
      bookings: {
        Row: {
          booking_date: string | null
          cancel_reason: string | null
          cancelled_at: string | null
          class_id: string | null
          created_at: string | null
          id: string
          status: string | null
          student_id: string | null
        }
        Insert: {
          booking_date?: string | null
          cancel_reason?: string | null
          cancelled_at?: string | null
          class_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          student_id?: string | null
        }
        Update: {
          booking_date?: string | null
          cancel_reason?: string | null
          cancelled_at?: string | null
          class_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string | null
          date: string
          description: string | null
          end_time: string
          id: string
          instructor: string
          location: string
          max_students: number
          modality_id: string | null
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          description?: string | null
          end_time: string
          id?: string
          instructor: string
          location: string
          max_students?: number
          modality_id?: string | null
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string | null
          end_time?: string
          id?: string
          instructor?: string
          location?: string
          max_students?: number
          modality_id?: string | null
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_modality_id_fkey"
            columns: ["modality_id"]
            isOneToOne: false
            referencedRelation: "modalities"
            referencedColumns: ["id"]
          },
        ]
      }
      modalities: {
        Row: {
          color: string
          created_at: string | null
          description: string | null
          duration: number
          id: string
          max_students: number
          name: string
        }
        Insert: {
          color: string
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          max_students?: number
          name: string
        }
        Update: {
          color?: string
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          max_students?: number
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          due_date: string
          id: string
          method: string | null
          paid_date: string | null
          status: string | null
          stripe_payment_id: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          due_date: string
          id?: string
          method?: string | null
          paid_date?: string | null
          status?: string | null
          stripe_payment_id?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          due_date?: string
          id?: string
          method?: string | null
          paid_date?: string | null
          status?: string | null
          stripe_payment_id?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string | null
          description: string | null
          features: string[]
          id: string
          modalities: string[]
          monthly_price: number
          name: string
          popular: boolean | null
          updated_at: string | null
          weekly_classes: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: string[]
          id?: string
          modalities?: string[]
          monthly_price: number
          name: string
          popular?: boolean | null
          updated_at?: string | null
          weekly_classes: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: string[]
          id?: string
          modalities?: string[]
          monthly_price?: number
          name?: string
          popular?: boolean | null
          updated_at?: string | null
          weekly_classes?: number
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          avatar: string | null
          birth_date: string | null
          created_at: string | null
          email: string
          emergency_contact: string | null
          id: string
          join_date: string | null
          medical_notes: string | null
          name: string
          phone: string | null
          plan_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          avatar?: string | null
          birth_date?: string | null
          created_at?: string | null
          email: string
          emergency_contact?: string | null
          id?: string
          join_date?: string | null
          medical_notes?: string | null
          name: string
          phone?: string | null
          plan_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          avatar?: string | null
          birth_date?: string | null
          created_at?: string | null
          email?: string
          emergency_contact?: string | null
          id?: string
          join_date?: string | null
          medical_notes?: string | null
          name?: string
          phone?: string | null
          plan_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
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
