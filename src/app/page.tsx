"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Download, 
  Briefcase, 
  Calendar, 
  MapPin, 
  BookOpen, 
  FileText, 
  Award, 
  Mail, 
  Brain, 
  Database, 
  Plane, 
  BarChart3, 
  Bot, 
  Layers, 
  Sparkles,
  Terminal as TerminalIcon,
  ChevronRight,
  ExternalLink,
  Code2,
  CheckCircle2,
  Lock,
  Globe,
  Bell,
  Radio,
  Zap,
  Loader2,
  AlertCircle,
  Send,
  Workflow,
  MonitorPlay,
  Network
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { portfolioProjects } from "@/data/projects";
import { ProjectPresentationModal, ProjectData } from "@/components/project-presentation-modal";
import { cn } from "@/lib/utils";
import { LotusLogo } from "@/components/lotus-logo";

// Custom initial logo svg
const LogoSvg = () => (
  <svg className="w-10 h-10 text-[#AD262D]" viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 15 L85 40 L70 85 L30 85 L15 40 Z" fill="none" stroke="currentColor" strokeWidth="6" />
    <circle cx="50" cy="50" r="10" />
    <path d="M50 25 L50 40 M50 60 L50 75 M30 50 L40 50 M60 50 L70 50" stroke="currentColor" strokeWidth="4" />
  </svg>
);

