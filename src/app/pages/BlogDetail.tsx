import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { motion } from "motion/react";
import { Calendar, ArrowLeft, Loader2, Clock, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: blogData, error: blogError } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (blogError) throw blogError;
      setBlog(blogData);
      document.title = `${blogData.title} | Shivam Builds`;

      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", blogData.canonical_url || `https://shivambuilds.in/blogs/${slug}`);

      const { data: recentData } = await supabase
        .from("blogs")
        .select("title, slug, image_url, created_at, category")
        .eq("is_published", true)
        .neq("id", blogData.id)
        .order("created_at", { ascending: false })
        .limit(4);
      
      setRecentPosts(recentData || []);
    } catch (error: any) {
      toast.error("Article not found");
      navigate("/blogs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <main className="bg-[#050505] min-h-screen pb-40 text-white selection:bg-blue-500/30">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[1000] bg-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── CINEMATIC HERO ── */}
      <div className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={blog.image_url} 
            alt={blog.title} 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <Link to="/blogs" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to journal
            </Link>

            <div className="space-y-4 max-w-4xl">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                {blog.category}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl">
                {blog.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {blog.author?.[0] || "S"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{blog.author || "Shivam Builds"}</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Lead Architect</p>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
              <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-white/50">
                <span className="flex items-center gap-2"><Calendar size={14} className="text-blue-500" /> {new Date(blog.created_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><Clock size={14} className="text-blue-500" /> {Math.ceil((blog.content?.length || 0) / 1000)} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_320px] gap-12 mt-12">
        
        {/* Main Article Card */}
        <article className="min-w-0">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-50" />
            
            {/* Article Description */}
            {blog.description && (
              <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed mb-12 border-l-2 border-blue-500/50 pl-6 italic">
                {blog.description}
              </p>
            )}

            <div className="flex items-center justify-between py-6 border-y border-white/5 mb-12">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                >
                  <Share2 size={16} className="text-blue-500" /> Share
                </button>
                <button className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                  <Bookmark size={16} /> Save
                </button>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
            </div>

            {/* Body Content */}
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags & Author */}
            <div className="mt-20 pt-12 border-t border-white/5 space-y-12">
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  # {blog.category}
                </span>
                <span className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  # Innovation
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-3xl font-black text-white">
                  {blog.author?.[0] || "S"}
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white">Written by {blog.author || "Shivam Builds"}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                    Shivam is a visionary digital architect focused on building premium, high-performance web experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ── SIDEBAR ── */}
        <aside>
          <div className="sticky top-24 space-y-12">
            {/* Sidebar Heading */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-blue-600 rounded-full" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Related Insight</h3>
              </div>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <RecentCard key={post.slug} post={post} accentColor="#3B82F6" compact />
                ))}
              </div>
            </div>

            {/* Quick Booking Form Card */}
            <div className="p-8 rounded-[32px] bg-[#0A0A0A] border border-white/5 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white tracking-tight">Quick Booking</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Fill the form below to book a professional service.</p>
                </div>

                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const target = e.target as any;
                    const loadingToast = toast.loading("Sending request...");
                    
                    try {
                      const { error } = await supabase.from("bookings").insert([{
                        name: target.name.value,
                        email: target.email.value,
                        service: target.service.value,
                        phone: target.phone.value,
                        business_name: "Blog Inquiry"
                      }]);

                      if (error) throw error;
                      toast.success("Request sent! We will contact you soon.", { id: loadingToast });
                      target.reset();
                    } catch (err: any) {
                      toast.error("Failed to send: " + err.message, { id: loadingToast });
                    }
                  }}
                  className="space-y-4"
                >
                  <input 
                    name="name"
                    type="text" 
                    placeholder="Your Name" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 transition-colors text-white" 
                  />
                  <input 
                    name="email"
                    type="email" 
                    placeholder="Email Address" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 transition-colors text-white" 
                  />
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="Phone (+91)" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 transition-colors text-white" 
                  />
                  <select 
                    name="service"
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 transition-colors text-gray-400"
                  >
                    <option value="">Select Service</option>
                    <option value="web-dev">Web Development</option>
                    <option value="app-dev">App Development</option>
                    <option value="seo">SEO & Marketing</option>
                    <option value="uiux">UI/UX Design</option>
                  </select>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-all text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                  >
                    Get a Free Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </aside>

      </div>

      <style>{`
        .blog-content {
          color: #94A3B8;
          line-height: 1.8;
          font-size: 1.125rem;
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }
        .blog-content h2 { 
          font-size: 1.75rem; 
          font-weight: 600; 
          color: white; 
          margin: 3.5rem 0 1.5rem; 
          letter-spacing: -0.02em; 
          line-height: 1.25; 
        }
        .blog-content h3 { 
          font-size: 1.4rem; 
          font-weight: 600; 
          color: white; 
          margin: 2.5rem 0 1rem; 
          letter-spacing: -0.01em;
        }
        .blog-content p { 
          margin-bottom: 1.5rem; 
        }
        .blog-content strong { color: white; font-weight: 600; }
        .blog-content blockquote {
          background: rgba(255,255,255,0.02);
          border-left: 4px solid #2563EB;
          padding: 2rem;
          border-radius: 0 16px 16px 0;
          font-style: italic;
          color: #E2E8F0;
          margin: 3rem 0;
          font-size: 1.25rem;
        }
        .blog-content ul { list-style: none; padding-left: 0; margin-bottom: 1.5rem; }
        .blog-content ul li { 
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content ul li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #2563EB;
          font-weight: bold;
        }
        .blog-content img { 
          border-radius: 24px; 
          margin: 3rem 0; 
          width: 100%; 
          height: auto; 
          border: 1px solid rgba(255,255,255,0.05); 
        }
        .blog-content pre { 
          background: #050505; 
          padding: 1.5rem; 
          border-radius: 20px; 
          border: 1px solid rgba(255,255,255,0.05); 
          overflow-x: auto; 
          margin: 2.5rem 0; 
        }
        .blog-content code { 
          font-family: 'JetBrains Mono', monospace; 
          color: #60A5FA; 
          font-size: 0.9em; 
          padding: 0.1rem 0.3rem;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }
      `}</style>
    </main>
  );
}

/* ── Reusable Recent Post Card ── */
function RecentCard({ post, accentColor, compact = false }: { post: any; accentColor: string; compact?: boolean }) {
  return (
    <Link to={`/blogs/${post.slug}`} className="group flex gap-3 items-start p-3 rounded-2xl hover:bg-white/5 transition-all">
      <div className={`${compact ? "w-16 h-16" : "w-20 h-20"} rounded-xl overflow-hidden flex-shrink-0 border border-white/5`}>
        <img src={post.image_url} alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <span className="text-[9px] font-black uppercase tracking-wider mb-1 block" style={{ color: accentColor }}>
          {post.category}
        </span>
        <h4 className="text-sm font-bold text-white/80 line-clamp-2 group-hover:text-white transition-colors leading-snug mb-1">
          {post.title}
        </h4>
        <p className="text-[10px] text-gray-600 font-medium">
          {new Date(post.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </Link>
  );
}
