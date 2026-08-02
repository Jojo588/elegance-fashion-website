import { createClient } from '@/lib/supabase/client';
import { createClient as createServerClient } from '@/lib/supabase/server';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: string[];
  colors: string[];
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
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
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data as Product[];
  } catch (error) {
    console.error('[v0] Error fetching products:', error);
    throw error;
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
    return data as Product;
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
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data as Product[];
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
      .eq('isFeatured', true)
      .order('createdAt', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Product[];
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
      .eq('isNew', true)
      .order('createdAt', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Product[];
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
      .eq('isBestSeller', true)
      .order('createdAt', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Product[];
  } catch (error) {
    console.error('[v0] Error fetching best sellers:', error);
    throw error;
  }
};

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          ...product,
          createdAt: Date.now(),
          updatedAt: Date.now(),
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
        ...updates,
        updatedAt: Date.now(),
      })
      .eq('id', productId);

    if (error) throw error;
  } catch (error) {
    console.error('[v0] Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw error;
  } catch (error) {
    console.error('[v0] Error deleting product:', error);
    throw error;
  }
};
