import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../../../lib/supabase";
import { 
  CheckCircle2, Trash2, Mail, Phone, Briefcase, Calendar, 
  Clock, BookOpen, LogOut, Menu, X, Search, FileText, ExternalLink, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [blogsCount, setBlogsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter bookings dynamically
    const filtered = bookings.filter(b => 
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [searchTerm, bookings]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);
      setFilteredBookings(bookingsData || []);

      // Fetch blogs count
      const { count, error: blogsError } = await supabase
        .from("blogs")
        .select("*", { count: "exact", head: true });

      if (!blogsError && count !== null) {
        setBlogsCount(count);
      }
    } catch (error: any) {
      toast.error("Failed to load bookings: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
      toast.success(`Request successfully marked as ${status}`);
    } catch (error: any) {
      toast.error("Failed to update status: " + error.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!bookingToDelete) return;
    try {
      const { error } = await supabase.from("bookings").delete().eq("id", bookingToDelete);
      if (error) throw error;
      setBookings(bookings.filter(b => b.id !== bookingToDelete));
      toast.success("Consultation record deleted");
    } catch (error: any) {
      toast.error("Failed to delete record: " + error.message);
    } finally {
      setBookingToDelete(null);
    }
  };

  const handleLogoutConfirm = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  // Local helper stats
  const completedCount = bookings.filter(b => b.status === "completed").length;
  const pendingCount = bookings.length - completedCount;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row relative">
      
      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden w-full bg-[#0A0A0A] border-b border-white/5 px-6 py-4 flex items-center justify-between z-40 sticky top-0">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Shivam Builds
        </h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl transition-all"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* ── SIDEBAR NAVIGATION ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col justify-between p-6 transform transition-transform duration-300 md:translate-x-0 md:static md:h-screen
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Shivam Builds
              </h1>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Admin Panel</p>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1 text-gray-500 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav Menu */}
          <nav className="space-y-1.5">
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-gray-400 hover:text-white hover:bg-white/5"
            >
              <BookOpen size={18} />
              Blogs List
            </Link>
            <Link
              to="/admin/bookings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all bg-blue-600 text-white shadow-lg shadow-blue-600/10"
            >
              <Calendar size={18} />
              Bookings
              {bookings.length > 0 && (
                <span className="ml-auto bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                  {bookings.length}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-6 border-t border-white/5">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 min-h-screen bg-[#050505] flex flex-col">
        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Booking Requests
            </h1>
            <p className="text-gray-500 text-xs mt-1">Review and manage dynamic consultation requests from your site</p>
          </div>

          {/* ── METRICS WIDGETS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[50px] pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Total Bookings</p>
                  <p className="text-2xl font-black text-white mt-0.5">{bookings.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-[50px] pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600/10 border border-green-500/10 rounded-xl flex items-center justify-center text-green-400">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Completed Sessions</p>
                  <p className="text-2xl font-black text-white mt-0.5">{completedCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-[50px] pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-600/10 border border-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Pending Leads</p>
                  <p className="text-2xl font-black text-white mt-0.5">{pendingCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search by client name, email, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-blue-600 transition-colors text-white"
            />
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-20 bg-[#0A0A0A] border border-white/5 rounded-3xl">
                  <Calendar className="mx-auto mb-4 text-gray-700" size={40} />
                  <p className="text-gray-400 text-sm">No booking requests found.</p>
                </div>
              ) : (
                filteredBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-white/10 transition-all relative overflow-hidden"
                  >
                    <div className="space-y-4 flex-grow w-full min-w-0">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-white">{booking.name}</h2>
                        <span className={`text-[9px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full border ${
                          booking.status === 'completed' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/10' 
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/10'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-blue-500 flex-shrink-0" />
                          <span className="truncate">{booking.service || "Unspecified"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-blue-500 flex-shrink-0" />
                          <span className="truncate">{booking.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-blue-500 flex-shrink-0" />
                          <span className="truncate">{booking.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-blue-500 flex-shrink-0" />
                          <span>{new Date(booking.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 font-medium">
                        Project / Business: <span className="text-gray-300">{booking.business_name || "N/A"}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-t-0 justify-end flex-shrink-0">
                      {booking.status !== 'completed' && (
                        <button
                          onClick={() => updateStatus(booking.id, 'completed')}
                          className="p-3 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                          title="Mark Request Completed"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => setBookingToDelete(booking.id)}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                        title="Delete Request"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {/* ── LOGOUT CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
              
              <h3 className="text-lg font-bold text-white mb-2">Logout Request</h3>
              <p className="text-gray-400 text-xs mb-8 leading-relaxed">
                Are you sure you want to log out of the admin panel? You will need to verify your credentials to log back in.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-colors text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-red-600/20 transition-all text-xs cursor-pointer active:scale-95"
                >
                  Confirm Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── DELETE BOOKING CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {bookingToDelete && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingToDelete(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
              
              <h3 className="text-lg font-bold text-white mb-2">Delete Booking Lead?</h3>
              <p className="text-gray-400 text-xs mb-8 leading-relaxed">
                This will delete this client consultation request permanently. This data cannot be recovered.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setBookingToDelete(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-colors text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-red-600/20 transition-all text-xs cursor-pointer active:scale-95"
                >
                  Delete Record
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
