// lib/services/inquiryService.ts
import { supabase, getCurrentDealerId } from '@/lib/supabase'
import type { ContactInquiry } from '@/types'

/**
 * Get all inquiries for current dealer
 */
export async function getAllInquiries(
  dealerId?: string
): Promise<ContactInquiry[]> {
  const id = dealerId || await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .eq('dealer_id', id)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

/**
 * Get inquiries by status
 */
export async function getInquiriesByStatus(
  status: 'new' | 'contacted' | 'closed',
  dealerId?: string
): Promise<ContactInquiry[]> {
  const id = dealerId || await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .eq('dealer_id', id)
    .eq('status', status)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

/**
 * Get single inquiry by ID
 */
export async function getInquiryById(
  inquiryId: string
): Promise<ContactInquiry | null> {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .eq('id', inquiryId)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

/**
 * Get inquiries for a specific car
 */
export async function getInquiriesForCar(
  carId: string,
  dealerId?: string
): Promise<ContactInquiry[]> {
  const id = dealerId || await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .eq('dealer_id', id)
    .eq('car_id', carId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

/**
 * Create a new inquiry (public form submission)
 */
export async function createInquiry(
  dealerId: string,
  inquiryData: {
    car_id?: string
    customer_name: string
    customer_email: string
    customer_phone?: string
    message: string
  }
): Promise<ContactInquiry> {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .insert({
      dealer_id: dealerId,
      ...inquiryData,
      status: 'new'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Update inquiry status
 */
export async function updateInquiryStatus(
  inquiryId: string,
  status: 'new' | 'contacted' | 'closed'
): Promise<ContactInquiry> {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .update({ status })
    .eq('id', inquiryId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Delete inquiry
 */
export async function deleteInquiry(inquiryId: string): Promise<void> {
  const { error } = await supabase
    .from('contact_inquiries')
    .delete()
    .eq('id', inquiryId)
  
  if (error) throw error
}

/**
 * Get inquiry count by status
 */
export async function getInquiryStats(dealerId?: string): Promise<{
  total: number
  new: number
  contacted: number
  closed: number
}> {
  const id = dealerId || await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('status')
    .eq('dealer_id', id)
  
  if (error) throw error
  
  const stats = {
    total: data?.length || 0,
    new: data?.filter(i => i.status === 'new').length || 0,
    contacted: data?.filter(i => i.status === 'contacted').length || 0,
    closed: data?.filter(i => i.status === 'closed').length || 0
  }
  
  return stats
}

/**
 * Mark all new inquiries as read/contacted
 */
export async function markAllAsContacted(dealerId?: string): Promise<void> {
  const id = dealerId || await getCurrentDealerId()
  
  const { error } = await supabase
    .from('contact_inquiries')
    .update({ status: 'contacted' })
    .eq('dealer_id', id)
    .eq('status', 'new')
  
  if (error) throw error
}