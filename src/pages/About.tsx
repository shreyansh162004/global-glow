import { motion } from "framer-motion";
import { Award, Users, Clock, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { icon: Clock, value: "14+", label: "Years Experience" },
  { icon: Users, value: "10K+", label: "Happy Customers" },
  { icon: Award, value: "50+", label: "Brand Partners" },
  { icon: MapPin, value: "1", label: "Prime Location" },
];

const About = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-medium mb-2">ABOUT US</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Your Trusted <span className="text-gradient">Tech Partner</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Global Enterprises has been Jabalpur's premier electronics destination since 2010. We combine deep technical expertise with genuine products and exceptional after-sales service.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <motion.div whileHover={{ y: -5 }} className="glass-card p-6 text-center">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-heading font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto space-y-4 text-muted-foreground">
          <h2 className="text-2xl font-heading font-bold text-foreground">Our Story</h2>
          <p>
            Founded in 2010, Global Enterprises started with a simple vision: to provide Jabalpur with access to the latest technology at fair prices, backed by honest advice.
          </p>
          <p>
            Over the years, we've grown into a full-service electronics store carrying laptops, desktops, monitors, printers, and accessories from all major brands including HP, Dell, Lenovo, Apple, Asus, Acer, and MSI.
          </p>
          <p>
            What sets us apart is our commitment to customer satisfaction. Every purchase comes with expert setup assistance, warranty support, and our promise of genuine products.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </div>
);

export default About;
