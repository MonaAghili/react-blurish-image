import { useState, useEffect } from 'react';
import './App.css';

import { Image, configureImage } from "../../src/index"

function App() {
  const [placeholderType, setPlaceholderType] = useState<'blur' | 'empty'>('blur');
  const [fill, setFill] = useState(false);
  
  // Enable warnings for development
  useEffect(() => {
    configureImage({ enableWarnings: true });
  }, []);

  const testImages = [
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Mountain landscape',
      width: 400,
      height: 300,
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      alt: 'Forest path',
      width: 400,
      height: 300,
    },
    {
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      alt: 'Nature scene',
      width: 400,
      height: 300,
    }
  ];

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">React Optimized Image Component</h1>
        <p className="app-subtitle">Testing the image component with different configurations</p>
      </header>

      <main className="app-main">
        <div className="controls-section">
          <h2>Controls</h2>
          <div className="controls-container">
            <label className="control-label">
              Placeholder:
              <select 
                value={placeholderType} 
                onChange={(e) => setPlaceholderType(e.target.value as 'blur' | 'empty')}
                className="control-select"
              >
                <option value="blur">Blur</option>
                <option value="empty">Empty</option>
              </select>
            </label>
            
            <label className="control-label">
              Fill Mode:
              <input
                type="checkbox"
                checked={fill}
                onChange={(e) => setFill(e.target.checked)}
                className="control-checkbox"
              />
            </label>
          </div>
        </div>

        {/* Test Cases */}
        <section className="test-section">
          <h2>Basic Usage</h2>
          <div className={`image-grid ${fill ? 'image-grid-fill' : ''}`}>
            {(fill ? [testImages[0]] : testImages).map((image, index) => (
              <div 
                key={index}
                className={`image-container ${fill ? 'image-container-fill' : ''}`}
              >
                <Image
                  src={`${image.src}&t=${Date.now()}`}
                  alt={image.alt}
                  width={fill ? undefined : image.width}
                  height={fill ? undefined : image.height}
                  fill={fill}
                  placeholder={placeholderType}
                  quality={75}
                  onLoadingComplete={() => console.log(`Image ${index + 1} loaded`)}
                  onLoad={() => console.log(`Image ${index + 1} onLoad triggered`)}
                  onError={(e) => console.error(`Image ${index + 1} error:`, e)}
                />
                {!fill && (
                  <div className="image-info">
                    <h3 className="image-title">{image.alt}</h3>
                    <p className="image-dimensions">
                      {image.width} × {image.height}px
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Priority Loading Test */}
        <section className="test-section">
          <h2>Priority Loading (Above the fold)</h2>
          <Image
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=400&fit=crop"
            alt="Hero image with priority loading"
            width={1200}
            height={400}
            priority
            placeholder="blur"
            className="hero-image"
          />
        </section>

        {/* Custom Blur Test */}
        <section className="test-section">
          <h2>Custom Blur Data URL</h2>
          <Image
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop"
            alt="Custom blur placeholder"
            width={600}
            height={400}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAIDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bK"
            className="custom-blur-image"
          />
        </section>

        {/* Error Handling Test */}
        <section className="test-section">
          <h2>Error Handling</h2>
          <Image
            src="https://invalid-url-that-will-fail.com/image.jpg"
            alt="This image will fail to load"
            width={400}
            height={300}
            placeholder="blur"
            onError={() => console.log('Error handled gracefully')}
            className="error-test-image"
          />
        </section>
      </main>
    </div>
  );
}

export default App;