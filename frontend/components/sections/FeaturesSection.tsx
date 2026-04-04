"use client";

import { motion } from "framer-motion";
import { Video, Users, Calendar } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Video,
    title: "Sermons",
    description: "Watch inspiring messages that transform lives and deepen your faith journey.",
    link: "/sermons",
    color: "primary",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join connect groups and build meaningful relationships with fellow believers.",
    link: "/contact",
    color: "secondary",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Participate in special events, outreach programs, and church activities.",
    link: "/events",
    color: "accent",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Get Involved
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-700 mt-3">
            Experience Real Connect
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={feature.link} className="group block">
                <div className="p-8 bg-cream-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      feature.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : feature.color === "secondary"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-charcoal-700 mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-charcoal-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
