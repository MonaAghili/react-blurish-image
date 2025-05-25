
/**
 * Module for handling image configuration settings
 * @module config
 */

/**
 * Configuration object for image settings
 */

/**
 * Updates the global image configuration by merging the provided config with existing settings
 * @param {ImageConfig} config - The configuration object to merge with existing settings
 */

/**
 * Retrieves the current global image configuration
 * @returns {ImageConfig} The current image configuration object
 */
import type { ImageConfig } from './types';

let imageConfig: ImageConfig = {
  enableWarnings: false
};

export const configureImage = (config: ImageConfig): void => {
  imageConfig = { ...imageConfig, ...config };
};

export const getImageConfig = (): ImageConfig => imageConfig;