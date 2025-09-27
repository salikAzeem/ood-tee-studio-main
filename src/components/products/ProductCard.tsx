import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="product-card overflow-hidden">
          {/* Image Section */}
          <div className="relative overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Featured Badge */}
            {product.featured && (
              <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                Featured
              </Badge>
            )}

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Add to Cart */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                onClick={handleQuickAdd}
                className="w-full btn-primary"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {product.category}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                ₹{product.price.toFixed(2)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};