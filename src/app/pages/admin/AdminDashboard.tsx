import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../../../lib/supabase";
import { Plus, Edit, Trash2, ExternalLink, LayoutDashboard, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch blogs: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete blog: " + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2 text-sm">Manage your blog posts and content</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/admin/bookings"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border border-white/10"
            >
              <LayoutDashboard size={18} /> Bookings
            </Link>
            <Link
              to="/admin/new"
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md cursor-pointer"
            >
              <Plus size={18} /> New Blog
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border border-white/10 cursor-pointer"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                <LayoutDashboard className="mx-auto mb-4 text-gray-600" size={48} />
                <p className="text-gray-400 text-lg">No blogs found. Create your first post!</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center hover:border-blue-700/30 transition-all group"
                >
                  <div className="w-full md:w-48 aspect-video rounded-xl overflow-hidden bg-gray-900 flex-shrink-0">
                    {blog.image_url ? (
                      <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">No Image</div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-blue-700/10 text-blue-400 border border-blue-700/20">
                        {blog.category || 'General'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {blog.description}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Link
                      to={`/blogs/${blog.slug}`}
                      target="_blank"
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white"
                      title="View Blog"
                    >
                      <ExternalLink size={20} />
                    </Link>
                    <Link
                      to={`/admin/edit/${blog.id}`}
                      className="p-3 bg-blue-700/10 hover:bg-blue-700/20 rounded-xl transition-all text-blue-400"
                      title="Edit Blog"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all text-red-400"
                      title="Delete Blog"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
