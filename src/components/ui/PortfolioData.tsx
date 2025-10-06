
import {
  Code2,Server,Database, Sparkles, Laptop, Rocket, Palette, Search, Layers, PenTool,
} from "lucide-react";

const profile = {
  name: "Mussarat Shamsher",
  role: "Full-Stack Developer, SEO Specialist, Graphic Designer & AI Integrator",
  tagline: "I turn ideas into robust, efficient, and user-focused products.",
  email: "musaratskhan@gmail.com",
  phone: "+92 3182593455",
  location: "Pakistan (Remote)",
  resumeUrl: "https://milestone1-personal-static-resume.vercel.app/",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61556406399229",
    linkedin: "https://www.linkedin.com/in/mussarat-shamsher-7618a6380/",
    twitter: "https://twitter.com/MussaratShams",
  },
  services: [
    {icon: <Layers className="w-5 h-5" />,title: "Full-Stack Development",desc: "From Next.js frontends to Python FastAPI backends, I build complete, scalable solutions."},
    { icon: <Code2 className="w-5 h-5" />, title: "Frontend Engineering", desc: "HTML • CSS • TypeScript • Tailwind • Next.js • shadcn/ui • framer-motion • AOS • daisy UI" },
    { icon: <Server className="w-5 h-5" />, title: "Backend & APIs", desc: "Python • FastAPI • Auth • Railway" },
    { icon: <Sparkles className="w-5 h-5" />, title: "AI Agents", desc: "Agentic AI • OpenAI SDK • Chainlit • LLM Tooling" },
    { icon: <Rocket className="w-5 h-5" />, title: "Deployment & Hosting", desc: "Railway • Vercel• Netlify" },
    { icon: <Database className="w-5 h-5" />, title: "Data Layer", desc: "Integration • Sanity CMS " },
    { icon: <Code2 className="w-5 h-5" />, title: "Template Clone", desc: "I convert Figma and template designs into pixel-perfect, responsive, functional websites."},
    { icon: <Rocket className="w-5 h-5" />, title: "Web Redesign & Maintenance",desc: "I modernize outdated websites, improve performance, and provide long-term support."},
    { icon: <Search className="w-5 h-5" />, title: "SEO Optimization", desc: "Technical SEO • On/Off-Page SEO • Keywords Research • Personal/Product Branding • Content Strategy" },
    { icon: <PenTool className="w-5 h-5" />, title: "Content Writing", desc: "SEO-friendly Articles • Web content • Blogs • Technical Documentation • Product Descriptions" },
    { icon: <Palette className="w-5 h-5" />, title: "Graphic Design", desc: "Logos • Branding • UI Mockups" },
    { icon: <Laptop className="w-5 h-5" />, title: "Streamlit/Chainlit Apps", desc: "Data Apps • Dashboards • AI Integrations" },
  ],
  skills: [
    "Next.js", "HTML", "CSS", "JavaScript", "TypeScript","Tailwind","shadcn/ui", "daisyUI", "Framer Motion","AOS", "swiper-js",
    "Python","FastAPI","Python","OpenAI sdk","Sanity CMS","Stripe","OAuth","Clerk","Netlify","Vercel","Railway","Streamlit","Agents sdk",
    "Git","GitHub","Canva", "Adobe Illustrator" ,"Adobe Photoshop","GIMP", "Ubersuggest", "Semrush", "Google Trends", "Keyword.io", 
    "mongols", "Schema Generator", "google analytics","Lighthouse", "Page Speed Insights", "SEO Quake", "Google Analytics"
  ],
  projects: [
    { title: "Furniro", tags: ["Next.js","tailwind","shadcn/ui","clerk","stripe"],desc: "Furniture webiste-full stack application with dark/light theme, authentication and stripe integration", 
      image: "/img1.png" , link: "https://functional-hackthon--two.vercel.app/" },

    { title: "Flavour Fusion", tags: ["Next.js","tailwind","shadcn/ui","JavaScript","TypeScript","animate.js"], desc: "Resturant eye-capturing website with feature of dynamic pages & comment feature on Blogs",
    image:"/img2.png", link: "https://resturant-flavourfusion.vercel.app/" },  

    { title: "Figma clone website", tags: ["Next.js","tailwind","shadcn/ui","JavaScript","animate.js"], desc: "clone of Figma tempelate with user feature of post,delete or edit comment on Blog.",
      image:"/img3.png", link: "https://ui-ux-hackthon-lac.vercel.app/" },

    { title: "Figma to code", tags: ["Next.js","tailwind","shadcn/ui"], desc: "clone of Ecommerce Figma tempelate built in one day only.",
      image:"/img6.png", link: "https://figma-assign-ecommerce.vercel.app/" }, 

    // { title: "Personal Portfolio", tags: ["Next.js","Tailwind","JavaScript","shadcn/ui"], desc: "Showcasing my projects, skills, and services.",
    //   image:"/img4.png", link: "https://portfolio-mussarat-shamsher.vercel.app/" },

    { title: "Hire developers", tags: ["Next.js","tailwind","shadcn/ui"],desc: "Guided tests, knowledge flows, and insights export.",
      image:"/img5.png", link: "https://hiredevelopers-hiredev.vercel.app" },

    { title: "Rishty Wali — Matchmaking AI Assistant",tags: ["Agents sdk","Streamlit","WhatsApp Integration"], desc: "LLM assistant for profile matching, WhatsApp flows, and PDF summaries.", 
      image:"/img7.png", link: "https://meet-rishtey-wali.streamlit.app/" },

    { title: "Weather App", tags: ["Agents sdk","Streamlit","WeatherAPI"], desc: "LLM agent for checking weather conditions.",
      image:"/img8.png", link: "https://weather-assistant.streamlit.app/" },

    { title: "Multilingual translator", tags: ["Agents sdk","Streamlit","Gemini-API"], desc: "LLM agent for translating user Queries into multiple languages.",
      image:"/img9.png", link: "https://multilingual-agent.streamlit.app/" },

    { title: "QR Code Generator", tags: ["Python","Streamlit"], desc: "Batch QR creation with branding + export.",
      image:"/img10.png", link: "https://mussarat-qr-code-generator.streamlit.app/" },

    // { title: "Mystery Adventure", tags: ["Python","Streamlit"], desc: "An interactive mystery-adventure puzzle built with Streamlit, guiding users through coded challenges and narrative twists.", 
    //  image:"/img11.png", link: "https://pythonchallange-mystery-adventure.streamlit.app/" },

    { title: "Python Website", tags: ["Python","Streamlit"], desc: "It is a dynamic Python web app built with Streamlit, to showcase interactive Python projects.",
     image:"/img12.png", link: "https://test-python-web.streamlit.app/" },

    { title: "Logo Design", tags: ["Canva"], desc: "Designed a modern and versatile logo for my portfolio website & SafarNama brand logo as an assignment.",
     image:"/logo-design.png", link: "https://drive.google.com/drive/folders/1jT-QZFw4LboKhop-hbSW1NuMu44qIQaI?usp=drive_link" },

     { title: "Poster Design", tags: ["Canva"], desc: "Created eye-catching posters for events and promotions, enhancing visual communication.",
     image:"/scam.png", link: "https://drive.google.com/drive/folders/1W4dRB-lReAak_brA_AIH2PpO5Ua6D927?usp=drive_link" },

     { title: "Business Card & Branding", tags: ["Canva"], desc: "Crafted professional business cards and branding materials to establish a strong corporate identity.",
     image:"/b-card.png", link: "https://drive.google.com/drive/folders/1QTqR1Cp1xlrjNkjkM0pVr_IYeNKp1BZX?usp=drive_link" },

     { title: "Content Writing", tags: ["SEO Writing","Blog Writing","Article Writing","Technical Writing","Creative Writing",
    "Keyword Optimization","Content Strategy","Product Descriptions"], desc: "Writes SEO-friendly articles and web content to boost online presence and engagement.",
     image:"/content.png", link: "https://medium.com/@innolyze" },

     { title: "Keywords Research", tags: ["Semrush, Keyword.io, mongols, google trends",""], desc: "researched and analyzed keywords to improve website SEO and content strategy.",
     image:"/keywords.png", link: "https://drive.google.com/drive/folders/1fjbVim4RppMEuhBDufBKVX5FFDZq10WG?usp=drive_link" },

     { title: "page Speed Insights", tags: ["Lighthouse"], desc: "Improved website performance and loading times through detailed analysis and optimization strategies.",
     image:"/speed.png", link: "https://pagespeed.web.dev/analysis/https-mussarat-web-dev-vercel-app/g1uiyqbiz3?hl=en-US&form_factor=mobile" },
  ],
};

export default profile;
