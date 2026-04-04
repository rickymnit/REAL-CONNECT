import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jesus",
  description:
    "Learn about Jesus Christ and discover how His love can transform your life. Explore faith at your own pace.",
};

export default function JesusPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Discover
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal-700 mt-3 mb-6">
            Who is Jesus?
          </h1>
        </div>

        <div className="prose prose-lg max-w-none text-charcoal-600">
          <p className="text-xl leading-relaxed mb-8">
            Real Connect Church is made up of a bunch of professionals – Engineers, 
            Businessmen, HR Professionals, Government officials, students and the like. 
            We believe in Jesus Christ, love him and follow him.
          </p>

          <p className="mb-6">
            If you care to know, we are happy to let you see how Jesus Christ is 
            changing our lives, now and forever, as we live in this wonderful city of Jaipur.
          </p>

          <p className="mb-6">
            Among us, you can choose to explore Jesus Christ on your terms and at your pace. 
            We don&apos;t believe in forcing anything on anyone. Even if you don&apos;t care about 
            Jesus Christ, as professionals there are a few things we could together do to help our city.
          </p>

          <p className="mb-8">
            Either way, you are welcome to join us for one of our Sunday morning meetings.
          </p>

          <div className="bg-cream-100 p-8 rounded-2xl my-12">
            <h2 className="text-2xl font-heading font-bold text-charcoal-700 mb-4">
              Why Jesus Matters
            </h2>
            <p className="mb-4">
              Jesus claimed to be God. He claimed to have the power to forgive sins. 
              He claimed to be the only way to God. These are extraordinary claims that 
              demand our attention.
            </p>
            <p>
              Whether you&apos;re skeptical, curious, or seeking, we invite you to explore 
              these claims with us. Ask questions, share doubts, and discover truth together.
            </p>
          </div>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary-600 transition-colors"
            >
              Visit Us This Sunday
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
