"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import logoShapesData from "./logo-shapes.json";

interface Logo3DProps {
  size?: number;
  className?: string;
  interactive?: boolean;
  autoRotate?: boolean;
  speed?: number;
  glow?: boolean;
  showCard?: boolean;
  alt?: string;
}

// Generate procedural studio environment map for metallic chrome reflections
function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const width = 512;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Studio gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, "#08090d");
    bgGrad.addColorStop(0.5, "#181b24");
    bgGrad.addColorStop(1, "#08090d");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Primary bright softbox (top left)
    const soft1 = ctx.createRadialGradient(width * 0.3, height * 0.35, 10, width * 0.3, height * 0.35, 120);
    soft1.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    soft1.addColorStop(0.3, "rgba(230, 240, 255, 0.85)");
    soft1.addColorStop(0.7, "rgba(180, 200, 230, 0.3)");
    soft1.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = soft1;
    ctx.fillRect(0, 0, width, height);

    // Secondary rim softbox (top right)
    const soft2 = ctx.createRadialGradient(width * 0.75, height * 0.3, 10, width * 0.75, height * 0.3, 100);
    soft2.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    soft2.addColorStop(0.4, "rgba(220, 230, 255, 0.6)");
    soft2.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = soft2;
    ctx.fillRect(0, 0, width, height);

    // Subtle crimson rim glow (matching #AD262D)
    const soft3 = ctx.createRadialGradient(width * 0.5, height * 0.85, 10, width * 0.5, height * 0.85, 90);
    soft3.addColorStop(0, "rgba(215, 60, 70, 0.7)");
    soft3.addColorStop(0.5, "rgba(173, 38, 45, 0.3)");
    soft3.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = soft3;
    ctx.fillRect(0, 0, width, height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  pmremGenerator.dispose();
  texture.dispose();

  return envMap;
}

