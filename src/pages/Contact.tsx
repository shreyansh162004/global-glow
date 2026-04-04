import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium mb-2">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">Get in Touch</h1>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <ScrollReveal direction="left">
          <div className="glass-card p-8 space-y-6">
            <h2 className="text-xl font-heading font-bold">Contact Information</h2>
            <div className="space-y-4">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm">+91 98765 43210</p>
                </div>
              </a>
              <a href="mailto:info@globalenterprises.in" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm">info@globalenterprises.in</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Address</p>
                  <p className="text-sm">Wright Town, Jabalpur, MP 482002</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Working Hours</p>
                  <p className="text-sm">Mon–Sat: 10AM – 8PM</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className="glass-card overflow-hidden rounded-xl h-full min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117251.51707842882!2d79.87786295!3d23.1814876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae1a5a04ff23%3A0x5c8e3c00afb8a1f0!2sJabalpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 300 }}
              allowFullScreen
              loading="lazy"
              title="Location"
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
);

export default Contact;
