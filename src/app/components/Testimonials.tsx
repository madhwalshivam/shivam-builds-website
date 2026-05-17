import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Rajesh Kumar",
    content: "Shivam transformed our legacy CRM into a modern growth engine. His technical depth and marketing insight are unmatched in Delhi.",
    rating: 5,
  },
  {
    name: "Anjali Sharma",
    content: "The e-commerce platform Shivam built for us saw a 40% increase in conversion within the first month. Highly recommended for scaling brands.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    content: "Expert handling of our School ERP project. The automation features have saved us hundreds of hours in administration.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    content: "Superb execution on our Real Estate portal. The map integration and filter search features are extremely fast and user-friendly.",
    rating: 5,
  },
  {
    name: "Pooja Mehta",
    content: "Our clinic saw a 3x increase in online bookings after Shivam rebuilt our corporate site with optimized local SEO. Outstanding talent!",
    rating: 5,
  },
  {
    name: "Rahul Saxena",
    content: "Delivered a high-end UI/UX for our fintech SaaS product in record time. His attention to micro-interactions and performance is stellar.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 bg-[#0A0A0A] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B82F6] rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#3B82F6] tracking-[0.2em] uppercase mb-4 font-bold">
            Testimonials
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#FFFFFF' }}>
            What My Clients Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.name} className="h-auto">
                <div className="relative p-8 rounded-3xl bg-[#111111] border border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 group flex flex-col justify-between h-full w-full">
                  <div>
                    <Quote className="w-12 h-12 text-[#3B82F6] opacity-10 absolute top-6 right-6" />
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#3B82F6] fill-[#3B82F6]" />
                      ))}
                    </div>

                    <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed mb-8 italic">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-xl">{testimonial.name}</h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: #3B82F6 !important;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          background: #3B82F6 !important;
          opacity: 1;
          width: 20px !important;
          border-radius: 9999px !important;
          transition: width 0.3s ease;
        }
        .swiper {
          overflow: visible !important;
        }
        .swiper-wrapper {
          align-items: stretch;
        }
        .swiper-slide {
          height: auto !important;
          display: flex;
        }
      `}</style>
    </section>
  );
}
