import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Truck, HeadphonesIcon, Award, Star, Instagram, Youtube, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.jpg";

const features = [
  { icon: Shield, title: "Genuine Products", desc: "100% authentic products with manufacturer warranty" },
  { icon: Truck, title: "Fast Delivery", desc: "Same day delivery across Jabalpur" },
  { icon: HeadphonesIcon, title: "Expert Support", desc: "Dedicated tech support for all purchases" },
  { icon: Award, title: "Best Prices", desc: "Competitive pricing with price match guarantee" },
];

const reviews = [
  { name: "Rahul Sharma", rating: 5, text: "Best electronics store in Jabalpur! Got my gaming laptop at an amazing price with great after-sales support.", avatar: "RS" },
  { name: "Priya Patel", rating: 5, text: "Excellent service and genuine products. The team helped me choose the perfect laptop for my design work.", avatar: "PP" },
  { name: "Amit Jain", rating: 5, text: "I've been buying from Global Enterprises for 3 years. Always reliable, always the best deals!", avatar: "AJ" },
  { name: "Sneha Gupta", rating: 4, text: "Great collection of laptops and accessories. Fast delivery within Jabalpur. Highly recommended!", avatar: "SG" },
];

const instagramReels = [
  { id: 1, title: "Unboxing HP Pavilion 2024", thumbnail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=400&fit=crop" },
  { id: 2, title: "Dell vs Lenovo Comparison", thumbnail: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&h=400&fit=crop" },
  { id: 3, title: "Best Gaming Laptops Under 60K", thumbnail: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=400&fit=crop" },
  { id: 4, title: "MacBook Air M3 Review", thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=400&fit=crop" },
];

const Index = () => {
  const products = getProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const { scrollYProgress } = useScroll();

  // Scroll-based color interpolation for background
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "hsl(220, 20%, 7%)",
      "hsl(220, 18%, 10%)",
      "hsl(220, 16%, 14%)",
      "hsl(220, 14%, 12%)",
      "hsl(220, 16%, 10%)",
      "hsl(220, 20%, 7%)",
    ]
  );

  return (
    <motion.div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5 blur-3xl"
              style={{
                width: 300 + i * 100,
                height: 300 + i * 100,
                top: `${20 + i * 20}%`,
                left: `${60 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="relative container mx-auto px-4 py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-6"
              >
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Jabalpur's #1 Electronics Store</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
                <span className="text-gradient">Premium Tech</span>
                <br />
                <span className="text-foreground">for Everyone</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Discover the latest laptops, desktops, and accessories from top brands. Expert guidance, genuine products, unbeatable prices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/25"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-accent text-accent font-heading font-bold transition-all hover:bg-accent/10"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            {/* Logo on right side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden md:flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110" />
                <img
                  src={logo}
                  alt="Global Enterprises"
                  className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-primary/20 shadow-2xl shadow-primary/20"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-primary text-sm font-medium mb-2">FEATURED</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold">Trending Products</h2>
              </div>
              <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-medium mb-2">WHY CHOOSE US</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">The Global Advantage</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <ScrollReveal key={feat.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 text-center space-y-3"
                >
                  <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground">{feat.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-medium mb-2">TESTIMONIALS</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">What Our Customers Say</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 space-y-4 h-full"
                >
                  <Quote className="w-8 h-8 text-primary/30" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-heading font-bold">{review.name}</p>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Reels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Instagram className="w-5 h-5 text-pink-400" />
                <p className="text-pink-400 text-sm font-medium">INSTAGRAM</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Latest Reels & Updates</h2>
              <p className="text-muted-foreground mt-2">Follow us <a href="https://instagram.com/globalenterprises" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">@globalenterprises</a></p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramReels.map((reel, i) => (
              <ScrollReveal key={reel.id} delay={i * 0.1}>
                <motion.a
                  href="https://instagram.com/globalenterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="relative block rounded-xl overflow-hidden group aspect-[3/4]"
                >
                  <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-xs font-heading font-bold line-clamp-2">{reel.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Instagram className="w-3 h-3 text-pink-400" />
                      <span className="text-[10px] text-muted-foreground">Reel</span>
                    </div>
                  </div>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <p className="text-red-500 text-sm font-medium">YOUTUBE</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Watch Our Reviews</h2>
              <p className="text-muted-foreground mt-2">Subscribe to our <a href="https://youtube.com/@globalenterprises" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">YouTube Channel</a></p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal direction="left">
              <div className="glass-card overflow-hidden rounded-2xl aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Product Review"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="glass-card overflow-hidden rounded-2xl aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Laptop Comparison"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="glass-card p-1 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600"
                  alt="Our Store"
                  className="w-full h-72 md:h-96 object-cover rounded-xl"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <p className="text-primary text-sm font-medium">ABOUT US</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold">
                  Trusted by <span className="text-gradient">Thousands</span> in Jabalpur
                </h2>
                <p className="text-muted-foreground">
                  Since 2010, Global Enterprises has been Jabalpur's go-to destination for premium electronics. We bring you genuine products from top brands with expert guidance and after-sales support.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
