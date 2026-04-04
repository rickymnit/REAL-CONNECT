"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Users } from "lucide-react";
import Link from "next/link";

export function ServiceInfoSection() {
  return (
    <section className="py-20 bg-cream-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Join Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-700 mt-3 mb-6">
              Sunday Celebration
            </h2>
            <p className="text-charcoal-500 text-lg leading-relaxed mb-8">
              Every Sunday morning is the perfect way to start afresh and prepare 
              for a long, hard week in the city. Join us for music, worship, and 
              inspiring talks. You don&apos;t have to be a Christian to join us!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-700">Service Time</p>
                  <p className="text-charcoal-500">Every Sunday at 10:30 AM</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <MapPin className="text-secondary" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-700">Location</p>
                  <p className="text-charcoal-500">54/23, Rajatpath, Mansarovar, Jaipur</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Users className="text-accent" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-700">Connect Groups</p>
                  <p className="text-charcoal-500">Mid-week small groups available</p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-charcoal-700 text-white font-medium rounded-full hover:bg-charcoal-800 transition-colors"
            >
              Plan Your Visit
            </Link>
          </motion.div>

          {/* Right Content - Map/Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.6!2d75.75!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUxJzAwLjAiTiA3NcKwNDUnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
