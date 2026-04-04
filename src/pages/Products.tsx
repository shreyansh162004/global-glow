import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProducts, brands, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { SlidersHorizontal, X } from "lucide-react";

const priceRanges = [
  { label: "All Prices", min: 0, max: 999999 },
  { label: "Under ₹30K", min: 0, max: 30000 },
  { label: "₹30K – ₹50K", min: 30000, max: 50000 },
  { label: "₹50K – ₹80K", min: 50000, max: 80000 },
  { label: "₹80K+", min: 80000, max: 999999 },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState<string>(searchParams.get("brand") || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const products = getProducts();

  useEffect(() => {
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (brand) setSelectedBrand(brand);
    if (minPrice && maxPrice) {
      const min = parseInt(minPrice);
      const max = parseInt(maxPrice);
      const idx = priceRanges.findIndex((r) => r.min === min && r.max === max);
      if (idx !== -1) setSelectedPrice(idx);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      const range = priceRanges[selectedPrice];
      if (p.price < range.min || p.price > range.max) return false;
      return true;
    });
  }, [products, selectedBrand, selectedCategory, selectedPrice]);

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedPrice(0);
  };

  const hasFilters = selectedBrand || selectedCategory || selectedPrice > 0;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold">Our Products</h1>
            <p className="text-muted-foreground mt-2">
              Browse our collection of premium electronics
            </p>
          </div>
        </ScrollReveal>

        {/* Filter toggle (mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-secondary text-sm font-medium"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <motion.aside
            className={`w-full md:w-64 shrink-0 space-y-6 ${showFilters ? "block" : "hidden md:block"}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-card p-4 space-y-5">
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <X className="w-3 h-3" /> Clear filters
                </button>
              )}

              <div>
                <h3 className="text-sm font-heading font-bold mb-2">Price Range</h3>
                <div className="space-y-1">
                  {priceRanges.map((range, i) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPrice(i)}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                        selectedPrice === i ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-heading font-bold mb-2">Brand</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedBrand("")}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                      !selectedBrand ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                        selectedBrand === brand ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-heading font-bold mb-2">Category</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                      !selectedCategory ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                        selectedCategory === cat ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} products found</p>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No products match your filters</p>
                <button onClick={clearFilters} className="text-primary text-sm mt-2 hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
