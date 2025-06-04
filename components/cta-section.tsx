import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section id="contact" className="py-16 md:py-24 gradient-bg text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Launch Your News Portal?</h2>
          <p className="text-xl opacity-90">
            Book a live demo today and see how MoJo Network can transform your media presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-portal">
              <Button size="lg" variant="secondary" className="text-primary font-semibold text-lg px-8">
                Create Your Portal
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
