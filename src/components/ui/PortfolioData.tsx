import {
  Code2,Server,Database, Sparkles, Laptop, Rocket, Palette, Search, Layers, PenTool,
} from "lucide-react";

export interface Project {
  slug: string;
  title: string;
  tags: string[];
  desc: string;
  image: string;
  link: string;
  longDescription?: string;
  challenges?: string[];
  solution?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  socials: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  services: { icon: React.ReactNode; title: string; desc: string }[];
  skills: string[];
  projects: Project[];
}

const profile: Profile = {
  name: "Mussarat Shamsher",
  role: "Agentic AI Developer | Full-Stack Engineer | SEO Professional",
  tagline: "I build autonomous, intelligent AI agents and high-performance web systems that scale.",
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
    { icon: <Server className="w-5 h-5" />, title: "Backend & APIs", desc: "Python • FastAPI • Auth • Railway • Hugging Face • Stremlit " },
    { icon: <Sparkles className="w-5 h-5" />, title: "AI Agents", desc: "Agentic AI • OpenAI SDK • Chainlit • LLM Tooling" },
    { icon: <Rocket className="w-5 h-5" />, title: "Deployment & Hosting", desc: "Railway • Hugging Face • Vercel• Netlify " },
    { icon: <Database className="w-5 h-5" />, title: "Data Layer", desc: "Integration • Sanity CMS • Firebase • MongoDB • Supabase • Qdrant" },
    { icon: <Code2 className="w-5 h-5" />, title: "Template Clone", desc: "I convert Figma and template designs into pixel-perfect, responsive, functional websites."},
    { icon: <Rocket className="w-5 h-5" />, title: "Web Redesign & Maintenance",desc: "I modernize outdated websites, improve performance, and provide long-term support."},
    { icon: <Search className="w-5 h-5" />, title: "SEO Optimization", desc: "Technical SEO • On/Off-Page SEO • Keywords Research • Personal/Product Branding • Content Strategy" },
    { icon: <PenTool className="w-5 h-5" />, title: "Content Writing", desc: "SEO-friendly Articles • Web content • Blogs • Technical Documentation • Product Descriptions" },
    { icon: <Palette className="w-5 h-5" />, title: "Graphic Design", desc: "Logos • Branding • UI Mockups" },
    { icon: <Laptop className="w-5 h-5" />, title: "Streamlit/Chainlit Apps", desc: "Data Apps • Dashboards • AI Integrations" },
  ],
  skills: [
    "Next.js", "HTML", "CSS", "JavaScript", "TypeScript","Tailwind","shadcn/ui", "daisyUI", "Framer Motion","AOS", "swiper-js",
    "Python","FastAPI","Python","OpenAI sdk","Sanity CMS","Stripe","OAuth","Clerk","Netlify","Vercel","Railway","Streamlit", "Chainlit",
    "Hugging Face" ,"Agents sdk", "Automation",
    "Git","GitHub","Canva", "Adobe Illustrator" ,"Adobe Photoshop","GIMP", "Ubersuggest", "Semrush", "Google Trends", "Keyword.io", 
    "mongols", "Schema Generator", "google analytics","Lighthouse", "Page Speed Insights", "SEO Quake", "Google Analytics"
  ],
  projects: [
    { slug: "digital-fte", title: "Digital FTE", 
      tags: ["Next.js", "Tailwind CSS", "Gmail automation","Supabase", "Hugging Face", "Python" ,"OpenAI Agents sdk"], 
      desc: "AI-powered digital employee platform with intelligent automation and modern responsive design.",  image: "/img13.png",  
      link: "https://mussarat-digital-fte.vercel.app/",
      longDescription: "Digital FTE is a cutting-edge platform designed to deploy 'Digital Full-Time Employees'. These AI agents are capable of handling complex business workflows, from automated email responses via Gmail to sophisticated data processing using Hugging Face models, all managed through a sleek Next.js interface.",
      challenges: [
        "Integrating multiple AI SDKs into a cohesive, low-latency workflow.",
        "Managing secure, real-time Gmail automation while maintaining user privacy.",
        "Designing a dashboard that simplifies complex agent configuration for non-technical users."
      ],
      solution: "We built a modular architecture using Python backends for heavy AI processing and Next.js for the frontend. By leveraging Supabase for real-time data and OpenAI's Agents SDK, we created a system where agents can be deployed and monitored with minimal effort."
    },
    { slug: "physical-ai-book",  title: "Physical AI Book", tags: ["Docusaurus", "CSS", "JavaScript", "TypeScript", "Railway", "Qdrant"], 
      desc: "Physical AI learning platform with structured content and engaging reading experience.", 
      image: "/img15.png", link: "https://physical-ai-book-ashy.vercel.app/",
      longDescription: "This project explores the intersection of Artificial Intelligence and the physical world. It serves as a comprehensive guide for developers building robots, IoT devices, and embedded AI systems.",
      challenges: [
        "Explaining complex hardware-software interactions in a clear, digital format.",
        "Deploying a high-availability documentation site with backend search capabilities.",
        "Maintaining consistency across hundreds of interconnected technical pages."
      ],
      solution: "Developed a custom Docusaurus theme for better code visualization. Deployed the backend vector search on Railway for low-latency responses, ensuring the 'Search as you Type' feature feels instantaneous."
    },
    { slug: "humanoid-robotics-book",  title: "Humanoid Robotics Book", 
      tags: ["Docusaurus", "CSS", "JavaScript", "Firebase", "TypeScript", "Qdrant"], 
      desc: "Educational robotics website featuring interactive content and responsive user experience.", 
      image: "/img14.png", link: "https://humanoid-robotics-book-sepia.vercel.app/",
      longDescription: "An interactive digital textbook dedicated to the field of humanoid robotics. It combines deep technical content with a modern, fast-loading documentation interface built on Docusaurus, enhanced with a vector search engine for intelligent querying.",
      challenges: [
        "Organizing vast amounts of technical documentation into a navigable structure.",
        "Implementing a fast, local-first search experience using vector embeddings.",
        "Optimizing high-resolution robotic diagrams for web performance."
      ],
      solution: "Utilized Docusaurus for its robust documentation features and integrated Qdrant for vector-based semantic search. This allows students to ask natural language questions and find relevant sections of the book instantly."
    },
    {slug: "photo-gallery", title: "Photo Gallery", tags: ["HTML", "CSS", "JavaScript"], desc: "Modern photo gallery application with responsive layouts and optimized image presentation.", image: "/img16.png", link: "https://photogallery-indol.vercel.app/"},
    { slug: "calculator", title: "Calculator", tags: ["JavaScript", "HTML", "CSS"], desc: "Responsive calculator application supporting essential arithmetic operations and clean design.", image: "/img18.png",  link: "https://calculator-iota-five-30.vercel.app/"},
    { slug: "todo-app", title: "Todo App", tags: ["Next.js", "React", "Tailwind CSS"], desc: "Task management application with intuitive interface and efficient productivity features.", image: "/img19.png", link: "https://hackthon-ii-todo-app.vercel.app/"},
    { slug: "music-player", title: "Music Player", tags: ["JavaScript", "HTML", "CSS"], desc: "Music player application with playback controls, playlists, and responsive interface.", image: "/img.png", link: "https://musicplayer-two-lovat.vercel.app/"},
    { 
      slug: "furniro", 
      title: "Furniro", 
      tags: ["Next.js","tailwind","shadcn/ui","clerk","stripe", "Email js"],
      desc: "Furniture webiste-full stack application with dark/light theme, authentication and stripe integration", 
      image: "/img1.png", 
      link: "https://functional-hackthon--two.vercel.app/",
      longDescription: "Furniro is a premium e-commerce experience designed for modern furniture shopping. It features a fully functional shopping cart, user authentication through Clerk, secure payment processing via Stripe, and a dynamic dark/light theme to suit user preferences.",
      challenges: [
        "Implementing a robust global state for the shopping cart that persists across sessions.",
        "Synchronizing theme preferences between the client-side UI and server-rendered components.",
        "Ensuring secure and reliable webhook handling for Stripe payments."
      ],
      solution: "We used Next.js's App Router with specialized middleware for authentication. Stripe's pre-built checkout flows were integrated for PCI-compliant payments, and Tailwind CSS's dark mode feature was leveraged for the theme switching."
    },
    { 
      slug: "flavour-fusion", 
      title: "Flavour Fusion", 
      tags: ["Next.js","tailwind","shadcn/ui","JavaScript","TypeScript","animate.js"], 
      desc: "Resturant eye-capturing website with feature of dynamic pages & comment feature on Blogs", 
      image:"/img2.png", 
      link: "https://resturant-flavourfusion.vercel.app/",
      longDescription: "Flavour Fusion is a high-performance restaurant website that prioritizes visual storytelling. It includes dynamic menu pages, a blog system with real-time commenting, and smooth animations powered by animate.js to enhance the culinary brand's online presence.",
      challenges: [
        "Optimizing large, high-resolution food imagery for fast page loads.",
        "Building a performant, spam-resistant comment system for the blog.",
        "Creating complex scroll-triggered animations without compromising mobile performance."
      ],
      solution: "Next.js's Image component was used for automatic optimization and lazy loading. We implemented a hybrid rendering strategy, using ISR (Incremental Static Regeneration) for the blog to ensure fast loads and up-to-date content."
    },  
    { slug: "figma-clone", title: "Figma clone website", tags: ["Next.js","tailwind","shadcn/ui","JavaScript","animate.js"], desc: "clone of Figma tempelate with user feature of post,delete or edit comment on Blog.", image:"/img3.png", link: "https://ui-ux-hackthon-lac.vercel.app/" },
    { 
      slug: "hire-developers", 
      title: "Hire developers", 
      tags: ["Next.js","tailwind","shadcn/ui"],
      desc: "Guided tests, knowledge flows, and insights export.", 
      image:"/img5.png", 
      link: "https://hiredevelopers-hiredev.vercel.app",
      longDescription: "Hire Developers is a platform designed to streamline the technical recruitment process. It allows hiring managers to create guided tests, visualize knowledge flows, and export detailed candidate insights for better decision-making.",
      challenges: [
        "Designing an intuitive 'Knowledge Flow' visualizer for candidate skill mapping.",
        "Implementing a secure, timed testing environment with anti-cheat measures.",
        "Handling multi-format data exports (PDF/CSV) directly from the client browser."
      ],
      solution: "We built the visualizer using SVG-based charting and custom React hooks for interactivity. The testing engine was developed with server-side validation to prevent manipulation, and client-side libraries were used for clean data exports."
    },
    {
      slug: "rishty-wali", 
      title: "Rishty Wali — Matchmaking AI Assistant",
      tags: ["Agents sdk","Streamlit","WhatsApp Integration"], 
      desc: "LLM assistant for profile matching, WhatsApp flows, and PDF summaries.", 
      image: "/img7.png", 
      link: "https://meet-rishtey-wali.streamlit.app/",
      longDescription: "Rishty Wali is a specialized AI assistant designed to streamline the matchmaking process. It uses Large Language Models to analyze user profiles, suggest compatible matches, and even generate professional PDF summaries for families to review.",
      challenges: [
        "Parsing unstructured personal data into structured compatibility metrics.",
        "Integrating seamless WhatsApp communication flows for real-time notifications.",
        "Ensuring the AI's tone remains respectful and culturally sensitive."
      ],
      solution: "Implemented a RAG (Retrieval-Augmented Generation) system to match profiles based on specific cultural and personal preferences. Streamlit was used for a rapid, responsive admin interface, while the Agents SDK handled the core logic."
    },
    { slug: "figma-to-code", title: "Figma to code", tags: ["Next.js","tailwind","shadcn/ui"], desc: "clone of Ecommerce Figma tempelate built in one day only.", image:"/img6.png", link: "https://figma-assign-ecommerce.vercel.app/" }, 
    { slug: "weather-app", title: "Weather App", tags: ["Agents sdk","Streamlit","WeatherAPI"], desc: "LLM agent for checking weather conditions.", image:"/img8.png", link: "https://weather-assistant.streamlit.app/" },
    { slug: "translator-agent", title: "Multilingual translator", tags: ["Agents sdk","Streamlit","Gemini-API"], desc: "LLM agent for translating user Queries into multiple languages.", image:"/img9.png", link: "https://multilingual-agent.streamlit.app/" },
    { slug: "qr-generator", title: "QR Code Generator", tags: ["Python","Streamlit", "CSS"], desc: "Batch QR creation with branding + export.", image:"/img10.png", link: "https://mussarat-qr-code-generator.streamlit.app/" },
    { slug: "python-website", title: "Python Website", tags: ["Python","Streamlit", "CSS", "React Slider"], desc: "It is a dynamic Python web app built with Streamlit, to showcase interactive Python projects.", image:"/img12.png", link: "https://test-python-web.streamlit.app/" },
    { slug: "logo-design", title: "Logo Design", tags: ["Canva"], desc: "Designed a modern and versatile logo for my portfolio website & SafarNama brand logo as an assignment.", image:"/logo-design.png", link: "https://drive.google.com/drive/folders/1jT-QZFw4LboKhop-hbSW1NuMu44qIQaI?usp=drive_link" },
    { slug: "poster-design", title: "Poster Design", tags: ["Canva"], desc: "Created eye-catching posters for events and promotions, enhancing visual communication.", image:"/scam.png", link: "https://drive.google.com/drive/folders/1W4dRB-lReAak_brA_AIH2PpO5Ua6D927?usp=drive_link" },
    { slug: "business-card", title: "Business Card & Branding", tags: ["Canva"], desc: "Crafted professional business cards and branding materials to establish a strong corporate identity.", image:"/b-card.png", link: "https://drive.google.com/drive/folders/1QTqR1Cp1xlrjNkjkM0pVr_IYeNKp1BZX?usp=drive_link" },
    { slug: "content-writing", title: "Content Writing", tags: ["SEO Writing","Blog Writing","Article Writing","Technical Writing","Creative Writing","Keyword Optimization","Content Strategy","Product Descriptions"], desc: "Writes SEO-friendly articles and web content to boost online presence and engagement.", image:"/content.png", link: "https://medium.com/@innolyze" },
    { slug: "keyword-research", title: "Keywords Research", tags: ["Semrush, Keyword.io, mongols, google trends",""], desc: "researched and analyzed keywords to improve website SEO and content strategy.", image:"/keywords.png", link: "https://drive.google.com/drive/folders/1fjbVim4RppMEuhBDufBKVX5FFDZq10WG?usp=drive_link" },
    { slug: "page-speed", title: "page Speed Insights", tags: ["Lighthouse"], desc: "Improved website performance and loading times through detailed analysis and optimization strategies.", image:"/speed.png", link: "https://pagespeed.web.dev/analysis/https-mussarat-web-dev-vercel-app/g1uiyqbiz3?hl=en-US&form_factor=mobile" },
  ],
};

export default profile;
