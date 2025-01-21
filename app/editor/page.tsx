'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { FiUploadCloud, FiDownload, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ControlPanel from '../components/ControlPanel';

import { NextFont } from 'next/dist/compiled/@next/font';

import { Roboto, Oswald, Montserrat, Poppins } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import { Pacifico } from 'next/font/google';
import { Anton } from 'next/font/google';
import { Lora } from 'next/font/google';
import { Dancing_Script } from 'next/font/google';
import { Abril_Fatface } from 'next/font/google';
import { Bebas_Neue } from 'next/font/google';
import { Comfortaa } from 'next/font/google';
import { Righteous } from 'next/font/google';
import { Satisfy } from 'next/font/google';
import { Permanent_Marker } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'] });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });
const anton = Anton({ weight: '400', subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const lora = Lora({ subsets: ['latin'] });
const poppins = Poppins({ weight: ['400', '600'], subsets: ['latin'] });
const dancingScript = Dancing_Script({ subsets: ['latin'] });
const abrilFatface = Abril_Fatface({ weight: '400', subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] });
const comfortaa = Comfortaa({ weight: '400', subsets: ['latin'] });
const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const satisfy = Satisfy({ weight: '400', subsets: ['latin'] });
const permanentMarker = Permanent_Marker({ weight: '400', subsets: ['latin'] });

interface Font {
  name: string;
  font: string | NextFont;
  style: string;
}

const fonts: Font[] = [
  { name: 'Roboto', font: roboto, style: 'Modern Sans-serif' },
  { name: 'Playfair', font: playfair, style: 'Elegant Serif' },
  { name: 'Oswald', font: oswald, style: 'Condensed' },
  { name: 'Pacifico', font: pacifico, style: 'Script' },
  { name: 'Anton', font: anton, style: 'Display' },
  { name: 'Montserrat', font: montserrat, style: 'Modern Sans-serif' },
  { name: 'Lora', font: lora, style: 'Serif' },
  { name: 'Poppins', font: poppins, style: 'Modern Sans-serif' },
  { name: 'Dancing Script', font: dancingScript, style: 'Script' },
  { name: 'Abril Fatface', font: abrilFatface, style: 'Display' },
  { name: 'Comfortaa', font: comfortaa, style: 'Rounded' },
  { name: 'Righteous', font: righteous, style: 'Display' },
  { name: 'Satisfy', font: satisfy, style: 'Script' },
  { name: 'Permanent Marker', font: permanentMarker, style: 'Handwriting' },
  { name: 'Bebas Neue', font: bebasNeue, style: 'Display' },
  { name: 'Be Vietnam Pro', font: 'Be Vietnam Pro', style: 'Display' },
  { name: 'Be Vietnam', font: 'Be Vietnam', style: 'Display' },
  { name: 'Be Vietnam Pro', font: 'Be Vietnam Pro', style: 'Display' },
];

interface TextElement {
  id: string;
  text: string;
  fontSize: number;
  x: number;
  y: number;
  color: string;
  fontFamily: string;
  rotation: number;
  opacity: number;
  strokeWidth: number;
  strokeColor: string;
  shadowWidth: number;
  shadowColor: string;
  backgroundBlur: number;
  glowIntensity: number;
  glowColor: string;
  isBold: boolean;
}

export default function Editor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Cache for processed images
  const processedImagesCache = useRef(new Map<string, string>());

  // Function to generate hash from file content
  const generateFileHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  // Load cache from localStorage on mount
  useEffect(() => {
    try {
      const savedCache = localStorage.getItem('processedImagesCache');
      if (savedCache) {
        const parsedCache = JSON.parse(savedCache);
        processedImagesCache.current = new Map(Object.entries(parsedCache));
        console.log('Loaded image cache from localStorage');
      }
    } catch (err) {
      console.error('Error loading cache from localStorage:', err);
      // Clear corrupted cache
      localStorage.removeItem('processedImagesCache');
    }
  }, []);

  // Save cache to localStorage whenever it changes
  const saveToLocalStorage = useCallback((hash: string, dataUrl: string) => {
    try {
      const currentCache = Object.fromEntries(processedImagesCache.current.entries());
      const updatedCache = { ...currentCache, [hash]: dataUrl };
      localStorage.setItem('processedImagesCache', JSON.stringify(updatedCache));
      console.log('Saved to localStorage');
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      // If storage is full, clear it and try again
      if (err.name === 'QuotaExceededError') {
        localStorage.clear();
        try {
          localStorage.setItem('processedImagesCache', JSON.stringify({ [hash]: dataUrl }));
        } catch (retryErr) {
          console.error('Failed to save even after clearing localStorage');
        }
      }
    }
  }, []);

  const [textElements, setTextElements] = useState<TextElement[]>([{
    id: Math.random().toString(36).substr(2, 9),
    text: 'HELLO',
    fontSize: 80,
    x: 50,
    y: 50,
    color: 'white',
    fontFamily: 'Righteous',
    rotation: 0,
    opacity: 1,
    strokeWidth: 0,
    strokeColor: '#000000',
    shadowWidth: 0,
    shadowColor: '#000000',
    backgroundBlur: 0,
    glowIntensity: 0,
    glowColor: '#FFFFFF',
    isBold: false
  }]);
  const [currentText, setCurrentText] = useState('HELLO');
  const processedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [, setOriginalImageDimensions] = useState({ width: 0, height: 0 });
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (originalImage) {
      const img = new Image();
      img.onload = () => {
        setOriginalImageDimensions({ width: img.width, height: img.height });
      };
      img.src = originalImage;
    }
  }, [originalImage]);

  // Preload AI model when component mounts
  useEffect(() => {
    // Silently preload the background removal module
    import('@imgly/background-removal').catch(err => {
      console.error('AI model preload failed:', err);
      // Don't show error to user since this is a silent optimization
    });
  }, []);

  const compressImage = async (file: File): Promise<File> => {
    setLoadingStatus('Compressing image...');
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let width = img.width;
        let height = img.height;
        const maxSize = 1200;
        
        if (width > height && width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        } else if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          } else {
            reject(new Error('Image compression failed'));
          }
        }, 'image/jpeg', 0.8);
      };
      
      img.onerror = () => reject(new Error('Failed to load image for compression'));
    });
  };

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      console.log('Starting image upload process...');
      setLoadingStatus('Initializing...');
      setIsProcessing(true);
      setError(null);

      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }
      console.log('File type valid:', file.type);

      setLoadingStatus('Reading image...');
      const originalDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result as string);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      console.log('Original image loaded');
      setOriginalImage(originalDataUrl);

      // Generate hash for the original file
      const fileHash = await generateFileHash(file);
      
      // Check if we have this image in cache (memory or localStorage)
      if (processedImagesCache.current.has(fileHash)) {
        console.log('Using cached processed image');
        setLoadingStatus('Loading from cache...');
        setProcessedImage(processedImagesCache.current.get(fileHash)!);
        return;
      }

      setLoadingStatus('Optimizing image...');
      const compressedFile = await compressImage(file);
      console.log('Image compressed');
      
      setLoadingStatus('Loading AI model...');
      console.log('Importing background removal module...');
      const { removeBackground } = await import('@imgly/background-removal');
      console.log('Background removal module imported');
      
      if (typeof removeBackground !== 'function') {
        throw new Error('Background removal module failed to load properly');
      }

      setLoadingStatus('Removing background with AI...');
      console.log('Starting background removal...');
      
      let processedBlob: Blob;
      try {
        processedBlob = await removeBackground(compressedFile);
        if (!processedBlob) throw new Error('No output from background removal');
      } catch (err) {
        console.error('Background removal error:', err);
        throw new Error('Failed to process image: ' + (err.message || 'Unknown error'));
      }
      console.log('Background removal complete');
      
      setLoadingStatus('Finalizing...');
      const processedDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result as string);
          } else {
            reject(new Error('Failed to read processed image'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read processed image'));
        reader.readAsDataURL(processedBlob);
      });
      console.log('Processed image converted to data URL');
      
      // Store in memory cache and localStorage
      processedImagesCache.current.set(fileHash, processedDataUrl);
      saveToLocalStorage(fileHash, processedDataUrl);
      
      setProcessedImage(processedDataUrl);
      setLoadingStatus('Complete!');
      console.log('Image processing complete');
    } catch (err) {
      console.error('Error in image processing:', err);
      setError(`Error processing image: ${err.message || 'Unknown error'}`);
      setProcessedImage(null);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }
  }, [saveToLocalStorage]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, [handleImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  }, [handleImageUpload]);

  const handleDownload = async () => {
    if (!processedImage || isDownloading) return;
    
    setIsDownloading(true);
    
    try {

         // Add artificial delay of 2 seconds
     await new Promise(resolve => setTimeout(resolve, 2000));
      // Create canvas with same dimensions as original image
      const canvas = document.createElement('canvas');
      const img = new Image();
      
      // Get the display container dimensions
      const displayContainer = document.querySelector('.canvas-container');
      const containerWidth = displayContainer?.clientWidth || 0;
      const containerHeight = displayContainer?.clientHeight || 0;

      await new Promise((resolve) => {
        img.onload = () => {
          // Set canvas size to match the original image dimensions
          canvas.width = img.width;
          canvas.height = img.height;
          resolve(null);
        };
        img.src = originalImage;
      });

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Calculate the preview dimensions (matching the display container)
      let previewWidth, previewHeight;
      const imageAspectRatio = canvas.width / canvas.height;
      const containerAspectRatio = containerWidth / containerHeight;

      if (imageAspectRatio > containerAspectRatio) {
        previewWidth = containerWidth;
        previewHeight = containerWidth / imageAspectRatio;
      } else {
        previewHeight = containerHeight;
        previewWidth = containerHeight * imageAspectRatio;
      }

      // Calculate scale factors between preview and actual image
      const scaleFactorX = canvas.width / previewWidth;
      const scaleFactorY = canvas.height / previewHeight;

      // Layer 1: Draw original image with blur
      ctx.filter = textElements[0]?.backgroundBlur ? `blur(${textElements[0].backgroundBlur}px)` : 'none';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.filter = 'none';

      // Layer 2: Draw text elements
      textElements.forEach(element => {
        const selectedFont = fonts.find(f => f.name === element.fontFamily) || fonts[0];
        if (!selectedFont) return;

        // Scale font size and effects proportionally
        const scaleFactor = Math.min(scaleFactorX, scaleFactorY);
        const adjustedFontSize = element.fontSize * scaleFactor;
        const adjustedStrokeWidth = element.strokeWidth * scaleFactor;
        const adjustedShadowWidth = element.shadowWidth * scaleFactor;
        const adjustedGlowIntensity = element.glowIntensity * scaleFactor;

        const getFontFamily = (font: string | NextFont) => {
          if (typeof font === 'string') return font;
          return (font as any).style?.fontFamily || font.className;
        };

        ctx.font = `${adjustedFontSize}px ${getFontFamily(selectedFont.font)}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate position using the same percentage-based approach as preview
        const x = (element.x / 100) * canvas.width;
        const y = (element.y / 100) * canvas.height;

        // Apply rotation around the text center point
        ctx.translate(x, y);
        ctx.rotate(element.rotation * Math.PI / 180);
        ctx.translate(-x, -y);

        // Create a temporary canvas for text and effects
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.font = ctx.font;

        // Draw glow if enabled
        if (element.glowIntensity > 0) {
          tempCtx.save();
          const glowLayers = [
            { size: 0.5, opacity: 0.8 },
            { size: 1, opacity: 0.7 },
            { size: 1.5, opacity: 0.6 },
            { size: 2, opacity: 0.5 },
            { size: 2.5, opacity: 0.4 }
          ];

          glowLayers.forEach(({ size, opacity }) => {
            tempCtx.fillStyle = element.glowColor;
            tempCtx.shadowBlur = adjustedGlowIntensity * size;
            tempCtx.shadowColor = element.glowColor;
            tempCtx.globalAlpha = element.opacity * opacity;
            
            // Draw multiple copies for stronger glow
            for (let i = 0; i < 3; i++) {
              tempCtx.fillText(element.text, x, y);
            }
          });

          // Add intense center glow
          tempCtx.fillStyle = element.glowColor;
          tempCtx.shadowBlur = adjustedGlowIntensity * 0.3;
          tempCtx.shadowColor = element.glowColor;
          tempCtx.globalAlpha = element.opacity * 0.9;
          
          for (let i = 0; i < 2; i++) {
            tempCtx.fillText(element.text, x, y);
          }
          tempCtx.restore();
        }

        // Draw shadow if enabled
        if (element.shadowWidth > 0) {
          tempCtx.save();
          
          // Function to draw text with shadow at specific position
          const drawShadowText = (offsetX: number, offsetY: number, alpha: number) => {
            tempCtx.save();
            tempCtx.fillStyle = element.shadowColor;
            tempCtx.globalAlpha = element.opacity * alpha;
            tempCtx.fillText(element.text, x + offsetX, y + offsetY);
            tempCtx.restore();
          };

          // Draw base shadow layer
          tempCtx.shadowColor = element.shadowColor;
          tempCtx.shadowBlur = adjustedShadowWidth * 0.5;
          tempCtx.fillStyle = element.shadowColor;
          tempCtx.globalAlpha = element.opacity * 0.3;
          tempCtx.fillText(element.text, x, y);

          // Create smooth outer shadow
          const outerSteps = 32;
          for (let i = 0; i < outerSteps; i++) {
            const angle = (i / outerSteps) * Math.PI * 2;
            const distance = adjustedShadowWidth;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            drawShadowText(offsetX, offsetY, 0.4);
          }

          // Create medium distance shadow
          const mediumSteps = 24;
          for (let i = 0; i < mediumSteps; i++) {
            const angle = (i / mediumSteps) * Math.PI * 2;
            const distance = adjustedShadowWidth * 0.7;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            drawShadowText(offsetX, offsetY, 0.5);
          }

          // Create inner shadow
          const innerSteps = 16;
          for (let i = 0; i < innerSteps; i++) {
            const angle = (i / innerSteps) * Math.PI * 2;
            const distance = adjustedShadowWidth * 0.4;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            drawShadowText(offsetX, offsetY, 0.6);
          }

          // Add very close shadow for smoothness
          const closeSteps = 8;
          for (let i = 0; i < closeSteps; i++) {
            const angle = (i / closeSteps) * Math.PI * 2;
            const distance = adjustedShadowWidth * 0.2;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            drawShadowText(offsetX, offsetY, 0.7);
          }

          // Add subtle blur effect for extra smoothness
          tempCtx.shadowBlur = adjustedShadowWidth * 0.3;
          tempCtx.shadowColor = element.shadowColor;
          tempCtx.globalAlpha = element.opacity * 0.2;

          // Draw at 8 key points for consistent blur
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const distance = adjustedShadowWidth * 0.6;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            tempCtx.fillText(element.text, x + offsetX, y + offsetY);
          }

          tempCtx.restore();
        }

        // Draw main text
        tempCtx.fillStyle = element.color;
        tempCtx.globalAlpha = element.opacity;
        if (element.isBold) {
          tempCtx.font = `bold ${adjustedFontSize}px ${getFontFamily(selectedFont.font)}`;
        }
        tempCtx.fillText(element.text, x, y);

        // Draw the temporary canvas onto the main canvas
        ctx.drawImage(tempCanvas, 0, 0);

        // Reset transformation
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });

      // Layer 3: Draw processed image on top
      const procImg = new Image();
      await new Promise((resolve) => {
        procImg.onload = () => {
          ctx.globalAlpha = 1;
          ctx.drawImage(procImg, 0, 0, canvas.width, canvas.height);
          resolve(null);
        };
        procImg.src = processedImage;
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Failed to create blob');
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const sanitizedText = currentText.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
        const fileName = `${sanitizedText}-${timestamp}.png`;

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error downloading image:', error);
      setError('Failed to download image');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <ControlPanel 
                textElements={textElements}
                setTextElements={setTextElements}
              />
              {/* Canvas Area */}
              <div className="w-full md:w-3/4 order-1 md:order-2">
                <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 h-[510px] flex flex-col shadow-xl overflow-hidden">
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-6">
                    {processedImage && !isProcessing && (
                      <>
                        <div className="flex items-center justify-between">
                          <h3 className="text-white text-lg font-semibold">Preview</h3>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <div className="relative flex items-center w-full max-w-[300px]">
                            <div className="relative w-full flex items-center">
                              <input
                                type="text"
                                value={currentText}
                                onChange={(e) => {
                                  const newText = e.target.value;
                                  setCurrentText(newText);
                                  setTextElements(prev => [{
                                    ...prev[0],
                                    text: newText
                                  }]);
                                }}
                                placeholder="Add text here..."
                                className="w-full pl-3 pr-10 py-1.5 text-sm rounded-full bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                              />
                              <div className="absolute right-1.5 p-1 rounded-full bg-gray-600/50">
                                <FiEdit2 className="w-3 h-3 text-gray-300" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 ${
                              isDownloading
                                ? 'bg-green-500/10 text-green-500 cursor-not-allowed'
                                : 'bg-green-500 text-white hover:bg-green-600'
                            }`}
                          >
                            {isDownloading ? (
                              <>
                                <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-current border-t-transparent" />
                                <span>Downloading...</span>
                              </>
                            ) : (
                              <>
                                <FiDownload className="w-3.5 h-3.5" />
                                <span>Download</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              setOriginalImage(null);
                              setProcessedImage(null);
                              setTextElements([{
                                id: Math.random().toString(36).substr(2, 9),
                                text: 'HELLO',
                                fontSize: 80,
                                x: 50,
                                y: 50,
                                color: 'white',
                                fontFamily: 'Righteous',
                                rotation: 0,
                                opacity: 1,
                                strokeWidth: 0,
                                strokeColor: '#000000',
                                shadowWidth: 0,
                                shadowColor: '#000000',
                                backgroundBlur: 0,
                                glowIntensity: 0,
                                glowColor: '#FFFFFF',
                                isBold: false
                              }]);
                              setCurrentText('HELLO');
                              // Clear input value
                              const input = document.getElementById('file-upload') as HTMLInputElement;
                              if (input) input.value = '';
                              // Clear all localStorage cache
                              localStorage.removeItem('processedImage');
                              localStorage.removeItem('originalImage');
                              localStorage.removeItem('textElements');
                              localStorage.removeItem('currentImageHash');
                              localStorage.removeItem('processedImagesCache');
                              // Clear memory cache
                              processedImagesCache.current = new Map();
                              // Clear URL objects to free memory
                              if (originalImage) URL.revokeObjectURL(originalImage);
                              if (processedImage) URL.revokeObjectURL(processedImage);
                              // Reset error state
                              setError(null);
                              setIsProcessing(false);
                            }}
                            className="p-1.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Canvas Container */}
                  <div className="canvas-container relative flex-1 w-full flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
                      <canvas 
                        ref={processedCanvasRef}
                        className="hidden"
                        width={800}
                        height={600}
                      />
                      {originalImage && (
                        <div className="relative flex items-center justify-center w-full" style={{ height: 'calc(510px - 7rem)' }}>
                          {/* Original Image Layer (Bottom) */}
                          <div className="relative flex items-center justify-center w-full h-full">
                            <img
                              src={originalImage}
                              alt="Background"
                              className="w-auto h-full max-h-full object-contain mx-auto rounded-xl transition-all duration-300"
                              style={{
                                maxHeight: 'calc(510px - 7rem)',
                                filter: textElements[0]?.backgroundBlur ? `blur(${textElements[0].backgroundBlur}px)` : 'none'
                              }}
                            />
                            {/* Processing Overlay - Only on image */}
                            {isProcessing && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                {/* Spinner and message with text shadow for better visibility */}
                                <div className="flex flex-col items-center gap-3 px-6 py-4 rounded-xl bg-gray-900/80 backdrop-blur-sm shadow-xl">
                                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                                  <div className="text-center">
                                    <p className="text-white text-base font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Please wait...</p>
                                    <p className="text-white text-sm animate-pulse mt-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>AI is doing its magic...</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Text Elements Layer (Middle) - Only show when processed */}
                          {processedImage && !isProcessing && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
                              {textElements.map((element, index) => {
                                return (
                                  <div
                                    key={element.id}
                                    className="absolute"
                                    style={{
                                      left: `${element.x}%`,
                                      top: `${element.y}%`,
                                      transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: element.color,
                                        fontSize: `${element.fontSize}px`,
                                        opacity: element.opacity,
                                        textShadow: [
                                          // Glow effect
                                          ...(element.glowIntensity > 0 ? [
                                            // Multiple layers with increasing blur and decreasing opacity
                                            `0 0 ${element.glowIntensity * 0.5}px ${element.glowColor}`,
                                            `0 0 ${element.glowIntensity}px ${element.glowColor}`,
                                            `0 0 ${element.glowIntensity * 1.5}px ${element.glowColor}`,
                                            `0 0 ${element.glowIntensity * 2}px ${element.glowColor}`,
                                            // Extra intense center glow
                                            `0 0 ${element.glowIntensity * 0.3}px ${element.glowColor}`
                                          ] : []),
                                          // Shadow effect if enabled
                                          ...(element.shadowWidth > 0 ? [
                                            // Main shadow points every 15 degrees
                                            ...Array.from({ length: 24 }, (_, i) => {
                                              const angle = (i * 15) * Math.PI / 180;
                                              const x = Math.cos(angle) * element.shadowWidth;
                                              const y = Math.sin(angle) * element.shadowWidth;
                                              return `${x}px ${y}px 0 ${element.shadowColor}`;
                                            }),
                                            // Additional points at 7.5 degree offsets
                                            ...Array.from({ length: 24 }, (_, i) => {
                                              const angle = ((i * 15) + 7.5) * Math.PI / 180;
                                              const x = Math.cos(angle) * element.shadowWidth;
                                              const y = Math.sin(angle) * element.shadowWidth;
                                              return `${x}px ${y}px 0 ${element.shadowColor}`;
                                            }),
                                            // Inner shadow points at 90% of the width
                                            ...Array.from({ length: 24 }, (_, i) => {
                                              const angle = (i * 15) * Math.PI / 180;
                                              const x = Math.cos(angle) * (element.shadowWidth * 0.9);
                                              const y = Math.sin(angle) * (element.shadowWidth * 0.9);
                                              return `${x}px ${y}px 0 ${element.shadowColor}`;
                                            }),
                                            // Blur effect for smoothness
                                            `0 0 ${Math.max(1, element.shadowWidth / 3)}px ${element.shadowColor}`
                                          ] : [])
                                        ].join(',') || 'none',
                                        whiteSpace: 'nowrap',
                                        mixBlendMode: 'normal',
                                        position: 'relative',
                                        fontWeight: element.isBold ? 'bold' : 'normal'
                                      }}
                                      className={typeof fonts.find(f => f.name === element.fontFamily)?.font === 'object' 
                                        ? (fonts.find(f => f.name === element.fontFamily)?.font as NextFont).className 
                                        : ''}
                                    >
                                      {element.text}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Processed Image Layer (Top) */}
                          {processedImage && !isProcessing && (
                            <div className="absolute inset-0 flex items-center justify-center w-full h-full" style={{ zIndex: 2 }}>
                              <img
                                src={processedImage}
                                alt="Processed"
                                className="w-auto h-full max-h-full object-contain mx-auto rounded-xl"
                                style={{
                                  maxHeight: 'calc(510px - 7rem)'
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      {/* Upload Prompt */}
                      {!originalImage && !isProcessing && (
                        <div
                          className={`absolute inset-0 flex flex-col items-center justify-center ${
                            dragActive ? 'bg-blue-500/10' : 'bg-gray-700/50'
                          } rounded-xl transition-colors`}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                        >
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center justify-center gap-4"
                          >
                            <div className="w-16 h-16 rounded-full bg-gray-600/50 flex items-center justify-center">
                              <FiUploadCloud className="w-8 h-8 text-gray-300" />
                            </div>

                            <div className="text-center">
                              <p className="text-gray-300 mb-2">Drag & Drop an image here or click to upload</p>
                              <p className="text-gray-400 text-sm">Supported formats: PNG, JPEG</p>
                            </div>
                          </label>
                        </div>
                      )}

                      {/* Error Message */}
                      {error && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-500 px-6 py-3 rounded-lg text-sm z-50 flex items-center gap-2">
                          <FiX className="w-4 h-4" />
                          {error}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        /* Scrollbar Styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 1);
        }
      `}</style>
    </>
  );
}