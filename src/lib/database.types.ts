export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cvs: {
        Row: {
          id: string
          user_id: string
          template_id: string
          title: string
          content: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template_id: string
          title: string
          content: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          title?: string
          content?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}