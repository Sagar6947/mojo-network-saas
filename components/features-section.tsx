import { Newspaper, Video, Share2, DollarSign, FileText, Mic, Users, Shield, Languages } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: <Newspaper className="h-10 w-10 text-primary" />,
    title: "AI-Powered Content Engine",
    description:
      "Get ready-made news feeds—national, regional, weather, astrology, cricket, and more. Save time, reduce effort, and focus on local reporting.",
  },
  {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: "Auto Bulletin Creator",
    description:
      "Your daily news gets compiled into a polished bulletin every evening at 8:30 PM. No manual effort needed—just review and publish.",
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: "Automated Sharing Tools",
    description: "Instant sharing to YouTube, WhatsApp, Facebook, and Instagram. Expand your reach with zero effort.",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-primary" />,
    title: "Ad Monetization Engine",
    description:
      "Use your dedicated ad panel to sell local ads or plug into Google Ads. Track ad impressions and revenue easily.",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Multi-format Content Support",
    description:
      "Support for text, video, and audio inputs. Use our AI Assistant to turn raw recordings into structured articles.",
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: "AI Writing Assistant",
    description:
      "Upload a voice note or video clip—our system will transcribe and generate engaging news with AI assistance.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Multi-User & Author System",
    description:
      "Assign different logins to sub-reporters, contributors, or editors. Control access levels and content rights.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Secure & Scalable",
    description:
      "Separate hosting for each client, SSL certificates, Google Analytics, search console integration, and spam filters for security and visibility.",
  },
  {
    icon: <Languages className="h-10 w-10 text-primary" />,
    title: "Multilingual Capabilities",
    description: "Create content in Hindi, English, or any regional language with local UI and tagging.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Powerful Features for Your News Portal</h2>
          <p className="text-lg text-gray-600">
            Everything you need to create, manage, and grow your digital news presence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
