"use client";

import { useState } from "react";
import { Mail, Linkedin, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import profile from "@/components/ui/PortfolioData";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const wordCount = formData.message.trim().split(/\s+/).length;

  if (!formData.name || !formData.email || !formData.message) {
    alert("All fields are required.");
    return;
  }

  if (wordCount < 10) {
    alert("Message must be at least 10 words.");
    return;
  }
  if (wordCount > 250) {
    alert("Message must not exceed 250 words.");
    return;
  }
  try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error("EmailJS environment variables are not configured.");
    }

    setLoading(true);
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      publicKey
    );

    alert("Message sent successfully ✅");
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    console.error(error);
    alert("Failed to send message ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <section
      id="contact"
      className="border-y border-white/5 bg-gradient-to-b from-slate-950 to-blue-950/20"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-8 items-start">
        {/* Left side - Info */}
        <div data-aos="fade-right">
          <h2 className="text-2xl md:text-3xl font-bold">Let’s build something great</h2>
          <p className="mt-3 text-slate-300/90">
            Tell me a bit about your project and timeline. <br />
            or visit our company website{" "}
            <a href="https://www.innolyze.com/" target="_blank" className="text-emerald-300 ml-1 mr-1">
              ℐ𝓃𝓃𝑜𝓁𝓎𝓏𝑒</a> to see our Services & detailed projects
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a className="hover:underline" href={`mailto:${profile.email}`}>
                {profile.email} </a>
            </div>
            <div className="flex items-center gap-2"> <Linkedin className="w-4 h-4" />
              <a className="hover:underline" href={profile.socials.linkedin}
                target="_blank" rel="noreferrer">LinkedIn </a>
            </div>
            <div className="flex items-center gap-2"> <Facebook className="w-4 h-4" />
              <a className="hover:underline" href={profile.socials.facebook}
              target="_blank" rel="noreferrer">Facebook</a>
            </div>
            <div className="flex items-center gap-2"> <Twitter className="w-4 h-4" />
              <a className="hover:underline" href={profile.socials.twitter}
                target="_blank" rel="noreferrer"> Twitter </a>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <Card className="bg-slate-900/70" data-aos="fade-left">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-200">Name</label>
                <input name="name" value={formData.name}
                 onChange={handleChange} required className="mt-1 w-full rounded-xl border 
    border-white/10 bg-slate-950/60 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/40"/>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-200">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
              required className="mt-1 w-full rounded-xl border border-white/10 
    bg-slate-950/60 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/40" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-200">Message</label>
                <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                required className="mt-1 w-full rounded-xl border border-white/10 
    bg-slate-950/60 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/40"/>
              </div> 
              <Button type="submit" className="rounded-xl w-full 
    bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-900 hover:opacity-90"
                disabled={loading}> {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
