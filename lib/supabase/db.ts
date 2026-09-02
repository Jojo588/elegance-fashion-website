import { createClient } from '@/lib/supabase/client';
import { deleteProductImage } from '@/lib/supabase/storage';

const mapProduct = (row: Record<string, unknown>): Product => ({
  id: String(row.id),
  name: String(row.name ?? ''),
  price: Number(row.price ?? 0),
  quantityAvailable: Number(row.quantity_available ?? row.quantityAvailable ?? 0),
  description: String(row.description ?? ''),
  category: String(row.category ?? ''),
  image: String(row.image ?? (Array.isArray(row.images) ? row.images[0] : '') ?? ''),
  images: Array.isArray(row.images) ? (row.images as string[]) : String(row.image ?? '') ? [String(row.image)] : [],
  sizes: (row.sizes as string[] | null) ?? [],
  colors: (row.colors as string[] | null) ?? [],
  isFeatured: row.isfeatured === true || row.isfeatured === 'true' || row.isFeatured === true || row.isFeatured === 'true',
  isNew: row.isnew === true || row.isnew === 'true' || row.isNew === true || row.isNew === 'true',
  isBestSeller: row.isbestseller === true || row.isbestseller === 'true' || row.isBestSeller === true || row.isBestSeller === 'true',
  isSold: Number(row.quantity_available ?? row.quantityAvailable ?? 0) === 0,
  createdAt: Number(row.createdat ?? row.createdAt ?? 0),
  updatedAt: Number(row.updatedat ?? row.updatedAt ?? 0),
});

export interface Product {
  id: string;
  name: string;
  price: number;
  quantityAvailable: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isSold: boolean;
  createdAt: number;
  updatedAt: number;
}

// Client-side operations
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('createdat', { ascending: false });

    if (error) throw error;
    return (data ?? []).map((row) => mapProduct(row as Record<string, unknown>));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) throw error;
    return data ? mapProduct(data as Record<string, unknown>) : null;
  } catch (error) {
    console.error('[v0] Error fetching product:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('createdat', { ascending: false });

    if (error) throw error;
    return (data ?? []).map((row) => mapProduct(row as Record<string, unknown>));
  } catch (error) {
    console.error('[v0] Error fetching products by category:', error);
    throw error;
  }
};

export const getFeaturedProducts = async (limit = 6): Promise<Product[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('isfeatured', true)
      .order('createdat', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []).map((row) => mapProduct(row as Record<string, unknown>));
  } catch (error) {
    console.error('[v0] Error fetching featured products:', error);
    throw error;
  }
};

export const getNewArrivals = async (limit = 6): Promise<Product[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('isnew', true)
      .order('createdat', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []).map((row) => mapProduct(row as Record<string, unknown>));
  } catch (error) {
    console.error('[v0] Error fetching new arrivals:', error);
    throw error;
  }
};

