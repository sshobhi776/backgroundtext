'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { BsBrush } from 'react-icons/bs';
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
import { NextFont } from 'next/dist/compiled/@next/font';
import { createPortal } from 'react-dom';

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

interface Font {
  name: string;
  font: NextFont;
  style: string;
}

const fonts: Font[] = [
  { name: 'Righteous', font: righteous, style: 'Modern Display' },
  { name: 'Playfair', font: playfair, style: 'Elegant Serif' },
  { name: 'Oswald', font: oswald, style: 'Condensed' },
  { name: 'Montserrat', font: montserrat, style: 'Modern Sans' },
  { name: 'Dancing Script', font: dancingScript, style: 'Cursive' },
  { name: 'Abril Fatface', font: abrilFatface, style: 'Display' },
  { name: 'Permanent Marker', font: permanentMarker, style: 'Handwritten' },
  { name: 'Roboto', font: roboto, style: 'Clean Sans' },
  { name: 'Pacifico', font: pacifico, style: 'Fun Script' },
  { name: 'Anton', font: anton, style: 'Impact' },
  { name: 'Lora', font: lora, style: 'Classic Serif' },
  { name: 'Poppins', font: poppins, style: 'Modern Sans' },
  { name: 'Bebas Neue', font: bebasNeue, style: 'Tall Display' },
  { name: 'Comfortaa', font: comfortaa, style: 'Rounded' },
  { name: 'Satisfy', font: satisfy, style: 'Signature' }
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

interface ControlPanelProps {
  textElements: TextElement[];
  setTextElements: React.Dispatch<React.SetStateAction<TextElement[]>>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ textElements, setTextElements }) => {
  const [isFontOpen, setIsFontOpen] = useState(false);
  const fontButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [buttonRect, setButtonRect] = useState(null);

  useEffect(() => {
    if (isFontOpen && fontButtonRef.current) {
      setButtonRect(fontButtonRef.current.getBoundingClientRect());
    }
  }, [isFontOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFontOpen && !event.target.closest('[data-font-dropdown]')) {
        setIsFontOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isFontOpen]);

  return (
    <div className="w-full md:w-1/4 order-2 md:order-1">
      {/* Control Panel */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 h-[510px] overflow-y-auto shadow-xl">
        <h3 className="text-white text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Control Panel
        </h3>
        <div className="space-y-4 h-[410px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 hover:scrollbar-thumb-gray-500" style={{ position: 'relative' }}>
          
          {/* Font Style Controls */}
          <div className="p-2 border border-gray-700 rounded-lg mb-3">
            <div className="relative">
              <button
                onClick={() => setIsFontOpen(!isFontOpen)}
                className={`w-full p-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none flex items-center justify-between text-sm ${
                  fonts.find(f => f.name === textElements[0]?.fontFamily)?.font.className || fonts[0].font.className
                }`}
                style={{
                  fontFamily: fonts.find(f => f.name === textElements[0]?.fontFamily)?.font.style?.fontFamily || fonts[0].font.style?.fontFamily
                }}
              >
                <span>{fonts.find(f => f.name === textElements[0]?.fontFamily)?.name || 'Select Font'}</span>
                <FiChevronDown className={`transform transition-transform duration-200 ${isFontOpen ? 'rotate-180' : ''}`} />
              </button>
              {isFontOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-xl z-50 overflow-hidden">
                  <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
                    {fonts.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => {
                          setTextElements(prev => [{
                            ...prev[0],
                            fontFamily: font.name
                          }]);
                          setIsFontOpen(false);
                        }}
                        className={`w-full p-1.5 text-left hover:bg-gray-600/50 transition-colors text-sm ${
                          textElements[0]?.fontFamily === font.name ? 'bg-blue-500/20 text-blue-400' : 'text-white'
                        } ${font.font.className}`}
                        style={{
                          fontFamily: font.font.style?.fontFamily
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span>{font.name}</span>
                          <span className="text-xs text-gray-400">{font.style}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Text Size Controls */}
          <div className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 mb-6" style={{ position: 'relative', zIndex: 1 }}>
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
                setTextElements([{ ...textElements[0], fontSize: parseInt(e.target.value) }]);
              }}
              className="w-full h-1.5 bg-gray-600/50 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Color Controls */}
          <div className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <h3 className="font-medium text-white mb-3">Text Color</h3>
            <div className="grid grid-cols-7 gap-2">
              {[
                '#000000', // Black
                '#FF0000', // Red
                '#00FF00', // Lime Green
                '#0000FF', // Blue
                '#FFFF00', // Yellow
                '#FF00FF', // Magenta
                '#00FFFF', // Cyan
                '#FFA500', // Orange
                '#800080', // Purple
                '#008000', // Green
                '#FFC0CB', // Pink
                '#A52A2A', // Brown
                '#FFFFFF', // White
                
              ].map((color, index) => (
                <button 
                  key={index}
                  className={`w-6 h-6 rounded-full transition-all hover:scale-110 hover:shadow-lg ${
                    textElements[0]?.color === color ? 'ring-2 ring-blue-500 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color === 'custom' ? '#ffffff' : color }}
                  title={color === 'custom' ? 'Custom color picker' : color}
                  onClick={() => {
                    if (color === 'custom') return;
                    setTextElements([{ 
                      ...textElements[0], 
                      color: color 
                    }]);
                  }}
                />
              ))}
              {/* Custom color picker */}
              <div className="relative">
                <input
                  type="color"
                  value={textElements[0]?.color || '#ffffff'}
                  onChange={(e) => setTextElements([{ ...textElements[0], color: e.target.value }])}
                  className="opacity-0 absolute inset-0 w-6 h-6 cursor-pointer"
                />
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 flex items-center justify-center hover:scale-110 transition-all">
                  <BsBrush className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Style Controls */}
          <div className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-white">Text Style</h3>
            </div>
            <div className="flex gap-2">
            <button
                onClick={() => {
                  setTextElements([{
                    ...textElements[0],
                    isBold: !textElements[0].isBold
                  }]);
                }}
                className={`flex-1 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg text-sm font-medium transition-colors ${
                  textElements[0].isBold ? 'bg-blue-500/50 text-white' : ''
                }`}
                title="Bold"
              >
                B
              </button>
              <button
                onClick={() => {
                  setTextElements([{
                    ...textElements[0],
                    text: textElements[0].text.toLowerCase().split(' ').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')
                  }]);
                }}
                className="flex-1 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                title="Capitalize Words"
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
                className="flex-1 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                title="Lowercase"
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
                className="flex-1 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                title="Uppercase"
              >
                AA
              </button>

            </div>
          </div>

          {/* Position Controls */}
          <div className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <h3 className="font-medium text-white mb-4">Text Position</h3>
            
            {/* Horizontal Position */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Horizontal</span>
                <span className="text-gray-400 text-xs">{textElements[0]?.x}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={textElements[0]?.x || 50}
                onChange={(e) => setTextElements([{ 
                  ...textElements[0], 
                  x: parseInt(e.target.value) 
                }])}
                className="w-full h-1.5 bg-gray-600/50 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Vertical Position */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Vertical</span>
                <span className="text-gray-400 text-xs">{textElements[0]?.y}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={textElements[0]?.y || 50}
                onChange={(e) => setTextElements([{ 
                  ...textElements[0], 
                  y: parseInt(e.target.value) 
                }])}
                className="w-full h-1.5 bg-gray-600/50 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Rotation */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Rotation</span>
                <span className="text-gray-400 text-xs">{textElements[0]?.rotation}°</span>
              </div>
              <input 
                type="range" 
                min="-180" 
                max="180" 
                value={textElements[0]?.rotation || 0}
                onChange={(e) => setTextElements([{ 
                  ...textElements[0], 
                  rotation: parseInt(e.target.value) 
                }])}
                className="w-full h-1.5 bg-gray-600/50 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>


          {/* Effects Controls */}
          <div className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <h3 className="font-medium text-white mb-4">Effects</h3>
            
            {/* Opacity */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Opacity</span>
                <span className="text-gray-400 text-xs">
                  {Math.round(textElements[0]?.opacity * 100)}%
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                value={textElements[0]?.opacity || 1}
                onChange={(e) => setTextElements([{ 
                  ...textElements[0], 
                  opacity: parseFloat(e.target.value) 
                }])}
                className="w-full h-1.5 bg-gray-600/50 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Text Shadow */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Shadow Width</span>
                <span className="text-gray-400 text-xs">{textElements[0]?.shadowWidth}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                value={textElements[0]?.shadowWidth || 0}
                onChange={(e) => setTextElements([{ 
                  ...textElements[0], 
                  shadowWidth: parseInt(e.target.value) 
                }])}
                className="w-full h-1.5 bg-gray-600/50 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-2"
              />
              {textElements[0]?.shadowWidth > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-300 text-sm">Shadow Color</span>
                  <div className="relative ml-auto">
                    <input
                      type="color"
                      value={textElements[0]?.shadowColor || '#000000'}
                      onChange={(e) => setTextElements([{ 
                        ...textElements[0], 
                        shadowColor: e.target.value 
                      }])}
                      className="opacity-0 absolute inset-0 w-6 h-6 cursor-pointer"
                    />
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-600 hover:scale-110 transition-all"
                      style={{ backgroundColor: textElements[0]?.shadowColor || '#000000' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Glow Effect */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Glow Intensity</span>
                <span className="text-gray-400 text-xs">{textElements[0]?.glowIntensity || 0}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={textElements[0]?.glowIntensity || 0}
                onChange={(e) => setTextElements([{ 
                  ...textElements[0], 
                  glowIntensity: parseInt(e.target.value) 
                }])}
                className="w-full h-1.5 bg-gray-600/50 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-2"
              />
              {(textElements[0]?.glowIntensity || 0) > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-300 text-sm">Glow Color</span>
                  <div className="relative ml-auto">
                    <input
                      type="color"
                      value={textElements[0]?.glowColor || '#ffffff'}
                      onChange={(e) => setTextElements([{ 
                        ...textElements[0], 
                        glowColor: e.target.value 
                      }])}
                      className="opacity-0 absolute inset-0 w-6 h-6 cursor-pointer"
                    />
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-600 hover:scale-110 transition-all"
                      style={{ backgroundColor: textElements[0]?.glowColor || '#ffffff' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Background Blur */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Background Blur</span>
                <span className="text-gray-400 text-xs">{textElements[0]?.backgroundBlur}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                value={textElements[0]?.backgroundBlur || 0}
                onChange={(e) => setTextElements([{ 
                  ...textElements[0], 
                  backgroundBlur: parseInt(e.target.value) 
                }])}
                className="w-full h-1.5 bg-gray-600/50 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          
          
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;