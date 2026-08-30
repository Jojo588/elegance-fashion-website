import { createClient } from '@/lib/supabase/client';

const BUCKET_NAME = 'product-images';

export const uploadProductImage = async (file: File): Promise<string> => {
  try {
    const supabase = createClient();

    // Generate unique file name
    const timestamp = Date.now();
    const fileName = `${timestamp}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;
    const filePath = `products/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;
    return publicUrl;
  } catch (error) {
    throw error;
  }
};

export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  try {
    const supabase = createClient();

    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const filePath = urlParts.slice(-2).join('/'); // Get 'products/filename'

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    console.log('[v0] Image deleted successfully');
  } catch (error) {
    console.error('[v0] Error deleting image:', error);
    // Don't throw - failing to delete old image shouldn't break the update
  }
};