export const getBestSellers = async (limit = 6): Promise<Product[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('isbestseller', true)
      .order('createdat', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []).map((row) => mapProduct(row as Record<string, unknown>));
  } catch (error) {
    console.error('[v0] Error fetching best sellers:', error);
    throw error;
  }
};

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isSold'>): Promise<string> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: product.name,
          price: product.price,
          quantity_available: product.quantityAvailable,
          description: product.description,
          category: product.category,
          image: product.image,
          images: product.images,
          sizes: product.sizes,
          colors: product.colors,
          isfeatured: product.isFeatured,
          isnew: product.isNew,
          isbestseller: product.isBestSeller,
          createdat: Date.now(),
          updatedat: Date.now(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('[v0] Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  updates: Partial<Omit<Product, 'id' | 'createdAt'>>
): Promise<void> => {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from('products')
      .update({
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.price !== undefined && { price: updates.price }),
        ...(updates.quantityAvailable !== undefined && { quantity_available: updates.quantityAvailable }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.category !== undefined && { category: updates.category }),
        ...(updates.image !== undefined && { image: updates.image }),
        ...(updates.images !== undefined && { images: updates.images }),
        ...(updates.sizes !== undefined && { sizes: updates.sizes }),
        ...(updates.colors !== undefined && { colors: updates.colors }),
        ...(updates.isFeatured !== undefined && { isfeatured: updates.isFeatured }),
        ...(updates.isNew !== undefined && { isnew: updates.isNew }),
        ...(updates.isBestSeller !== undefined && { isbestseller: updates.isBestSeller }),
        updatedat: Date.now(),
      })
      .eq('id', productId);

    if (error) throw error;
  } catch (error) {
    console.error('[v0] Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const supabase = createClient();
  const { data: product, error: lookupError } = await supabase
    .from('products')
    .select('id, image, images')
    .eq('id', productId)
    .maybeSingle();
  if (lookupError) throw lookupError;
  if (!product) throw new Error('Product was not found or is no longer available.');

  // Orders currently store one product per row. Remove only rows for this
  // product so unrelated orders and their product references remain intact.
  const { error: ordersError } = await supabase
    .from('orders')
    .delete()
    .eq('product_id', productId);
  if (ordersError) throw ordersError;

  const { data: deletedProduct, error: productError } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .select('id, image, images')
    .maybeSingle();
  if (productError) throw productError;
  if (!deletedProduct) throw new Error('Product could not be deleted. Check admin permissions.');

  const imageUrls = Array.from(new Set([
    deletedProduct.image,
    ...(Array.isArray(deletedProduct.images) ? deletedProduct.images : []),
  ].filter((value): value is string => Boolean(value))));
  await Promise.all(imageUrls.map((imageUrl) => deleteProductImage(imageUrl)));
};

export interface Order {
  id?: string;
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  totalPrice: number;
  customerName?: string;
  customerLocation?: string;
  phoneNumber?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  whatsappSent: boolean;
  createdAt: number;
  deliveredAt?: string;
  deleteAfter?: string;
}

export const addOrder = async (order: Omit<Order, 'id'>): Promise<void> => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_id: order.productId,
      product_name: order.productName,
      product_image: order.productImage,
      size: order.size,
      color: order.color,
      quantity: order.quantity,
      price: order.price,
      total_price: order.totalPrice,
      customer_name: order.customerName,
      customer_location: order.customerLocation,
      phone_number: order.phoneNumber,
      status: order.status,
      whatsapp_sent: order.whatsappSent,
      created_at: Date.now(),
    }),
  });
  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(result?.detail || result?.error || 'Unable to save order');
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await fetch('/api/orders', { cache: 'no-store' });
  if (!response.ok) throw new Error('Unable to load orders');
  const { data } = await response.json();
  return (data ?? []).map((row) => ({
    id: row.id,
    productId: row.product_id,
    productName: row.product_name,
    productImage: row.product_image,
    size: row.size,
    color: row.color,
    quantity: row.quantity,
    price: Number(row.price),
    totalPrice: Number(row.total_price),
    customerName: row.customer_name,
    customerLocation: row.customer_location,
    phoneNumber: row.phone_number,
    status: row.status,
    whatsappSent: row.whatsapp_sent,
      createdAt: Number.isFinite(Number(row.created_at)) ? Number(row.created_at) : new Date(row.created_at ?? 0).getTime(),
    deliveredAt: row.delivered_at ?? undefined,
    deleteAfter: row.delete_after ?? undefined,
  })) as Order[];
};

export interface RevenueRecord {
  id: string;
  orderId: string;
  productName: string;
  totalPrice: number;
  orderCreatedAt: number;
  deliveredAt: string;
}

export const getRevenueRecords = async (): Promise<RevenueRecord[]> => {
  const { data, error } = await createClient()
    .from('revenue_records')
    .select('*')
    .order('delivered_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    orderId: row.order_id,
    productName: row.product_name,
    totalPrice: Number(row.total_price),
    orderCreatedAt: Number(row.order_created_at),
    deliveredAt: row.delivered_at,
  }));
};

