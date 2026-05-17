import { motion } from "motion/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Globe, BarChart, Database, Smartphone } from "lucide-react";

const services = [
  {
    id: "web-dev",
    label: "Web & Software",
    icon: Globe,
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    description: "Building high-performance web applications and custom software solutions tailored to your business needs.",
    highlights: [
      "Custom React & Next.js development",
      "Robust Backend systems (Node.js/Go)",
      "Software automation tools",
      "API design and integration",
    ],
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    icon: BarChart,
    category: "Growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "Data-driven marketing strategies focusing on Meta Ads, SEO, and brand positioning to drive conversions.",
    highlights: [
      "Expert Meta Ads management",
      "Performance marketing strategy",
      "SEO & Content optimization",
      "Conversion Rate Optimization (CRO)",
    ],
  },
  {
    id: "solutions",
    label: "CRM & ERP",
    icon: Database,
    category: "Management",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    description: "Specialized in creating custom CRM and School ERP systems to streamline business operations.",
    highlights: [
      "Custom School ERP development",
      "Business CRM automation",
      "Database management & security",
      "Reporting & Analytics dashboards",
    ],
  },
  {
    id: "apps",
    label: "Mobile & E-com",
    icon: Smartphone,
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    description: "Creating seamless mobile experiences and high-converting e-commerce stores for global brands.",
    highlights: [
      "React Native & Flutter apps",
      "Shopify & Custom E-commerce",
      "Secure payment gateway integration",
      "UI/UX for mobile platforms",
    ],
  },
];

export function AcademicEcosystem() {
  const [activeTab, setActiveTab] = useState("web-dev");

  return (
    <section className="relative py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#3B82F6] tracking-[0.2em] uppercase mb-4 font-bold">
            Detailed Expertise
          </p>
          <h2 id="detailed-services" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#FFFFFF' }}>
            Core Technical Solutions
          </h2>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto mb-12">
            {services.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-white/5 bg-white/5 data-[state=active]:border-[#3B82F6] data-[state=active]:bg-[#3B82F6]/10 transition-all duration-300 hover:border-[#3B82F6]/50 text-white/70 data-[state=active]:text-white"
              >
                <service.icon className="w-8 h-8 text-[#3B82F6]" />
                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{service.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <div className="inline-block px-4 py-2 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] mb-6" style={{ fontWeight: 700 }}>
                    {service.category}
                  </div>

                  <h3 className="text-white mb-4" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                    {service.label}
                  </h3>

                  <p className="text-[#94A3B8] mb-8 leading-relaxed" style={{ fontSize: '1.125rem' }}>
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                        <p className="text-[#94A3B8]">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative order-1 md:order-2 group">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                    <img 
                      src={service.image} 
                      alt={service.label} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/20 to-transparent" />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#3B82F6] rounded-full blur-3xl opacity-20 -z-10" />
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
