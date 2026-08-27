"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { m, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Facebook, Twitter, Loader2, ChevronRight, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import profile from "@/components/ui/PortfolioData";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

const shakeVariants = {
  error: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } },
};

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const recaptchaToken = recaptchaRef.current?.getValue();

    if (!recaptchaToken) {
      toast.error("Please verify that you are not a robot 🤖");
      return;
    }

    setLoading(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS credentials missing in frontend");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          message: data.message,
          "g-recaptcha-response": recaptchaToken,
        },
        { publicKey: publicKey }
      );

      toast.success("Message sent successfully ✅");
      reset();
      recaptchaRef.current?.reset();
    } catch (emailjsError) {
      console.warn("EmailJS failed, trying backend fallback...", emailjsError);
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://mussarat123shamsher-porfolio-backend.hf.space";

      try {
        const response = await fetch(`${backendUrl}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, recaptcha_token: recaptchaToken }),
        });

        const result = await response.json();
        
        if (!response.ok || (result.result && result.result.includes("Failed"))) {
          throw new Error(result.result || "Backend failed");
        }

        toast.success("Message sent via backup server ✅");
        reset();
        recaptchaRef.current?.reset();
      } catch (backendError: any) {
        console.error("Contact Error:", backendError);
        toast.error(backendError.message || "Failed to send message ❌");
        toast.error("Please check if your EmailJS Service/Template IDs are correct.", { duration: 5000 });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-5 md:py-24 overflow-hidden bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Toaster position="bottom-right" />
      
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Info & Branding */}
          <m.div 
            className="w-full lg:col-span-5 space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-left">
              <m.span 
                className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </m.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] md:leading-tight break-words">
                Let’s build <br className="hidden xs:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">something great</span>
              </h2>
              <p className="mt-4 md:mt-6 text-slate-400 text-sm md:text-lg leading-relaxed max-w-md">
                Have an idea? Let's turn it into reality. Reach out for collaborations or just a friendly chat.
              </p>
            </div>

{/* Contact Action Cards */}
            <div className="flex flex-col gap-4">
              <a 
                href={profile.calUrl}
                target="_blank"
                rel="noreferrer"
                className="group p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 flex items-center gap-3 sm:gap-4 overflow-hidden"
              >
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <CalendarClock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Book a Consultation</p>
                  <p className="text-sm sm:text-base text-slate-200 font-medium">Schedule a free 30-min call</p>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
                  { icon: Facebook, href: profile.socials.facebook, label: "Facebook" },
                  { icon: Twitter, href: profile.socials.twitter, label: "Twitter" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[60px] p-3 sm:p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-center group"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </m.div>

          {/* Right Column: The Form */}
          <m.div 
            className="w-full lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className="relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-2xl rounded-3xl p-1">
              {/* Inner Glow Effect */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <CardContent className="p-4 sm:p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  
                  {/* Name & Email Group */}
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6">
                    <m.div animate={errors.name ? "error" : ""} variants={shakeVariants} className="w-full text-left">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 ml-1">
                        Full Name
                      </label>
                      <input
                        {...register("name")}
                        placeholder="John Doe"
                        className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 outline-none transition-all"
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <m.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-[10px] mt-1 ml-1 font-bold">
                            {errors.name.message}
                          </m.p>
                        )}
                      </AnimatePresence>
                    </m.div>

                    <m.div animate={errors.email ? "error" : ""} variants={shakeVariants} className="w-full text-left">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 outline-none transition-all"
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <m.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-[10px] mt-1 ml-1 font-bold">
                            {errors.email.message}
                          </m.p>
                        )}
                      </AnimatePresence>
                    </m.div>
                  </div>

                  {/* Message Field */}
                  <m.div animate={errors.message ? "error" : ""} variants={shakeVariants} className="text-left">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 ml-1">
                      Your Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 outline-none transition-all resize-none"
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <m.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-[10px] mt-1 ml-1 font-bold">
                          {errors.message.message}
                        </m.p>
                      )}
                    </AnimatePresence>
                  </m.div>
                {/* reCAPTCHA and button section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
                  {/* reCAPTCHA Wrapper - High Precision Scaling */}
                  <div className="py-1 overflow-hidden">
                    <div className="md:origin-left scale-[0.75] xs:scale-[0.85] sm:scale-100">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY || ""}
                        theme="dark"
                      />
                    </div>
                  </div>
                 {/* submit button */}
                  <Button
                    type="submit"
                    className="w-48 md:w-60 lg:w-44 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-sm sm:text-base hover:opacity-90 transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span className="truncate">Send</span>
                        <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950/20 flex items-center justify-center">
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </>
                    )}
                  </Button>
                </div>
                
                </form>
              </CardContent>
            </Card>
          </m.div>
        </div>
      </div>
    </section>
  );
}
