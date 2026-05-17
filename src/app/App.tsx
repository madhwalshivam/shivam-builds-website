import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
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

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <Toaster position="top-center" richColors theme="dark" />
      
      {!isAdminRoute && <Navigation onBookNow={() => setIsPopUpOpen(true)} />}
      
      <Routes>
        <Route path="/" element={<Home onBookNow={() => setIsPopUpOpen(true)} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Academics />} />
        <Route path="/services/:slug" element={<ServiceDetail onBookNow={() => setIsPopUpOpen(true)} />} />
        
        {/* Blog Routes */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/new" element={<BlogEditor />} />
          <Route path="/admin/edit/:id" element={<BlogEditor />} />
        </Route>
        
        <Route path="/contact" element={<Contact />} />
      </Routes>

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