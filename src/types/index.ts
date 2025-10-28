// src/types/index.ts

// ===== DEALER TYPES =====
export interface Dealer {
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
  
  // Branding
  logo_url?: string
  primary_color?: string
  secondary_color?: string
  
  // Domain & SEO
  domain?: string
  custom_domain?: string
  meta_title?: string
  meta_description?: string
  
  // Business Info
  about?: string
  hours?: string
  
  // Subscription
  subscription_status: 'trial' | 'active' | 'cancelled' | 'past_due'
  subscription_plan?: 'starter' | 'professional' | 'enterprise'
  trial_ends_at?: string
  
  // Timestamps
  created_at: string
  updated_at: string
}

// ===== CAR TYPES =====
export interface Car {
  id: string
  dealer_id: string
  
  // Basic Info
  make: string
  model: string
  year: number
  price: number
  mileage: number
  
  // Details
  vin?: string
  color?: string
  transmission?: 'automatic' | 'manual'
  fuel_type?: 'petrol' | 'diesel' | 'electric' | 'hybrid'
  body_type?: 'sedan' | 'suv' | 'truck' | 'coupe' | 'van' | 'convertible'
  doors?: number
  seats?: number
  
  // Description
  description?: string
  features?: string[]
  
  // Media
  images: string[]
  featured_image?: string
  
  // Status
  status: 'available' | 'sold' | 'pending' | 'featured'
  
  // Timestamps
  created_at: string
  updated_at: string
}

export interface CarFormData {
  make: string
  model: string
  year: number
  price: number
  mileage: number
  vin?: string
  color?: string
  transmission?: 'automatic' | 'manual'
  fuel_type?: 'petrol' | 'diesel' | 'electric' | 'hybrid'
  body_type?: 'sedan' | 'suv' | 'truck' | 'coupe' | 'van' | 'convertible'
  doors?: number
  seats?: number
  description?: string
  features?: string[]
  status?: 'available' | 'sold' | 'pending' | 'featured'
}

// ===== INQUIRY TYPES =====
export interface ContactInquiry {
  id: string
  dealer_id: string
  car_id?: string
  
  // Customer Info
  customer_name: string
  customer_email: string
  customer_phone?: string
  
  // Inquiry
  message: string
  status: 'new' | 'contacted' | 'closed'
  
  // Timestamps
  created_at: string
  updated_at: string
}

export interface InquiryFormData {
  car_id?: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  message: string
}

// ===== APPOINTMENT TYPES =====
export interface Appointment {
  id: string
  dealer_id: string
  car_id?: string
  
  // Customer Info
  customer_name: string
  customer_email: string
  customer_phone?: string
  
  // Appointment Details
  appointment_date: string
  appointment_time: string
  appointment_type: 'test_drive' | 'viewing' | 'consultation'
  notes?: string
  
  // Status
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  
  // Timestamps
  created_at: string
  updated_at: string
}

// ===== ANALYTICS TYPES =====
export interface DashboardStats {
  total_cars: number
  active_cars: number
  sold_cars: number
  pending_inquiries: number
  total_inquiries: number
  upcoming_appointments: number
}

export interface AnalyticsData {
  views: number
  inquiries: number
  appointments: number
  conversions: number
  period: 'day' | 'week' | 'month' | 'year'
}

// ===== AUTH TYPES =====
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  business_name: string
  contact_name: string
  phone: string
}

export interface User {
  id: string
  email: string
  role: 'dealer' | 'admin'
}

// ===== SETUP WIZARD TYPES =====
export interface SetupStep {
  id: number
  title: string
  description: string
  completed: boolean
}

export interface BusinessInfoFormData {
  business_name: string
  contact_name: string
  phone: string
  address: string
  city: string
  state: string
  zip_code: string
  country: string
}

export interface BrandingFormData {
  logo_url?: string
  primary_color: string
  secondary_color: string
  template: 'modern' | 'classic' | 'minimal'
}

export interface DomainFormData {
  domain: string
  custom_domain?: string
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}