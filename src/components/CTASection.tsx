import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useContent } from "@/hooks/useSiteContent";

export function CTASection() {
  const { content: title } = useContent("home", "cta", "title", "Let's Build What's Next in Education");
  const { content: ctaSubtitle } = useContent("home", "cta", "subtitle", "Partner with our team of education specialists to create lasting change.");
  const { content: buttonText } = useContent("home", "cta", "button_text", "Talk With Our Team");
  const { content: email } = useContent("home", "cta", "email", "info@acespdsi.org");
  const { content: phone } = useContent("home", "cta", "phone", "(203) 407-4400");
  return (
    <section className="py-20 md:py-28 section-brand relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-xl font-medium text-white/90 mb-10">
            {ctaSubtitle}
          </p>
          
          <div className="flex justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 rounded-full group"
            >
              <Link to="/contact">
                {buttonText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* Contact */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-lg font-medium">
              <Mail className="w-5 h-5" />
              {email}
            </a>
            <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-lg font-medium">
              <Phone className="w-5 h-5" />
              {phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
