import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Product } from "@/data/products";
import { addToCart } from "@/data/cart";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({ title: "Added to cart", description: product.name });
  };

  const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi! I'm interested in ${product.name} (₹${product.price.toLocaleString("en-IN")}). Is it available?`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/products/${product.id}`} className="block group">
        <div className="glass-card overflow-hidden hover-lift">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-primary font-medium">{product.brand}</p>
                <h3 className="font-heading font-bold text-sm leading-tight">{product.name}</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                {product.category}
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{product.specs}</p>
            <p className="text-lg font-heading font-bold text-primary">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold transition-all hover:brightness-110"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center px-3 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-bold transition-all hover:brightness-110"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
