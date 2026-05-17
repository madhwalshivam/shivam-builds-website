import { motion } from "motion/react";
import { Quote, Rocket, BarChart, History } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FounderVision() {
  return (
    <section className="relative py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#3B82F6] tracking-[0.2em] uppercase mb-4 font-bold">
              The Mind Behind Shivam Builds
            </p>

            <h2 className="text-white mb-12" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1 }}>
              My Vision & Passion
            </h2>

            <div className="relative mb-16 inline-block text-left">
              <Quote className="absolute -top-10 -left-10 w-20 h-20 text-[#3B82F6] opacity-10" />
              <blockquote className="relative p-8 md:p-12 bg-white/5 border border-white/10 rounded-4xl backdrop-blur-sm">
                <p className="text-white mb-8 leading-relaxed" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.75rem)', fontWeight: 500, fontStyle: 'italic' }}>
                  "I don't just build websites; I build digital growth engines. My goal is to empower 
                  businesses with technology that is both beautiful and highly functional."
                </p>
                <footer className="text-[#94A3B8]">
                  <p className="text-white text-xl" style={{ fontWeight: 700 }}>Shivam</p>
                  <p>Expert Website Developer & Digital Marketer</p>
                </footer>
              </blockquote>
              {/* Decorative Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3B82F6] rounded-full blur-[100px] opacity-20 -z-10" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#3B82F6]/50 transition-colors duration-300">
                <div className="w-10 h-10 bg-[#3B82F6] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#3B82F6]/20">
                  <History className="w-6 h-6 text-white" />
                </div>
                <p className="text-[#94A3B8] leading-relaxed">
                  Years of experience in full-stack development and performance marketing
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#3B82F6]/50 transition-colors duration-300">
                <div className="w-10 h-10 bg-[#3B82F6] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#3B82F6]/20">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <p className="text-[#94A3B8] leading-relaxed">
                  Specialized in custom CRM, ERP, and high-conversion E-commerce solutions
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#3B82F6]/50 transition-colors duration-300">
                <div className="w-10 h-10 bg-[#3B82F6] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#3B82F6]/20">
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <p className="text-[#94A3B8] leading-relaxed">
                  Expert in Meta Ads strategy and data-driven conversion rate optimization
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
