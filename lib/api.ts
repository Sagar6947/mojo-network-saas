// Add these interfaces at the top
interface ColorTheme {
  id: number
  theme_name: string
  theme_value: string
  gradient: string
  text_color: string
  status: number
}

interface ThemeLayout {
  id: number
  layout_id: string
  layout_name: string
  description: string
  layout_image: string
  preview: string
  status: number
}

interface NewsCategory {
  id: number
  category_name: string
  description: string
  category_image: string
  status: number
}

interface LogoCategory {
  id: number
  category_name: string
  category_logo: string
  status: number
}

interface CommonApiResponse {
  status: number
  message: string
  data: {
    logo_category: LogoCategory[]
    color_theme: ColorTheme[]
    theme_layout: ThemeLayout[]
    news_category: NewsCategory[]
    image_path: string
  }
}

// Add this function to fetch common data
export async function fetchCommonData(): Promise<CommonApiResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://api.mojonetwork.in"}/commonApi`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache", // Cache for performance
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.status !== 200) {
      throw new Error(result.message || "Failed to fetch common data")
    }

    return result
  } catch (error) {
    console.error("Error fetching common data:", error)
    throw error
  }
}

interface CreatePortalRequest {
  name: string
  email: string
  phone: string
  portalName: string
  selectedDomain: string
  selectedLogo: {
    type: string
    content: string
    style?: string
  }
  selectedFavicon?: {
    type: string
    content: string
  }
  selectedTheme: string
  selectedTemplate?: string
  selectedCategories?: string[]
  state: string
  city: string
  portalId?: string // Optional, for existing portals
}

interface CreatePortalResponse {
  success: boolean
  portalUrl: string
  portalAdminUrl: string
  portalId: string
  message: string
}

// Add this interface for domain availability
interface DomainAvailabilityResponse {
  available: boolean
  domain: string
  suggestions?: string[]
}

export async function createNewsPortal(data: CreatePortalRequest): Promise<CreatePortalResponse> {
  try {
    // Simulate API call - replace with your actual API endpoint
    const response = await fetch("http://localhost/mojo-network-api/api/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to create portal")
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error creating portal:", error)
    throw error
  }
}

export async function mockCreatePortal(data: CreatePortalRequest): Promise<CreatePortalResponse> {
  try {
    const token = localStorage.getItem("portal_token") || ""

    if (!token) {
      throw new Error("Authorization token not found")
    }

    const formData = new FormData()

    formData.append("name", data.name) // Use actual user name instead of portal name
    formData.append("domain_type", "1")
    formData.append("domain_name", data.selectedDomain.replace(".mojonetwork.in", "").replace("https://", ""))

    // Use the actual theme ID from API
    formData.append("color_theme_id", data.selectedTheme)

    // Use the actual template ID from API
    formData.append("theme_layout_id", data.selectedTemplate || "1")

    // Convert categories array to comma-separated string of IDs
    formData.append("news_category", data.selectedCategories?.join(",") || "")

    // Use actual state and city IDs from user selection
    formData.append("state", data.state)
    formData.append("city", data.city)

    // Handle logo upload
    if (data.selectedLogo && data.selectedLogo.type === "upload" && data.selectedLogo.content) {
      const logoBlob = base64ToBlob(data.selectedLogo.content)
      formData.append("website_logo", logoBlob, "logo.png")
    }

    // Handle favicon upload
    if (data.selectedFavicon && data.selectedFavicon.type === "upload" && data.selectedFavicon.content) {
      const faviconBlob = base64ToBlob(data.selectedFavicon.content)
      formData.append("website_favicon", faviconBlob, "favicon.ico")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userProfileComplete`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    })

    const result = await response.json()

    if (!response.ok || result.status !== 200) {
      throw new Error(result.message || "Portal creation failed")
    }

    return {
      success: true,
      portalUrl: result.data.portal_site_url,
      portalAdminUrl: result.data.portal_admin_url,
      portalId: result.data.portal_id,
      message: result.message,
    }
  } catch (error) {
    console.error("Error creating portal:", error)
    throw error
  }
}

// Helper function to convert base64 to blob
function base64ToBlob(base64Data: string): Blob {
  const base64 = base64Data.split(",")[1]
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: "image/png" })
}

// Update the mockCreatePortal function
export async function old_mockCreatePortal(data: CreatePortalRequest): Promise<CreatePortalResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000))
  console.log("Mocking portal creation...", data)

  // Ensure the domain has the proper format - always use https://
  let portalUrl = data.selectedDomain

  if (!portalUrl.startsWith("http")) {
    portalUrl = `https://${portalUrl}`
  }

  console.log("Creating portal with data:", data)
  console.log("Generated portal URL:", portalUrl)

  // Simulate success response
  return {
    success: true,
    portalUrl: portalUrl,
    portalId: `portal_${Date.now()}`,
    message: "Your news portal has been created successfully!",
  }
}

// Add this function to check domain availability
export async function checkDomainAvailability(domain: string): Promise<DomainAvailabilityResponse> {
  try {
    // Simulate API call - replace with your actual domain checking endpoint
    const response = await fetch("/api/check-domain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain }),
    })

    if (!response.ok) {
      throw new Error("Failed to check domain availability")
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error checking domain availability:", error)
    throw error
  }
}

// Mock domain availability checker for demonstration
export async function mockCheckDomainAvailability(domain: string): Promise<DomainAvailabilityResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // List of "taken" domains for demo purposes
  const takenDomains = [
    "news.seagullventure.com",
    "dailynews.seagullventure.com",
    "breaking.seagullventure.com",
    "headlines.seagullventure.com",
  ]

  const isAvailable = !takenDomains.includes(domain.toLowerCase())

  if (isAvailable) {
    return {
      available: true,
      domain: domain,
    }
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
    ]

    return {
      available: false,
      domain: domain,
      suggestions: suggestions,
    }
  }
}
