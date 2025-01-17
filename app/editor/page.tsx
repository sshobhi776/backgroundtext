'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { FiUploadCloud, FiDownload, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsBrush } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Roboto, 
  Playfair_Display, 
  Oswald, 
  Pacifico, 
  Anton, 
  Montserrat,
  Lora,
  Poppins,
  Dancing_Script,
  Abril_Fatface,
  Bebas_Neue,
  Comfortaa,
  Righteous,
  Satisfy,
  Permanent_Marker 
} from 'next/font/google';

const roboto = Roboto({ weight: ['700'], subsets: ['latin'] });
const playfair = Playfair_Display({ weight: ['700'], subsets: ['latin'] });
const oswald = Oswald({ weight: ['700'], subsets: ['latin'] });
const pacifico = Pacifico({ weight: ['400'], subsets: ['latin'] });
const anton = Anton({ weight: ['400'], subsets: ['latin'] });
const montserrat = Montserrat({ weight: ['700'], subsets: ['latin'] });
const lora = Lora({ weight: ['700'], subsets: ['latin'] });
const poppins = Poppins({ weight: ['700'], subsets: ['latin'] });
const dancingScript = Dancing_Script({ weight: ['700'], subsets: ['latin'] });
const abrilFatface = Abril_Fatface({ weight: ['400'], subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ weight: ['400'], subsets: ['latin'] });
const comfortaa = Comfortaa({ weight: ['700'], subsets: ['latin'] });
const righteous = Righteous({ weight: ['400'], subsets: ['latin'] });
const satisfy = Satisfy({ weight: ['400'], subsets: ['latin'] });
const permanentMarker = Permanent_Marker({ weight: ['400'], subsets: ['latin'] });

const fonts = [
  { name: 'Roboto', font: roboto, style: 'Modern Sans-serif' },
  { name: 'Playfair', font: playfair, style: 'Elegant Serif' },
  { name: 'Oswald', font: oswald, style: 'Condensed' },
  { name: 'Pacifico', font: pacifico, style: 'Script' },
  { name: 'Anton', font: anton, style: 'Display' },
  { name: 'Montserrat', font: montserrat, style: 'Modern Sans-serif' },
  { name: 'Lora', font: lora, style: 'Serif' },
  { name: 'Poppins', font: poppins, style: 'Geometric Sans-serif' },
  { name: 'Dancing Script', font: dancingScript, style: 'Handwriting' },
  { name: 'Abril Fatface', font: abrilFatface, style: 'Display' },
  { name: 'Bebas Neue', font: bebasNeue, style: 'Display' },
  { name: 'Comfortaa', font: comfortaa, style: 'Rounded' },
  { name: 'Righteous', font: righteous, style: 'Display' },
  { name: 'Satisfy', font: satisfy, style: 'Script' },
  { name: 'Permanent Marker', font: permanentMarker, style: 'Handwritten' },
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
}

