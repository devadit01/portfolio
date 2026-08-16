import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LotusLogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

export function LotusLogo({ className, size = 38, alt = "NavonLabs Logo" }: LotusLogoProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center transition-transform hover:scale-105 select-none",
        className
      )}
      style={{ width: `${Math.round(size * 1.35)}px`, height: `${size}px` }}
    >
      <Image
        src="/navonlabs.png"
        alt={alt}
        width={120}
        height={80}
        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
        priority
      />
    </span>
  );
}

export function NavonLogo(props: LotusLogoProps) {
  return <LotusLogo {...props} />;
}

export function LotusIcon(props: LotusLogoProps) {
  return <LotusLogo {...props} />;
}
