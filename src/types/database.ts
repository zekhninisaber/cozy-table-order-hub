
export interface Database {
  public: {
    Tables: {
      tables: {
        Row: {
          id: number;
          label: string;
        };
        Insert: {
          id?: number;
          label: string;
        };
        Update: {
          id?: number;
          label?: string;
        };
      };
      menu_categories: {
        Row: {
          id: number;
          name: string;
          sort: number;
        };
        Insert: {
          id?: number;
          name: string;
          sort: number;
        };
        Update: {
          id?: number;
          name?: string;
          sort?: number;
        };
      };
      menu_items: {
        Row: {
          id: number;
          category_id: number;
          names: Record<string, string>;
          price: number;
          photo_url: string | null;
          out_of_stock: boolean;
          description: Record<string, string> | null;
        };
        Insert: {
          id?: number;
          category_id: number;
          names: Record<string, string>;
          price: number;
          photo_url?: string | null;
          out_of_stock?: boolean;
          description?: Record<string, string> | null;
        };
        Update: {
          id?: number;
          category_id?: number;
          names?: Record<string, string>;
          price?: number;
          photo_url?: string | null;
          out_of_stock?: boolean;
          description?: Record<string, string> | null;
        };
      };
      builder_steps: {
        Row: {
          id: number;
          name: Record<string, string>;
          sort: number;
          max_select: number;
        };
        Insert: {
          id?: number;
          name: Record<string, string>;
          sort: number;
          max_select: number;
        };
        Update: {
          id?: number;
          name?: Record<string, string>;
          sort?: number;
          max_select?: number;
        };
      };
      builder_options: {
        Row: {
          id: number;
          step_id: number;
          name: Record<string, string>;
          extra_price: number;
          out_of_stock: boolean;
        };
        Insert: {
          id?: number;
          step_id: number;
          name: Record<string, string>;
          extra_price?: number;
          out_of_stock?: boolean;
        };
        Update: {
          id?: number;
          step_id?: number;
          name?: Record<string, string>;
          extra_price?: number;
          out_of_stock?: boolean;
        };
      };
      orders: {
        Row: {
          id: number;
          table_id: number;
          customer_name: string;
          lang: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          table_id: number;
          customer_name: string;
          lang: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          table_id?: number;
          customer_name?: string;
          lang?: string;
          created_at?: string;
        };
      };
      order_lines: {
        Row: {
          id: number;
          order_id: number;
          item_id: number;
          builder_json: Record<string, any> | null;
          price_each: number;
          qty: number;
        };
        Insert: {
          id?: number;
          order_id: number;
          item_id: number;
          builder_json?: Record<string, any> | null;
          price_each: number;
          qty: number;
        };
        Update: {
          id?: number;
          order_id?: number;
          item_id?: number;
          builder_json?: Record<string, any> | null;
          price_each?: number;
          qty?: number;
        };
      };
    };
  };
}
