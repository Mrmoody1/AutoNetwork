// lib/services/dealerService.ts
import { supabase, getCurrentDealerId } from '@/lib/supabase'
import type { Dealer } from '@/types'

/**
 * Get current dealer's profile
 */
export async function getCurrentDealer(): Promise<Dealer | null> {
  const dealerId = await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('dealers')
    .select('*')
    .eq('id', dealerId)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

/**
 * Get dealer by ID (for public pages)
 */
export async function getDealerById(dealerId: string): Promise<Dealer | null> {
  const { data, error } = await supabase
    .from('dealers')
    .select('*')
    .eq('id', dealerId)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

/**
 * Get dealer by domain (for public showroom)
 */
export async function getDealerByDomain(domain: string): Promise<Dealer | null> {
  const { data, error } = await supabase
    .from('dealers')
    .select('*')
    .eq('domain', domain)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

/**
 * Update dealer profile
 */
export async function updateDealer(
  updates: Partial<Dealer>
): Promise<Dealer> {
  const dealerId = await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('dealers')
    .update(updates)
    .eq('id', dealerId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Update dealer subscription status
 */
export async function updateSubscriptionStatus(
  status: string
): Promise<Dealer> {
  const dealerId = await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('dealers')
    .update({ subscription_status: status })
    .eq('id', dealerId)
    .select()
    .single()
  
  if (error) throw error
  return data
}