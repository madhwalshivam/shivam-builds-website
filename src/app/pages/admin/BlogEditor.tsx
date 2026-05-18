import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../../../lib/supabase";
import { uploadToR2 } from "../../../lib/r2";
import { ArrowLeft, Save, Upload, Loader2, X } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    canonical_url: "",
    color: "#3B82F6",
    category: "Technology",
    author: "Shivam",
  });

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) setFormData(data);
    } catch (error: any) {
      toast.error("Error fetching blog: " + error.message);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Auto-generate slug and canonical URL only for new posts when title changes
      if (name === "title" && !id) {
        const slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        
        newData.slug = slug;
        newData.canonical_url = `https://www.shivambuilds.in/blogs/${slug}`;
      }

      // If slug is manually changed, update canonical URL as well (optional, but helpful)
      if (name === "slug" && value) {
        newData.canonical_url = `https://www.shivambuilds.in/blogs/${value}`;
      }
      
      return newData;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToR2(file);
      setFormData((prev) => ({ ...prev, image_url: url }));
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Image upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image_url) {
      toast.error("Featured image is mandatory!");
      return;
    }

    setLoading(true);

    try {
      if (id) {
        const { error } = await supabase
          .from("blogs")
          .update(formData)
          .eq("id", id);
        if (error) throw error;
        toast.success("Blog updated successfully");
      } else {
        const { error } = await supabase.from("blogs").insert([formData]);
        if (error) throw error;
        toast.success("Blog created successfully");
      }
      navigate("/admin");
    } catch (error: any) {
      toast.error("Error saving blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-700" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold">{id ? "Edit Blog" : "Create New Blog"}</h1>
              <p className="text-gray-400 mt-2">Fill in the details for your premium blog post</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-900 text-white px-8 py-3 rounded-xl font-semibold transition-all cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {id ? "Update Post" : "Publish Post"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Blog Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 transition-all text-xl font-bold"
                    placeholder="Enter an eye-catching title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Short Description / Excerpt</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 transition-all"
                    placeholder="Brief summary of the post..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
                  <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10 min-h-[400px]">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                      placeholder="Write your amazing story here..."
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link", "image", "code-block"],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Meta & Settings */}
            <div className="space-y-6">
              <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-lg mb-2">Media & SEO</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Featured Image</label>
                  {formData.image_url ? (
                    <div className="relative group rounded-xl overflow-hidden aspect-video bg-gray-900 mb-4 border border-white/10">
                      <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image_url: "" }))}
                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all mb-4">
                      {uploading ? (
                        <Loader2 className="animate-spin text-blue-700" />
                      ) : (
                        <>
                          <Upload className="text-gray-500 mb-2" />
                          <span className="text-xs text-gray-500 font-medium">Click to upload R2 Image</span>
                        </>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  )}
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-blue-700"
                    placeholder="Or paste direct image URL..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Slug (URL)</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-700"
                    placeholder="how-to-scale-business"
                  />
                  <p className="text-[10px] text-gray-600 mt-1">Auto-generated from title. Editable.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Canonical URL</label>
                  <input
                    type="text"
                    name="canonical_url"
                    value={formData.canonical_url}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-700"
                    placeholder="https://www.shivambuilds.in/blogs/post"
                  />
                  <p className="text-[10px] text-gray-600 mt-1">Auto-generated from slug. Editable for SEO.</p>
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-lg mb-2">Customization</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Accent Color</label>
                  <div className="flex gap-4">
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="h-10 w-20 bg-transparent border-none cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={handleChange}
                      name="color"
                      className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
                  >
                    <option value="Technology" className="bg-[#0A0A0A]">Technology</option>
                    <option value="Marketing" className="bg-[#0A0A0A]">Marketing</option>
                    <option value="Business" className="bg-[#0A0A0A]">Business</option>
                    <option value="Design" className="bg-[#0A0A0A]">Design</option>
                    <option value="Development" className="bg-[#0A0A0A]">Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Author Name</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
                    placeholder="Shivam"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .ql-container {
          min-height: 350px;
          font-size: 1.1rem;
          color: white !important;
          border: none !important;
          background: transparent;
        }
        .ql-editor {
          min-height: 350px;
          color: white !important;
        }
        .ql-editor.ql-blank::before {
          color: rgba(255,255,255,0.3) !important;
          font-style: normal;
        }
        .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          background: rgba(255,255,255,0.03);
        }
        .ql-snow .ql-stroke { stroke: #94a3b8 !important; }
        .ql-snow .ql-fill { fill: #94a3b8 !important; }
        .ql-snow .ql-picker { color: #94a3b8 !important; }
        .ql-snow .ql-picker-options {
          background-color: #0A0A0A !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
      `}</style>
    </div>
  );
}
