import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { supabase } from "../../../lib/supabase";
import { 
  Plus, Edit, Trash2, ExternalLink, LayoutDashboard, LogOut, 
  BookOpen, FileText, Search, Menu, X, Eye, Users, Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter blogs when search term changes
    const filtered = blogs.filter(blog => 
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch blogs
      const { data: blogsData, error: blogsError } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (blogsError) throw blogsError;
      setBlogs(blogsData || []);
      setFilteredBlogs(blogsData || []);

      // Fetch bookings count
      const { count, error: bookingsError } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true });

      if (!bookingsError && count !== null) {
        setBookingsCount(count);
      }
    } catch (error: any) {
      toast.error("Failed to load dashboard data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", blogToDelete);
      if (error) throw error;
      setBlogs(blogs.filter((b) => b.id !== blogToDelete));
      toast.success("Blog deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete blog: " + error.message);
    } finally {
      setBlogToDelete(null);
    }
  };

  const handleLogoutConfirm = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

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
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all bg-blue-600 text-white shadow-lg shadow-blue-600/10"
            >
              <BookOpen size={18} />
              Blogs List
            </Link>
            <Link
              to="/admin/bookings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Calendar size={18} />
              Bookings
              {bookingsCount > 0 && (
                <span className="ml-auto bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/20">
                  {bookingsCount}
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
          
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Dashboard Overview
              </h1>
              <p className="text-gray-500 text-xs mt-1">Manage your corporate blog posts and live media content</p>
            </div>
            <Link
              to="/admin/new"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 cursor-pointer active:scale-95 flex-shrink-0"
            >
              <Plus size={18} /> Create New Post
            </Link>
          </div>

          {/* ── METRICS WIDGETS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[50px] pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                  <FileText size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Total Blogs</p>
                  <p className="text-2xl font-black text-white mt-0.5">{blogs.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-[50px] pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600/10 border border-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Consultation Bookings</p>
                  <p className="text-2xl font-black text-white mt-0.5">{bookingsCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-[50px] pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600/10 border border-green-500/10 rounded-xl flex items-center justify-center text-green-400">
                  <ExternalLink size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Production Status</p>
                  <a 
                    href="https://www.shivambuilds.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1 transition-colors"
                  >
                    shivambuilds.in <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search by title, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-blue-600 transition-colors text-white"
            />
          </div>

          {/* Blogs Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-20 bg-[#0A0A0A] border border-white/5 rounded-3xl">
                  <BookOpen className="mx-auto mb-4 text-gray-700" size={40} />
                  <p className="text-gray-400 text-sm">No blogs found matching your criteria.</p>
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-center hover:border-white/10 transition-all group relative overflow-hidden"
                  >
                    <div className="w-full md:w-44 aspect-video rounded-xl overflow-hidden bg-gray-950 flex-shrink-0 border border-white/5">
                      {blog.image_url ? (
                        <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs">No Thumbnail</div>
                      )}
                    </div>
                    
                    <div className="flex-grow w-full min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/10">
                          {blog.category || 'General'}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {new Date(blog.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold mb-1 text-white group-hover:text-blue-400 transition-colors truncate">
                        {blog.title}
                      </h2>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                        {blog.description}
                      </p>
                    </div>

                    {/* Actions Panel */}
                    <div className="flex gap-2 flex-shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-t-0 justify-end">
                      <a
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white"
                        title="Open live link"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <Link
                        to={`/admin/edit/${blog.id}`}
                        className="p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-all text-blue-400"
                        title="Edit post details"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => setBlogToDelete(blog.id)}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all text-red-400 cursor-pointer"
                        title="Delete post permanently"
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

      {/* ── DELETE BLOG CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {blogToDelete && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBlogToDelete(null)}
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
              
              <h3 className="text-lg font-bold text-white mb-2">Delete Article Permanently?</h3>
              <p className="text-gray-400 text-xs mb-8 leading-relaxed">
                This action is irreversible. The article and all of its associated metadata will be deleted from the database.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setBlogToDelete(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-colors text-xs cursor-pointer"
                >
                  Keep Article
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-red-600/20 transition-all text-xs cursor-pointer active:scale-95"
                >
                  Delete Post
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
