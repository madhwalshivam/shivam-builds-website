import { useEffect } from "react";
import { motion } from "motion/react";
import { SubPageHero } from "../components/SubPageHero";
import { Code2, Settings, BarChart3, AppWindow, Globe, Palette, ShoppingCart, Terminal, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const services = [
  {
    title: "Web Development",
    slug: "web-dev",
    description: "Custom, high-performance websites built with modern technologies for speed and scale.",
    icon: Code2,
  },
  {
    title: "Software Development",
    slug: "soft-dev",
    description: "Bespoke software solutions tailored to automate and optimize your business workflows.",
    icon: Terminal,
  },
  {
    title: "CRM Solutions",
    slug: "crm",
    description: "Custom Customer Relationship Management systems to manage leads and boost sales efficiency.",
    icon: Settings,
  },
  {
    title: "School ERP",
    slug: "erp",
    description: "Complete Enterprise Resource Planning solutions for educational institutions and management.",
    icon: AppWindow,
  },
  {
    title: "Meta Ads & Marketing",
    slug: "meta-ads",
    description: "High-ROI Facebook and Instagram advertising strategies to scale your business rapidly.",
    icon: BarChart3,
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Stunning visual identities and marketing collateral that capture your brand's essence.",
    icon: Palette,
  },
  {
    title: "App Development",
    slug: "app-dev",
    description: "Native and cross-platform mobile applications that provide seamless user experiences.",
    icon: Globe,
  },
  {
    title: "E-commerce Solutions",
    slug: "ecommerce",
    description: "End-to-end online store development with secure payments and inventory management.",
    icon: ShoppingCart,
  }
];

export default function Academics() {
  useEffect(() => {
    document.title = "Services | Best Website Developer in Delhi - Shivam Builds";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SubPageHero 
        title="Professional Services" 
        subtitle="Comprehensive digital solutions designed to accelerate your business growth and technical efficiency."
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
      />

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111111] p-8 rounded-3xl shadow-lg border border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-[#3B82F6]/10">
                <service.icon className="w-8 h-8 text-[#3B82F6]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-[#94A3B8] leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              
              <Link 
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-[#3B82F6] font-bold text-sm group/btn"
              >
                Learn More 
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Me Details */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">Best Website Developer <span className="text-[#3B82F6]">In Delhi</span></h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-3 flex-shrink-0" />
                <p className="text-lg text-[#94A3B8]">Custom-coded solutions prioritized for speed, SEO, and user conversion.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-3 flex-shrink-0" />
                <p className="text-lg text-[#94A3B8]">Deep expertise in both technical development and performance marketing.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-3 flex-shrink-0" />
                <p className="text-lg text-[#94A3B8]">Over 5 years of successful deliveries for global and local clients.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-3 flex-shrink-0" />
                <p className="text-lg text-[#94A3B8]">Direct communication and personalized support throughout the project.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
                alt="Web Development" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#3B82F6] p-8 rounded-3xl shadow-xl hidden md:block">
              <p className="text-white font-bold text-2xl">100%</p>
              <p className="text-white/80 font-semibold">Client Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
