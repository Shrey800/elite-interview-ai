import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ 
  children, 
  hover = false, 
  glow = false,
  className, 
  ...props 
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        hover ? "glass-card-hover" : "glass-card",
        glow && "glow-pulse",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
