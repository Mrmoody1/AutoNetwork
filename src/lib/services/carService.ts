// lib/services/carService.ts
import { supabase, getCurrentDealerId } from '@/lib/supabase'
import type { Car, CarFormData } from '@/types'

/**
 * Get all cars for the current dealer
 */
export async function getAllCars(dealerId?: string): Promise<Car[]> {
  const id = dealerId || await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('dealer_id', id)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

/**
 * Get a single car by ID
 */
export async function getCarById(carId: string): Promise<Car | null> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('id', carId)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

/**
 * Get cars by status
 */
export async function getCarsByStatus(
  status: 'available' | 'sold' | 'pending' | 'featured',
  dealerId?: string
): Promise<Car[]> {
  const id = dealerId || await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('dealer_id', id)
    .eq('status', status)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

/**
 * Create a new car
 */
export async function createCar(carData: CarFormData): Promise<Car> {
  const dealerId = await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('cars')
    .insert({
      ...carData,
      dealer_id: dealerId,
      images: [],
      status: carData.status || 'available'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Update a car
 */
export async function updateCar(
  carId: string,
  updates: Partial<CarFormData>
): Promise<Car> {
  const { data, error } = await supabase
    .from('cars')
    .update(updates)
    .eq('id', carId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Update car images
 */
export async function updateCarImages(
  carId: string,
  images: string[]
): Promise<Car> {
  const { data, error } = await supabase
    .from('cars')
    .update({ images })
    .eq('id', carId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Update car status
 */
export async function updateCarStatus(
  carId: string,
  status: 'available' | 'sold' | 'pending' | 'featured'
): Promise<Car> {
  const { data, error } = await supabase
    .from('cars')
    .update({ status })
    .eq('id', carId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Delete a car
 */
export async function deleteCar(carId: string): Promise<void> {
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', carId)
  
  if (error) throw error
}

/**
 * Bulk update cars
 */
export async function bulkUpdateCars(
  carIds: string[],
  updates: Partial<CarFormData>
): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .update(updates)
    .in('id', carIds)
    .select()
  
  if (error) throw error
  return data || []
}

/**
 * Search cars by make/model
 */
export async function searchCars(
  query: string,
  dealerId?: string
): Promise<Car[]> {
  const id = dealerId || await getCurrentDealerId()
  
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('dealer_id', id)
    .or(`make.ilike.%${query}%,model.ilike.%${query}%`)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

/**
 * Get featured cars (for public showroom)
 */
export async function getFeaturedCars(dealerId: string): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('dealer_id', dealerId)
    .eq('status', 'featured')
    .order('created_at', { ascending: false })
    .limit(12)
  
  if (error) throw error
  return data || []
}

/**
 * Get all available cars for public showroom
 */
export async function getPublicCars(dealerId: string): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('dealer_id', dealerId)
    .in('status', ['available', 'featured'])
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

/**
 * Filter cars with multiple criteria
 */
export async function filterCars(filters: {
  status?: Car['status']
  make?: string
  model?: string
  minPrice?: number
  maxPrice?: number
  dealerId?: string
}): Promise<Car[]> {
  const id = filters.dealerId || await getCurrentDealerId()
  
  let query = supabase
    .from('cars')
    .select('*')
    .eq('dealer_id', id)
  
  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  
  if (filters.make) {
    query = query.eq('make', filters.make)
  }
  
  if (filters.model) {
    query = query.eq('model', filters.model)
  }
  
  if (filters.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice)
  }
  
  if (filters.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice)
  }
  
  query = query.order('created_at', { ascending: false })
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}