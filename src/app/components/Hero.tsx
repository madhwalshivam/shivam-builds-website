import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Play, Phone } from "lucide-react";
import { AdmissionDialog } from "./AdmissionDialog";

interface HeroProps {
  onBookNow?: () => void;
}

export function Hero({ onBookNow }: HeroProps) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center pt-16">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
          alt="Digital Marketing Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505] z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[#60A5FA] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 md:mb-8"
            >
              Digital Marketing • Web Dev • Freelance
            </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em'
            }}
          >
            Shivam Builds <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]">Digital Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/80 mb-10 max-w-2xl mx-auto font-light px-4 md:px-0"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', lineHeight: 1.6 }}
          >
            Recognized as the <strong>Best Website Developer in Delhi</strong>, I am a 
            Freelance Expert with 5+ years of experience. I build high-performance 
            CRMs, ERPs, E-commerce platforms, and Meta Ads strategies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 md:px-0"
          >
            <Button
              size="lg"
              onClick={onBookNow}
              className="w-full sm:w-auto h-14 bg-[#3B82F6] hover:bg-white text-white hover:text-[#0A0A0A] border-none rounded-2xl px-8 font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all active:scale-95"
            >
              Book a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
           
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