const updatesList = [
  {
    tag: "Internship",
    date: "Apr 2026 – Present",
    status: "Active",
    title: "Generative AI Developer Intern at NavonLabs Pvt Ltd",
    description: "Building production-grade Agentic AI applications using LangGraph, RAG pipelines, and LLM evaluation frameworks.",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    tag: "Publication",
    date: "2026",
    status: "Accepted",
    title: "eduRAG Research Paper Accepted at ICT4SD 2026",
    description: "Paper accepted on Confidence-Weighted GraphRAG for multi-hop question answering across structured knowledge graphs.",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    tag: "Internship",
    date: "Dec 2024 – Jan 2025",
    status: "Completed",
    title: "AI & Full-Stack Development Intern at Edunet Foundation",
    description: "Deployed production-ready MERN stack apps with MongoDB index optimization and secure payment gateway integration.",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    tag: "Academics",
    date: "2022 – 2026",
    status: "Graduation",
    title: "B.E. in Computer Engineering (SPPU - AISSMS IOIT)",
    description: "Specializing in Agentic AI, Graph Databases, and Scalable Full-Stack Web Architectures.",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

const experiences = [
  {
    role: "Generative AI Developer Intern",
    company: "NavonLabs Pvt Ltd",
    date: "Apr 2026 – Oct 2026 (Ongoing)",
    location: "Hybrid (Nashik + Zoom)",
    description: "Building production-grade Agentic AI applications using LangGraph, RAG pipelines, and LLM evaluation frameworks under enterprise AI engineering mentorship.",
    responsibilities: [
      "Building production-grade Agentic AI applications using LangGraph, RAG pipelines, and LLM evaluation frameworks.",
      "Developing a live capstone AI project with real-world architecture and deployment patterns, certified by NavonLabs Pvt Ltd.",
      "Trained in Python-first engineering practices: prompt design, agentic workflow orchestration, and multi-step LLM system evaluation.",
      "Performed QA on LLM pipeline outputs — designing evaluation test cases, validating generated data against expected results, logging defects, and tracking progress."
    ],
  },
  {
    role: "AI & Full-Stack Development Intern",
    company: "Edunet Foundation (EY GDS & AICTE)",
    date: "Dec 2024 – Jan 2025",
    location: "Remote",
    description: "Built and deployed production-ready MERN stack applications with database optimization and secure payment integration.",
    responsibilities: [
      "Deployed a production-ready MERN stack application in a Linux environment, managing end-to-end build, release, and rollback cycles.",
      "Reduced MongoDB query latency by applying indexing strategies and aggregation pipeline tuning on a live application dataset.",
      "Built JWT-based authentication and a secure REST API layer; enforced codebase hygiene via Git branching and code review PR workflows.",
      "Integrated a third-party payment gateway into the backend, maintaining API stability under concurrent load.",
      "Executed functional testing and manual QA passes across web app modules prior to release, documenting issues and verifying fixes."
    ],
  },
];

const skillsCategories = [
  { 
    category: "Agentic AI & Engineering", 
    skills: [
      { name: "LangGraph", rotate: "-2deg" },
      { name: "Multi-Agent Systems", rotate: "1.5deg" },
      { name: "Prompt Engineering", rotate: "-1deg" },
      { name: "LLM Evaluation", rotate: "3deg" },
      { name: "Workflow Design", rotate: "-3deg" },
      { name: "Tool Calling", rotate: "2deg" }
    ]
  },
  { 
    category: "Retrieval & LLMs", 
    skills: [
      { name: "RAG / GraphRAG", rotate: "1deg" },
      { name: "Knowledge Graphs", rotate: "-1.5deg" },
      { name: "Gemini / OpenAI", rotate: "2deg" },
      { name: "Function Calling", rotate: "-2deg" },
      { name: "Neo4j", rotate: "3deg" },
      { name: "ChromaDB", rotate: "-1deg" }
    ]
  },
  { 
    category: "Backend & Systems", 
    skills: [
      { name: "Python", rotate: "-2deg" },
      { name: "FastAPI / Node.js", rotate: "1deg" },
      { name: "REST APIs", rotate: "-3deg" },
      { name: "MongoDB", rotate: "2deg" },
      { name: "Docker", rotate: "-1deg" },
      { name: "Git / DevOps", rotate: "1.5deg" }
    ]
  },
  { 
    category: "Frontend & Machine Learning", 
    skills: [
      { name: "React / Next.js", rotate: "3deg" },
      { name: "TypeScript", rotate: "-2deg" },
      { name: "Tailwind CSS", rotate: "1deg" },
      { name: "Scikit-Learn", rotate: "-1.5deg" },
      { name: "Pandas / NumPy", rotate: "2deg" },
      { name: "Transformer Models", rotate: "-2.5deg" }
    ]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Maps showcase project ID to matching custom terminal filenames
  const projectFilenames: Record<string, string> = {
    "booky": "nlp_analyzer.py",
    "churn-predictor": "churn_risk_model.py",
    "studypoint": "studypoint_portal.py",
    "edurag": "graphrag_benchmark.py",
    "vigilant": "crisis_dispatch_agent.py",
    "webforge": "monorepo_boilerplate.sh",
    "salesforce": "sales_funnel_viz.py"
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [contactFeedback, setContactFeedback] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactStatus("error");
      setContactFeedback("Please fill out your name, email, and message.");
      return;
    }

    setContactStatus("loading");
    setContactFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setContactStatus("success");
      setContactFeedback(data.message || "Message sent successfully! I'll get back to you soon.");
      setContactForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setContactStatus("error");
      setContactFeedback(err.message || "Failed to deliver message. Please reach out directly to dev.adit01@gmail.com.");
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground scroll-smooth">
      
      {/* 1. HOME / HERO SECTION */}
      <section id="home" className="relative flex min-h-screen flex-col items-center justify-center pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hello intro & verified developer badge */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="relative inline-block">
              {/* Hand-drawn look Arrow decoration */}
              <div className="absolute -top-12 -left-12 w-14 h-14 hidden md:block text-[#AD262D]">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M80,20 C60,40 30,50 15,70 M15,70 L35,70 M15,70 L15,50" />
                </svg>
              </div>
              
              <div className="inline-flex items-center gap-2 text-xl font-medium text-slate-500 mb-2">
                Hello! I Am
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 font-serif leading-none flex flex-wrap items-center gap-3">
                <span className="text-[#AD262D]">Aditya Anil Kokate</span>
                <LotusLogo size={42} className="shadow-none inline-flex" />
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 max-w-[550px] leading-relaxed">
              Generative AI Intern at <span className="font-semibold text-slate-800">NavonLabs</span> and Computer Engineering student specializing in building production-ready Multi-Agent systems, robust GraphRAG frameworks, and full-stack platforms.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#projects">
                <Button size="lg" className="rounded-full bg-[#AD262D] hover:bg-[#911f24] text-white font-extrabold px-8 transition-colors shadow-sm">
                  Explore Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="/Aditya_Kokate_CV.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50 px-8 font-semibold shadow-sm">
                  <Download className="mr-2 h-4 w-4 text-[#AD262D]" />
                  Resume / CV
                </Button>
              </a>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-4 pt-6 text-slate-400">
              <a href="https://github.com/Aditk1" target="_blank" rel="noopener noreferrer" className="hover:text-[#AD262D] transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://linkedin.com/in/aditya-kokate-6654b4248" target="_blank" rel="noopener noreferrer" className="hover:text-[#AD262D] transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Right Column: Code Editor showing profile information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="code-editor">
              <div className="window-controls bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <span className="text-xs font-mono text-slate-400">profile.js</span>
                <div className="w-10"></div>
              </div>

              <div className="code-block font-mono bg-white text-slate-700">
                <span className="code-line"><span className="line-number">1</span><span className="keyword">const</span> <span className="variable">profile</span> <span className="operator">=</span> &#123;</span>
                <span className="code-line"><span className="line-number">2</span>  <span className="property">name</span>: <span className="string">"Aditya Anil Kokate"</span>,</span>
                <span className="code-line"><span className="line-number">3</span>  <span className="property">role</span>: <span className="string">"Agentic AI Engineer"</span>,</span>
                <span className="code-line"><span className="line-number">4</span>  <span className="property">education</span>: <span className="string">"Computer Engineering (AISSMS IOIT, 2026)"</span>,</span>
                <span className="code-line"><span className="line-number">5</span>  <span className="property">internship</span>: <span className="string">"NavonLabs Pvt Ltd"</span>,</span>
                <span className="code-line"><span className="line-number">6</span>  <span className="property">skills</span>: [</span>
                <span className="code-line"><span className="line-number">7</span>    <span className="string">"LangGraph"</span>, <span className="string">"GraphRAG"</span>, <span className="string">"FastAPI"</span>, <span className="string">"Next.js"</span></span>
                <span className="code-line"><span className="line-number">8</span>  ],</span>
                <span className="code-line"><span className="line-number">9</span>  <span className="property">hardWorker</span>: <span className="boolean">true</span>,</span>
                <span className="code-line"><span className="line-number">10</span>  <span className="property">quickLearner</span>: <span className="boolean">true</span>,</span>
                <span className="code-line"><span className="line-number">11</span>  <span className="property">openToWork</span>: <span className="boolean">true</span></span>
                <span className="code-line"><span className="line-number">12</span>&#125;;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UPDATES SECTION */}
      <section id="updates" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4 bg-slate-100 text-slate-600 border border-slate-200 px-4 py-1 text-xs uppercase tracking-widest font-mono">
            updates_feed.log
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif text-slate-900">Recent Updates & Milestones</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Latest announcements, research developments, engineering updates, and career milestones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {updatesList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="terminal-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between text-left hover:border-[#AD262D]/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border", item.badgeColor)}>
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-[#AD262D]" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Status: {item.status}
                </span>
                <span className="text-slate-400">commit #00{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT SECTION - 3D Lanyard Card & Bio */}
      <section id="about" className="relative py-28 px-4 md:px-8 max-w-5xl mx-auto flex flex-col justify-center border-t border-slate-200">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold mb-2 block font-mono">whoami.sh</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif text-slate-900">About Me</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Constructing intelligent software architectures where mathematical rigor meets clean layout designs.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Lanyard 3D Card block */}
          <div className="md:col-span-5 flex justify-center">
            <div className="lanyard-wrapper">
              <div className="lanyard-strap"></div>
              <div className="lanyard-clip"></div>
              
              <div className="lanyard-card">
                {/* FRONT FACE */}
                <div className="lanyard-face lanyard-front items-center justify-between border-slate-200 bg-white">
                  <div className="w-full flex justify-between items-center text-xs font-mono text-slate-400">
                    <span>AI INTERN</span>
                    <span>NO. 8829</span>
                  </div>
                  
                  {/* Photo inside badge */}
                  <div className="w-32 h-36 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm mt-4">
                    <img src="/aditya.jpg" alt="Aditya Kokate" className="w-full h-full object-cover object-top" />
                  </div>
                  
                  <div className="text-center mt-4 space-y-1">
                    <h3 className="font-bold text-lg text-slate-900 font-serif flex items-center justify-center gap-1.5">
                      Aditya Kokate
                      <span className="text-blue-500">
                        <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708.523L4.54 7.07a.75.75 0 01-.47.47L1.05 8.56a.75.75 0 00-.523.707.75.75 0 00.523.708l3.02 1.02a.75.75 0 01.47.47l1.02 3.02a.75.75 0 00.707.522.75.75 0 00.708-.522l1.02-3.02a.75.75 0 01.47-.47l3.02-1.02a.75.75 0 00.522-.708.75.75 0 00-.522-.707l-3.02-1.02a.75.75 0 01-.47-.47L7.975 3.978a.75.75 0 00-.708-.523z" clipRule="evenodd" /></svg>
                      </span>
                    </h3>
                    <p className="text-xs font-mono text-[#AD262D] font-bold">AI Systems Developer</p>
                    <p className="text-[10px] text-slate-400 font-mono">SPPU GRADUATE (2026)</p>
                  </div>
                  
                  {/* Decorative Barcode */}
                  <div className="w-full h-10 mt-4 flex flex-col items-center">
                    <div className="w-4/5 h-6 flex gap-[2px] items-end justify-center bg-transparent">
                      <div className="w-[1px] h-full bg-slate-900"></div>
                      <div className="w-[3px] h-full bg-slate-900"></div>
                      <div className="w-[1px] h-full bg-slate-900"></div>
                      <div className="w-[2px] h-full bg-slate-900"></div>
                      <div className="w-[4px] h-full bg-slate-900"></div>
                      <div className="w-[1px] h-full bg-slate-900"></div>
                      <div className="w-[2px] h-full bg-slate-900"></div>
                      <div className="w-[1px] h-full bg-slate-900"></div>
                      <div className="w-[3px] h-full bg-slate-900"></div>
                      <div className="w-[1px] h-full bg-slate-900"></div>
                      <div className="w-[2px] h-full bg-slate-900"></div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 mt-0.5">KOKATE DEV 2026</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="lanyard-face lanyard-back items-center justify-between p-6">
                  <div className="w-full flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-700 pb-2">
                    <span>BADGE DETAILS</span>
                    <span>2026-A</span>
                  </div>

                  <div className="w-full text-left space-y-4 text-xs font-mono text-slate-300 mt-6 flex-1">
                    <div>
                      <span className="text-[#AD262D] font-bold">ORG:</span>
                      <p className="text-white">NavonLabs Pvt Ltd</p>
                    </div>
                    <div>
                      <span className="text-[#AD262D] font-bold">DEPT:</span>
                      <p className="text-white">Generative AI Engineering</p>
                    </div>
                    <div>
                      <span className="text-[#AD262D] font-bold">GRADUATION:</span>
                      <p className="text-white">SPPU (AISSMS IOIT)</p>
                    </div>
                    <div>
                      <span className="text-[#AD262D] font-bold">EMAIL:</span>
                      <p className="text-white">dev.adit01@gmail.com</p>
                    </div>
                    <div>
                      <span className="text-[#AD262D] font-bold">LOCATION:</span>
                      <p className="text-white">Pune, Maharashtra</p>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono text-center">
                    Flip back to view ID photo
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio details */}
          <div className="md:col-span-7 space-y-6 text-left text-lg text-slate-600 leading-relaxed font-normal">
            <p>
              I'm a Computer Engineering graduate from AISSMS IOIT (SPPU, 2026) specializing in Agentic AI, Large Language Models, GraphRAG, Retrieval-Augmented Generation, and Full-Stack AI applications.
            </p>
            <p>
              Currently working as a Generative AI Developer Intern at <span className="text-slate-900 font-bold">NavonLabs</span> where I build production-grade AI systems using LangGraph, Gemini, FastAPI, React, and modern cloud infrastructure.
            </p>
            <p>
              Over the last few years I've focused on production-ready Generative AI systems. I enjoy solving difficult engineering problems rather than building isolated AI demos. My work spans research, production engineering, computer vision, multi-agent systems, and scalable AI pipelines.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[#AD262D] font-bold text-base flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Focus & Direction:
              </p>
              <p className="text-slate-700 text-base mt-1">
                Building reliable, scalable, and intelligent production products that push the frontiers of autonomous AI reasoning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SKILLS SECTION - Sticker Pack Layout */}
      <section id="skills" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold mb-2 block font-mono">sticker_pack.sh</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif text-slate-900">Technical Skills</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              My engineering stickers pack — featuring core tools for building agentic architectures and vector systems. Hover to align them!
            </p>
          </motion.div>

          <div className="skills-container bg-white/70 border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="space-y-10">
              {skillsCategories.map((cat, idx) => (
                <div key={idx} className="space-y-4 text-left">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">
                    // {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {cat.skills.map((skill, sIdx) => (
                      <motion.div
                        key={sIdx}
                        className="skill-sticker"
                        style={{ transform: `rotate(${skill.rotate})` }}
                        whileHover={{ scale: 1.1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#AD262D] shrink-0" />
                        <span>{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE TIMELINE */}
      <section id="experience" className="relative py-28 px-4 md:px-8 max-w-4xl mx-auto border-t border-slate-200">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold mb-2 block font-mono">timeline_check.sh</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif text-slate-900">Career Experience</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            My professional journey building AI systems and scalable enterprise applications.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active text-left"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-[#AD262D] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <div className="relative w-full rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="font-bold text-xl text-slate-900 font-serif">{exp.role}</h3>
                    <div className="flex items-center text-xs font-mono text-slate-700 mt-1 sm:mt-0 font-semibold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#AD262D]" />
                      {exp.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-slate-800 text-sm font-semibold mb-4">
                    <span>{exp.company}</span>
                    <span className="mx-2 text-slate-300">•</span>
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#AD262D]" />
                    <span className="text-slate-500 font-normal">{exp.location}</span>
                  </div>
                  
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">{exp.description}</p>
                  
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((req, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600 leading-relaxed">
                        <span className="mr-2.5 mt-2 h-1.5 w-1.5 rounded-full bg-[#AD262D] shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. PROJECTS SECTION */}
      <section id="projects" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4 bg-slate-100 text-slate-600 border border-slate-200 px-4 py-1 text-xs uppercase tracking-widest font-mono">
            project_showcase.sh
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif text-slate-900">Featured Architecture</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Production AI pipelines, GraphRAG research projects, and full-stack starters. Click any card to launch the fullscreen presentation deck.
          </p>
        </div>

        {/* Project grid - terminal look cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="terminal-card group cursor-pointer relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Custom Terminal Header with file name */}
                <div className="terminal-header">
                  <div className="flex gap-1.5">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    {projectFilenames[project.id] || "project_main.py"}
                  </span>
                  <div className="w-8"></div>
                </div>

                <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-colors" />
                </div>

                <div className="p-6 space-y-4 text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 inline-block">
                    {project.category}
                  </span>

                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#AD262D] transition-colors flex items-center justify-between font-serif">
                    {project.name}
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#AD262D] group-hover:translate-x-1 transition-all" />
                  </h3>

                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <Database className="w-3.5 h-3.5 shrink-0 text-[#AD262D]" />
                    <span className="truncate">{project.database.engine}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-mono text-slate-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slider overlay trigger action display */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs font-semibold text-slate-600 flex items-center justify-between">
                <span>View Deck</span>
                <Sparkles className="w-3.5 h-3.5 text-[#AD262D]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ACADEMIC RESEARCH SECTION */}
      <section id="research" className="relative py-28 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-200">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold mb-2 block font-mono">publications_info.txt</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif text-slate-900">Research & Publications</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Pushing the boundaries of Agentic AI, Knowledge Graphs, and Retrieval Systems.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="bg-white border border-slate-200 overflow-hidden shadow-sm text-left">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-slate-400">
              <Award size={120} />
            </div>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <Badge variant="secondary" className="w-fit bg-slate-50 text-slate-700 border border-slate-200 font-mono">
                  Accepted Paper
                </Badge>
                <div className="flex items-center text-slate-500 text-sm font-mono">
                  <BookOpen className="w-4 h-4 mr-2 text-[#AD262D]" />
                  ICT4SD 2026
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold leading-tight mt-4 text-slate-900 font-serif">
                eduRAG: A Confidence-Weighted GraphRAG Framework for Multi-Hop Educational Question Answering
              </CardTitle>
              <CardDescription className="text-base text-slate-500 mt-2">
                Research Paper Accepted at the International Conference on ICT for Sustainable Development.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Abstract & Overview</h3>
                <p className="text-slate-700 leading-relaxed">
                  eduRAG is a novel GraphRAG framework designed specifically for multi-hop educational question answering. 
                  Instead of relying solely on traditional vector similarity which often fails on complex reasoning tasks, 
                  our system combines Knowledge Graphs, Confidence-Weighted Communities, and adaptive graph traversal to significantly improve reasoning quality and factual accuracy.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Key Research Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {["GraphRAG", "Knowledge Graphs", "LLMs", "Educational AI", "Multi-Hop Question Answering"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-sm font-mono text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <a href="#" className="inline-flex items-center justify-center rounded-xl text-sm font-extrabold transition-all bg-[#AD262D] hover:bg-[#911f24] text-white h-11 px-6 py-2 shadow-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Read Paper (Coming Soon)
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* 7.5 SERVICES SECTION */}
      <section id="services" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold mb-2 block font-mono">services.yml</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif text-slate-900">What I Do</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Specialized engineering services tailored to bring intelligent, scalable products to life.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Service 1 */}
          <div className="card-hover group flex h-full flex-col bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-[#AD262D]/30 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-[#AD262D]/10 group-hover:text-[#AD262D]">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">Generative AI Development</h3>
                <p className="text-sm font-medium text-[#AD262D] mt-1">Intelligent apps powered by LLMs.</p>
              </div>
            </div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-600">
              Designing and building RAG pipelines, GraphRAG systems, and AI applications grounded in your custom data. Turning AI hype into measurable product value.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["LangGraph", "GraphRAG", "OpenAI", "Claude", "Python"].map(tech => (
                <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono text-slate-600">
                  {tech}
                </span>
              ))}
            </div>
            <a href="mailto:dev.adit01@gmail.com?subject=Inquiry%20regarding%20Generative%20AI%20Development&body=Hi%20Aditya%2C%0A%0AI%20need%20you%20to%20work%20on%20an%20idea%20related%20to%20Generative%20AI%20Development.%20Here%20is%20a%20brief%20overview%3A" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#AD262D] transition-colors hover:text-slate-900">
              Hire for Gen AI <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Service 2 */}
          <div className="card-hover group flex h-full flex-col bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-[#AD262D]/30 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-[#AD262D]/10 group-hover:text-[#AD262D]">
                <Workflow className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">Agentic Automations</h3>
                <p className="text-sm font-medium text-[#AD262D] mt-1">Autonomous systems for tasks.</p>
              </div>
            </div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-600">
              Creating multi-agent architectures that reason, plan, and execute workflows to automate cognitive tasks, document processing, and decision support.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["CrewAI", "LangChain", "n8n", "FastAPI"].map(tech => (
                <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono text-slate-600">
                  {tech}
                </span>
              ))}
            </div>
            <a href="mailto:dev.adit01@gmail.com?subject=Inquiry%20regarding%20Agentic%20Automations&body=Hi%20Aditya%2C%0A%0AI%20need%20you%20to%20work%20on%20an%20idea%20related%20to%20Agentic%20Automations.%20Here%20is%20a%20brief%20overview%3A" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#AD262D] transition-colors hover:text-slate-900">
              Hire for Automations <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Service 3 */}
          <div className="card-hover group flex h-full flex-col bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-[#AD262D]/30 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-[#AD262D]/10 group-hover:text-[#AD262D]">
                <Code2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">Full-Stack Engineering</h3>
                <p className="text-sm font-medium text-[#AD262D] mt-1">Scalable, modern web platforms.</p>
              </div>
            </div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-600">
              Building end-to-end applications from responsive frontends to robust, high-performance API backends engineered for speed, security, and scale.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Next.js", "React", "Node.js", "PostgreSQL", "TypeScript"].map(tech => (
                <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono text-slate-600">
                  {tech}
                </span>
              ))}
            </div>
            <a href="mailto:dev.adit01@gmail.com?subject=Inquiry%20regarding%20Full-Stack%20Engineering&body=Hi%20Aditya%2C%0A%0AI%20need%20you%20to%20work%20on%20an%20idea%20related%20to%20Full-Stack%20Engineering.%20Here%20is%20a%20brief%20overview%3A" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#AD262D] transition-colors hover:text-slate-900">
              Hire for Full-Stack <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Service 4 */}
          <div className="card-hover group flex h-full flex-col bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-[#AD262D]/30 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-[#AD262D]/10 group-hover:text-[#AD262D]">
                <MonitorPlay className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">Computer Vision & Data</h3>
                <p className="text-sm font-medium text-[#AD262D] mt-1">Turning pixels into insights.</p>
              </div>
            </div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-600">
              Developing vision models, object detection pipelines, and custom dataset generation algorithms for intelligent monitoring and analysis.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["OpenCV", "YOLO", "PyTorch", "Data Pipelines"].map(tech => (
                <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono text-slate-600">
                  {tech}
                </span>
              ))}
            </div>
            <a href="mailto:dev.adit01@gmail.com?subject=Inquiry%20regarding%20Computer%20Vision%20%26%20Data&body=Hi%20Aditya%2C%0A%0AI%20need%20you%20to%20work%20on%20an%20idea%20related%20to%20Computer%20Vision%20%26%20Data.%20Here%20is%20a%20brief%20overview%3A" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#AD262D] transition-colors hover:text-slate-900">
              Hire for Vision <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Service 5 */}
          <div className="card-hover group flex h-full flex-col bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-[#AD262D]/30 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-[#AD262D]/10 group-hover:text-[#AD262D]">
                <TerminalIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">API & Backend Systems</h3>
                <p className="text-sm font-medium text-[#AD262D] mt-1">Robust, high-performance backends.</p>
              </div>
            </div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-600">
              Architecting secure and scalable RESTful APIs, microservices, and webhook integrations to power your frontends and third-party services.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["FastAPI", "Express", "Python", "REST", "WebSockets"].map(tech => (
                <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono text-slate-600">
                  {tech}
                </span>
              ))}
            </div>
            <a href="mailto:dev.adit01@gmail.com?subject=Inquiry%20regarding%20API%20%26%20Backend%20Systems&body=Hi%20Aditya%2C%0A%0AI%20need%20you%20to%20work%20on%20an%20idea%20related%20to%20API%20%26%20Backend%20Systems.%20Here%20is%20a%20brief%20overview%3A" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#AD262D] transition-colors hover:text-slate-900">
              Hire for Backend <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Service 6 */}
          <div className="card-hover group flex h-full flex-col bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-[#AD262D]/30 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-[#AD262D]/10 group-hover:text-[#AD262D]">
                <Network className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">Data Engineering Pipelines</h3>
                <p className="text-sm font-medium text-[#AD262D] mt-1">Foundations for intelligent AI.</p>
              </div>
            </div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-600">
              Creating extraction, transformation, and ingestion pipelines to feed your AI applications, including Vector Database management and data scraping.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Pinecone", "ChromaDB", "ETL", "Web Scraping", "Python"].map(tech => (
                <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono text-slate-600">
                  {tech}
                </span>
              ))}
            </div>
            <a href="mailto:dev.adit01@gmail.com?subject=Inquiry%20regarding%20Data%20Engineering%20Pipelines&body=Hi%20Aditya%2C%0A%0AI%20need%20you%20to%20work%20on%20an%20idea%20related%20to%20Data%20Engineering%20Pipelines.%20Here%20is%20a%20brief%20overview%3A" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#AD262D] transition-colors hover:text-slate-900">
              Hire for Data Pipelines <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION - Terminal & Compose Script */}
      <section id="contact" className="relative py-28 px-4 md:px-8 max-w-5xl mx-auto border-t border-slate-200">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold mb-2 block font-mono">send_message.sh</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif text-slate-900">Get in Touch</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Available for Full-Time AI Engineering roles and Open Source collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch text-left">
          
          {/* Left card: get_info.sh terminal window */}
          <div className="terminal-card flex flex-col justify-between h-full min-h-[380px]">
            <div>
              <div className="terminal-header">
                <div className="flex gap-1.5">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <span>get_info.sh</span>
                <div className="w-8"></div>
              </div>
              
              <div className="p-6 font-mono text-sm space-y-6 text-slate-700 bg-white">
                <div>
                  <span className="text-[#AD262D] font-bold">$ cat location.txt</span>
                  <div className="flex items-center gap-2 mt-2 text-slate-800">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>Pune, Maharashtra, India</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-[#AD262D] font-bold">$ cat email.txt</span>
                  <div className="flex items-center gap-2 mt-2 text-slate-800">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <a href="mailto:dev.adit01@gmail.com" className="hover:text-[#AD262D] transition-colors underline">
                      dev.adit01@gmail.com
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-[#AD262D] font-bold">$ cat status.json</span>
                  <pre className="text-slate-800 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                    <code>{`{
  "open_to_work": true,
  "relocation": true,
  "timezone": "IST (UTC+5:30)"
}`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-400 font-mono">
              Process complete.
            </div>
          </div>

          {/* Right card: compose_message.sh form */}
          <div className="terminal-card flex flex-col justify-between h-full min-h-[380px]">
            <form className="flex flex-col h-full justify-between" onSubmit={handleContactSubmit}>
              <div>
                <div className="terminal-header">
                  <div className="flex gap-1.5">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                  </div>
                  <span>compose_message.sh</span>
                  <div className="w-8"></div>
                </div>
                
                <div className="p-6 space-y-4 bg-white">
                  {contactStatus === "success" && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-mono flex items-start gap-2 animate-in fade-in duration-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Transmission Delivered</p>
                        <p className="text-emerald-700 mt-0.5">{contactFeedback}</p>
                      </div>
                    </div>
                  )}

                  {contactStatus === "error" && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs font-mono flex items-start gap-2 animate-in fade-in duration-300">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Dispatch Error</p>
                        <p className="text-rose-700 mt-0.5">{contactFeedback}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs uppercase tracking-wider font-mono text-slate-400">Name</label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      disabled={contactStatus === "loading"}
                      className="bg-slate-50 border-slate-200 focus-visible:ring-slate-300 h-12 text-slate-900 placeholder:text-slate-400" 
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider font-mono text-slate-400">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your email address" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      disabled={contactStatus === "loading"}
                      className="bg-slate-50 border-slate-200 focus-visible:ring-slate-300 h-12 text-slate-900 placeholder:text-slate-400" 
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs uppercase tracking-wider font-mono text-slate-400">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="How can I help you?" 
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      disabled={contactStatus === "loading"}
                      className="bg-slate-50 border-slate-200 focus-visible:ring-slate-300 min-h-[100px] resize-none text-slate-900 placeholder:text-slate-400" 
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <Button 
                  type="submit"
                  disabled={contactStatus === "loading"}
                  className="bg-[#AD262D] hover:bg-[#911f24] text-white font-extrabold text-sm px-6 h-10 rounded-lg group disabled:opacity-70 cursor-pointer"
                >
                  {contactStatus === "loading" ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER TERMINAL EXIT PROMPT */}
      <footer className="w-full bg-slate-900 text-slate-400 font-mono text-sm py-12 px-6 border-t border-slate-800 text-left">
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="flex items-center gap-1">
            <span className="text-[#38EF7D]">$</span>
            <span>exit</span>
          </div>
          <div>logout</div>
          <div className="text-slate-500">Connection to aditya-kokate.dev closed.</div>
          <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800 mt-8">
            © {new Date().getFullYear()} Aditya Anil Kokate. All rights reserved.
          </div>
        </div>
      </footer>

      <ProjectPresentationModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
