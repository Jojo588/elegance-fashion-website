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
    const { error } = await supabase.from('orders').insert(payload)
    if (error) throw error
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error('[orders] create failed', error)
    return NextResponse.json({ error: 'Unable to create order' }, { status: 500 })
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
