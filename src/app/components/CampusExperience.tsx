import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Database, ShoppingCart, Layout, Smartphone, Code2, LineChart } from "lucide-react";

const services = [
  {
    title: "Web Development",
    slug: "web-dev",
    icon: Code2,
    description: "High-performance, SEO-optimized websites built with modern frameworks.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "E-commerce Solutions",
    slug: "ecommerce",
    icon: ShoppingCart,
    description: "Scalable online stores with seamless payment integration.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80",
    span: "md:col-span-1",
  },
  {
    title: "CRM Solutions",
    slug: "crm",
    icon: Database,
    description: "Bespoke business automation systems tailored to your workflow.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    span: "md:col-span-1",
  },
  {
    title: "Meta Ads & Marketing",
    slug: "meta-ads",
    icon: LineChart,
    description: "Data-driven marketing strategies to maximize your ROI.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Mobile App Development",
    slug: "app-dev",
    icon: Smartphone,
    description: "Native-feel cross-platform apps for iOS and Android.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    span: "md:col-span-2",
  },
  {
    title: "Graphic & UI/UX Design",
    slug: "graphic-design",
    icon: Layout,
    description: "Stunning visuals and intuitive user interfaces for your brand.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    span: "md:col-span-1",
  },
  {
    title: "Software Automation",
    slug: "soft-dev",
    icon: Database,
    description: "Automate repetitive tasks with custom bot and software solutions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    span: "md:col-span-1",
  },
];

export function CampusExperience() {
  return (
    <section className="relative py-16 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#3B82F6] tracking-[0.2em] uppercase mb-4 font-bold">
            What I Offer
          </p>
          <h2 id="services" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#FFFFFF' }}>
            Our Professional Services
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-4 gap-6 auto-rows-[220px] grid-flow-dense">
          {services.map((service, index) => (
            <Link 
              key={service.title} 
              to={`/services/${service.slug}`}
              className={`${service.span} block`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative h-full group overflow-hidden rounded-[2rem] cursor-pointer border border-white/5"
              >
                {/* Image */}
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/10 backdrop-blur-md flex items-center justify-center mb-4 border border-[#3B82F6]/20 group-hover:bg-[#3B82F6] group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-[#3B82F6] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-white mb-2" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    {service.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {service.description}
                  </p>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-[#3B82F6]/0 group-hover:border-[#3B82F6]/30 transition-all duration-500 rounded-[2rem] pointer-events-none" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
