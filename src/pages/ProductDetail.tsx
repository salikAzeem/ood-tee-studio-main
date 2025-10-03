import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number; 
  category: string;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  featured?: boolean;
}

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetch('/data/products.json')
        .then(res => res.json())
        .then(data => {
          const foundProduct = data.products.find((p: Product) => p.id === parseInt(id));
          setProduct(foundProduct || null);
          if (foundProduct) {
            setSelectedSize(foundProduct.sizes[0] || '');
            setSelectedColor(foundProduct.colors[0] || '');
          }
        });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button asChild variant="outline">
            <Link to="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary' 
                      : 'border-transparent hover:border-border'
                  }`}
                >
                  <img
                    src={image}
                    alt={`₹{product.name} ₹{index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
  {/* Discounted Price */}
  <span className="text-3xl font-bold text-primary">
    ₹{product.price.toFixed(2)}
  </span>

  {/* Original Price (strike-through) */}
  {product.original_price && (
    <span className="text-xl line-through text-muted-foreground">
      ₹{product.original_price.toFixed(2)}
    </span>
  )}

  {/* Discount % */}
  {product.original_price && (
    <span className="text-lg text-green-600 font-semibold">
      {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
    </span>
  )}
</div>

<p className="text-sm text-muted-foreground">Inclusive of all taxes</p>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(128 reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-2">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-2">Color</h3>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map(color => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 btn-primary"
                size="lg"
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Customize Link */}
            <div className="border-t border-border pt-6">
              <div className="bg-primary-muted rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Want to customize this design?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Add your own stickers and create a unique look!
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/customize">
                    Start Customizing
                  </Link>
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
              <div className="space-y-2">
                <p><span className="font-semibold">Material:</span> 100% Cotton</p>
                <p><span className="font-semibold">Fit:</span> Regular</p>
              </div>
              <div className="space-y-2">
                <p><span className="font-semibold">Care:</span> Machine Wash</p>
                <p><span className="font-semibold">Made in:</span> USA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};