export function Logo3D({
  size = 40,
  className,
  interactive = true,
  autoRotate = true,
  speed = 1.0,
  glow = false,
  showCard = false,
  alt = "Gothic Chrome 3D Logo",
}: Logo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let isVisible = true;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let logoGroup: THREE.Group | null = null;
    let geometry: THREE.ExtrudeGeometry | null = null;
    let logoTexture: THREE.Texture | null = null;
    let normalTexture: THREE.Texture | null = null;
    let envMap: THREE.Texture | null = null;

    try {
      // 1. Renderer
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(size, size);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      // 2. Scene
      scene = new THREE.Scene();

      // 3. Environment Map
      envMap = createStudioEnvironment(renderer);
      scene.environment = envMap;

      // 4. Camera
      camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0, 3.4);

      // 5. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
      dirLight1.position.set(3, 4, 4);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xdbeafe, 1.2);
      dirLight2.position.set(-3, -2, 3);
      scene.add(dirLight2);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
      rimLight.position.set(0, 3, -4);
      scene.add(rimLight);

      // Subtle crimson specular accent
      const accentLight = new THREE.PointLight(0xad262d, 1.4, 8);
      accentLight.position.set(1.5, -1.5, 2);
      scene.add(accentLight);

      // 6. Geometry construction from Gothic 'A' vector contours
      const shapes: THREE.Shape[] = [];

      // Main Outer body with cutout hole
      const mainShape = new THREE.Shape();
      const outer = logoShapesData.mainOuter;
      if (outer && outer.length > 0) {
        mainShape.moveTo(outer[0][0], outer[0][1]);
        for (let i = 1; i < outer.length; i++) {
          mainShape.lineTo(outer[i][0], outer[i][1]);
        }
        mainShape.closePath();

        const hole = logoShapesData.mainHole;
        if (hole && hole.length > 0) {
          const holePath = new THREE.Path();
          holePath.moveTo(hole[0][0], hole[0][1]);
          for (let i = 1; i < hole.length; i++) {
            holePath.lineTo(hole[i][0], hole[i][1]);
          }
          holePath.closePath();
          mainShape.holes.push(holePath);
        }
        shapes.push(mainShape);
      }

      // Top floating blade accent
      const blade = logoShapesData.topBlade;
      if (blade && blade.length > 0) {
        const bladeShape = new THREE.Shape();
        bladeShape.moveTo(blade[0][0], blade[0][1]);
        for (let i = 1; i < blade.length; i++) {
          bladeShape.lineTo(blade[i][0], blade[i][1]);
        }
        bladeShape.closePath();
        shapes.push(bladeShape);
      }

      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: 0.16,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03,
      };

      geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
      geometry.center();

      // UV mapping for front and back faces to match the high-res texture exactly
      const pos = geometry.attributes.position;
      const uv = geometry.attributes.uv;
      const scale = logoShapesData.scale;
      const cx = logoShapesData.center[0];
      const cy = logoShapesData.center[1];

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const u = (x * scale + cx) / 1024.0;
        const v = (y * scale + (1024.0 - cy)) / 1024.0;
        uv.setXY(i, Math.max(0, Math.min(1, u)), Math.max(0, Math.min(1, v)));
      }
      uv.needsUpdate = true;
      geometry.computeVertexNormals();

      // 7. Textures
      const textureLoader = new THREE.TextureLoader();
      logoTexture = textureLoader.load("/logo.png", () => {
        setIsReady(true);
      });
      logoTexture.colorSpace = THREE.SRGBColorSpace;

      normalTexture = textureLoader.load("/logo-normal.png");

      // 8. Materials
      // Cap material (front & back)
      const capMaterial = new THREE.MeshPhysicalMaterial({
        map: logoTexture,
        normalMap: normalTexture,
        normalScale: new THREE.Vector2(0.8, 0.8),
        color: new THREE.Color(0xffffff),
        metalness: 0.92,
        roughness: 0.14,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 1.0,
        envMapIntensity: 1.8,
      });

      // Side & Bevel material (mirror-polished liquid chrome)
      const sideMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xdce2ea),
        metalness: 0.98,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 1.0,
        envMapIntensity: 2.2,
      });

      const mesh = new THREE.Mesh(geometry, [capMaterial, sideMaterial]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      logoGroup = new THREE.Group();
      logoGroup.add(mesh);
      scene.add(logoGroup);

      // Interactive mouse & drag states
      let isDragging = false;
      let prevMouseX = 0;
      let prevMouseY = 0;
      let dragVelocityX = 0;
      let dragVelocityY = 0;
      let targetRotX = 0;
      let targetRotY = 0;
      let mouseOver = false;

      const onPointerDown = (e: PointerEvent) => {
        if (!interactive) return;
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        dragVelocityX = 0;
        dragVelocityY = 0;
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!interactive || !container) return;
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        if (isDragging) {
          const deltaX = e.clientX - prevMouseX;
          const deltaY = e.clientY - prevMouseY;
          prevMouseX = e.clientX;
          prevMouseY = e.clientY;

          dragVelocityY = deltaX * 0.015;
          dragVelocityX = deltaY * 0.015;

          if (logoGroup) {
            logoGroup.rotation.y += dragVelocityY;
            logoGroup.rotation.x += dragVelocityX;
          }
        } else {
          // Subtle parallax tilt when hovering
          targetRotY = normX * 0.45;
          targetRotX = -normY * 0.35;
        }
      };

      const onPointerUp = () => {
        isDragging = false;
      };

      const onPointerEnter = () => {
        mouseOver = true;
      };

      const onPointerLeave = () => {
        mouseOver = false;
        isDragging = false;
        targetRotX = 0;
        targetRotY = 0;
      };

      if (interactive) {
        container.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        container.addEventListener("pointerenter", onPointerEnter);
        container.addEventListener("pointerleave", onPointerLeave);
      }

      // Intersection Observer to stop animation when out of view
      const observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0].isIntersecting;
        },
        { threshold: 0.1 }
      );
      observer.observe(container);

      // Animation Loop
      const clock = new THREE.Clock();
      const render = () => {
        animationFrameId = requestAnimationFrame(render);
        if (!isVisible || !logoGroup || !renderer || !scene || !camera) return;

        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        if (autoRotate && !isDragging) {
          const rotSpeed = mouseOver ? speed * 1.4 : speed;
          logoGroup.rotation.y += delta * 1.2 * rotSpeed;
        }

        // Apply drag momentum inertia
        if (!isDragging) {
          dragVelocityX *= 0.92;
          dragVelocityY *= 0.92;
          logoGroup.rotation.x += dragVelocityX;
          logoGroup.rotation.y += dragVelocityY;

          // Parallax interpolation
          if (mouseOver) {
            logoGroup.rotation.x += (targetRotX - logoGroup.rotation.x) * 0.1;
            logoGroup.rotation.y += (targetRotY - (logoGroup.rotation.y % (Math.PI * 2))) * 0.05;
          } else {
            // Gentle natural wobble
            const naturalWobble = Math.sin(elapsed * 1.8) * 0.08;
            logoGroup.rotation.x += (naturalWobble - logoGroup.rotation.x) * 0.05;
          }
        }

        // Gentle floating levitation on Y axis
        logoGroup.position.y = Math.sin(elapsed * 2.2) * 0.05;

        renderer.render(scene, camera);
      };

      render();

      return () => {
        cancelAnimationFrame(animationFrameId);
        observer.disconnect();

        if (interactive && container) {
          container.removeEventListener("pointerdown", onPointerDown);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
          container.removeEventListener("pointerenter", onPointerEnter);
          container.removeEventListener("pointerleave", onPointerLeave);
        }

        geometry?.dispose();
        capMaterial?.dispose();
        sideMaterial?.dispose();
        logoTexture?.dispose();
        normalTexture?.dispose();
        envMap?.dispose();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn("WebGL initialization failed, falling back to 2D logo:", err);
      setTimeout(() => setHasWebGL(false), 0);
    }
  }, [size, interactive, autoRotate, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center select-none group touch-none",
        showCard && "p-4 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50 shadow-2xl",
        className
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
      title={alt}
    >
      {/* Dynamic ambient chrome/crimson glow */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"
          style={{
            background:
              "radial-gradient(circle, rgba(230,240,255,0.4) 0%, rgba(173,38,45,0.2) 60%, transparent 80%)",
          }}
        />
      )}

      {/* 2D Fallback Image during SSR or while WebGL initializes */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none",
          isReady && hasWebGL ? "opacity-0" : "opacity-100"
        )}
      >
        <Image
          src="/logo.png"
          alt={alt}
          width={size}
          height={size}
          className="w-full h-full object-contain filter drop-shadow(0 2px 8px rgba(0,0,0,0.3))"
          priority
        />
      </div>

      {/* 3D WebGL Canvas */}
      {hasWebGL && (
        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-full block cursor-grab active:cursor-grabbing transition-opacity duration-300",
            isReady ? "opacity-100" : "opacity-0"
          )}
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      )}
    </div>
  );
}
