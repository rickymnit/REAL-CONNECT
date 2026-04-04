"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "Paul & Esther",
    role: "Lead Planter",
    bio: "Peterkin Paul works as the HR Manager cum life skills trainer at a reputed school in Jaipur. He comes with years of experience in counseling teenagers and young professionals in life skills. He is married to Esther who works as a Music Teacher and they have two kids.",
    image: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=400&h=500&fit=crop",
  },
  {
    name: "Brian & Liz",
    role: "Elder and Connect Group Leaders",
    bio: "Brian is Married to Liz and they have a daughter. Brian is an Elder in the church and a senior executive in a real estate firm. Liz is senior marketing executive and together they lead a connect group. They are passionate worshippers.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop",
  },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-cream-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-700 mt-3">
            Meet Our Team
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div
                className="aspect-[4/3] bg-cover bg-center"
                style={{ backgroundImage: `url(${member.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-charcoal-700 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-charcoal-500 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
