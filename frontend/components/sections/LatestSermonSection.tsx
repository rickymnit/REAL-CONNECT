"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export function LatestSermonSection() {
  return (
    <section className="py-20 bg-cream-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
          >
            <Link href="/sermons">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=1200&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="text-primary ml-1" size={32} fill="currentColor" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Latest Message
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-700 mt-3 mb-6">
              Watch Our Latest Sermon
            </h2>
            <p className="text-charcoal-500 text-lg leading-relaxed mb-8">
              Discover life-changing messages that speak to your everyday challenges. 
              Our sermons are designed to help you grow in faith and apply biblical 
              principles to modern life in Jaipur.
            </p>
            <Link
              href="/sermons"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary-600 transition-colors"
            >
              Browse All Sermons
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
