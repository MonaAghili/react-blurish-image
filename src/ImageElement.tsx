
/**
 * A React component for rendering optimized images with advanced loading and error handling capabilities.
 * 
 * @component
 * @param {object} props - Component props
 * @param {string} props.src - The source URL of the image
 * @param {string} [props.srcSet] - The source set for responsive images
 * @param {string} [props.sizes] - Sizes attribute for responsive images
 * @param {number} [props.height] - Height of the image
 * @param {number} [props.width] - Width of the image
 * @param {'sync' | 'async' | 'auto'} [props.decoding] - Image decoding behavior
 * @param {string} [props.className] - CSS class name
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {'auto' | 'high' | 'low'} [props.fetchPriority] - Priority of image fetching
 * @param {'blur' | 'empty'} [props.placeholder] - Type of placeholder to show while loading
 * @param {'lazy' | 'eager'} [props.loading] - Image loading behavior
 * @param {boolean} [props.unoptimized] - Whether to skip image optimization
 * @param {boolean} [props.fill] - Whether image should fill its container
 * @param {Function} [props.onLoadRef] - Ref callback for load event
 * @param {Function} [props.onLoadingCompleteRef] - Ref callback when loading completes
 * @param {Function} props.setBlurComplete - Callback to set blur completion state
 * @param {Function} props.setShowAltText - Callback to control alt text visibility
 * @param {Function} [props.onLoad] - Load event handler
 * @param {Function} [props.onError] - Error event handler
 * @param {string} props.alt - Alternative text for the image
 * @param {string} [props.crossOrigin] - CORS settings for the image
 * @param {string} [props.referrerPolicy] - Referrer policy for the image
 * @param {React.Ref<HTMLImageElement>} ref - Forwarded ref
 * 
 * @returns {JSX.Element} An optimized image element with enhanced features
 * 
 * @example
 * ```tsx
 * <ImageElement
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   width={500}
 *   height={300}
 *   loading="lazy"
 *   placeholder="blur"
 *   onError={(e) => console.error(e)}
 * />
 * ```
 */
import { forwardRef, useCallback } from 'react';
import type { ImageElementProps, ImgElementWithDataProp } from './types';
import { useMergedRef } from './utils';
import { handleLoading, validateImage } from './image-loading';

export const ImageElement = forwardRef<HTMLImageElement | null, ImageElementProps>(
  (
    {
      src,
      srcSet,
      sizes,
      height,
      width,
      decoding,
      className,
      style,
      fetchPriority,
      placeholder,
      loading,
      unoptimized,
      fill,
      onLoadRef,
      onLoadingCompleteRef,
      setBlurComplete,
      setShowAltText,
      onLoad,
      onError,
      alt,
      crossOrigin,
      referrerPolicy,
      ...rest
    },
    forwardedRef
  ) => {
    const ownRef = useCallback(
      (img: ImgElementWithDataProp | null) => {
        if (!img) {
          return;
        }
        
        if (onError) {
          img.src = img.src;
        }
        
        validateImage(img, src);
        
        if (img.complete) {
          handleLoading(
            img,
            placeholder,
            onLoadRef,
            onLoadingCompleteRef,
            setBlurComplete,
            unoptimized
          );
        }
      },
      [
        src,
        placeholder,
        onLoadRef,
        onLoadingCompleteRef,
        setBlurComplete,
        onError,
        unoptimized,
      ]
    );

    const ref = useMergedRef(forwardedRef, ownRef);

    const getDynamicProps = (): Record<string, string | undefined> => {
      return { fetchPriority };
    };

    return (
      <img
        {...rest}
        {...getDynamicProps()}
        loading={loading}
        width={width}
        height={height}
        decoding={decoding}
        data-nimg={fill ? 'fill' : '1'}
        className={className}
        style={style}
        sizes={sizes}
        srcSet={srcSet}
        src={src}
        alt={alt}
        crossOrigin={crossOrigin}
        referrerPolicy={referrerPolicy}
        ref={ref}
        onLoad={(event) => {
          const img = event.currentTarget as ImgElementWithDataProp;
          handleLoading(
            img,
            placeholder,
            onLoadRef,
            onLoadingCompleteRef,
            setBlurComplete,
            unoptimized
          );
        }}
        onError={(event) => {
          setShowAltText(true);
          if (placeholder !== 'empty') {
            setBlurComplete(true);
          }
          if (onError) {
            onError(event);
          }
        }}
      />
    );
  }
);

ImageElement.displayName = 'ImageElement';