import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { AdmissionDialog } from "./AdmissionDialog";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] px-6 h-14 md:h-16 bg-[#0070F0] text-white rounded-full shadow-[0_10px_30px_rgba(0,112,240,0.5)] flex items-center gap-3 group overflow-hidden border-4 border-white transition-all active:scale-95 font-bold"
        aria-label="Book a consultation"
      >
        <Calendar className="w-6 h-6 md:w-7 md:h-7" />
        <span className="hidden md:inline">Book Now</span>
      </motion.button>

      <AdmissionDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
