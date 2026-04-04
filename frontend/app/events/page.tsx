import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover upcoming events at Real Connect Church. Join us for Sunday services, connect groups, and special gatherings.",
};

export default function EventsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Calendar
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal-700 mt-3 mb-6">
            Upcoming Events
          </h1>
          <p className="text-charcoal-500 text-lg max-w-2xl mx-auto">
            Join us for Sunday services, connect groups, and special events throughout the week.
          </p>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-cream-100 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-heading font-bold text-charcoal-700 mb-6">
            Weekly Schedule
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex flex-col items-center justify-center">
                <span className="text-xs text-primary font-medium">SUN</span>
                <span className="text-lg font-bold text-charcoal-700">10:30</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-700">Sunday Service</h3>
                <p className="text-charcoal-500 text-sm">Main worship service with sermon and communion</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex flex-col items-center justify-center">
                <span className="text-xs text-secondary font-medium">WED</span>
                <span className="text-lg font-bold text-charcoal-700">7:00</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-700">Connect Groups</h3>
                <p className="text-charcoal-500 text-sm">Mid-week small group meetings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="text-center py-12">
          <p className="text-charcoal-500">
            More events coming soon. Check back for updates!
          </p>
        </div>
      </div>
    </div>
  );
}
