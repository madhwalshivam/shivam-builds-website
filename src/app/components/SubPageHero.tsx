import { motion } from "motion/react";

interface SubPageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export function SubPageHero({ title, subtitle, backgroundImage }: SubPageHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[450px] w-full overflow-hidden flex items-center justify-center pt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage || "/assets/school.png"} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', lineHeight: 1.2 }}
          >
            {title}
          </h1>
          <p className="text-white/80 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
