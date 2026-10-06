"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LotusLogo } from "@/components/lotus-logo";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Updates", href: "#updates" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Research", href: "#research" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = React.useState("home");

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      const sections = navItems.map(item => item.href.substring(1));

      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection(sections[0]);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      // If user is on a subpage like /projects, redirect to root page section
      window.location.href = `/${href}`;
      return;
    }
    e.preventDefault();
    const targetId = href.substring(1);
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-center pt-6 px-4 pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="p-1 rounded-full bg-white/85 backdrop-blur-xl border border-slate-200 shadow-md hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
          title="Aditya Kokate"
        >
          <LotusLogo size={32} className="shadow-none" glow={true} />
        </a>
        <nav className="flex items-center gap-1 p-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-slate-200 shadow-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-colors cursor-pointer",
                  isActive ? "text-[#AD262D] font-bold" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-[#AD262D]/10 border border-[#AD262D]/35"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
