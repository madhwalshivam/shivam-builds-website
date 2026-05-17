import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

interface AdmissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdmissionDialog({ isOpen, onClose }: AdmissionDialogProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    business: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("bookings").insert([{
        name: formData.name,
        service: formData.service,
        business_name: formData.business,
        phone: formData.phone,
        email: formData.email
      }]);

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", service: "", business: "", phone: "", email: "" });
        onClose();
      }, 4000);
    } catch (error: any) {
      toast.error("Failed to send request: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0A0A0A]">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8"
            >
              <DialogHeader className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-xl mb-4 border border-white/5">
                  <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <DialogTitle className="text-3xl font-bold text-white">Book a Consultation</DialogTitle>
                <DialogDescription className="text-[#94A3B8] text-lg">
                  Fill out the form below and we will get in touch with you shortly.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-semibold">Your Name</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter name" 
                      required 
                      className="rounded-xl border-white/10 bg-white/5 text-white focus:ring-[#3B82F6]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-white font-semibold">Service Needed</Label>
                    <Select onValueChange={(val) => setFormData(prev => ({ ...prev, service: val }))} required>
                      <SelectTrigger className="rounded-xl border-white/10 bg-white/5 text-white">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-white/10 text-white">
                        <SelectItem value="web-dev">Web Development</SelectItem>
                        <SelectItem value="soft-dev">Software Development</SelectItem>
                        <SelectItem value="crm">CRM Making</SelectItem>
                        <SelectItem value="erp">School ERP</SelectItem>
                        <SelectItem value="meta">Meta Ads/Marketing</SelectItem>
                        <SelectItem value="graphic">Graphic Design</SelectItem>
                        <SelectItem value="app-dev">App Development</SelectItem>
                        <SelectItem value="ecommerce">E-commerce Making</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business" className="text-white font-semibold">Business/Project Name</Label>
                  <Input 
                    id="business" 
                    value={formData.business}
                    onChange={handleInputChange}
                    placeholder="Enter business name" 
                    required 
                    className="rounded-xl border-white/10 bg-white/5 text-white focus:ring-[#3B82F6]" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white font-semibold">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91" 
                      required 
                      className="rounded-xl border-white/10 bg-white/5 text-white focus:ring-[#3B82F6]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-semibold">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@mail.com" 
                      required 
                      className="rounded-xl border-white/10 bg-white/5 text-white focus:ring-[#3B82F6]" 
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-6 rounded-xl font-bold text-lg shadow-xl shadow-[#3B82F6]/20 transition-all duration-300 group"
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                  {loading ? "Sending..." : "Book Appointment"}
                  {!loading && <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 flex flex-col items-center text-center bg-black text-white"
            >
              <div className="w-20 h-20 rounded-full bg-[#3B82F6] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Request Sent!</h2>
              <p className="text-[#94A3B8] text-lg leading-relaxed">
                Thank you for reaching out. Shivam will review your project details 
                and get back to you within 24 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
