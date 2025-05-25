
/**
 * A React component for optimized image loading with various features like lazy loading,
 * blur placeholder, and responsive image support.
 *
 * @component
 * @param {object} props - The component props
 * @param {string} props.src - The source URL of the image
 * @param {string} props.alt - Alternative text for the image
 * @param {number} [props.width] - The width of the image
 * @param {number} [props.height] - The height of the image
 * @param {boolean} [props.fill=false] - Whether the image should fill its container
 * @param {Function} [props.loader=defaultLoader] - Custom function to generate image URLs
 * @param {number} [props.quality=75] - Quality of the image (1-100)
 * @param {boolean} [props.priority=false] - Whether to prioritize image loading
 * @param {'lazy' | 'eager'} [props.loading='lazy'] - Image loading behavior
 * @param {'empty' | 'blur'} [props.placeholder='empty'] - Placeholder type while loading
 * @param {string} [props.blurDataURL] - Base64 image URL for blur placeholder
 * @param {boolean} [props.unoptimized=false] - Whether to skip image optimization
 * @param {Function} [props.onLoad] - Callback when image loads
 * @param {Function} [props.onError] - Callback when image fails to load
 * @param {Function} [props.onLoadingComplete] - Callback when image loading completes
 * @param {string} [props.className] - CSS class name
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {string} [props.sizes] - Sizes attribute for responsive images
 * @param {string} [props.crossOrigin] - Cross-origin attribute
 * @param {string} [props.referrerPolicy] - Referrer policy
 * @param {'async' | 'sync' | 'auto'} [props.decoding='async'] - Image decoding behavior
 * @param {'auto' | 'high' | 'low'} [props.fetchPriority] - Resource loading priority
 *
 * @example
 * ```tsx
 * <Image
 *   src="/example.jpg"
 *   alt="Example"
 *   width={500}
 *   height={300}
 *   placeholder="blur"
 *   priority={true}
 * />
 * ```
 */
import { forwardRef, useRef, useEffect, useState, useMemo } from 'react';
import type { ImageProps } from './types';
import { defaultLoader, generateBlurDataURL } from './utils';
import { ImageElement } from './ImageElement';

export const Image = forwardRef<HTMLImageElement | null, ImageProps>(
  (props, forwardedRef) => {
    const {
      src,
      alt,
      width,
      height,
      fill = false,
      loader = defaultLoader,
      quality = 75,
      priority = false,
      loading = 'lazy',
      placeholder = 'empty',
      blurDataURL,
      unoptimized = false,
      onLoad,
      onError,
      onLoadingComplete,
      className,
      style,
      sizes,
      crossOrigin,
      referrerPolicy,
      decoding = 'async',
      fetchPriority,
      ...rest
    } = props;

    const onLoadRef = useRef(onLoad);
    const onLoadingCompleteRef = useRef(onLoadingComplete);
    
    useEffect(() => {
      onLoadRef.current = onLoad;
    }, [onLoad]);

    useEffect(() => {
      onLoadingCompleteRef.current = onLoadingComplete;
    }, [onLoadingComplete]);

    const [blurComplete, setBlurComplete] = useState(false);
    const [showAltText, setShowAltText] = useState(false);

    // Generate img props
    const imgProps = useMemo(() => {
      let imgSrc = src;
      let imgSrcSet: string | undefined;
      
      if (!unoptimized && loader) {
        imgSrc = loader({ src, width: width || 640, quality });
        
        if (width) {
          // Generate srcSet for responsive images
          const sizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
          imgSrcSet = sizes
            .filter(size => size <= (width * 2))
            .map(size => `${loader({ src, width: size, quality })} ${size}w`)
            .join(', ');
        }
      }

      const finalBlurDataURL = placeholder === 'blur' ? 
        (blurDataURL || generateBlurDataURL()) : 
        undefined;

      const imgStyle: React.CSSProperties = {
        ...style,
      };

      // Handle fill mode
      if (fill) {
        imgStyle.position = 'absolute';
        imgStyle.height = '100%';
        imgStyle.width = '100%';
        imgStyle.left = 0;
        imgStyle.top = 0;
        imgStyle.right = 0;
        imgStyle.bottom = 0;
        imgStyle.objectFit = imgStyle.objectFit || 'cover';
      }

      // Handle blur placeholder
      if (placeholder === 'blur' && !blurComplete && finalBlurDataURL) {
        imgStyle.backgroundImage = `url("${finalBlurDataURL}")`;
        imgStyle.backgroundSize = 'cover';
        imgStyle.backgroundPosition = 'center';
        imgStyle.filter = blurComplete ? 'none' : 'blur(20px)';
        imgStyle.transition = 'filter 0.2s ease-in-out';
      }

      return {
        src: imgSrc,
        srcSet: imgSrcSet,
        sizes,
        width: fill ? undefined : width,
        height: fill ? undefined : height,
        style: imgStyle,
        className,
        crossOrigin,
        referrerPolicy,
        decoding,
        loading: priority ? 'eager' : loading,
        fetchPriority,
      };
    }, [
      src,
      width,
      height,
      fill,
      loader,
      quality,
      unoptimized,
      placeholder,
      blurDataURL,
      blurComplete,
      style,
      className,
      sizes,
      crossOrigin,
      referrerPolicy,
      decoding,
      priority,
      loading,
      fetchPriority,
    ]);

    return (
      <ImageElement
        {...imgProps}
        alt={alt}
        unoptimized={unoptimized}
        placeholder={placeholder}
        fill={fill}
        onLoadRef={onLoadRef}
        onLoadingCompleteRef={onLoadingCompleteRef}
        setBlurComplete={setBlurComplete}
        setShowAltText={setShowAltText}
        onLoad={onLoad}
        onError={onError}
        ref={forwardedRef}
        {...rest}
      />
    );
  }
);

Image.displayName = 'Image';