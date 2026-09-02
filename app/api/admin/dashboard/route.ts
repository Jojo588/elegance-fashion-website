import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.dpewbmudjpvgbepjutcr_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_dpewbmudjpvgbepjutcr_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://dpewbmudjpvgbepjutcr.supabase.co',
  process.env.dpewbmudjpvgbepjutcr_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.dpewbmudjpvgbepjutcr_SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    'missing-key',
  { auth: { autoRefreshToken: false, persistSession: false } },
)

export async function GET() {
  try {
    const [productsResult, ordersResult, revenueResult] = await Promise.all([
      supabase.from('products').select('*'),
      supabase.from('orders').select('*'),
      supabase.from('revenue_records').select('*'),
    ])

    if (productsResult.error) console.error('[dashboard] products query failed', productsResult.error)
    if (ordersResult.error) console.error('[dashboard] orders query failed', ordersResult.error)

    const products = [...(productsResult.data ?? [])].sort((a, b) =>
      Number(b.createdat ?? b.created_at ?? 0) - Number(a.createdat ?? a.created_at ?? 0),
    )
    const orders = [...(ordersResult.data ?? [])].sort((a, b) => {
      const aTime = Number.isFinite(Number(a.created_at)) ? Number(a.created_at) : new Date(a.created_at ?? 0).getTime()
      const bTime = Number.isFinite(Number(b.created_at)) ? Number(b.created_at) : new Date(b.created_at ?? 0).getTime()
      return bTime - aTime
    })

    return NextResponse.json({
      products: products.map((product) => ({
        ...product,
        quantity_available: Number(product.quantity_available ?? 0),
      })),
      orders,
      revenueRecords: revenueResult.error ? [] : (revenueResult.data ?? []),
    }, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
  } catch (error) {
    console.error('[dashboard] data read failed', error)
    const detail = error instanceof Error ? error.message : 'Unknown database error'
    return NextResponse.json({ error: 'Unable to load dashboard data', detail }, { status: 500 })
  }
}
