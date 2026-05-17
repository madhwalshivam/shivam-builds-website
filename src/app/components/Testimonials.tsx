import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO, TechFlow Solutions",
    content: "Shivam transformed our legacy CRM into a modern growth engine. His technical depth and marketing insight are unmatched in Delhi.",
    rating: 5,
  },
  {
    name: "Anjali Sharma",
    role: "Founder, E-com Hub",
    content: "The e-commerce platform Shivam built for us saw a 40% increase in conversion within the first month. Highly recommended for scaling brands.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Director, Global Academy",
    content: "Expert handling of our School ERP project. The automation features have saved us hundreds of hours in administration.",
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative p-8 rounded-3xl bg-[#111111] border border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 group"
            >
              <Quote className="w-12 h-12 text-[#3B82F6] opacity-10 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#3B82F6] fill-[#3B82F6]" />
                ))}
              </div>

              <p className="text-[#94A3B8] text-lg leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>

              <div>
                <h4 className="text-white font-bold text-xl mb-1">{testimonial.name}</h4>
                <p className="text-[#3B82F6] text-sm font-medium">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
