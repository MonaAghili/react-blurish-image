import { useCallback } from 'react';
import type { ImageLoader } from './types';

export const defaultLoader: ImageLoader = ({ src, width, quality = 75 }) => {
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (quality) params.set('q', quality.toString());
  const paramString = params.toString();
  return paramString ? `${src}?${paramString}` : src;
};

/**
 * Generates a base64-encoded data URL containing a blurred gradient background image.
 * This function creates a small canvas element with a gradient and converts it to a low-quality JPEG data URL.
 * It's commonly used for generating placeholder images or blur-up effects.
 *
 * @param {number} [width=8] - The width of the generated blur image in pixels
 * @param {number} [height=8] - The height of the generated blur image in pixels
 * @returns {string} A base64-encoded data URL of the generated blur image, or an empty string if generation fails
 * 
 * @example
 * ```typescript
 * const blurDataURL = generateBlurDataURL(10, 10);
 * // Returns: "data:image/jpeg;base64,..."
 * ```
 * 
 * @throws {Error} Will not throw directly but logs a warning if canvas operations fail
 * @remarks
 * - Only works in browser environments where `window` and `document` are available
 * - Returns empty string in non-browser environments or if canvas operations fail
 * - Uses a gray gradient pattern (f0f0f0 to d0d0d0)
 */
export const generateBlurDataURL = (width = 8, height = 8): string => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return '';
  }
  
  try {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return '';
    
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(0.5, '#e0e0e0');
    gradient.addColorStop(1, '#d0d0d0');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    return canvas.toDataURL('image/jpeg', 0.1);
  } catch (error) {
    // Fallback if canvas operations fail
    console.warn('Failed to generate blur data URL:', error);
    return '';
  }
};

export function useMergedRef<T>(...refs: Array<React.Ref<T> | undefined>) {
  return useCallback(
    (value: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref && typeof ref === 'object') {
          (ref as React.MutableRefObject<T>).current = value;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}