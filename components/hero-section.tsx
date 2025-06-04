import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 gradient-bg opacity-10"></div>
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text">
            Launch Your Own News Portal in Minutes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            AI-powered, multilingual, and fully customizable — built for India's local reporters, news entrepreneurs,
            and digital media pioneers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-portal">
              <Button size="lg" className="text-lg px-8 py-6">
                Make Your News Portal Today
              </Button>
            </Link>
            <Link href="/#features">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Explore Features
              </Button>
            </Link>
          </div>
          <div className="pt-8">
            <img
              src="/placeholder.svg?height=500&width=800"
              alt="Mojo Network Dashboard Preview"
              className="rounded-lg shadow-2xl border"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
