"use client";

import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative pt-32 pb-20 bg-cream-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal-700 mt-3 mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-xl text-charcoal-500 leading-relaxed">
            We&apos;d love to hear from you. Whether you have questions, prayer requests, 
            or just want to say hello, reach out to us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
