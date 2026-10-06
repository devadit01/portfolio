import React from "react";
import { Logo3D } from "@/components/logo-3d/logo-3d";
import { cn } from "@/lib/utils";

export interface LotusLogoProps {
  className?: string;
  size?: number;
  alt?: string;
  interactive?: boolean;
  glow?: boolean;
}

export function LotusLogo({
  className,
  size = 38,
  alt = "Aditya Kokate Gothic Chrome 3D Logo",
  interactive = true,
  glow = false,
}: LotusLogoProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center transition-transform select-none",
        className
      )}
    >
      <Logo3D
        size={size}
        alt={alt}
        interactive={interactive}
        glow={glow}
        speed={1.0}
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

export { Logo3D };
