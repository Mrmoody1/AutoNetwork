// src/app/api/test-supabase/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test the connection by querying the dealers table
    const { data, error } = await supabase
      .from('dealers')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          details: 'Failed to connect to Supabase' 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful! ✅',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Connection test failed' 
      },
      { status: 500 }
    )
  }
}