export const resetRevenue = async (scope: 'month' | 'all'): Promise<void> => {
  const supabase = createClient();
  let query = supabase.from('revenue_records').delete();

  if (scope === 'month') {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    query = query.gte('delivered_at', startOfMonth);
  } else {
    query = query.gte('delivered_at', '1970-01-01T00:00:00.000Z');
  }

  const { error } = await query;
  if (error) throw error;
};

export const deleteOrder = async (orderId: string): Promise<void> => {
  const response = await fetch(`/api/orders?id=${encodeURIComponent(orderId)}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Unable to delete order');
};

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  const supabase = createClient();
  const { data: order, error: orderLookupError } = await supabase
    .from('orders')
    .select('id, product_id, product_name, total_price, quantity, created_at, status')
    .eq('id', orderId)
    .single();
  if (orderLookupError) throw orderLookupError;

  const inventoryStatuses = new Set<Order['status']>(['confirmed', 'shipped', 'delivered']);
  const wasInventoryDeducted = inventoryStatuses.has(order.status);
  const shouldDeductInventory = inventoryStatuses.has(status) && !wasInventoryDeducted;
  const shouldRestoreInventory = !inventoryStatuses.has(status) && wasInventoryDeducted;

  if (shouldDeductInventory) {
    const { data: product, error: productLookupError } = await supabase
      .from('products')
      .select('quantity_available')
      .eq('id', order.product_id)
      .single();
    if (productLookupError) throw productLookupError;
    const available = Number(product.quantity_available ?? 0);
    if (!Number.isInteger(available) || available < Number(order.quantity)) {
      throw new Error(`Only ${Math.max(0, available)} item${available === 1 ? '' : 's'} available`);
    }
    const { data: updatedProduct, error: productError } = await supabase
      .from('products')
      .update({ quantity_available: available - Number(order.quantity) })
      .eq('id', order.product_id)
      .eq('quantity_available', available)
      .select('id');
    if (productError) throw productError;
    if (!updatedProduct?.length) throw new Error('Stock changed while updating the order. Please try again.');
  } else if (shouldRestoreInventory) {
    const { data: product, error: productLookupError } = await supabase
      .from('products')
      .select('quantity_available')
      .eq('id', order.product_id)
      .single();
    if (productLookupError) throw productLookupError;
    const { error: productError } = await supabase
      .from('products')
      .update({ quantity_available: Number(product.quantity_available ?? 0) + Number(order.quantity) })
      .eq('id', order.product_id);
    if (productError) throw productError;
  }

  if (status === 'delivered') {
    // Preserve collected revenue. Start the deletion timer only when this delivery exhausts stock.
    const deliveredAt = new Date();
    const { data: deliveredProduct, error: deliveredProductError } = await supabase
      .from('products')
      .select('quantity_available')
      .eq('id', order.product_id)
      .single();
    if (deliveredProductError) throw deliveredProductError;
    const deleteAfter = Number(deliveredProduct.quantity_available ?? 0) === 0
      ? new Date(deliveredAt.getTime() + 24 * 60 * 60 * 1000)
      : null;
    const { error: revenueError } = await supabase.from('revenue_records').upsert({
      order_id: order.id,
      product_name: order.product_name,
      total_price: order.total_price,
      order_created_at: order.created_at,
      delivered_at: deliveredAt.toISOString(),
    }, { onConflict: 'order_id' });
    if (revenueError) throw revenueError;

    const { error: deliveredError } = await supabase
      .from('orders')
      .update({
        status,
        delivered_at: deliveredAt.toISOString(),
        delete_after: deleteAfter?.toISOString() ?? null,
      })
      .eq('id', orderId);
    if (deliveredError) throw deliveredError;

    const { error: productError } = await supabase
      .from('products')
      .update({ is_sold: true })
      .eq('id', order.product_id);
    if (productError) throw productError;
    return;
  }

  const { error } = await supabase.from('orders').update({
    status,
    delivered_at: null,
    delete_after: null,
  }).eq('id', orderId);
  if (error) throw error;

  if (status !== 'cancelled') {
    const { error: productError } = await supabase
      .from('products')
      .update({ is_sold: false })
      .eq('id', order.product_id);
    if (productError) throw productError;
  }
};
