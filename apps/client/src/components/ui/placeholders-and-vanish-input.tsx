"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PlaceholdersAndVanishInputProps {
  placeholders: string[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
}

// Define a Particle type for our canvas animation
interface Particle {
  x: number;
  y: number;
  r: number;
  color: string;
}

export function PlaceholdersAndVanishInput({
  placeholders,
  onSubmit,
  onChange,
  value,
  disabled,
}: PlaceholdersAndVanishInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [animating, setAnimating] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<Particle[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Memoize the animation starter
  const startAnimation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  }, [placeholders]);

  // Memoize the visibility change handler
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  }, [startAnimation]);

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startAnimation, handleVisibilityChange]);

  const draw = useCallback(() => {
    if (!inputRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = 800;
    canvasRef.current.height = 800;
    ctx.clearRect(0, 0, 800, 800);

    const computedStyles = getComputedStyle(inputRef.current);
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: { x: number; y: number; color: [number, number, number, number] }[] = [];

    for (let t = 0; t < 800; t++) {
      const i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        const e = i + 4 * n;
        if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
          newData.push({
            x: n,
            y: t,
            color: [pixelData[e], pixelData[e + 1], pixelData[e + 2], pixelData[e + 3]],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr: Particle[] = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) continue;
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;

        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            if (t.x > pos) {
              ctx.beginPath();
              ctx.rect(t.x, t.y, t.r, t.r);
              ctx.fillStyle = t.color;
              ctx.strokeStyle = t.color;
              ctx.stroke();
            }
          });
        }

        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating && !disabled) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    if (disabled) return;
    setAnimating(true);
    draw();

    const maxX = newDataRef.current.reduce(
      (prev, current) => (current.x > prev ? current.x : prev),
      0
    );
    animate(maxX);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!disabled) {
      vanishAndSubmit();
      onSubmit(e);
    }
  };

  return (
    <form
      className={cn(
        "w-full relative max-w-sm mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
        value && "bg-gray-50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onSubmit={handleFormSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => !animating && !disabled && onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type="email"
        disabled={disabled}
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
          animating && "text-transparent dark:text-transparent"
        )}
      />

      <button
        disabled={!value || disabled}
        type="submit"
        className={cn(
          "absolute right-5 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full transition duration-200 flex items-center justify-center",
          disabled ? "bg-gray-100 dark:bg-zinc-800" : "bg-black dark:bg-zinc-900"
        )}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300 h-4 w-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
            animate={{ strokeDashoffset: value ? 0 : "50%" }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{ y: 5, opacity: 0 }}
              key={`placeholder-${currentPlaceholder}`}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
