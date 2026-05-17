import { motion } from "motion/react";
import { Rocket, Heart, Globe } from "lucide-react";

const pillars = [
  {
    icon: Rocket,
    title: "Scalable Solutions",
    description: "I build robust Web and Mobile applications that grow with your business, using the latest tech stacks.",
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "Expert Meta Ads and Digital Marketing strategies to scale your brand and maximize ROI with 5+ years of experience.",
  },
  {
    icon: Heart,
    title: "Customer Success",
    description: "Developing custom CRMs and School ERPs that streamline your operations and enhance user experience.",
  },
];

export function WhySection() {
  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#3B82F6] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#2563EB] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#3B82F6] tracking-[0.2em] uppercase mb-4 font-bold">
            My Expertise
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: 'white' }}>
            Why Work With Shivam Builds
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group relative"
            >
              {/* Dark Card */}
              <div className="relative p-8 rounded-3xl bg-[#111111] border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <pillar.icon className="w-8 h-8 text-[#3B82F6]" />
                </div>

                <h3 className="text-white mb-4" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  {pillar.title}
                </h3>

                <p className="text-[#94A3B8] leading-relaxed">
                  {pillar.description}
                </p>

                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#3B82F6] group-hover:w-full transition-all duration-500 rounded-b-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
