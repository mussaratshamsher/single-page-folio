import {
  Code2,Server,Database, Sparkles, Laptop, Rocket, Palette, Search, Layers, PenTool,
  MessageSquare,
  Workflow,
  Bot,
} from "lucide-react";

export interface Expertise {
  title: string;
  icon: string; // Icon name as string
  desc: string;
  tags: string[];
  colSpan: string;
}

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
  calendlyUrl: string;
  socials: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  services: { icon: React.ReactNode; title: string; desc: string; tags: string[] }[];
  expertise: Expertise[];
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
  resumeUrl: "https://canva.link/7x0ifqadikv7iad",
  calendlyUrl: "https://calendly.com/mussaratskhan7/30min",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61556406399229",
    linkedin: "https://www.linkedin.com/in/mussarat-shamsher-7618a6380/",
    twitter: "https://twitter.com/MussaratShams",
  },
  services: [
    { 
      icon: <Bot className="w-5 h-5" />, 
      title: "AI Agent Development", 
      desc: "Custom AI agents with memory, tool calling, and multi-step reasoning. I build intelligent systems using OpenAI, Gemini, and RAG architectures with VectorDBs.", 
      tags: ["AI Agents", "LLMs", "RAG"]
    },
    {
      icon: <Workflow className="w-5 h-5" />, 
      title: "Agentic Workflow Automation", 
      desc: "AI-powered workflows that automate research, content creation, and business operations using modern Agent SDKs and multi-agent orchestration.", 
      tags: ["Automation", "Workflow", "Python"]
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Full-Stack Engineering",
      desc: "End-to-end development from pixel-perfect Next.js frontends to robust Python FastAPI backends, focusing on scalable and type-safe architectures.", 
      tags: ["Next.js", "FastAPI", "TypeScript"]
    },
    { 
      icon: <Rocket className="w-5 h-5" />, 
      title: "Deployment & Optimization", 
      desc: "Managing cloud infrastructure on Vercel and Railway, implementing CI/CD pipelines, and modernizing outdated websites for peak performance.", 
      tags: ["DevOps", "Vercel", "Performance"]
    },
    { 
      icon: <Search className="w-5 h-5" />, 
      title: "SEO & Digital Strategy", 
      desc: "Technical SEO, keyword research, and performance optimization to boost online presence. I align technical builds with branding and marketing goals.", 
      tags: ["SEO", "Analytics", "Branding"]
    },
    { 
      icon: <Palette className="w-5 h-5" />, 
      title: "Design & UI/UX", 
      desc: "Crafting professional logos, branding assets, and high-fidelity UI mockups in Figma, ensuring a cohesive and modern visual identity across all platforms.", 
      tags: ["Figma", "Branding", "UI/UX"]
    },
  ],
  expertise: [
    {
      title: "Agentic AI",
      icon: "Bot",
      desc: "Custom AI agents with memory, tool calling, and multi-step reasoning capabilities.",
      tags: ["LLMs", "Agents SDK", "Reasoning", "Python", "FastAPI", "RAG"],
      colSpan: "md:col-span-2",
    },
    {
      title: "Full-Stack Development",
      icon: "Layers",
      desc: "Scalable web solutions from Next.js frontends to Python FastAPI backends.",
      tags: ["Next.js", "Tailwind" , "React", "Framer", "TypeScript", "JavaScript", "FastAPI", "Python", "HTML5", "CSS"],
      colSpan: "md:col-span-1",
    },
    {
      title: "Cloud & Deployment",
      icon: "Cloud",
      desc: "Optimized hosting, CI/CD pipelines, and cloud infrastructure management.",
      tags: ["Vercel", "Netlify","Google Cloud","Hugging Face", "Railway", "Git"],
      colSpan: "md:col-span-1",
    },
    {
      title: "Frontend Engineering",
      icon: "Code2",
      desc: "Pixel-perfect, responsive UI design with modern frameworks and animations.",
      tags: ["Next.js", "Tailwind", "React", "Framer", "HTML5", "CSS"],
      colSpan: "md:col-span-1",
    },
    {
      title: "SEO & Design",
      icon: "Search",
      desc: "Technical SEO optimization and professional graphic branding assets.",
      tags: ["On-page SEO","off-page SEO","Content Writing", "Logos", "Posters/Flyers","Branding"],
      colSpan: "md:col-span-1",
    },
  ],
  skills: [
    "Next.js", "HTML", "CSS", "JavaScript", "TypeScript","Tailwind","shadcn/ui", "daisyUI", "Framer Motion","AOS", "swiper-js",
    "Python","FastAPI","Python","OpenAI sdk","Sanity CMS","Stripe","OAuth","Clerk","Netlify","Vercel","Railway","Streamlit", "Chainlit",
    "Hugging Face" ,"Agents sdk", "Automation",  "Postgre SQL", "MySQL", "MongoDB", "Supabase", "Qdrant", "Firebase", "Figma",
    "GitHub Actions", "Git","GitHub","Canva", "Adobe Illustrator" ,"Adobe Photoshop","GIMP", "Ubersuggest", "Semrush", "Google Trends", "Keyword.io", 
    "mongols", "Schema Generator", "google analytics","Lighthouse", "Page Speed Insights", "SEO Quake", "Google Analytics"
  ],
  projects: [
    { slug: "digital-fte", title: "Digital FTE", tags: ["Next.js", "Tailwind CSS", "Gmail automation","Supabase", "Hugging Face", "Python" ,"OpenAI Agents sdk"], 
      desc: "AI-powered digital employee platform with intelligent automation and modern responsive design.",image: "/img13.png",link: "https://mussarat-digital-fte.vercel.app/",
      longDescription: "Digital FTE is a cutting-edge platform designed to deploy 'Digital Full-Time Employees'. These AI agents are capable of handling complex business workflows, from automated email responses via Gmail to sophisticated data processing using Hugging Face models, all managed through a sleek Next.js interface.",
      challenges: [ "Controlling API costs caused by high token usage across long-running AI conversations.",
  "Maintaining response quality while using smaller, more cost-effective language models.",
  "Optimizing context retrieval and memory management for efficient agent performance."
], solution: "We designed a token-efficient architecture using model routing, prompt engineering, and selective context injection. Lightweight models handled standard interactions, while advanced models were triggered only when necessary. Combined with conversation summarization and memory optimization, this significantly reduced costs without compromising user experience."   },
    { slug: "physical-ai-book",  title: "Physical AI Book", tags: ["Docusaurus", "CSS", "JavaScript", "TypeScript", "Railway", "Qdrant"], 
      desc: "Physical AI learning platform with structured content and engaging reading experience.", 
      image: "/img15.png", link: "https://physical-ai-book-ashy.vercel.app/",
      longDescription: "This project explores the intersection of Artificial Intelligence and the physical world. It serves as a comprehensive guide for developers building robots, IoT devices, and embedded AI systems.",
      challenges: [  "Explaining complex hardware-software interactions in a clear, digital format.",
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
      challenges: [ "Organizing vast amounts of technical documentation into a navigable structure.",
        "Implementing a fast, local-first search experience using vector embeddings.",
        "Optimizing high-resolution robotic diagrams for web performance."
      ],
      solution: "Utilized Docusaurus for its robust documentation features and integrated Qdrant for vector-based semantic search. This allows students to ask natural language questions and find relevant sections of the book instantly."
    },

   {
  slug: "content-analyzer", title: "AI Content Analyzer", tags: ["Next.js","TypeScript","OpenAI","Tailwind CSS","AI", "NLP"],
  desc: "AI-powered content analysis platform for evaluating text quality, readability, sentiment, and overall writing effectiveness.",
  image: "/img20.png", link: "https://ms-content-analyzer.vercel.app/",
  longDescription: "An intelligent content analysis application that leverages modern AI models to evaluate written content. It provides insights into readability, tone, grammar, sentiment, clarity, and overall content quality, helping users improve articles, blogs, reports, and professional writing through detailed AI-generated feedback.",
  challenges: [ "Designing an intuitive interface for presenting multiple AI analysis results.",
    "Managing AI responses while maintaining a smooth user experience.",
    "Structuring content evaluation into clear, actionable insights."],
  solution: "Built using Next.js and TypeScript with a responsive Tailwind CSS interface. Integrated AI-powered text analysis to generate comprehensive reports covering readability, sentiment, grammar, and content quality in an organized dashboard."},
{slug: "multilingual-agent", title: "Multilingual AI Agent", tags: [ "Next.js", "TypeScript", "OpenAI Agents SDK", "Tailwind CSS", "AI","Translation" ],
  desc: "An intelligent multilingual AI assistant capable of understanding and responding across multiple languages.",
  image: "/img21.png", link: "https://multilingual-agent.vercel.app/",
  longDescription: "A conversational AI assistant built to communicate seamlessly in multiple languages. The application enables users to ask questions, translate content, and receive context-aware responses regardless of language, demonstrating multilingual natural language processing and AI agent capabilities.",
  challenges: ["Maintaining conversational context across different languages.",
    "Handling multilingual input and generating accurate responses.",
    "Creating a clean and responsive chat interface for real-time interaction."
  ], solution:"Developed with Next.js and TypeScript while integrating AI agent capabilities for multilingual conversations. The application detects user intent, processes multilingual prompts, and delivers natural, context-aware responses through an intuitive chat experience."},
{slug: "digital-wallet-fraud-investigator", title: "Digital Wallet & Fraud Investigator", tags: [ "Python", "Streamlit","Machine Learning","Fraud Detection","AI", "Data Analysis"],
  desc: "AI-driven fraud detection system that analyzes digital wallet transactions to identify suspicious activities and financial risks.",
  image: "/img22.png", link: "https://digital-wallet-and-fraud-investigator.streamlit.app/",
  longDescription: "A machine learning-powered fraud investigation platform that analyzes digital wallet transaction data to detect suspicious behavior and potential financial fraud. The system assists users by identifying anomalies, evaluating transaction patterns, and providing AI-supported insights for fraud prevention.",
  challenges: [ "Processing transaction datasets efficiently for real-time analysis.",
    "Identifying anomalous transaction patterns with high accuracy.",
    "Presenting fraud investigation results in a clear and understandable format."
  ], solution:"Built using Python and Streamlit with machine learning models for anomaly detection and transaction analysis. The application provides interactive visualizations, fraud risk assessments, and AI-assisted insights to support financial investigation workflows."},
{slug:"digital-attendence-system", title:"Digital Attendence System", tags:["Python","Streamlit","AI","Face Recognition","Attendance Management"],
  desc:"AI-powered digital attendance system that uses facial recognition to automate attendance tracking and management.", image:"/img23.png",link: "https://mussarat123shamsher-attendence_system.hf.space",
 longDescription:"An intelligent attendance management system that leverages facial recognition technology to automate the process of tracking and recording attendance. The system enhances accuracy, reduces manual effort, and provides real-time attendance data for organizations and educational institutions.",
challenges:["Ensuring accurate facial recognition across diverse lighting conditions and angles.", "To reduce load time of camera as the application starts.", "Implementing a secure and efficient database for storing attendance records.", "Designing an intuitive user interface for administrators to monitor attendance." ,
"Integrating real-time attendance tracking with user-friendly reporting features."],
 solution:"Developed using Python and Streamlit with facial recognition libraries for accurate identification. The system captures images, processes them for facial features, and records attendance in a secure database. Real-time reporting and analytics were implemented to provide administrators with actionable insights."},
  
  {slug: "photo-gallery", title: "Photo Gallery", tags: ["HTML", "CSS", "JavaScript"], desc: "Modern photo gallery application with responsive layouts and optimized image presentation.", image: "/img16.png", link: "https://photogallery-indol.vercel.app/",
      longDescription: "This project is a modern photo gallery application designed to showcase images in a visually appealing and responsive manner. It features optimized image loading, intuitive navigation, and a clean, minimalist design that puts the focus on the photos themselves.",
      challenges: [ "Creating a responsive layout that adapts seamlessly to different screen sizes and orientations.",
        "Optimizing image loading to ensure fast performance without sacrificing quality.",
        "Implementing smooth navigation and transitions between images to enhance the user experience."
      ], solution: "We used CSS Grid and Flexbox to create a responsive layout that adjusts based on the viewport size. Lazy loading techniques were implemented to optimize image performance, and JavaScript was used to create smooth transitions and an intuitive navigation system for browsing through the gallery." },
 { slug: "calculator", title: "Calculator", tags: ["JavaScript", "HTML", "CSS"], desc: "Responsive calculator application supporting essential arithmetic operations and clean design.", image: "/img18.png",  link: "https://calculator-iota-five-30.vercel.app/",
      longDescription: "This project is a responsive calculator application that supports essential arithmetic operations. It features a clean and intuitive design, making it easy for users to perform calculations on both desktop and mobile devices.",
      challenges: [ "Designing a user interface that is both visually appealing and functional across different devices.",
        "Implementing accurate arithmetic operations while ensuring the application remains responsive.",
        "Handling edge cases such as division by zero and input validation to prevent errors."
      ], solution: "We used a combination of HTML, CSS, and JavaScript to create a responsive design that adapts to various screen sizes. The calculator logic was implemented in JavaScript with careful handling of edge cases to ensure accurate results and a smooth user experience."},
  { slug: "todo-app", title: "Todo App", tags: ["Next.js", "React", "Tailwind CSS"], desc: "Task management application with intuitive interface and efficient productivity features.", image: "/img19.png", link: "https://hackthon-ii-todo-app.vercel.app/",
      longDescription: "This project is a task management application designed to help users organize their to-do lists efficiently. It features an intuitive interface, allowing users to easily add, edit, and delete tasks while providing a visually appealing experience.",
      challenges: [ "Creating a user-friendly interface that allows for easy task management and organization.",
        "Implementing efficient state management to handle task creation, editing, and deletion.",
        "Ensuring the application is responsive and performs well across different devices."
      ], solution: "We built the application using Next.js and React for a dynamic user experience, while Tailwind CSS was used to create a clean and responsive design. State management was handled with React's useState and useEffect hooks to ensure smooth interactions and real-time updates to the task list."},
    { slug: "music-player", title: "Music Player", tags: ["JavaScript", "HTML", "CSS"], desc: "Music player application with playback controls, playlists, and responsive interface.", image: "/img.png", link: "https://musicplayer-two-lovat.vercel.app/",
      longDescription: "This project is a music player application that provides users with playback controls, playlist management, and a responsive interface. It allows users to enjoy their music collection in a visually appealing and user-friendly environment.",
      challenges: [ "Designing a user interface that is both visually appealing and functional for music playback.",
        "Implementing accurate playback controls and playlist management features.",
        "Ensuring the application is responsive and performs well across different devices."
      ], solution: "We used JavaScript to handle the music playback logic, while HTML and CSS were used to create a clean and responsive design. The application allows users to easily control their music, manage playlists, and enjoy a seamless listening experience on both desktop and mobile devices."},
    { slug: "furniro", title: "Furniro", tags: ["Next.js","tailwind","shadcn/ui","clerk","stripe", "Email js"],
      desc: "Furniture webiste-full stack application with dark/light theme, authentication and stripe integration", 
      image: "/img1.png", link: "https://functional-hackthon--two.vercel.app/",
      longDescription: "Furniro is a premium e-commerce experience designed for modern furniture shopping. It features a fully functional shopping cart, user authentication through Clerk, secure payment processing via Stripe, and a dynamic dark/light theme to suit user preferences.",
      challenges: [ "Implementing a robust global state for the shopping cart that persists across sessions.",
        "Synchronizing theme preferences between the client-side UI and server-rendered components.",
        "Ensuring secure and reliable webhook handling for Stripe payments." ],
      solution: "We used Next.js's App Router with specialized middleware for authentication. Stripe's pre-built checkout flows were integrated for PCI-compliant payments, and Tailwind CSS's dark mode feature was leveraged for the theme switching."},
   { slug: "flavour-fusion", title: "Flavour Fusion", tags: ["Next.js","tailwind","shadcn/ui","JavaScript","TypeScript","animate.js"], 
      desc: "Resturant eye-capturing website with feature of dynamic pages & comment feature on Blogs", image:"/img2.png", link: "https://resturant-flavourfusion.vercel.app/",
      longDescription: "Flavour Fusion is a high-performance restaurant website that prioritizes visual storytelling. It includes dynamic menu pages, a blog system with real-time commenting, and smooth animations powered by animate.js to enhance the culinary brand's online presence.",
      challenges: [ "Optimizing large, high-resolution food imagery for fast page loads.",
        "Building a performant, spam-resistant comment system for the blog.",
        "Creating complex scroll-triggered animations without compromising mobile performance."],
      solution: "Next.js's Image component was used for automatic optimization and lazy loading. We implemented a hybrid rendering strategy, using ISR (Incremental Static Regeneration) for the blog to ensure fast loads and up-to-date content." },  
   { slug: "figma-clone", title: "Figma clone website", tags: ["Next.js","tailwind","shadcn/ui","JavaScript","animate.js"], desc: "clone of Figma tempelate with user feature of post,delete or edit comment on Blog.", image:"/img3.png", link: "https://ui-ux-hackthon-lac.vercel.app/",
      longDescription: "This project is a clone of the Figma website, designed to replicate its sleek design and user experience. It features dynamic pages, a blog with commenting functionality, and smooth animations to create an engaging and visually appealing platform.",
      challenges: [ "Recreating Figma's complex UI components and interactions with high fidelity.",
        "Implementing a robust commenting system that allows users to post, delete, and edit comments while preventing spam.",
       "Ensuring the website remains performant and responsive across all devices, especially with the added complexity of animations."
      ], solution: "We meticulously analyzed Figma's design to replicate its UI components using Tailwind CSS and custom React components. The commenting system was built with a focus on user experience and security, while animations were optimized for performance using animate.js and careful state management." },
   { slug: "ecommerce-figma-clone", title: "Ecommerce Figma clone", tags: ["Next.js","tailwind","shadcn/ui"], desc: "clone of Ecommerce Figma tempelate built in one day only.", image:"/img6.png", link: "https://figma-assign-ecommerce.vercel.app/",
      longDescription: "This project is a rapid conversion of a complex e-commerce Figma design into a fully functional Next.js website. It demonstrates the ability to quickly interpret design files and implement responsive, production-ready code within a tight deadline.",
      challenges: [ "Translating intricate Figma designs into clean, maintainable code under time constraints." ],
      solution: "Focused on core layout and styling first, using Tailwind CSS for rapid development. Prioritized mobile responsiveness and key interactive elements to ensure the final product closely matched the original design." },
   { slug: "hire-developers", title: "Hire developers", tags: ["Next.js","tailwind","shadcn/ui"], desc: "Guided tests, knowledge flows, and insights export.", 
      image:"/img5.png", link: "https://hiredevelopers-hiredev.vercel.app",
      longDescription: "Hire Developers is a platform designed to streamline the technical recruitment process. It allows hiring managers to create guided tests, visualize knowledge flows, and export detailed candidate insights for better decision-making.",
      challenges: ["Designing an intuitive 'Knowledge Flow' visualizer for candidate skill mapping.",
        "Implementing a secure, timed testing environment with anti-cheat measures.",
        "Handling multi-format data exports (PDF/CSV) directly from the client browser."
      ], solution: "We built the visualizer using SVG-based charting and custom React hooks for interactivity. The testing engine was developed with server-side validation to prevent manipulation, and client-side libraries were used for clean data exports."},
  {slug: "rishty-wali", title: "Rishty Wali — Matchmaking AI Assistant", tags: ["Agents sdk","Streamlit","WhatsApp Integration"], 
      desc: "LLM assistant for profile matching, WhatsApp flows, and PDF summaries.", image: "/img7.png", link: "https://meet-rishtey-wali.streamlit.app/",
      longDescription: "Rishty Wali is a specialized AI assistant designed to streamline the matchmaking process. It uses Large Language Models to analyze user profiles, suggest compatible matches, and even generate professional PDF summaries for families to review.",
      challenges: [ "Parsing unstructured personal data into structured compatibility metrics.",
        "Integrating seamless WhatsApp communication flows for real-time notifications.",
        "Ensuring the AI's tone remains respectful and culturally sensitive."
      ], solution: "Implemented a RAG (Retrieval-Augmented Generation) system to match profiles based on specific cultural and personal preferences. Streamlit was used for a rapid, responsive admin interface, while the Agents SDK handled the core logic." },
  { slug: "figma-to-code", title: "Figma to code", tags: ["Next.js","tailwind","shadcn/ui"], desc: "clone of Ecommerce Figma tempelate built in one day only.", image:"/img6.png", link: "https://figma-assign-ecommerce.vercel.app/",
      longDescription: "This project is a rapid conversion of a complex e-commerce Figma design into a fully functional Next.js website. It demonstrates the ability to quickly interpret design files and implement responsive, production-ready code within a tight deadline.",
      challenges: [ "Translating intricate Figma designs into clean, maintainable code under time constraints.",]
      , solution: "Focused on core layout and styling first, using Tailwind CSS for rapid development. Prioritized mobile responsiveness and key interactive elements to ensure the final product closely matched the original design."}, 
   { slug: "weather-app", title: "Weather App", tags: ["Agents sdk","Streamlit","WeatherAPI"], desc: "LLM agent for checking weather conditions.", image:"/img8.png", link: "https://weather-assistant.streamlit.app/",
      longDescription: "This project is an AI-powered weather application that uses the Agents SDK to fetch real-time weather data from the WeatherAPI. It provides users with current conditions, forecasts, and personalized recommendations based on their location.",
      challenges: [  "Integrating real-time API data into an LLM-driven conversational interface.",],
      solution: "We created a custom agent that processes user queries, retrieves weather data from the WeatherAPI, and formats responses in a natural, conversational manner using Streamlit for the frontend.",},
  { slug: "translator-agent", title: "Multilingual translator", tags: ["Agents sdk","Streamlit","Gemini-API"], desc: "LLM agent for translating user Queries into multiple languages.", image:"/img9.png", link: "https://multilingual-agent.streamlit.app/",
      longDescription: "This project is a multilingual translation agent that leverages the Agents SDK and Gemini API to provide accurate translations across multiple languages. It serves as a powerful tool for breaking down language barriers in communication.",
      challenges: [
        "Ensuring translation accuracy and context preservation across diverse languages.",
        "Designing an intuitive interface for users to input queries and receive translations.",
        "Handling edge cases where direct translations may not capture cultural nuances."
      ], solution: "We implemented a multi-step reasoning process within the agent to analyze the context of user queries before fetching translations. Streamlit was used to create a user-friendly interface that supports both text input and output in various languages.",},
    { slug: "qr-generator", title: "QR Code Generator", tags: ["Python","Streamlit", "CSS"], desc: "Batch QR creation with branding + export.", image:"/img10.png", link: "https://mussarat-qr-code-generator.streamlit.app/", 
      longDescription: "This project is a QR code generator that allows users to create branded QR codes in bulk. It features customization options for colors and logos, as well as the ability to export generated codes for marketing and business use.",
      challenges: [
        "Generating high-quality QR codes that remain scannable even with branding overlays.",
        "Implementing batch processing for multiple QR code generation without performance degradation.",
        "Designing an export feature that allows users to download QR codes in various formats."
      ], solution: "We used a Python library for QR code generation that supports customization. Streamlit's efficient handling of file uploads and downloads was leveraged to create a seamless user experience for batch processing and exporting QR codes." },
    { slug: "python-website", title: "Python Website", tags: ["Python","Streamlit", "CSS", "React Slider"], desc: "It is a dynamic Python web app built with Streamlit, to showcase interactive Python projects.", image:"/img12.png", link: "https://test-python-web.streamlit.app/",
      longDescription: "This project is a dynamic web application built with Streamlit that serves as a portfolio for interactive Python projects. It features a clean, responsive design and allows users to explore various Python-based applications directly from the browser.",
      challenges: [
        "Creating a visually appealing and user-friendly interface using Streamlit's limited styling capabilities."
      ],solution: "We utilized Streamlit's component library and custom CSS to create a modern, responsive interface that enhances the user experience while maintaining the application's functionality." },
    { slug: "logo-design", title: "Logo Design", tags: ["Canva"], desc: "Designed a modern and versatile logo for my portfolio website & SafarNama brand logo as an assignment.", image:"/logo-design.png", link: "https://drive.google.com/drive/folders/1jT-QZFw4LboKhop-hbSW1NuMu44qIQaI?usp=drive_link",
      longDescription: "This project involved creating a modern and versatile logo for my personal portfolio website, as well as a brand logo for 'SafarNama'. The designs were crafted to reflect the unique identity and values of each brand, utilizing Canva's design tools for a professional finish.",
      challenges: [ "Capturing the essence of both personal and brand identities in a single logo design.",
        "Ensuring the logos are versatile enough to be used across various mediums and sizes.",
        "Balancing creativity with simplicity to create memorable and effective logos."
      ], solution: "We focused on minimalist design principles, using bold typography and simple geometric shapes to create logos that are both visually striking and easily recognizable. Canva's extensive template library and customization options were leveraged to refine the designs." }, 
  { slug: "poster-design", title: "Poster Design", tags: ["Canva"], desc: "Created eye-catching posters for events and promotions, enhancing visual communication.", image:"/scam.png", link: "https://drive.google.com/drive/folders/1W4dRB-lReAak_brA_AIH2PpO5Ua6D927?usp=drive_link",
      longDescription: "This project involved designing a series of eye-catching posters for various events and promotions. The goal was to enhance visual communication and attract attention while conveying key information effectively.",
      challenges: [
        "Designing posters that stand out in a crowded visual landscape while effectively communicating the intended message."],
      solution: "We utilized Canva's design tools to create visually striking posters that balance bold imagery with clear typography. Each poster was tailored to the specific event or promotion, ensuring that the design resonates with the target audience and effectively conveys the desired message." },
   { slug: "ui-mockup", title: "UI Mockup Design", tags: ["Canva"], desc: "Designed intuitive UI mockups for web and mobile applications, improving user experience and interface aesthetics.", image:"/ui-mockup.png", link: "https://drive.google.com/drive/folders/1jT-QZFw4LboKhop-hbSW1NuMu44qIQaI?usp=drive_link",
      longDescription: "This project involved creating intuitive UI mockups for both web and mobile applications. The designs focused on improving user experience and enhancing the aesthetic appeal of the interfaces, utilizing Canva's design capabilities to produce professional-quality mockups.",
      challenges: [ "Balancing creativity with usability to create mockups that are both visually appealing and functional."
      ], solution: "We applied user-centered design principles, ensuring that each mockup not only looks good but also provides a seamless user experience. Canva's extensive library of design elements and templates was leveraged to create polished, high-fidelity mockups that effectively communicate the intended user interface and experience." },
    { slug: "business-card", title: "Business Card & Branding", tags: ["Canva"], desc: "Crafted professional business cards and branding materials to establish a strong corporate identity.", image:"/b-card.png", link: "https://drive.google.com/drive/folders/1QTqR1Cp1xlrjNkjkM0pVr_IYeNKp1BZX?usp=drive_link",
      longDescription: "This project involved designing professional business cards and comprehensive branding materials to establish a strong corporate identity. The designs were created to reflect the unique values and personality of the brand, utilizing Canva's design tools for a polished and cohesive look.",
      challenges: ["Creating a cohesive visual identity across various branding materials while ensuring each piece stands out on its own."
      ], solution: "We focused on consistent use of color schemes, typography, and design elements to create a unified brand image. Canva's customization options were used to tailor each piece of branding material to the specific needs of the business while maintaining overall brand cohesion."},
 { slug: "content-writing", title: "Content Writing", tags: ["SEO Writing","Blog Writing","Article Writing","Technical Writing","Creative Writing","Keyword Optimization","Content Strategy","Product Descriptions"], desc: "Writes SEO-friendly articles and web content to boost online presence and engagement.", image:"/content.png", link: "https://medium.com/@innolyze",
      longDescription: "This project focuses on creating SEO-friendly articles and web content that enhances online presence and drives engagement. The content is crafted to be informative, engaging, and optimized for search engines, covering a range of topics from technical writing to creative storytelling.",
      challenges: [ "Balancing SEO optimization with engaging, high-quality content that resonates with readers."
      ], solution: "We conducted thorough keyword research to identify relevant topics and incorporated those keywords naturally into the content. The writing process emphasized clarity, value, and readability to ensure that the content not only ranks well in search engines but also provides meaningful insights and information to the audience." },
 { slug: "keyword-research", title: "Keywords Research", tags: ["Semrush, Keyword.io, mongols, google trends",""], desc: "researched and analyzed keywords to improve website SEO and content strategy.", image:"/keywords.png", link: "https://drive.google.com/drive/folders/1fjbVim4RppMEuhBDufBKVX5FFDZq10WG?usp=drive_link",
      longDescription: "This project involved researching and analyzing keywords to enhance website SEO and inform content strategy. The goal was to identify high-impact keywords that could drive organic traffic and improve search engine rankings.",
      challenges: [ "Identifying keywords that are both relevant to the target audience and have a high search volume while maintaining manageable competition."
      ], solution: "We utilized tools like Semrush, Keyword.io, Mongols, and Google Trends to conduct comprehensive keyword research. By analyzing search volume, competition, and relevance, we were able to curate a list of strategic keywords that informed content creation and optimization efforts."
  },
    { slug: "page-speed", title: "page Speed Insights", tags: ["Lighthouse"], desc: "Improved website performance and loading times through detailed analysis and optimization strategies.", image:"/speed.png", link: "https://pagespeed.web.dev/analysis/https-mussarat-web-dev-vercel-app/g1uiyqbiz3?hl=en-US&form_factor=mobile",
      longDescription: "This project focused on improving website performance and loading times by conducting detailed analysis using Lighthouse. The insights gained from the analysis were used to implement optimization strategies that enhance the overall user experience.",
      challenges: [ "Identifying and addressing the specific performance bottlenecks that were impacting page load times."
      ], solution: "We conducted a thorough Lighthouse audit to identify key performance issues such as render-blocking resources, unoptimized images, and inefficient code. Based on the findings, we implemented targeted optimizations including code splitting, image compression, and leveraging browser caching to significantly improve page load times and overall performance."
     },
  ],
};

export default profile;
