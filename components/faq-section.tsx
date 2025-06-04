import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is MoJo Network?",
    answer:
      "MoJo Network is a News Portal as a Service (NPSaaS) platform that helps Indian reporters, NGOs, and community leaders launch and manage their own branded digital news portals—without needing technical skills.",
  },
  {
    question: "Do I need to know coding to start my own news portal?",
    answer:
      "No! MoJo Network is completely no-code. You just choose your domain, design your homepage using our wizard, and start uploading content.",
  },
  {
    question: "Is there a mobile app for uploading content?",
    answer:
      "Yes. We offer a free Content Uploader App (APK) that allows reporters to create news using text, audio, or video, and manage content directly from their phones.",
  },
  {
    question: "What AI features does MoJo Network provide?",
    answer:
      "We provide an AI content engine for auto-curated national and regional news, an AI writing assistant that turns voice or video notes into polished news stories, daily auto-generated bulletins, and smart tagging and summary generation.",
  },
  {
    question: "How do I make money with my news portal?",
    answer:
      "You can sell ad space directly to local businesses, enable Google Ads integration, share your content to YouTube/Facebook and monetize, and offer sponsored stories or event coverage. You keep 70% of all ad revenue.",
  },
  {
    question: "Can I see how my portal is performing?",
    answer:
      "Yes. Each portal comes with a dashboard for visitor analytics, ad revenue tracking, social media performance, and content engagement metrics.",
  },
  {
    question: "Can I publish in Hindi or my local language?",
    answer:
      "Absolutely. MoJo Network supports multi-language portals including English, Hindi, and other regional Indian languages.",
  },
  {
    question: "Is my portal secure and compliant?",
    answer:
      "Yes. All portals are SSL-secured, hosted separately, integrated with Google Search Console and Analytics, and protected by a spam filter on news and comments.",
  },
  {
    question: "What's included in the free plan?",
    answer:
      "The Basic Plan (free) includes basic CMS, 1 sub-domain (e.g., yourname.mojonetwork.in), and limited storage. Perfect for students or first-time users.",
  },
  {
    question: "Can I upgrade to a custom domain and premium tools?",
    answer:
      "Yes. Paid plans offer your own domain (e.g., yourportal.in), advanced analytics, multi-user access, government ad registration assistance, and priority support.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions about MoJo Network</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
