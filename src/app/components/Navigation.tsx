import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { AdmissionDialog } from "./AdmissionDialog";
import { AnimatePresence } from "motion/react";

const services = [
  { label: "Web Development", href: "/services/web-dev" },
  { label: "Software Development", href: "/services/soft-dev" },
  { label: "CRM Solutions", href: "/services/crm" },
  { label: "School ERP", href: "/services/erp" },
  { label: "Meta Ads & Marketing", href: "/services/meta-ads" },
  { label: "Graphic Design", href: "/services/graphic-design" },
  { label: "App Development", href: "/services/app-dev" },
  { label: "E-commerce Solutions", href: "/services/ecommerce" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", subLinks: services },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

interface NavigationProps {
  onBookNow?: () => void;
}

export function Navigation({ onBookNow }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On home page, transparent until scroll. On subpages, solid or blurred background.
  const navBackground = isHomePage 
    ? (isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent")
    : "bg-black/90 backdrop-blur-xl shadow-2xl border-b border-white/5";

  const navPadding = isScrolled ? "py-2" : "py-4";

  const textColor = "text-white"; 

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
      >
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 ${navPadding}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white p-1 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <img src="/assets/logo.png" alt="Shivam Builds" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h1
                  className={`${textColor} truncate`}
                  style={{ fontSize: 'clamp(1rem, 5vw, 1.5rem)', fontWeight: 700, lineHeight: 1.1 }}
                >
                  shivambuilds.in
                </h1>
                <p
                  className="text-white/70 truncate"
                  style={{ fontSize: 'clamp(0.5rem, 2vw, 0.65rem)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                >
                  Design • Develop • Market
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <div 
                  key={link.label}
                  className="relative py-4"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 transition-all duration-300 hover:text-[#3B82F6] text-sm font-semibold ${textColor} ${
                      location.pathname.startsWith(link.href) ? "text-[#3B82F6]" : ""
                    }`}
                  >
                    {link.label}
                    {link.subLinks && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${hoveredLink === link.label ? "rotate-180" : ""}`} />}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.subLinks && hoveredLink === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-[#3B82F6]/10 rounded-xl transition-all duration-300"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={onBookNow}
                size="sm"
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white border-none rounded-xl px-5 font-bold h-9 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${textColor} hover:bg-white/10`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
    <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0, 
          x: isMobileMenuOpen ? 0 : "100%",
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 top-0 bg-black/95 backdrop-blur-2xl z-[60] md:hidden overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white p-1">
                <img src="/assets/logo.png" alt="Shivam Builds" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-white font-bold text-lg">shivambuilds.in</h1>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="p-8 space-y-4">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : 20 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between py-4">
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-light transition-colors ${
                        location.pathname.startsWith(link.href) ? "text-[#3B82F6] font-medium" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.subLinks && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setHoveredLink(hoveredLink === link.label ? null : link.label);
                        }}
                        className="p-2 text-white"
                      >
                        <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${hoveredLink === link.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {link.subLinks && hoveredLink === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white/5 rounded-2xl"
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-4 px-6 text-xl text-white/70 hover:text-white"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
              transition={{ delay: navLinks.length * 0.1 }}
              className="pt-8"
            >
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookNow?.();
                }}
                size="lg"
                className="w-full h-16 bg-[#3B82F6] hover:bg-white text-white font-bold rounded-2xl text-xl shadow-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                Book Now
              </Button>
            </motion.div>

            <div className="pt-12 grid grid-cols-2 gap-4">
              <a href="tel:+919991540996" className="flex flex-col items-center p-4 rounded-2xl bg-white/5 text-white gap-2">
                <Phone className="w-6 h-6 text-[#3B82F6]" />
                <span className="text-xs">Call Us</span>
              </a>
              <a href="mailto:shivambuilds@gmail.com" className="flex flex-col items-center p-4 rounded-2xl bg-white/5 text-white gap-2">
                <Mail className="w-6 h-6 text-[#3B82F6]" />
                <span className="text-xs">Email</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
