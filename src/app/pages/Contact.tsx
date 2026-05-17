import { useEffect } from "react";
import { motion } from "motion/react";
import { SubPageHero } from "../components/SubPageHero";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Best Website Developer in Delhi - Shivam Builds";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SubPageHero 
        title="Get in Touch" 
        subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
        backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-[#0070F0]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-[#0070F0]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">My Location</h3>
                  <p className="text-[#94A3B8] leading-relaxed">
                    Delhi NCR, India
                  </p>
                </div>
              </div>

             

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-[#0070F0]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-[#0070F0]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Email Address</h3>
                  <p className="text-[#94A3B8] leading-relaxed">shivambuilds@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-[#0070F0]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-[#0070F0]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Working Hours</h3>
                  <p className="text-[#94A3B8] leading-relaxed">Mon - Sat: 10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            
           
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111111] p-10 rounded-3xl shadow-2xl border border-white/5"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Your Name</label>
                  <input type="text" className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Subject</label>
                <input type="text" className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all" placeholder="Project Inquiry" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Message</label>
                <textarea rows={5} className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all" placeholder="Tell me about your project..."></textarea>
              </div>
              <button className="w-full py-4 bg-[#3B82F6] text-white font-bold rounded-xl hover:bg-[#2563EB] transition-all shadow-lg">
                Submit Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      
    </div>
  );
}
