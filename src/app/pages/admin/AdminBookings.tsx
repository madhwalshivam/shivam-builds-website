import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { motion } from "motion/react";
import { Mail, Phone, Briefcase, Calendar, CheckCircle2, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch bookings: " + error.message);
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
      toast.success(`Marked as ${status}`);
    } catch (error: any) {
      toast.error("Failed to update status: " + error.message);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
      setBookings(bookings.filter(b => b.id !== id));
      toast.success("Record deleted");
    } catch (error: any) {
      toast.error("Failed to delete: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Booking Requests
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Manage consultation requests from your website</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
            <p className="text-gray-500">No booking requests yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-blue-700/30 transition-all"
              >
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-white">{booking.name}</h2>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${
                      booking.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-blue-700" />
                      {booking.service}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-700" />
                      {booking.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-blue-700" />
                      {booking.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-700" />
                      {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 italic">
                    Project: <span className="text-gray-300">{booking.business_name}</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  {booking.status !== 'completed' && (
                    <button
                      onClick={() => updateStatus(booking.id, 'completed')}
                      className="flex-grow md:flex-grow-0 p-3 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition-all flex items-center justify-center gap-2"
                      title="Mark as Completed"
                    >
                      <CheckCircle2 size={18} />
                      <span className="md:hidden">Complete</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="flex-grow md:flex-grow-0 p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all flex items-center justify-center gap-2"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                    <span className="md:hidden">Delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
