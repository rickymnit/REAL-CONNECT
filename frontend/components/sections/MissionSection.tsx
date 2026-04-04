"use client";

import { motion } from "framer-motion";
import { Heart, Users, Building } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Restored in Christ",
    description:
      "Christ who being God became our friend, who loved us when we were still unlovable, inspires us to seek and learn more of his love. Christ's love restores us and liberates us to live life in freedom.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=80",
  },
  {
    icon: Users,
    title: "Rejoicing in Community",
    description:
      "Jesus who loves us brings us together with people who also love him and put their trust in him and turns them into a family. We believe that only in the context of community relationships can we fully experience Jesus.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
  {
    icon: Building,
    title: "Renewing the City",
    description:
      "Cities have forever been the center of human creativity. Jesus inspires us to restore and renew the city primarily through our witnessing, good works and our friendships.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
  },
];

export function MissionSection() {
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
            Our Mission
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-700 mt-3">
            Three Pillars of Our Faith
          </h2>
        </motion.div>

        <div className="space-y-20">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <pillar.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-700 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-charcoal-500 text-lg leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div
                  className="aspect-[4/3] rounded-2xl bg-cover bg-center shadow-lg"
                  style={{ backgroundImage: `url(${pillar.image})` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
