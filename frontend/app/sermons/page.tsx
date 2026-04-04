import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Watch and listen to life-changing sermons from Real Connect Church. Messages that inspire and transform.",
};

export default function SermonsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Media
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal-700 mt-3 mb-6">
            Sermons
          </h1>
          <p className="text-charcoal-500 text-lg max-w-2xl mx-auto">
            Watch inspiring messages that transform lives and deepen your faith journey.
          </p>
        </div>

        {/* Placeholder for sermons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-cream-50 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="aspect-video bg-gray-200" />
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-charcoal-700 mb-2">
                  Sermon Title {i}
                </h3>
                <p className="text-charcoal-500 text-sm mb-4">
                  Speaker Name • Category
                </p>
                <p className="text-charcoal-600">
                  Sermon description goes here. This is a placeholder for sermon content.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
