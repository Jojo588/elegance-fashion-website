import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dpewbmudjpvgbepjutcr.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'missing-key',
  { auth: { autoRefreshToken: false, persistSession: false } },
)

export async function GET() {
  try {
    const [productsResult, ordersResult, revenueResult] = await Promise.all([
      supabase.from('products').select('*').order('createdat', { ascending: false }),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('revenue_records').select('*').order('delivered_at', { ascending: false }),
    ])

    if (productsResult.error) throw productsResult.error
    if (ordersResult.error) throw ordersResult.error
    if (revenueResult.error) throw revenueResult.error

    return NextResponse.json({
      products: productsResult.data ?? [],
      orders: ordersResult.data ?? [],
      revenueRecords: revenueResult.data ?? [],
    })
  } catch (error) {
    console.error('[dashboard] data read failed', error)
    return NextResponse.json({ error: 'Unable to load dashboard data' }, { status: 500 })
  }
}
