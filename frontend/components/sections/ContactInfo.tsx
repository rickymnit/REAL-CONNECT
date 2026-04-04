"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Mail, Phone } from "lucide-react";

export function ContactInfo() {
  return (
    <section className="py-20 bg-cream-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl text-center"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-primary" size={28} />
            </div>
            <h3 className="text-lg font-heading font-bold text-charcoal-700 mb-2">
              Location
            </h3>
            <p className="text-charcoal-500">
              54/23, Rajatpath, Mansarovar<br />
              Jaipur, Rajasthan<br />
              Opposite Teuram Park
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-2xl text-center"
          >
            <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-secondary" size={28} />
            </div>
            <h3 className="text-lg font-heading font-bold text-charcoal-700 mb-2">
              Service Times
            </h3>
            <p className="text-charcoal-500">
              Sunday Service<br />
              10:30 AM - 12:00 PM<br />
              <span className="text-sm">Connect Groups: Wednesday 7:00 PM</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl text-center"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-accent" size={28} />
            </div>
            <h3 className="text-lg font-heading font-bold text-charcoal-700 mb-2">
              Contact
            </h3>
            <p className="text-charcoal-500">
              <a href="mailto:info@realconnectchurch.com" className="hover:text-primary transition-colors">
                info@realconnectchurch.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
