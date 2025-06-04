import { CheckCircle } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Who We Are</h2>
            <p className="text-lg text-gray-600">
              Mojo Network is India's first AI-driven news portal platform that empowers local journalists,
              entrepreneurs, NGOs, and media enthusiasts to launch professional news portals — all without the need for
              technical knowledge or large investments. Our platform is built for Tier 2/3 cities and hyper-local
              markets that are underrepresented in traditional media.
            </p>

            <h3 className="text-2xl font-bold mt-8">What We Do</h3>
            <p className="text-lg text-gray-600">We provide a full-suite digital solution to help you:</p>
            <ul className="space-y-3">
              {[
                "Launch a mobile-optimized news website",
                "Upload, publish, and monetize content in real-time",
                "Leverage AI for writing, bulletins, and content curation",
                "Reach your audience across platforms like YouTube, WhatsApp, and Facebook",
                "Run ads, generate revenue, and manage your portal with ease",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-gray-600">
              Our mission is to enable 10,000+ local media creators across India to control their narrative, strengthen
              democratic voices, and monetize community-driven journalism.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                To build a decentralized, tech-powered media ecosystem where every town in India has a vibrant digital
                newsroom — owned and operated by local voices.
              </p>
              <p className="text-gray-600 font-medium">We envision:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "A hyper-local media revolution",
                  "Tech-empowered grassroots journalism",
                  "Equitable monetization for local news creators",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <h3 className="text-2xl font-bold mb-4">What Makes Us Unique</h3>
              <ul className="space-y-4">
                {[
                  "Built for India's Local Journalists – We understand your needs, your audience, and your limitations.",
                  "AI First – Generate news from speech, text, or video using GPT + Whisper AI",
                  "Revenue-Focused – Keep 70% of ad revenue; run your own local promotions",
                  "Freemium Access – Start free, grow fast, pay only when you expand",
                  "Launch in 24 Hours – Your portal goes live the same day",
                  "Hindi & Regional First – Multilingual support for Indian languages",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
