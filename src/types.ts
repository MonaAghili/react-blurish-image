
/**
 * Props for the image loader function
 * @interface ImageLoaderProps
 */

/**
 * Function type for loading and transforming images
 * @callback ImageLoader
 */

/**
 * Valid values for image placeholder
 * @typedef {('blur'|'empty'|`data:image/${string}`)} PlaceholderValue
 */

/**
 * Props for the Image component
 * @interface ImageProps
 * @property {string} src - Source URL of the image
 * @property {string} alt - Alternative text for the image
 * @property {number} [width] - Width of the image in pixels
 * @property {number} [height] - Height of the image in pixels
 * @property {boolean} [fill] - Whether the image should fill its container
 * @property {ImageLoader} [loader] - Custom loader function for the image
 * @property {number} [quality] - Quality of the optimized image (1-100)
 * @property {boolean} [priority] - Whether to prioritize loading
 * @property {('eager'|'lazy')} [loading] - Loading behavior
 * @property {PlaceholderValue} [placeholder] - Placeholder type while loading
 * @property {string} [blurDataURL] - Base64 data URL for blur placeholder
 * @property {boolean} [unoptimized] - Whether to skip optimization
 * @property {Function} [onLoad] - Called when image loads
 * @property {Function} [onError] - Called on load error
 * @property {Function} [onLoadingComplete] - Called when loading completes
 * @property {string} [className] - CSS class name
 * @property {React.CSSProperties} [style] - Inline styles
 * @property {string} [sizes] - Sizes attribute for responsive images
 * @property {('anonymous'|'use-credentials')} [crossOrigin] - CORS settings
 * @property {React.HTMLAttributeReferrerPolicy} [referrerPolicy] - Referrer policy
 * @property {('async'|'auto'|'sync')} [decoding] - Image decoding behavior
 * @property {('high'|'low'|'auto')} [fetchPriority] - Resource loading priority
 */

/**
 * Configuration options for the Image component
 * @interface ImageConfig
 * @property {boolean} [enableWarnings] - Whether to enable warning messages
 */

/**
 * Extended HTMLImageElement with data-loaded-src attribute
 * @interface ImgElementWithDataProp
 * @extends {HTMLImageElement}
 */

/**
 * Props for the internal image element
 * @interface ImageElementProps
 * @property {string} src - Source URL of the image
 * @property {string} [srcSet] - Set of source URLs for responsive images
 * @property {string} [sizes] - Sizes attribute for responsive images
 * @property {number} [height] - Height of the image in pixels
 * @property {number} [width] - Width of the image in pixels
 * @property {('async'|'auto'|'sync')} [decoding] - Image decoding behavior
 * @property {string} [className] - CSS class name
 * @property {React.CSSProperties} [style] - Inline styles
 * @property {('high'|'low'|'auto')} [fetchPriority] - Resource loading priority
 * @property {PlaceholderValue} placeholder - Placeholder type while loading
 * @property {('eager'|'lazy')} [loading] - Loading behavior
 * @property {boolean} unoptimized - Whether to skip optimization
 * @property {boolean} [fill] - Whether the image should fill its container
 * @property {React.MutableRefObject<Function|undefined>} onLoadRef - Ref for load handler
 * @property {React.MutableRefObject<Function|undefined>} onLoadingCompleteRef - Ref for loading complete handler
 * @property {Function} setBlurComplete - Function to set blur completion state
 * @property {Function} setShowAltText - Function to toggle alt text visibility
 * @property {Function} [onLoad] - Called when image loads
 * @property {Function} [onError] - Called on load error
 * @property {string} alt - Alternative text for the image
 * @property {('anonymous'|'use-credentials')} [crossOrigin] - CORS settings
 * @property {React.HTMLAttributeReferrerPolicy} [referrerPolicy] - Referrer policy
 */

export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export type ImageLoader = (p: ImageLoaderProps) => string;
export type PlaceholderValue = 'blur' | 'empty' | `data:image/${string}`;

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  loader?: ImageLoader;
  quality?: number;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  unoptimized?: boolean;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onLoadingComplete?: (image: HTMLImageElement) => void;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  decoding?: 'async' | 'auto' | 'sync';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export interface ImageConfig {
  enableWarnings?: boolean;
}

export type ImgElementWithDataProp = HTMLImageElement & {
  'data-loaded-src': string | undefined;
};

export interface ImageElementProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  height?: number;
  width?: number;
  decoding?: 'async' | 'auto' | 'sync';
  className?: string;
  style?: React.CSSProperties;
  fetchPriority?: 'high' | 'low' | 'auto';
  placeholder: PlaceholderValue;
  loading?: 'eager' | 'lazy';
  unoptimized: boolean;
  fill?: boolean;
  onLoadRef: React.MutableRefObject<((event: React.SyntheticEvent<HTMLImageElement>) => void) | undefined>;
  onLoadingCompleteRef: React.MutableRefObject<((image: HTMLImageElement) => void) | undefined>;
  setBlurComplete: (b: boolean) => void;
  setShowAltText: (b: boolean) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  alt: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}