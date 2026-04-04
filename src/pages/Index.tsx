import { motion } from "framer-motion";
import { ArrowRight, Shield, Truck, HeadphonesIcon, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  { icon: Shield, title: "Genuine Products", desc: "100% authentic products with manufacturer warranty" },
  { icon: Truck, title: "Fast Delivery", desc: "Same day delivery across Jabalpur" },
  { icon: HeadphonesIcon, title: "Expert Support", desc: "Dedicated tech support for all purchases" },
  { icon: Award, title: "Best Prices", desc: "Competitive pricing with price match guarantee" },
];

const Index = () => {
  const products = getProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen">
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
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
      <section className="py-20 bg-card/30">
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
    </div>
  );
};

export default Index;
