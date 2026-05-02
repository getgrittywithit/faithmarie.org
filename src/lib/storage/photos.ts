import { createClient } from '@/lib/supabase/client';

const BUCKET_NAME = 'memorial-photos';
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export interface UploadResult {
  success: boolean;
  path?: string;
  url?: string;
  error?: string;
}

export async function uploadPhoto(
  file: File,
  memorialId: string,
  onProgress?: (progress: number) => void
): Promise<UploadResult> {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { success: false, error: 'Invalid file type. Please upload JPEG, PNG, GIF, or WebP.' };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: 'File too large. Maximum size is 15MB.' };
  }

  const supabase = createClient();

  // Generate unique filename
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const path = `${memorialId}/${filename}`;

  try {
    // Upload file
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { success: false, error: 'Failed to upload file' };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    onProgress?.(100);

    return {
      success: true,
      path,
      url: urlData.publicUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function deletePhoto(path: string): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) {
    console.error('Delete error:', error);
    return false;
  }

  return true;
}

export function getPhotoUrl(path: string): string {
  const supabase = createClient();
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
}

export async function compressImage(file: File, maxWidth = 1600): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let { width, height } = img;

      // Only resize if larger than maxWidth
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          0.85
        );
      } else {
        resolve(file);
      }
    };

    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

// Strip EXIF data by re-encoding through canvas
export async function stripExif(file: File): Promise<File> {
  return compressImage(file, 3000); // Re-encode at high quality, removes EXIF
}
