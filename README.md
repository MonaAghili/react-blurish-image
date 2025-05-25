# React Blurish Image

[![npm version](https://badge.fury.io/js/react-blurish-image.svg)](https://badge.fury.io/js/react-blurish-image)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A lightweight, high-performance React image component inspired by Next.js Image, with automatic optimization, blur placeholders, and lazy loading. **Zero dependencies** except React.

## ✨ Features

- 🖼️ **Automatic Image Optimization** - Generates responsive images with srcSet
- 🔄 **Blur Placeholders** - Smooth loading transitions with automatic blur generation
- ⚡ **Lazy Loading** - Built-in lazy loading for better performance
- 📱 **Responsive** - Perfect for any screen size with automatic srcSet generation
- 🎯 **Fill Mode** - Container-based sizing like CSS `object-fit`
- 🛡️ **TypeScript** - Full type safety included out of the box
- 🔧 **Configurable** - Optional development warnings and custom loaders
- 📦 **Tiny Bundle** - Only 6.4kb (2.8kb gzipped), no external dependencies
- 🚀 **Performance** - Optimized for Core Web Vitals and page speed
- 🔒 **Privacy Safe** - No environment detection or data collection

## 🚀 Installation

```bash
bun add react-blurish-image
```

```bash
npm install react-blurish-image
```

```bash
yarn add react-blurish-image
```

```bash
pnpm add react-blurish-image
```

## 📖 Quick Start

```jsx
import { Image } from "react-blurish-image";

function App() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="A beautiful landscape"
      width={800}
      height={600}
      placeholder="blur"
      quality={90}
    />
  );
}
```

## 🎛️ API Reference

### Props

| Prop                | Type                | Default         | Description                                              |
| ------------------- | ------------------- | --------------- | -------------------------------------------------------- |
| `src`               | `string`            | **required**    | Image source URL                                         |
| `alt`               | `string`            | **required**    | Alternative text for accessibility                       |
| `width`             | `number`            | `undefined`     | Image width in pixels                                    |
| `height`            | `number`            | `undefined`     | Image height in pixels                                   |
| `fill`              | `boolean`           | `false`         | Fill the parent container (like `object-fit`)            |
| `placeholder`       | `'blur' \| 'empty'` | `'empty'`       | Placeholder type while loading                           |
| `blurDataURL`       | `string`            | `undefined`     | Custom blur placeholder (auto-generated if not provided) |
| `quality`           | `number`            | `75`            | Image quality (1-100)                                    |
| `priority`          | `boolean`           | `false`         | Load image with high priority (disables lazy loading)    |
| `loading`           | `'eager' \| 'lazy'` | `'lazy'`        | Loading behavior                                         |
| `unoptimized`       | `boolean`           | `false`         | Skip automatic optimization                              |
| `loader`            | `ImageLoader`       | `defaultLoader` | Custom image loader function                             |
| `sizes`             | `string`            | `undefined`     | Responsive image sizes attribute                         |
| `onLoad`            | `function`          | `undefined`     | Callback when image loads                                |
| `onError`           | `function`          | `undefined`     | Callback when image fails to load                        |
| `onLoadingComplete` | `function`          | `undefined`     | Callback when loading completes                          |

### Additional Props

All standard HTML `<img>` attributes are supported: `className`, `style`, `crossOrigin`, `referrerPolicy`, `decoding`, `fetchPriority`, etc.

## 📚 Examples

### Basic Usage with Blur Placeholder

```jsx
import { Image } from "react-blurish-image";

<Image
  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
  alt="Mountain landscape"
  width={800}
  height={600}
  placeholder="blur"
  quality={90}
  className="rounded-lg shadow-md"
/>;
```

### Fill Mode (Container-based sizing)

Perfect for hero sections and responsive layouts:

```jsx
<div style={{ position: "relative", width: "100%", height: "50vh" }}>
  <Image
    src="/hero-image.jpg"
    alt="Hero background"
    fill
    placeholder="blur"
    priority
    style={{ objectFit: "cover" }}
  />
</div>
```

### Responsive Images with Custom Sizes

```jsx
<Image
  src="/responsive-image.jpg"
  alt="Responsive image"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  quality={85}
/>
```

### Priority Loading (Above the fold)

For images that should load immediately:

```jsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority
  placeholder="blur"
  quality={95}
/>
```

### Custom Blur Data URL

Provide your own optimized blur placeholder:

```jsx
<Image
  src="/image.jpg"
  alt="Custom blur example"
  width={600}
  height={400}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
```

## ⚙️ Configuration

### Enable Development Warnings

Get helpful warnings during development:

```jsx
import { configureImage } from "react-blurish-image";

// Enable warnings during development
if (process.env.NODE_ENV === "development") {
  configureImage({ enableWarnings: true });
}
```

### Custom Image Loader

Integrate with your preferred CDN or image service:

```jsx
import { Image, ImageLoader } from "react-blurish-image";

// Cloudinary example
const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];
  return `https://res.cloudinary.com/your-cloud/image/fetch/${params.join(
    ","
  )}/${src}`;
};

// Vercel Image Optimization example
const vercelLoader: ImageLoader = ({ src, width, quality }) => {
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${
    quality || 75
  }`;
};

<Image
  src="https://example.com/image.jpg"
  alt="CDN optimized image"
  width={800}
  height={600}
  loader={cloudinaryLoader}
/>;
```

## 🎨 Styling Examples

### With CSS Classes

```jsx
<Image
  src="/image.jpg"
  alt="Styled image"
  width={400}
  height={300}
  placeholder="blur"
  className="rounded-xl shadow-2xl hover:scale-105 transition-transform"
/>
```

### With Inline Styles

```jsx
<Image
  src="/image.jpg"
  alt="Styled image"
  width={400}
  height={300}
  placeholder="blur"
  style={{
    borderRadius: "12px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: "transform 0.2s ease-in-out",
  }}
/>
```

## 🚀 Performance Tips

1. **Always provide dimensions**: Use `width` and `height` to prevent layout shift
2. **Use blur placeholders**: Add `placeholder="blur"` for better perceived performance
3. **Optimize quality**: Use `quality={85}` for the best balance of size and quality
4. **Enable priority loading**: Use `priority` for above-the-fold images
5. **Leverage responsive images**: Use the `sizes` prop for responsive layouts
6. **Custom loaders**: Integrate with CDNs for optimal delivery and caching

## 🔧 Advanced Usage

### Error Handling

```jsx
<Image
  src="/might-fail.jpg"
  alt="Image with error handling"
  width={400}
  height={300}
  onError={(e) => {
    console.log("Image failed to load:", e);
    // Could set fallback image here
  }}
  onLoadingComplete={(img) => {
    console.log(
      "Image loaded successfully:",
      img.naturalWidth,
      "x",
      img.naturalHeight
    );
  }}
/>
```

### Dynamic Images

```jsx
function ImageGallery({ images }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <Image
          key={image.id}
          src={image.url}
          alt={image.description}
          width={300}
          height={200}
          placeholder="blur"
          priority={index < 3} // Priority for first 3 images
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ))}
    </div>
  );
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/MonaAghili/react-blurish-image)
- [NPM Package](https://www.npmjs.com/package/react-blurish-image)
- [Issues & Bug Reports](https://github.com/MonaAghili/react-blurish-image/issues)
- [Feature Requests](https://github.com/MonaAghili/react-blurish-image/discussions)

---

Made with ❤️ by [Mona Aghili](https://github.com/MonaAghili)
