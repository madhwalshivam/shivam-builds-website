import { motion } from "motion/react";
import { TrendingUp, Award, Users, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const results = [
  { label: "ROAS Increase", value: "10x+", icon: TrendingUp, color: "#3B82F6" },
  { label: "Lead Quality", value: "95%", icon: Star, color: "#FFFFFF" },
  { label: "Tech Stack", value: "10+", icon: Award, color: "#3B82F6" },
  { label: "Retention Rate", value: "90%", icon: Users, color: "#FFFFFF" },
];

const lifeEvents = [
  {
    title: "E-commerce Brands",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    category: "Scaling",
  },
  {
    title: "Real Estate Agents",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    category: "Lead Gen",
  },
  {
    title: "Education Tech",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
    category: "Automation",
  },
  {
    title: "Healthcare Clinics",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    category: "Systems",
  },
  {
    title: "Legal Firms",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    category: "Consulting",
  },
  {
    title: "Creative Agencies",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    category: "Branding",
  },
];

export function ResultsAndLife() {
  return (
    <section className="relative py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Results Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <p className="text-[#3B82F6] tracking-[0.2em] uppercase mb-4 font-bold">
              Project Performance
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, color: '#FFFFFF' }}>
              Impact That Matters
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative p-8 rounded-2xl bg-white/5 border-2 border-white/5 hover:border-[#3B82F6] transition-all duration-300 hover:shadow-2xl group"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${result.color}15` }}
                >
                  <result.icon className="w-7 h-7" style={{ color: result.color }} />
                </div>

                <p className="text-[#94A3B8] mb-2">{result.label}</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 700, color: result.color }}>
                  {result.value}
                </p>

                {/* Animated Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
                  style={{ backgroundColor: result.color }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Student Life */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <p className="text-[#3B82F6] tracking-[0.2em] uppercase mb-4 font-bold">
              Industries I Serve
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, color: '#FFFFFF' }}>
              Versatile Expertise
            </h2>
          </div>

          {/* Swiper Carousel */}
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {lifeEvents.map((event) => (
                <SwiperSlide key={event.title}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 border border-white/5 shadow-xl">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                      <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                        <span className="text-white" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          {event.category}
                        </span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-white group-hover:text-[#3B82F6] transition-colors duration-300" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
