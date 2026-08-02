import { createClient } from '@/lib/supabase/client';

const BUCKET_NAME = 'product-images';

export const uploadProductImage = async (file: File): Promise<string> => {
  try {
    console.log('[v0] Uploading product image:', file.name);
    const supabase = createClient();

    // Generate unique file name
    const timestamp = Date.now();
    const fileName = `${timestamp}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;
    const filePath = `products/${fileName}`;

    console.log('[v0] Uploading to path:', filePath);

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('[v0] Upload error:', uploadError);
      throw uploadError;
    }

    console.log('[v0] File uploaded successfully');

    // Get public URL
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;
    console.log('[v0] Public URL generated:', publicUrl.substring(0, 60) + '...');

    return publicUrl;
  } catch (error) {
    console.error('[v0] Error uploading image:', error);
    throw error;
  }
};

export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  try {
    const supabase = createClient();

    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const filePath = urlParts.slice(-2).join('/'); // Get 'products/filename'

    console.log('[v0] Deleting image:', filePath);

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('[v0] Delete error:', error);
      throw error;
    }

    console.log('[v0] Image deleted successfully');
  } catch (error) {
    console.error('[v0] Error deleting image:', error);
    // Don't throw - failing to delete old image shouldn't break the update
  }
};