export default function Editor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [textElements, setTextElements] = useState<TextElement[]>([{
    id: Math.random().toString(36).substr(2, 9),
    text: 'HELLO',
    fontSize: 50,
    x: 50,
    y: 50,
    color: 'white',
    fontFamily: 'Righteous',
    rotation: 0,
    opacity: 1,
    strokeWidth: 0,
    strokeColor: 'black',
    shadowWidth: 0,
    shadowColor: 'black',
    backgroundBlur: 0
  }]);
  const [currentText, setCurrentText] = useState('HELLO');
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [originalImageDimensions, setOriginalImageDimensions] = useState({ width: 0, height: 0 });
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    return () => {
      // No need to revoke data URLs
    };
  }, [originalImage, processedImage]);

  useEffect(() => {
    if (originalImage) {
      const img = new Image();
      img.onload = () => {
        setOriginalImageDimensions({ width: img.width, height: img.height });
      };
      img.src = originalImage;
    }
  }, [originalImage]);

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
      setLoadingStatus('Starting process...');
      setIsProcessing(true);
      setError(null);

      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      // Convert original file to data URL
      const originalDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      setOriginalImage(originalDataUrl);

      const compressedFile = await compressImage(file);
      
      setLoadingStatus('Loading AI model...');
      const { removeBackground } = await import('@imgly/background-removal');
      
      if (typeof removeBackground !== 'function') {
        throw new Error('Background removal module failed to load properly');
      }

      setLoadingStatus('Our AI is working its magic...');
      const processedBlob = await removeBackground(compressedFile);
      
      if (!processedBlob) {
        throw new Error('Background removal failed to produce output');
      }
      
      // Convert processed blob to data URL
      const processedDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(processedBlob);
      });
      
      setProcessedImage(processedDataUrl);
      setLoadingStatus('Complete!');
    } catch (err) {
      console.error('Error in image processing:', err);
      setError(`Error processing image: ${err.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  }, []);

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
    
    // Add 2 second delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Create a temporary canvas
      const canvas = document.createElement('canvas');
      
      // Load both images
      const [origImg, procImg] = await Promise.all([
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            resolve(img);
          };
          img.onerror = () => reject(new Error('Failed to load original image'));
          img.src = originalImage;
        }),
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to load processed image'));
          img.src = processedImage;
        })
      ]);
  
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Layer 1: Draw original image (bottom layer)
      ctx.filter = textElements[0]?.backgroundBlur ? `blur(${textElements[0].backgroundBlur}px)` : 'none';
      ctx.drawImage(origImg, 0, 0, canvas.width, canvas.height);
      ctx.filter = 'none'; // Reset filter for other layers

      // Layer 2: Draw text elements
      textElements.forEach(element => {
        const selectedFont = fonts.find(f => f.name === element.fontFamily) || fonts[0];
        ctx.save();

        // Calculate scale factors based on image dimensions
        const previewCanvas = processedCanvasRef.current;
        const scaleFactor = previewCanvas ? canvas.width / previewCanvas.width : 1;
        const adjustedStrokeWidth = element.strokeWidth * scaleFactor;
        const adjustedShadowWidth = element.shadowWidth * scaleFactor;

        ctx.font = `${element.fontSize}px ${selectedFont.font.style.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = element.opacity;
        
        const x = (element.x / 100) * canvas.width;
        const y = (element.y / 100) * canvas.height;
        
        // Apply rotation
        ctx.translate(x, y);
        ctx.rotate(element.rotation * Math.PI / 180);
        ctx.translate(-x, -y);

        // Draw shadow if shadowWidth > 0
        if (element.shadowWidth > 0) {
          ctx.save();
          ctx.shadowColor = element.shadowColor;
          ctx.shadowBlur = adjustedShadowWidth * 2;  // Multiply by 2 to match preview intensity
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.fillStyle = element.shadowColor;
          
          // Draw shadow multiple times for proper intensity
          for(let i = 0; i < 2; i++) {
            ctx.fillText(element.text, x, y);
          }
          
          ctx.restore();
        }

        // Draw stroke if strokeWidth > 0
        if (element.strokeWidth > 0) {
          ctx.strokeStyle = element.strokeColor;
          ctx.lineWidth = adjustedStrokeWidth;
          ctx.lineJoin = 'round';
          ctx.miterLimit = 2;
          ctx.lineCap = 'round';
          ctx.strokeText(element.text, x, y);
        }

        // Draw fill
        ctx.fillStyle = element.color;
        ctx.fillText(element.text, x, y);
        
        ctx.restore();
      });

      // Layer 3: Draw processed image on top
      ctx.drawImage(procImg, 0, 0, canvas.width, canvas.height);

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

  const handleAddText = () => {
    if (!originalImage) {
      setError('Please upload an image first');
      return;
    }
    if (!currentText.trim()) {
      setError('Please enter some text');
      return;
    }
    const newText = {
      id: Math.random().toString(36).substr(2, 9),
      text: currentText,
      fontSize: 40,
      x: originalImageDimensions.width / 2,
      y: originalImageDimensions.height / 2,
      color: 'white',
      fontFamily: 'Righteous',
      rotation: 0,
      opacity: 1,
      strokeWidth: 0,
      strokeColor: 'black',
      shadowWidth: 0,
      shadowColor: 'black',
      backgroundBlur: 0
    };
    setTextElements([...textElements, newText]);
    setCurrentText(''); // Clear input after adding
  };

  const handleTextChange = (text: string, id: string) => {
    setTextElements(textElements.map(element => 
      element.id === id ? { ...element, text } : element
    ));
  };

  const drawText = useCallback(() => {
    if (!originalCanvasRef.current || !processedCanvasRef.current || !originalImage) return;

    const canvas = processedCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the processed image if it exists
    if (processedImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw text elements after image is loaded
        textElements.forEach(element => {
          const selectedFont = fonts.find(f => f.name === element.fontFamily) || fonts[0];
          ctx.save();

          // Get device pixel ratio to ensure consistent stroke width
          const dpr = window.devicePixelRatio || 1;
          ctx.font = `${element.fontSize}px ${selectedFont.font.style.fontFamily}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalAlpha = element.opacity;
          
          const x = (element.x / 100) * canvas.width;
          const y = (element.y / 100) * canvas.height;
          
          // Apply rotation
          ctx.translate(x, y);
          ctx.rotate(element.rotation * Math.PI / 180);
          ctx.translate(-x, -y);

          // Draw shadow if shadowWidth > 0
          if (element.shadowWidth > 0) {
            ctx.save();
            ctx.shadowColor = element.shadowColor;
            ctx.shadowBlur = element.shadowWidth * 2;  // Multiply by 2 to match preview intensity
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fillStyle = element.shadowColor;
            
            // Draw shadow multiple times for proper intensity
            for(let i = 0; i < 2; i++) {
              ctx.fillText(element.text, x, y);
            }
            
            ctx.restore();
          }

          // Draw stroke if strokeWidth > 0
          if (element.strokeWidth > 0) {
            ctx.strokeStyle = element.strokeColor;
            ctx.lineWidth = element.strokeWidth * dpr;
            ctx.lineJoin = 'miter';
            ctx.miterLimit = 2;
            ctx.lineCap = 'square';
            ctx.strokeText(element.text, x, y);
          }

          // Draw fill
          ctx.fillStyle = element.color;
          ctx.fillText(element.text, x, y);
          
          ctx.restore();
        });
      };
      img.src = processedImage;
    } else {
      // Draw original image if processed image doesn't exist
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw text elements after image is loaded
        textElements.forEach(element => {
          const selectedFont = fonts.find(f => f.name === element.fontFamily) || fonts[0];
          ctx.save();

          // Get device pixel ratio to ensure consistent stroke width
          const dpr = window.devicePixelRatio || 1;
          ctx.font = `${element.fontSize}px ${selectedFont.font.style.fontFamily}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalAlpha = element.opacity;
          
          const x = (element.x / 100) * canvas.width;
          const y = (element.y / 100) * canvas.height;
          
          // Apply rotation
          ctx.translate(x, y);
          ctx.rotate(element.rotation * Math.PI / 180);
          ctx.translate(-x, -y);

          // Draw shadow if shadowWidth > 0
          if (element.shadowWidth > 0) {
            ctx.save();
            ctx.shadowColor = element.shadowColor;
            ctx.shadowBlur = element.shadowWidth * 2;  // Multiply by 2 to match preview intensity
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fillStyle = element.shadowColor;
            
            // Draw shadow multiple times for proper intensity
            for(let i = 0; i < 2; i++) {
              ctx.fillText(element.text, x, y);
            }
            
            ctx.restore();
          }

          // Draw stroke if strokeWidth > 0
          if (element.strokeWidth > 0) {
            ctx.strokeStyle = element.strokeColor;
            ctx.lineWidth = element.strokeWidth * dpr;
            ctx.lineJoin = 'miter';
            ctx.miterLimit = 2;
            ctx.lineCap = 'square';
            ctx.strokeText(element.text, x, y);
          }

          // Draw fill
          ctx.fillStyle = element.color;
          ctx.fillText(element.text, x, y);
          
          ctx.restore();
        });
      };
      img.src = originalImage;
    }
  }, [originalImage, processedImage, textElements, fonts]);

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-[calc(100vh-64px-320px)] px-2 sm:px-8 py-8">
        <div className="container mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Canvas Area - Now on the right */}
            <div className="w-full md:w-3/4 order-1 md:order-2">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-auto md:h-[510px]">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-lg font-semibold">Preview</h3>
                    <div className="flex items-center gap-2 sm:hidden">
                      {processedImage && (
                        <>
                          <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="w-32 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-lg text-sm"
                          >
                            {isDownloading ? (
                              <>
                                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                                Downloading
                              </>
                            ) : (
                              <>
                                <FiDownload className="w-4 h-4" />
                                Download
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
                                fontSize: 50,
                                x: 50,
                                y: 50,
                                color: 'white',
                                fontFamily: 'Righteous',
                                rotation: 0,
                                opacity: 1,
                                strokeWidth: 0,
                                strokeColor: 'black',
                                shadowWidth: 0,
                                shadowColor: 'black',
                                backgroundBlur: 0
                              }]);
                              setCurrentText('HELLO');
                              const input = document.getElementById('file-upload') as HTMLInputElement;
                              if (input) input.value = '';
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full flex items-center justify-center transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {processedImage && (
                    <div className="flex-1 flex items-center justify-center mb-4 sm:mb-0">
                      <div className="relative flex items-center">
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
                          placeholder="Add text"
                          className="w-full sm:w-48 pl-3 pr-9 py-1.5 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-sm"
                        />
                        <FiEdit2 className="absolute right-3 text-gray-400 w-4 h-4" />
                      </div>
                    </div>
                  )}
                  <div className="hidden sm:flex items-center justify-end gap-2">
                    {processedImage && (
                      <>
                        <button
                          onClick={handleDownload}
                          disabled={isDownloading}
                          className="w-auto bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-lg text-sm"
                        >
                          {isDownloading ? (
                            <>
                              <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                              Downloading
                            </>
                          ) : (
                            <>
                              <FiDownload className="w-4 h-4" />
                              Download
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
                              fontSize: 50,
                              x: 50,
                              y: 50,
                              color: 'white',
                              fontFamily: 'Righteous',
                              rotation: 0,
                              opacity: 1,
                              strokeWidth: 0,
                              strokeColor: 'black',
                              shadowWidth: 0,
                              shadowColor: 'black',
                              backgroundBlur: 0
                            }]);
                            setCurrentText('HELLO');
                            const input = document.getElementById('file-upload') as HTMLInputElement;
                            if (input) input.value = '';
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full flex items-center justify-center transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center h-full">
                  <div className="relative bg-gray-800 rounded-2xl overflow-hidden w-full max-w-[min(98vw,1200px)] h-auto max-h-[calc(100vh-200px)]">
                    <div className="w-full aspect-[16/9]">
                      {error && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-red-500 text-center bg-red-100/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                          {error}
                        </div>
                      )}

                      {/* Original Image Layer */}
                      {originalImage && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={originalImage}
                            alt="Original"
                            className={`max-w-full max-h-full object-contain rounded-xl ${textElements[0]?.backgroundBlur ? `blur-[${textElements[0].backgroundBlur}px]` : ''}`}
                            style={{
                              filter: textElements[0]?.backgroundBlur ? `blur(${textElements[0].backgroundBlur}px)` : 'none'
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Text Elements Layer */}
                      {processedImage && !isProcessing && textElements.map((element, index) => (
                        <div
                          key={element.id}
                          style={{
                            position: 'absolute',
                            left: `${element.x}%`,
                            top: `${element.y}%`,
                            transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                            textShadow: element.shadowWidth > 0 ? 
                              `0 0 ${element.shadowWidth}px ${element.shadowColor},
                               0 0 ${element.shadowWidth}px ${element.shadowColor},
                               0 0 ${element.shadowWidth}px ${element.shadowColor}` : 'none',
                            pointerEvents: 'none',
                            color: element.color,
                            fontSize: `${element.fontSize}px`,
                            fontFamily: fonts.find(f => f.name === element.fontFamily)?.font.style.fontFamily || fonts[0].font.style.fontFamily,
                            whiteSpace: 'nowrap',
                            opacity: element.opacity,
                            WebkitTextStroke: `${element.strokeWidth}px ${element.strokeColor}`
                          }}
                        >
                          {element.text}
                        </div>
                      ))}

                      {/* Processed Image Layer */}
                      {processedImage && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={processedImage}
                            alt="Processed"
                            className="max-w-full max-h-full object-contain rounded-xl"
                          />
                        </div>
                      )}

                      {/* Loading Overlay */}
                      {isProcessing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
                          <AiOutlineLoading3Quarters className="w-8 h-8 text-white animate-spin mb-2" />
                          <p className="text-white text-sm font-medium">{loadingStatus}</p>
                        </div>
                      )}

                      {/* Upload Prompt */}
                      {!originalImage && !isProcessing && (
                        <div
                          className={`absolute inset-0 flex flex-col items-center justify-center ${
                            dragActive ? 'bg-blue-500 bg-opacity-10' : ''
                          }`}
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
                            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                              <FiUploadCloud className="w-8 h-8 text-gray-400" />
                            </div>
                            <div className="text-center">
                              <p className="text-gray-400 mb-2">Drag & Drop an image here or click to upload</p>
                              <p className="text-gray-500 text-sm">Supported formats: PNG, JPEG</p>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Panel - Now on the left */}
            <div className="w-full md:w-1/4 order-2 md:order-1">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 min-h-[510px] md:h-[510px]">
                <h3 className="text-white text-lg font-semibold mb-4">Control Panel</h3>
                <div className="space-y-3 h-[410px] overflow-y-auto pr-2 
                  scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 
                  hover:scrollbar-thumb-gray-500">
                  {/* Font Style Controls */}
                  <div className="p-3 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-white">Font Style</h3>
                    </div>
                    <select
                      value={textElements[0]?.fontFamily || 'Righteous'}
                      onChange={(e) => {
                        const selectedFont = fonts.find(f => f.name === e.target.value);
                        if (selectedFont) {
                          setTextElements([{ 
                            ...textElements[0],
                            fontFamily: selectedFont.name
                          }]);
                        }
                      }}
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      {fonts.map((font) => (
                        <option 
                          key={font.name} 
                          value={font.name}
                          style={{ fontFamily: font.font.style.fontFamily }}
                        >
                          {font.name} - {font.style}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Text Size Controls */}
                  <div className="p-3 border border-gray-700 rounded-lg mb-3">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-white">Font Size</h3>
                      <span className="text-gray-300 text-sm">{textElements[0]?.fontSize}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="150" 
                      value={textElements[0]?.fontSize || 50}
                      onChange={(e) => {
                        setTextElements([{ 
                          ...textElements[0],
                          fontSize: parseInt(e.target.value)
                        }]);
                      }}
                      className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Color Controls */}
                  <div className="p-3 border border-gray-700 rounded-lg">
                    <h3 className="font-medium text-white mb-3">Text Color</h3>
                    <div className="flex gap-2 items-center">
                      <button 
                        className={`w-5 h-5 rounded-full bg-red-500 ${textElements[0]?.color === 'red' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          if (!originalImage) {
                            setError('Please upload an image first');
                            return;
                          }
                          setTextElements([{ 
                            ...textElements[0],
                            color: 'red'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-blue-500 ${textElements[0]?.color === 'blue' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          if (!originalImage) {
                            setError('Please upload an image first');
                            return;
                          }
                          setTextElements([{ 
                            ...textElements[0],
                            color: 'blue'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-green-500 ${textElements[0]?.color === 'green' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          if (!originalImage) {
                            setError('Please upload an image first');
                            return;
                          }
                          setTextElements([{ 
                            ...textElements[0],
                            color: 'green'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-yellow-500 ${textElements[0]?.color === 'yellow' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          if (!originalImage) {
                            setError('Please upload an image first');
                            return;
                          }
                          setTextElements([{ 
                            ...textElements[0],
                            color: 'yellow'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-orange-500 ${textElements[0]?.color === 'orange' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          if (!originalImage) {
                            setError('Please upload an image first');
                            return;
                          }
                          setTextElements([{ 
                            ...textElements[0],
                            color: 'orange'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-purple-500 ${textElements[0]?.color === 'purple' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          if (!originalImage) {
                            setError('Please upload an image first');
                            return;
                          }
                          setTextElements([{ 
                            ...textElements[0],
                            color: 'purple'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-white ${textElements[0]?.color === 'white' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          if (!originalImage) {
                            setError('Please upload an image first');
                            return;
                          }
                          setTextElements([{ 
                            ...textElements[0],
                            color: 'white'
                          }]);
                        }}
                      ></button>
                      <div className="relative flex-shrink-0">
                        <input
                          type="color"
                          value={textElements[0]?.color || '#ffffff'}
                          onChange={(e) => {
                            if (!originalImage) {
                              setError('Please upload an image first');
                              return;
                            }
                            setTextElements([{ 
                              ...textElements[0],
                              color: e.target.value
                            }]);
                          }}
                          className="w-5 h-5 p-0 border-0 rounded-full overflow-hidden cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:border-none absolute inset-0 opacity-0"
                          title="Choose custom color"
                        />
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                          <BsBrush className="w-2 h-2 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                    {/* Text Case Controls */}
                    <div className="p-3 border border-gray-700 rounded-lg mb-3">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-white">Text Case</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setTextElements([{
                            ...textElements[0],
                            text: textElements[0].text.toLowerCase().split(' ').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                            ).join(' ')
                          }]);
                        }}
                        className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                        title="Title Case"
                      >
                        Aa
                      </button>
                      <button
                        onClick={() => {
                          setTextElements([{
                            ...textElements[0],
                            text: textElements[0].text.toLowerCase()
                          }]);
                        }}
                        className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                        title="Lower Case"
                      >
                        aa
                      </button>
                      <button
                        onClick={() => {
                          setTextElements([{
                            ...textElements[0],
                            text: textElements[0].text.toUpperCase()
                          }]);
                        }}
                        className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                        title="Upper Case"
                      >
                        AA
                      </button>
                    </div>
                  </div>


                  {/* Text Stroke Controls */}
                  <div className="p-3 border border-gray-700 rounded-lg mb-3">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-white">Text Stroke</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 text-sm">{textElements[0]?.strokeWidth}px</span>
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="20" 
                      value={textElements[0]?.strokeWidth || 0}
                      onChange={(e) => {
                        setTextElements([{ 
                          ...textElements[0],
                          strokeWidth: parseInt(e.target.value)
                        }]);
                      }}
                      className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-4"
                    />
                    <div className="flex gap-2 items-center">
                      <button 
                        className={`w-5 h-5 rounded-full bg-red-500 ${textElements[0]?.strokeColor === 'red' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            strokeColor: 'red'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-blue-500 ${textElements[0]?.strokeColor === 'blue' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            strokeColor: 'blue'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-green-500 ${textElements[0]?.strokeColor === 'green' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            strokeColor: 'green'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-yellow-500 ${textElements[0]?.strokeColor === 'yellow' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            strokeColor: 'yellow'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-orange-500 ${textElements[0]?.strokeColor === 'orange' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            strokeColor: 'orange'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-purple-500 ${textElements[0]?.strokeColor === 'purple' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            strokeColor: 'purple'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-black ${textElements[0]?.strokeColor === 'black' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            strokeColor: 'black'
                          }]);
                        }}
                      ></button>
                      <div className="relative flex-shrink-0">
                        <input
                          type="color"
                          value={textElements[0]?.strokeColor || '#000000'}
                          onChange={(e) => {
                            setTextElements([{ 
                              ...textElements[0],
                              strokeColor: e.target.value
                            }]);
                          }}
                          className="w-5 h-5 p-0 border-0 rounded-full overflow-hidden cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:border-none absolute inset-0 opacity-0"
                          title="Choose custom stroke color"
                        />
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                          <BsBrush className="w-2 h-2 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Shadow Controls */}
                  <div className="p-3 border border-gray-700 rounded-lg mb-3">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-white">Text Shadow</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 text-sm">{textElements[0]?.shadowWidth}px</span>
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="20" 
                      value={textElements[0]?.shadowWidth || 0}
                      onChange={(e) => {
                        setTextElements([{ 
                          ...textElements[0],
                          shadowWidth: parseInt(e.target.value)
                        }]);
                      }}
                      className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-4"
                    />
                    <div className="flex gap-2 items-center">
                      <button 
                        className={`w-5 h-5 rounded-full bg-red-500 ${textElements[0]?.shadowColor === 'red' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            shadowColor: 'red'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-blue-500 ${textElements[0]?.shadowColor === 'blue' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            shadowColor: 'blue'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-green-500 ${textElements[0]?.shadowColor === 'green' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            shadowColor: 'green'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-yellow-500 ${textElements[0]?.shadowColor === 'yellow' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            shadowColor: 'yellow'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-orange-500 ${textElements[0]?.shadowColor === 'orange' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            shadowColor: 'orange'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-purple-500 ${textElements[0]?.shadowColor === 'purple' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            shadowColor: 'purple'
                          }]);
                        }}
                      ></button>
                      <button 
                        className={`w-5 h-5 rounded-full bg-black ${textElements[0]?.shadowColor === 'black' ? 'ring-1 ring-blue-500' : ''} flex-shrink-0 transition-all hover:scale-110`}
                        onClick={() => {
                          setTextElements([{ 
                            ...textElements[0],
                            shadowColor: 'black'
                          }]);
                        }}
                      ></button>
                      <div className="relative flex-shrink-0">
                        <input
                          type="color"
                          value={textElements[0]?.shadowColor || '#000000'}
                          onChange={(e) => {
                            setTextElements([{ 
                              ...textElements[0],
                              shadowColor: e.target.value
                            }]);
                          }}
                          className="w-5 h-5 p-0 border-0 rounded-full overflow-hidden cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:border-none absolute inset-0 opacity-0"
                          title="Choose custom shadow color"
                        />
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                          <BsBrush className="w-2 h-2 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Opacity Controls */}
                  <div className="p-3 border border-gray-700 rounded-lg mb-3">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-white">Text Opacity</h3>
                      <span className="text-gray-300 text-sm">{Math.round(textElements[0]?.opacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1"
                      value={textElements[0]?.opacity || 1}
                      onChange={(e) => {
                        setTextElements([{ 
                          ...textElements[0],
                          opacity: parseFloat(e.target.value)
                        }]);
                      }}
                      className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Background Blur Controls */}
                  <div className="p-3 border border-gray-700 rounded-lg mb-3">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-white">Background Blur</h3>
                      <span className="text-gray-300 text-sm">{textElements[0]?.backgroundBlur}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="20" 
                      value={textElements[0]?.backgroundBlur || 0}
                      onChange={(e) => {
                        setTextElements([{ 
                          ...textElements[0],
                          backgroundBlur: parseInt(e.target.value)
                        }]);
                      }}
                      className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Text Orientation Controls */}
                  <div className="p-3 border border-gray-700 rounded-lg">
                    <h3 className="font-medium text-white mb-4">Text Position</h3>
                    
                    {/* Horizontal Position */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Horizontal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">Left</span>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={textElements[0]?.x || 50}
                          onChange={(e) => {
                            setTextElements([{ 
                              ...textElements[0],
                              x: parseInt(e.target.value)
                            }]);
                          }}
                          className="flex-grow h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-gray-400 text-xs">Right</span>
                      </div>
                    </div>

                    {/* Vertical Position */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Vertical</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">Up</span>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={textElements[0]?.y || 50}
                          onChange={(e) => {
                            setTextElements([{ 
                              ...textElements[0],
                              y: parseInt(e.target.value)
                            }]);
                          }}
                          className="flex-grow h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-gray-400 text-xs">Down</span>
                      </div>
                    </div>

                    {/* Rotation Control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">Rotation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">-180°</span>
                        <input 
                          type="range" 
                          min="-180" 
                          max="180" 
                          value={textElements[0]?.rotation || 0}
                          onChange={(e) => {
                            setTextElements([{ 
                              ...textElements[0],
                              rotation: parseInt(e.target.value)
                            }]);
                          }}
                          className="flex-grow h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-gray-400 text-xs">180°</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
