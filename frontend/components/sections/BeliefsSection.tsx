"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Cross, Church, Flame, User, AlertTriangle, Skull, Sparkles, Droplets, Wine, Cloud, Sunrise, HeartHandshake } from "lucide-react";

const beliefs = [
  {
    icon: BookOpen,
    title: "The Bible",
    content: "We believe in the Divine verbal inspiration of the Scriptures, the 66 books of the Old and New Testaments. We accept them as infallible, believing that these contain the only record of God's dealing with man and His will for man.",
    verse: "2 Peter 1:21; Matthew 5:18; 2 Timothy 3:16",
  },
  {
    icon: Cross,
    title: "Godhead & Trinity",
    content: "We believe in the existence of One and Only One living and true God, an infinite intelligent Spirit having a definite and distinctive personality. We believe in the Trinity - Father, Son, and Holy Spirit.",
    verse: "Deuteronomy 6:4; Genesis 1:1; John 1:3",
  },
  {
    icon: User,
    title: "Jesus Christ",
    content: "We believe that Jesus Christ is the Son of God, that He was born of a virgin, lived a sinless life, died on the cross for our sins, rose from the dead, and will return again.",
    verse: "John 3:16; Romans 5:8; 1 Corinthians 15:3-4",
  },
  {
    icon: Flame,
    title: "Holy Spirit",
    content: "We believe in the Holy Spirit as the third person of the Trinity, who convicts the world of sin, righteousness, and judgment, and who indwells every believer.",
    verse: "John 16:8; Romans 8:9; 1 Corinthians 6:19",
  },
  {
    icon: HeartHandshake,
    title: "Salvation",
    content: "We believe that salvation is by grace through faith in Jesus Christ alone. It is the free gift of God, not earned by any works, and available to all who believe.",
    verse: "Ephesians 2:8-9; John 3:16; Romans 10:9",
  },
  {
    icon: Church,
    title: "The Church",
    content: "We believe that the Church is the body of Christ, made up of all believers. We gather to worship, fellowship, learn, and serve together.",
    verse: "Ephesians 1:22-23; Hebrews 10:24-25",
  },
];

export function BeliefsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            What We Believe
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-700 mt-3">
            Our Statement of Faith
          </h2>
        </motion.div>

        <div className="space-y-4">
          {beliefs.map((belief, index) => (
            <motion.div
              key={belief.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-cream-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <belief.icon className="text-primary" size={20} />
                </div>
                <span className="flex-1 font-semibold text-charcoal-700">
                  {belief.title}
                </span>
                <ChevronDown
                  className={`text-charcoal-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 pl-19">
                      <p className="text-charcoal-500 leading-relaxed mb-3 pl-14">
                        {belief.content}
                      </p>
                      <p className="text-primary text-sm pl-14">
                        <span className="font-medium">Scripture:</span> {belief.verse}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
