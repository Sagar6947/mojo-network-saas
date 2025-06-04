import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json()

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    // List of "taken" domains for demo purposes
    const takenDomains = [
      "news.seagullventure.com",
      "dailynews.seagullventure.com",
      "breaking.seagullventure.com",
      "headlines.seagullventure.com",
      "localnews.seagullventure.com",
      "cityreport.seagullventure.com",
    ]

    const isAvailable = !takenDomains.includes(domain.toLowerCase())

    if (isAvailable) {
      return NextResponse.json({
        available: true,
        domain: domain,
      })
    } else {
      // Generate alternative suggestions
      const baseName = domain.split(".")[0]
      const platformDomain = "seagullventure.com"

      const suggestions = [
        `${baseName}24.${platformDomain}`,
        `${baseName}live.${platformDomain}`,
        `${baseName}today.${platformDomain}`,
        `my${baseName}.${platformDomain}`,
        `the${baseName}.${platformDomain}`,
        `${baseName}hub.${platformDomain}`,
      ]

      return NextResponse.json({
        available: false,
        domain: domain,
        suggestions: suggestions,
      })
    }
  } catch (error) {
    console.error("Domain check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
