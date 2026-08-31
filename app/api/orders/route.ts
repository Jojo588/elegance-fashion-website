import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.dpewbmudjpvgbepjutcr_SUPABASE_URL || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_dpewbmudjpvgbepjutcr_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dpewbmudjpvgbepjutcr.supabase.co',
  process.env.dpewbmudjpvgbepjutcr_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.dpewbmudjpvgbepjutcr_SUPABASE_SECRET_KEY || process.env.SUPABASE_SECRET_KEY || 'missing-key',
  { auth: { autoRefreshToken: false, persistSession: false } },
)

export async function GET() {
  try {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json({ data: data ?? [] })
  } catch (error) {
    console.error('[orders] read failed', error)
    return NextResponse.json({ error: 'Unable to load orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const order = {
      product_id: String(payload.product_id ?? ''),
      product_name: String(payload.product_name ?? ''),
      product_image: String(payload.product_image ?? ''),
      size: String(payload.size ?? 'Not applicable'),
      color: String(payload.color ?? 'Not applicable'),
      quantity: Math.max(1, Number(payload.quantity ?? 1)),
      price: Number(payload.price ?? 0),
      total_price: Number(payload.total_price ?? 0),
      customer_name: payload.customer_name ? String(payload.customer_name) : null,
      customer_location: payload.customer_location ? String(payload.customer_location) : null,
      phone_number: payload.phone_number ? String(payload.phone_number) : null,
      status: 'pending',
      whatsapp_sent: true,
      // The existing order model stores timestamps as milliseconds.
      created_at: Date.now(),
    }

    if (!order.product_id || !order.product_name || !Number.isFinite(order.price) || !Number.isFinite(order.total_price)) {
      return NextResponse.json({ error: 'Missing required order details' }, { status: 400 })
    }

    const { error } = await supabase.from('orders').insert(order)
    if (error) throw error
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error('[orders] create failed', error)
    const detail = error instanceof Error ? error.message : 'Unknown database error'
    return NextResponse.json({ error: 'Unable to create order', detail }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get('id')
    if (id) {
      const { data: order, error: lookupError } = await supabase.from('orders').select('product_id').eq('id', id).single()
      if (lookupError) throw lookupError
      const { error } = await supabase.from('orders').delete().eq('id', id)
      if (error) throw error
      if (order?.product_id) {
        const { error: productError } = await supabase.from('products').delete().eq('id', order.product_id)
        if (productError) throw productError
      }
    } else {
      const { error } = await supabase.from('orders').delete().not('id', 'is', null)
      if (error) throw error
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[orders] clear failed', error)
    return NextResponse.json({ error: 'Unable to clear orders' }, { status: 500 })
  }
}
