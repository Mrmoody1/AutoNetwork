// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get current dealer ID
export async function getCurrentDealerId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    throw new Error('Not authenticated')
  }

  // Get dealer record
  const { data: dealer, error: dealerError } = await supabase
    .from('dealers')
    .select('id')
    .eq('id', user.id)
    .single()

  if (dealerError || !dealer) {
    throw new Error('Dealer not found')
  }

  return dealer.id
}