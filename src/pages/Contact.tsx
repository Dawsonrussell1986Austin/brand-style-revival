import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import heroImage from "@/assets/teacher-classroom.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 min-h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Educators collaborating" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-aces-navy/90 via-aces-navy/80 to-aces-navy/70" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-aces-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-aces-blue/20 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <MessageCircle className="w-4 h-4 text-aces-green" />
              <span className="text-sm text-white/90 font-medium">Get In Touch</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
              Let's Connect!
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Have questions? We're here to guide you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
              <div className="grid lg:grid-cols-[1fr_320px]">
                {/* Form */}
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-bold font-heading text-aces-navy mb-8">
                    Send Us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-aces-navy font-medium">
                        Your name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-border focus:border-aces-blue"
                        placeholder="Enter your full name"
                        maxLength={100}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-aces-navy font-medium">
                        Your email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-border focus:border-aces-blue"
                        placeholder="Enter your email address"
                        maxLength={255}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-aces-navy font-medium">
                        Subject <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-border focus:border-aces-blue"
                        placeholder="What is this about?"
                        maxLength={200}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-aces-navy font-medium">
                        Your message <span className="text-muted-foreground">(optional)</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[150px] rounded-xl border-border focus:border-aces-blue resize-none"
                        placeholder="Tell us more about your inquiry..."
                        maxLength={2000}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="gradient-aces text-white font-semibold px-8 h-12 rounded-xl btn-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit"}
                      {!isSubmitting && <Send className="ml-2 w-4 h-4" />}
                    </Button>
                  </form>
                </div>
                
                {/* Contact Info Sidebar */}
                <div className="bg-secondary/50 p-8 md:p-12 lg:border-l border-border">
                  <div className="space-y-8">
                    {/* Phone */}
                    <div>
                      <h3 className="text-lg font-bold font-heading text-aces-navy mb-3">
                        ACES PDSI
                      </h3>
                      <a 
                        href="tel:860-834-6147" 
                        className="flex items-center gap-3 text-muted-foreground hover:text-aces-blue transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-aces-blue/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-aces-blue" />
                        </div>
                        <span>860.834.6147 (Phone)</span>
                      </a>
                    </div>
                    
                    {/* Address */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Postal Address
                      </h4>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-aces-green/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-aces-green" />
                        </div>
                        <div className="text-aces-navy">
                          <p>205 Skiff Street</p>
                          <p>Hamden, CT</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Email
                      </h4>
                      <a 
                        href="mailto:info@acespdsi.org" 
                        className="flex items-center gap-3 text-muted-foreground hover:text-aces-blue transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-aces-blue/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-aces-blue" />
                        </div>
                        <span>info@acespdsi.org</span>
                      </a>
                    </div>
                    
                    {/* Social Links */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Follow Us
                      </h4>
                      <div className="flex gap-3">
                        <a 
                          href="https://facebook.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-aces-blue flex items-center justify-center text-white hover:bg-aces-blue/90 transition-colors shadow-lg"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                        <a 
                          href="https://instagram.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-aces-blue flex items-center justify-center text-white hover:bg-aces-blue/90 transition-colors shadow-lg"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a 
                          href="https://linkedin.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-aces-blue flex items-center justify-center text-white hover:bg-aces-blue/90 transition-colors shadow-lg"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
