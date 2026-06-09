"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { m, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Facebook, Twitter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import profile from "@/components/ui/PortfolioData";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";

const shakeVariants = {
  error: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } },
};

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://mussarat123shamsher-porfolio-backend.hf.space";

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message via backend.");
      }

      toast.success("Message sent successfully ✅");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="border-y border-white/5 bg-gradient-to-b from-slate-950 to-blue-950/20"
    >
      <Toaster position="bottom-right" />
      <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-8 items-start">
        {/* Left side - Info */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Let’s build something great
          </h2>
          <p className="mt-3 text-slate-300/90">
            Tell me a bit about your project and timeline. <br />
            or visit our company website{" "}
            <a
              href="https://www.innolyze.com/"
              target="_blank"
              className="text-emerald-300 ml-1 mr-1"
            >
              ℐ𝓃𝓃𝑜𝓁𝓎𝓏𝑒
            </a>{" "}
            to see our Services & detailed projects
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a className="hover:underline" href={`mailto:${profile.email}`}>
                {profile.email}{" "}
              </a>
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <Linkedin className="w-4 h-4" />
              <a
                className="hover:underline"
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn{" "}
              </a>
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <Facebook className="w-4 h-4" />
              <a
                className="hover:underline"
                href={profile.socials.facebook}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <Twitter className="w-4 h-4" />
              <a
                className="hover:underline"
                href={profile.socials.twitter}
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Twitter{" "}
              </a>
            </div>
          </div>
        </m.div>

        {/* Right side - Form */}
        <m.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="bg-slate-900/70 shadow-[0_0_20px_rgba(16,185,129,0.1)] border-white/5">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Input */}
                <m.div animate={errors.name ? "error" : ""} variants={shakeVariants}>
                  <label className="text-sm font-medium text-slate-200">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <m.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.name.message}
                      </m.p>
                    )}
                  </AnimatePresence>
                </m.div>

                {/* Email Input */}
                <m.div animate={errors.email ? "error" : ""} variants={shakeVariants}>
                  <label className="text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <m.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.email.message}
                      </m.p>
                    )}
                  </AnimatePresence>
                </m.div>

                {/* Message Input */}
                <m.div animate={errors.message ? "error" : ""} variants={shakeVariants}>
                  <label className="text-sm font-medium text-slate-200">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <m.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-400 text-xs mt-1"
                      >
                        {errors.message.message}
                      </m.p>
                    )}
                  </AnimatePresence>
                </m.div>

                <Button
                  type="submit"
                  className="rounded-xl w-full bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-900 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </m.div>
      </div>
    </section>
  );
}
