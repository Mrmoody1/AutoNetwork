// src/types/database.ts
// Auto-generated Supabase types

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
      dealers: {
        Row: {
          id: string
          email: string
          business_name: string
          contact_name: string
          phone: string
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          domain: string | null
          custom_domain: string | null
          meta_title: string | null
          meta_description: string | null
          about: string | null
          hours: string | null
          subscription_status: string
          subscription_plan: string | null
          trial_ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          business_name: string
          contact_name: string
          phone: string
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          domain?: string | null
          custom_domain?: string | null
          meta_title?: string | null
          meta_description?: string | null
          about?: string | null
          hours?: string | null
          subscription_status?: string
          subscription_plan?: string | null
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          business_name?: string
          contact_name?: string
          phone?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          country?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          domain?: string | null
          custom_domain?: string | null
          meta_title?: string | null
          meta_description?: string | null
          about?: string | null
          hours?: string | null
          subscription_status?: string
          subscription_plan?: string | null
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cars: {
        Row: {
          id: string
          dealer_id: string
          make: string
          model: string
          year: number
          price: number
          mileage: number
          vin: string | null
          color: string | null
          transmission: string | null
          fuel_type: string | null
          body_type: string | null
          doors: number | null
          seats: number | null
          description: string | null
          features: string[] | null
          images: string[]
          featured_image: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          dealer_id: string
          make: string
          model: string
          year: number
          price: number
          mileage: number
          vin?: string | null
          color?: string | null
          transmission?: string | null
          fuel_type?: string | null
          body_type?: string | null
          doors?: number | null
          seats?: number | null
          description?: string | null
          features?: string[] | null
          images?: string[]
          featured_image?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          dealer_id?: string
          make?: string
          model?: string
          year?: number
          price?: number
          mileage?: number
          vin?: string | null
          color?: string | null
          transmission?: string | null
          fuel_type?: string | null
          body_type?: string | null
          doors?: number | null
          seats?: number | null
          description?: string | null
          features?: string[] | null
          images?: string[]
          featured_image?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      contact_inquiries: {
        Row: {
          id: string
          dealer_id: string
          car_id: string | null
          customer_name: string
          customer_email: string
          customer_phone: string | null
          message: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          dealer_id: string
          car_id?: string | null
          customer_name: string
          customer_email: string
          customer_phone?: string | null
          message: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          dealer_id?: string
          car_id?: string | null
          customer_name?: string
          customer_email?: string
          customer_phone?: string | null
          message?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          dealer_id: string
          car_id: string | null
          customer_name: string
          customer_email: string
          customer_phone: string | null
          appointment_date: string
          appointment_time: string
          appointment_type: string
          notes: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          dealer_id: string
          car_id?: string | null
          customer_name: string
          customer_email: string
          customer_phone?: string | null
          appointment_date: string
          appointment_time: string
          appointment_type: string
          notes?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          dealer_id?: string
          car_id?: string | null
          customer_name?: string
          customer_email?: string
          customer_phone?: string | null
          appointment_date?: string
          appointment_time?: string
          appointment_type?: string
          notes?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
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
  }
}