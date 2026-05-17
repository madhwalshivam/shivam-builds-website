import { motion } from "motion/react";
import { Award, Terminal, Users, Rocket } from "lucide-react";

const stats = [
  { icon: Award, label: "Experience", value: "5+ Years" },
  { icon: Terminal, label: "Projects", value: "100+" },
  { icon: Users, label: "Happy Clients", value: "50+" },
  { icon: Rocket, label: "Success Rate", value: "99%" },
];

export function TrustStrip() {
  return (
    <section className="relative py-24 bg-[#0A0A0A] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-center mb-4 group-hover:bg-[#3B82F6] transition-all duration-300 shadow-xl">
                <stat.icon className="w-8 h-8 text-[#3B82F6] group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="text-[#94A3B8] mb-1 tracking-wide">{stat.label}</p>
              <p className="text-white tracking-tight" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12 pt-12 border-t border-white/5"
        >
          <p className="text-[#94A3B8]">
            <span className="text-white font-bold">Specialized in:</span> Web & App Development <span className="mx-2 text-white/20">|</span> Meta Ads Strategy <span className="mx-2 text-white/20">|</span> Custom CRM & ERP Solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
}
