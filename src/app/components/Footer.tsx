import { motion } from "motion/react";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const footerLinks = {
  about: [
    { label: "My Story", href: "#" },
    { label: "Experience", href: "#experience" },
    { label: "Portfolio", href: "#experience" },
    { label: "Client Testimonials", href: "#" },
  ],
  services: [
    { label: "Web Development", href: "#services" },
    { label: "Digital Marketing", href: "#services" },
    { label: "CRM Solutions", href: "#services" },
    { label: "App Development", href: "#services" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
  connect: [
    { label: "Book Now", href: "#" },
    { label: "Hire Me", href: "#" },
    { label: "Contact", href: "#" },
    { label: "FAQ", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

interface FooterProps {
  onBookNow?: () => void;
}

export function Footer({ onBookNow }: FooterProps) {
  return (
    <footer className="relative bg-black text-white pt-20 pb-8 border-t border-white/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B82F6] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2563EB] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg shadow-black/20">
                <img src="/assets/logo.png" alt="Shivam Builds" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.1 }}>
                  shivambuilds.in
                </h3>
                <p className="text-[#3B82F6] font-bold tracking-widest text-xs uppercase">
                  Freelance Excellence
                </p>
              </div>
            </div>
            <p className="text-[#94A3B8] mb-8 leading-relaxed italic border-l-2 border-[#3B82F6] pl-4">
              "Turning ideas into digital reality." Providing expert development and marketing 
              solutions for businesses worldwide with over 5 years of industry experience.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-1" />
                <p className="text-[#94A3B8]">
                  Delhi NCR, India
                </p>
              </div>
             
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#3B82F6] flex-shrink-0" />
                <p className="text-[#94A3B8]">shivambuilds@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                About
              </h4>
              <ul className="space-y-2">
                {footerLinks.about.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#3B82F6] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                Services
              </h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#3B82F6] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                Legal
              </h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#3B82F6] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                Connect
              </h4>
              <ul className="space-y-2">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={onBookNow}
                      className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors duration-300 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Campus Map Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="mb-2" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                Ready to scale your business?
              </h4>
              <p className="text-[#94A3B8]">
                Let's discuss your next project and build something extraordinary.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={onBookNow}
                className="px-6 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-colors duration-300 inline-block font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/70">
              © 2026 Shivam Builds. All rights reserved. | Empowering Businesses Digitally
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#3B82F6] hover:text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/5"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
