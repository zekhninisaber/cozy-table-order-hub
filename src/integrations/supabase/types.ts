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
      builder_options: {
        Row: {
          extra_price: number
          id: number
          name: string
          out_of_stock: boolean
          step_id: number | null
        }
        Insert: {
          extra_price?: number
          id?: number
          name: string
          out_of_stock?: boolean
          step_id?: number | null
        }
        Update: {
          extra_price?: number
          id?: number
          name?: string
          out_of_stock?: boolean
          step_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "builder_options_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "builder_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      builder_steps: {
        Row: {
          id: number
          max_select: number
          name: string
          sort: number
        }
        Insert: {
          id?: number
          max_select?: number
          name: string
          sort?: number
        }
        Update: {
          id?: number
          max_select?: number
          name?: string
          sort?: number
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: number
          names: Json
          sort: number
          thumbnail_url: string | null
          visible: boolean
        }
        Insert: {
          id?: number
          names?: Json
          sort?: number
          thumbnail_url?: string | null
          visible?: boolean
        }
        Update: {
          id?: number
          names?: Json
          sort?: number
          thumbnail_url?: string | null
          visible?: boolean
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          category_id: number | null
          descriptions: Json
          id: number
          names: Json
          out_of_stock: boolean
          photo_url: string | null
          price: number
          sort: number
          tags: string[] | null
        }
        Insert: {
          category_id?: number | null
          descriptions?: Json
          id?: number
          names?: Json
          out_of_stock?: boolean
          photo_url?: string | null
          price?: number
          sort?: number
          tags?: string[] | null
        }
        Update: {
          category_id?: number | null
          descriptions?: Json
          id?: number
          names?: Json
          out_of_stock?: boolean
          photo_url?: string | null
          price?: number
          sort?: number
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      order_lines: {
        Row: {
          builder_json: Json | null
          id: number
          item_id: number | null
          order_id: number | null
          price_each: number
          qty: number
        }
        Insert: {
          builder_json?: Json | null
          id?: number
          item_id?: number | null
          order_id?: number | null
          price_each: number
          qty?: number
        }
        Update: {
          builder_json?: Json | null
          id?: number
          item_id?: number | null
          order_id?: number | null
          price_each?: number
          qty?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_lines_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_lines_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_name: string
          id: number
          lang: string
          table_id: number | null
        }
        Insert: {
          created_at?: string
          customer_name: string
          id?: number
          lang?: string
          table_id?: number | null
        }
        Update: {
          created_at?: string
          customer_name?: string
          id?: number
          lang?: string
          table_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      tables: {
        Row: {
          id: number
          label: string
        }
        Insert: {
          id?: number
          label: string
        }
        Update: {
          id?: number
          label?: string
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
