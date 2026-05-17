import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../../lib/supabase";
import { Loader2, Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success("Logged in successfully");
      navigate("/admin");
    } catch (error: any) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Access</h1>
          <p className="text-gray-400 mt-2 text-sm">Sign in to manage your blogs</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-700 transition-all text-white text-sm"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-700 transition-all text-white text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-900 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : null}
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-[11px] text-gray-600">
          Protected by Supabase Auth
        </p>
      </div>
    </div>
  );
}
