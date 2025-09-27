import { useState, useEffect } from 'react';
import { ShoppingCart, Download, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Sticker {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

interface StickerCategory {
  id: string;
  name: string;
  color: string;
}

interface PlacedSticker {
  id: number;
  sticker: Sticker;
  position: { x: number; y: number };
  scale: number;
}

export const Customize = () => {
  const { addItem } = useCart();
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [categories, setCategories] = useState<StickerCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [selectedSticker, setSelectedSticker] = useState<PlacedSticker | null>(null);
  const [tshirtColor, setTshirtColor] = useState('white');
  const [tshirtSize, setTshirtSize] = useState('M');

  useEffect(() => {
    fetch('/data/stickers.json')
      .then(res => res.json())
      .then(data => {
        setStickers(data.stickers);
        setCategories(data.categories);
      });
  }, []);

  const filteredStickers = selectedCategory === 'all' 
    ? stickers 
    : stickers.filter(sticker => sticker.category === selectedCategory);

  const handleStickerClick = (sticker: Sticker) => {
    const newPlacedSticker: PlacedSticker = {
      id: Date.now(),
      sticker,
      position: { x: 150, y: 150 },
      scale: 1,
    };
    setPlacedStickers([...placedStickers, newPlacedSticker]);
  };

  const handleStickerMove = (id: number, newPosition: { x: number; y: number }) => {
    setPlacedStickers(prev =>
      prev.map(item =>
        item.id === id ? { ...item, position: newPosition } : item
      )
    );
  };

  const handleRemoveSticker = (id: number) => {
    setPlacedStickers(prev => prev.filter(item => item.id !== id));
    setSelectedSticker(null);
  };

  const calculateTotal = () => {
    const basePrice = 29.99; // Base t-shirt price
    const stickersTotal = placedStickers.reduce((sum, item) => sum + item.sticker.price, 0);
    return basePrice + stickersTotal;
  };

  const handleAddToCart = () => {
    const customTshirt = {
      id: Date.now(),
      name: `Custom T-Shirt with ${placedStickers.length} sticker${placedStickers.length !== 1 ? 's' : ''}`,
      price: calculateTotal(),
      image: '/placeholder.svg',
      size: tshirtSize,
      color: tshirtColor,
      customization: {
        stickers: placedStickers.map(item => ({
          id: item.sticker.id,
          name: item.sticker.name,
          price: item.sticker.price,
          position: item.position,
        })),
      },
    };

    addItem(customTshirt);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Customize Your T-Shirt
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Select stickers and position them on your t-shirt to create a unique design
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stickers Library */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Sticker Library</h2>
              
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Stickers Grid */}
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {filteredStickers.map((sticker) => (
                  <motion.div
                    key={sticker.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleStickerClick(sticker)}
                  >
                    <img
                      src={sticker.image}
                      alt={sticker.name}
                      className="w-full h-16 object-cover rounded mb-2"
                    />
                    <p className="text-xs font-medium truncate">{sticker.name}</p>
                    <p className="text-xs text-primary font-semibold">₹{sticker.price}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* T-Shirt Canvas */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Design Preview</h2>
              
              {/* T-Shirt Options */}
              <div className="flex space-x-4 mb-4">
                <Select value={tshirtColor} onValueChange={setTshirtColor}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="navy">Navy</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={tshirtSize} onValueChange={setTshirtSize}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                    <SelectItem value="XXL">XXL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* T-Shirt Canvas */}
              <div 
                className={`relative mx-auto w-80 h-96 rounded-lg border-2 border-dashed border-border overflow-hidden ${
                  tshirtColor === 'white' ? 'bg-white' :
                  tshirtColor === 'black' ? 'bg-black' :
                  tshirtColor === 'gray' ? 'bg-gray-400' :
                  'bg-blue-900'
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v40c11.046 0 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              >
                {/* T-Shirt Shape Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg viewBox="0 0 320 384" className="w-full h-full">
                    <path
                      d="M80 40 L240 40 L280 80 L280 384 L40 384 L40 80 Z"
                      fill="none"
                      stroke={tshirtColor === 'white' ? '#e5e7eb' : '#ffffff40'}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>

                {/* Placed Stickers */}
                <AnimatePresence>
                  {placedStickers.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: item.scale, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      drag
                      dragMomentum={false}
                      onDrag={(event, info) => {
                        const rect = (event.target as HTMLElement).parentElement?.getBoundingClientRect();
                        if (rect) {
                          const x = Math.max(0, Math.min(rect.width - 40, item.position.x + info.delta.x));
                          const y = Math.max(0, Math.min(rect.height - 40, item.position.y + info.delta.y));
                          handleStickerMove(item.id, { x, y });
                        }
                      }}
                      className={`absolute w-10 h-10 cursor-move border-2 border-transparent hover:border-primary ${
                        selectedSticker?.id === item.id ? 'border-primary' : ''
                      }`}
                      style={{
                        left: item.position.x,
                        top: item.position.y,
                      }}
                      onClick={() => setSelectedSticker(item)}
                    >
                      <img
                        src={item.sticker.image}
                        alt={item.sticker.name}
                        className="w-full h-full object-cover rounded"
                        draggable={false}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Instructions */}
                {placedStickers.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                    <div className="text-muted-foreground">
                      <p className="font-medium mb-2">Click stickers to add them</p>
                      <p className="text-sm">Drag to position them on your t-shirt</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Sticker Controls */}
              {selectedSticker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{selectedSticker.sticker.name}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveSticker(selectedSticker.id)}
                    >
                      Remove
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ₹{selectedSticker.sticker.price.toFixed(2)}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                {/* Base T-Shirt */}
                <div className="flex justify-between items-center">
                  <span>Base T-Shirt ({tshirtSize}, {tshirtColor})</span>
                  <span>$29.99</span>
                </div>

                {/* Added Stickers */}
                {placedStickers.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span>{item.sticker.name}</span>
                    <span>₹{item.sticker.price.toFixed(2)}</span>
                  </div>
                ))}

                {placedStickers.length === 0 && (
                  <p className="text-muted-foreground text-sm italic">
                    No stickers added yet
                  </p>
                )}

                <hr className="border-border" />

                {/* Total */}
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{calculateTotal().toFixed(2)}</span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full btn-primary"
                    size="lg"
                    disabled={placedStickers.length === 0}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Save Design
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPlacedStickers([])}
                      disabled={placedStickers.length === 0}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-primary-muted rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Design Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Click stickers from the library to add them</li>
                  <li>• Drag stickers to reposition them</li>
                  <li>• Click on placed stickers to select and remove</li>
                  <li>• Try different t-shirt colors for contrast</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};