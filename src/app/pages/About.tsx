import { useEffect } from "react";
import { motion } from "motion/react";
import { SubPageHero } from "../components/SubPageHero";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Best Website Developer in Delhi - Shivam Builds";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SubPageHero 
        title="About Us" 
        subtitle="Expert Freelance Developer & Digital Marketer with over 5 years of experience in building high-performance digital engines."
        backgroundImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-[#111111] border border-white/5"
          >
            <h2 className="text-3xl font-bold text-white mb-6">My Mission</h2>
            <p className="text-[#94A3B8] leading-relaxed text-lg">
              To provide cutting-edge digital solutions that empower businesses to scale and succeed. I strive to combine technical expertise with creative marketing to deliver measurable growth for my clients.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-[#111111] border border-white/5"
          >
            <h2 className="text-3xl font-bold text-white mb-6">My Vision</h2>
            <p className="text-[#94A3B8] leading-relaxed text-lg">
              To be the most trusted partner for businesses looking to innovate and dominate their industry. I envision a future where technology and marketing work in perfect harmony to create exceptional user experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 items-center gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-white/5"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="Working"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-8">5+ Years of <span className="text-[#3B82F6]">Building Excellence</span></h2>
              <div className="space-y-6 text-[#94A3B8] text-lg">
                <p>
                  Started in 2018, Shivam Builds has been at the forefront of digital transformation. I have successfully delivered over 100 projects, ranging from custom CRMs to high-converting Meta Ads campaigns.
                </p>
                <p>
                  My journey is defined by a passion for solving complex problems and a dedication to delivering results that matter. I believe in a client-first approach and continuous learning.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white">5+</h3>
                    <p className="text-[#3B82F6] font-semibold">Years Experience</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">100+</h3>
                    <p className="text-[#3B82F6] font-semibold">Projects Completed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
