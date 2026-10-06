"use client";

import React, { useState } from "react";
import { Logo3D } from "./logo-3d";
import { RotateCw, Sparkles, Compass, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Hero3DEmblemProps {
  className?: string;
}

export function Hero3DEmblem({ className }: Hero3DEmblemProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [key, setKey] = useState(0);

  const resetView = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className={cn("relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-900/90 via-slate-950 to-black text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden min-h-[380px]", className)}>
      {/* Background ambient lighting effects */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Header Badge */}
      <div className="relative z-10 w-full flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-slate-300 tracking-wider uppercase">
            WebGL 3D Engine • Three.js
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          60 FPS
        </span>
      </div>

      {/* Main 3D Canvas Figure */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <Logo3D
          key={key}
          size={220}
          speed={speed}
          autoRotate={autoRotate}
          interactive={true}
          glow={true}
          alt="3D Gothic Chrome Rotating Emblem"
        />

        <div className="mt-4 text-center">
          <p className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#AD262D]" />
            <span>Drag or swipe to rotate in 3D space</span>
          </p>
        </div>
      </div>

      {/* Interactive Toolbar Controls */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-800/80 mt-4">
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setAutoRotate(!autoRotate)}
            className="h-8 px-2.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            <RotateCw className={`w-3.5 h-3.5 mr-1.5 ${autoRotate ? "animate-spin" : ""}`} />
            {autoRotate ? "Pause" : "Spin"}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSpeed((s) => (s >= 2 ? 0.5 : s + 0.5))}
            className="h-8 px-2.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            {speed}x Speed
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={resetView}
          className="h-8 px-2.5 text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg"
          title="Reset orientation"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
}
