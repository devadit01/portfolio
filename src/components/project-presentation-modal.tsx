"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Layers,
  Database,
  Cpu,
  Terminal,
  Layout,
  CheckCircle2,
  ExternalLink,
  Code2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Copy,
  Check
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  database: {
    engine: string;
    description: string;
    models?: string[];
  };
  architecture: string[];
  features: string[];
  execution: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectPresentationModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectPresentationModal: React.FC<ProjectPresentationModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setActiveSlide((prev) => Math.min(6, prev + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveSlide((prev) => Math.max(1, prev - 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset to slide 1 on open
  useEffect(() => {
    if (isOpen) {
      setActiveSlide(1);
    }
  }, [isOpen, project]);

  if (!project) return null;

  const slides = [
    { id: 1, label: "Overview", icon: Layout },
    { id: 2, label: "Architecture", icon: Cpu },
    { id: 3, label: "Features", icon: Layers },
    { id: 4, label: "Database", icon: Database },
    { id: 5, label: "UI Showcase", icon: Sparkles },
    { id: 6, label: "Execution", icon: Terminal },
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 top-0 left-0 z-50 w-screen h-screen max-w-none sm:max-w-none m-0 translate-x-0 translate-y-0 rounded-none border-none p-0 bg-[#F8FAFC]/98 backdrop-blur-2xl text-slate-900 flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Top Progress Indicator Bar */}
        <div className="w-full h-1 bg-slate-200 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#AD262D] via-[#BF00FF] to-[#6366F1]"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeSlide / 6) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Fullscreen Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hidden sm:block shadow-sm">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-widest font-mono">
                  {project.category}
                </span>
                <span className="text-xs text-slate-500 font-mono hidden md:inline">
                  Slide {activeSlide} of 6
                </span>
              </div>
              <h2 className="text-lg md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2 font-serif">
                {project.name}
              </h2>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:text-[#AD262D] hover:border-[#AD262D] transition-colors"
              >
                <Code2 className="w-4 h-4 text-[#AD262D]" />
                <span>Repository</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#AD262D] text-white text-xs font-extrabold transition-all shadow-md hover:bg-[#AD262D]/90"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors ml-2"
              title="Close Presentation (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto scrollbar-none gap-2">
          <div className="flex items-center gap-1.5 md:gap-2">
            {slides.map((slide) => {
              const Icon = slide.icon;
              const isActive = activeSlide === slide.id;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(slide.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#AD262D] text-white shadow-sm font-extrabold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{slide.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Fullscreen Content View */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-7xl mx-auto w-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              {/* SLIDE 1: OVERVIEW */}
              {activeSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold mb-2 block font-mono">
                        Project Brief
                      </span>
                      <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
                        {project.name}
                      </h1>
                    </div>

                    <p className="text-base md:text-lg text-slate-700 leading-relaxed font-normal bg-white p-6 rounded-2xl border border-slate-200">
                      {project.description}
                    </p>

                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3 font-mono">
                        Tech Stack & Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {project.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 font-semibold shadow-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative h-72 md:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md group">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 via-transparent to-transparent" />
                  </div>
                </div>
              )}

              {/* SLIDE 2: ARCHITECTURE */}
              {activeSlide === 2 && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold block mb-1 font-mono">
                      System Design
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-serif">
                      Architecture & Pipeline Flow
                    </h3>
                  </div>

                  <div className="grid gap-4">
                    {project.architecture.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-sm"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-sm font-bold shrink-0 font-mono">
                          0{idx + 1}
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed pt-1">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 3: FEATURES */}
              {activeSlide === 3 && (
                <div className="space-y-6 max-w-5xl mx-auto">
                  <div className="text-center mb-8">
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1 font-mono">
                      Capabilities
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-serif">
                      Core Features & Matrix
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {project.features.map((feat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all"
                      >
                        <CheckCircle2 className="w-6 h-6 text-[#AD262D] shrink-0 mt-0.5" />
                        <span className="text-base text-slate-700 leading-snug font-medium">{feat}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 4: DATABASE */}
              {activeSlide === 4 && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold block mb-1 font-mono">
                      Data Layer
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-serif">
                      Database & Data Architecture
                    </h3>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-sm">
                    <div>
                      <span className="text-xs uppercase text-[#AD262D] font-semibold block mb-1 font-mono">Engine & Storage Type</span>
                      <h4 className="text-xl font-bold font-mono text-slate-800">{project.database.engine}</h4>
                    </div>
                    <Database className="w-10 h-10 text-[#AD262D] opacity-90" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-900 font-serif">Data Infrastructure & Storage Design</h4>
                    <p className="text-base text-slate-700 leading-relaxed bg-white p-6 rounded-2xl border border-slate-200">
                      {project.database.description}
                    </p>
                  </div>

                  {project.database.models && (
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold font-mono">
                        Entities & Collections
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {project.database.models.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 flex items-center gap-2 shadow-sm"
                          >
                            <div className="w-2 h-2 rounded-full bg-[#AD262D]" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 5: UI SHOWCASE */}
              {activeSlide === 5 && (
                <div className="space-y-6 text-center max-w-5xl mx-auto">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#AD262D] font-bold block mb-1 font-mono">
                      Visual Interface
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-serif">
                      Full-Screen Interface Capture
                    </h3>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md max-h-[60vh]">
                    <img
                      src={project.image}
                      alt={`${project.name} UI`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 6: EXECUTION */}
              {activeSlide === 6 && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1 font-mono">
                      Deployment & Setup
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-serif">
                      Execution Commands
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {project.execution.map((cmd, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="text-xs text-[#AD262D] font-semibold uppercase tracking-wider font-mono">
                          Step {idx + 1}
                        </div>
                        <div className="relative group">
                          <pre className="p-5 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-sm text-slate-800 overflow-x-auto shadow-inner">
                            <code>{cmd}</code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(cmd, idx)}
                            className="absolute right-3 top-3 p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors opacity-80 group-hover:opacity-100"
                            title="Copy command"
                          >
                            {copiedIndex === idx ? (
                              <Check className="w-4 h-4 text-[#AD262D]" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono">
              Slide {activeSlide} of 6
            </span>
            <div className="hidden sm:flex items-center gap-1.5 ml-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeSlide === i ? "bg-[#AD262D] w-6 shadow-sm" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${i}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSlide((prev) => Math.max(1, prev - 1))}
              disabled={activeSlide === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none text-slate-700 text-xs font-semibold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setActiveSlide((prev) => Math.min(6, prev + 1))}
              disabled={activeSlide === 6}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#AD262D] text-white text-xs font-extrabold disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md hover:bg-[#AD262D]/90"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
