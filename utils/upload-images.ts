import { createClient } from '@/lib/supabase/client';
import imageCompression from 'browser-image-compression';
import pLimit from 'p-limit';

const supabase = createClient();
const limit = pLimit(5); // Process 5 uploads concurrently

export async function uploadRecipeImages(files: File[], bucketId = 'recipes') {
  const uploadTasks = files.map((file) => 
    limit(async () => {
      // 1. Compress on the client
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1, // Max 1MB per image
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      // 2. Generate unique path
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${crypto.randomUUID()}.${ext}`;

      // 3. Upload directly to Supabase Bucket
      const { data, error } = await supabase.storage
        .from(bucketId)
        .upload(path, compressedFile, {
          cacheControl: '31536000', // 1 year cache
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        throw error;
      }
      
      // Return the public URL for immediate form DB use
      return supabase.storage.from(bucketId).getPublicUrl(data.path).data.publicUrl;
    })
  );

  return Promise.all(uploadTasks);
}
