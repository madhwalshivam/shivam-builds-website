import { useEffect, useState } from "react";
import { SubPageHero } from "../components/SubPageHero";
import { motion } from "motion/react";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabase";

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Blogs | Shivam Builds - Insights & Innovation";
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen">
      {/* Premium Hero Section */}
      <div className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-500/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 inline-block"
          >
            Insights & Innovation
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-none"
          >
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Journal</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Deep dives into modern web technologies, design systems, and digital growth strategies.
          </motion.p>
        </div>
      </div>

      <section className="pb-40 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/5 rounded-[40px] aspect-[4/5] animate-pulse border border-white/5"></div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-40 bg-white/5 rounded-[60px] border border-white/5 border-dashed">
              <p className="text-gray-500 text-xl font-bold italic">Curating excellence. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {blogs.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <Link to={`/blogs/${post.slug}`} className="block space-y-8">
                    <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden border border-white/5 shadow-2xl transition-all duration-700 group-hover:rounded-[24px] group-hover:border-blue-500/30">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-6 left-6">
                        <span 
                          className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/10"
                          style={{ backgroundColor: `${post.color}80`, color: 'white' }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="px-4 space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <span className="flex items-center gap-2">
                          <Calendar size={14} className="text-blue-500" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-800"></span>
                        <span>{post.author}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 font-medium">
                        {post.description}
                      </p>
                      
                      <div className="pt-2 flex items-center gap-3 text-white font-bold text-[11px] uppercase tracking-widest group-hover:gap-5 transition-all duration-500">
                        Explore Story <ArrowRight size={16} className="text-blue-500" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
