
/**
 * Handles the loading process of an image element, including blur effects and event handling
 * @param img - The image element with additional data properties
 * @param placeholder - The placeholder value determining loading behavior
 * @param onLoadRef - React ref containing the onLoad event handler
 * @param onLoadingCompleteRef - React ref containing the callback for when loading completes
 * @param setBlurComplete - Function to update the blur completion state
 * @param unoptimized - Boolean flag indicating if the image is unoptimized
 * @returns void
 */

/**
 * Validates an image element for required properties and displays warnings if enabled
 * @param img - The HTML image element to validate
 * @param src - The source URL of the image
 * @throws Console errors if required properties are missing (when warnings are enabled)
 */
import type { ImgElementWithDataProp, PlaceholderValue } from './types';
import { getImageConfig } from './config';

export function handleLoading(
  img: ImgElementWithDataProp,
  placeholder: PlaceholderValue,
  onLoadRef: React.MutableRefObject<((event: React.SyntheticEvent<HTMLImageElement>) => void) | undefined>,
  onLoadingCompleteRef: React.MutableRefObject<((image: HTMLImageElement) => void) | undefined>,
  setBlurComplete: (b: boolean) => void,
  unoptimized: boolean
) {
  const src = img?.src;
  if (!img || img['data-loaded-src'] === src) {
    return;
  }
  img['data-loaded-src'] = src;
  
  const p = 'decode' in img ? img.decode() : Promise.resolve();
  p.catch(() => {}).then(() => {
    if (!img.parentElement || !img.isConnected) {
      return;
    }
    
    if (placeholder !== 'empty') {
      setBlurComplete(true);
    }
    
    if (onLoadRef?.current) {
      const event = new Event('load');
      Object.defineProperty(event, 'target', { writable: false, value: img });
      let prevented = false;
      let stopped = false;
      onLoadRef.current({
        ...event,
        nativeEvent: event,
        currentTarget: img,
        target: img,
        isDefaultPrevented: () => prevented,
        isPropagationStopped: () => stopped,
        persist: () => {},
        preventDefault: () => {
          prevented = true;
          event.preventDefault();
        },
        stopPropagation: () => {
          stopped = true;
          event.stopPropagation();
        },
      } as React.SyntheticEvent<HTMLImageElement>);
    }
    
    if (onLoadingCompleteRef?.current) {
      onLoadingCompleteRef.current(img);
    }
  });
}

export function validateImage(img: HTMLImageElement, src: string): void {
  const config = getImageConfig();
  
  if (config.enableWarnings) {
    if (!src) {
      console.error(`Image is missing required "src" property:`, img);
    }
    if (img.getAttribute('alt') === null) {
      console.error(
        `Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.`
      );
    }
  }
}