import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { AdmissionDialog } from "./components/AdmissionDialog";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";

// Admin Pages
import { ProtectedRoute } from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogEditor from "./pages/admin/BlogEditor";
import AdminBookings from "./pages/admin/AdminBookings";

// Smooth page transition wrapper with automatic scroll restoration
function PageTransition({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return;

    // Check if popup was already shown in this session
    const hasShown = sessionStorage.getItem("popup_shown");
    if (hasShown) return;

    // Open after 10 seconds on first load (more subtle)
    const initialTimer = setTimeout(() => {
      setIsPopUpOpen(true);
      sessionStorage.setItem("popup_shown", "true");
    }, 10000);

    return () => clearTimeout(initialTimer);
  }, [isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) {
      const canonicalLink = document.querySelector("link[rel='canonical']");
      if (canonicalLink) {
        canonicalLink.remove();
      }
      return;
    }

    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }

    const siteUrl = "https://www.shivambuilds.in";
    const cleanPath = location.pathname === "/" ? "" : location.pathname.replace(/\/+$/, "");
    const canonicalUrl = `${siteUrl}${cleanPath}`;
    
    canonicalLink.setAttribute("href", canonicalUrl);
  }, [location.pathname, isAdminRoute]);

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <Toaster position="top-center" richColors theme="dark" />
      
      {!isAdminRoute && <Navigation onBookNow={() => setIsPopUpOpen(true)} />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home onBookNow={() => setIsPopUpOpen(true)} /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Academics /></PageTransition>} />
          <Route path="/services/:slug" element={<PageTransition><ServiceDetail onBookNow={() => setIsPopUpOpen(true)} /></PageTransition>} />
          
          {/* Blog Routes */}
          <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
          <Route path="/blogs/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
            <Route path="/admin/bookings" element={<PageTransition><AdminBookings /></PageTransition>} />
            <Route path="/admin/new" element={<PageTransition><BlogEditor /></PageTransition>} />
            <Route path="/admin/edit/:id" element={<PageTransition><BlogEditor /></PageTransition>} />
          </Route>
          
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      {!isAdminRoute && (
        <>
          <Footer onBookNow={() => setIsPopUpOpen(true)} />
          <ScrollToTop />
          <AdmissionDialog isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}