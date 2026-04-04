"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(centered && "text-center", className)}
    >
      {subtitle && (
        <span
          className={cn(
            "inline-block text-sm font-medium tracking-wider uppercase mb-3",
            light ? "text-primary-300" : "text-primary"
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-heading font-bold",
          light ? "text-white" : "text-charcoal-700"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "h-1 w-20 mt-4 rounded-full",
          centered && "mx-auto",
          light ? "bg-primary" : "bg-primary"
        )}
      />
    </motion.div>
  );
}
