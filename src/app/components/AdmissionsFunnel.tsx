import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  { number: "01", title: "Discovery", description: "Deep dive into your business goals and requirements." },
  { number: "02", title: "Strategy", description: "Crafting a custom roadmap for development and marketing." },
  { number: "03", title: "Execution", description: "Building high-performance solutions with precision." },
  { number: "04", title: "Growth", description: "Continuous optimization to scale your digital presence." },
];

export function AdmissionsFunnel() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="relative py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#3B82F6] tracking-[0.2em] uppercase mb-4 font-bold">
            Work With Me
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, color: '#FFFFFF' }}>
            Ready to Build Your Project?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Process Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex gap-6 items-start group"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-white" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                      {step.number}
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-white mb-2 group-hover:text-[#3B82F6] transition-colors duration-300" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p className="text-[#94A3B8] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <CheckCircle2 className="w-6 h-6 text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4" />
              </motion.div>
            ))}

            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <p className="text-[#94A3B8]">Dedicated developer for every project</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <p className="text-[#94A3B8]">24/7 technical support and maintenance</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <p className="text-[#94A3B8]">Weekly progress reports and sync calls</p>
              </div>
            </div>
          </motion.div>

          {/* Lead Capture Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-8 md:p-12 rounded-3xl bg-[#111111] border border-white/5 shadow-2xl">
              {/* Decorative Element */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#3B82F6] rounded-full blur-3xl opacity-20 -z-10" />

              <h3 className="text-white mb-2" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                Get Started
              </h3>
              <p className="text-[#94A3B8] mb-8">
                Fill in your details and I'll get back to you within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white mb-2" style={{ fontWeight: 600 }}>
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-[#3B82F6] text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" style={{ fontWeight: 600 }}>
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-[#3B82F6] text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" style={{ fontWeight: 600 }}>
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-[#3B82F6] text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" style={{ fontWeight: 600 }}>
                    Service Interested In *
                  </label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5 text-white">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-white/10 text-white">
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="soft">Software Development</SelectItem>
                      <SelectItem value="crm">CRM Making</SelectItem>
                      <SelectItem value="erp">School ERP</SelectItem>
                      <SelectItem value="meta">Meta Ads</SelectItem>
                      <SelectItem value="graphic">Graphic Design</SelectItem>
                      <SelectItem value="app">App Development</SelectItem>
                      <SelectItem value="ecom">E-commerce Making</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl group font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  style={{ fontSize: '1.0625rem' }}
                >
                  Submit Inquiry
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-center text-[#4B5563]" style={{ fontSize: '0.875rem' }}>
                  By submitting, you agree to our privacy policy and terms of service
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
