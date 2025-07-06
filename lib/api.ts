interface CreatePortalRequest {
  email: string
  phone: string
  portalName: string
  selectedDomain: string
  selectedLogo: {
    type: string
    content: string
    style?: string
  }
  selectedTheme: string
  selectedTemplate?: string
  selectedCategories?: string[]
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

    // Create FormData for file upload
    const formData = new FormData()

    // Add required fields based on your API
    formData.append("name", data.portalName)
    formData.append("domain_type", "1") // Assuming subdomain type, adjust as needed
    formData.append("domain_name", data.selectedDomain.replace(".mojonetwork.in", "").replace("https://", ""))

    // Map theme to color_theme_id (you may need to adjust these mappings)
    const themeMapping: { [key: string]: string } = {
      red: "1",
      blue: "2",
      green: "3",
      orange: "4",
      purple: "5",
      dark: "6",
      warm: "7",
      cyan: "8",
    }
    formData.append("color_theme_id", themeMapping[data.selectedTheme] || "1")

    // Map template to theme_layout_id
    const templateMapping: { [key: string]: string } = {
      modern: "1",
      classic: "2",
      magazine: "3",
      minimal: "4",
    }
    formData.append("theme_layout_id", templateMapping[data.selectedTemplate || "modern"] || "1")

    // Convert categories array to comma-separated string
    formData.append("news_category", data.selectedCategories?.join(",") || "")

    // Add default state and city (you may want to collect these in your form)
    formData.append("state", "Delhi") // Default or collect from user
    formData.append("city", "New Delhi") // Default or collect from user

    // Handle logo upload if it's a file
    if (data.selectedLogo && data.selectedLogo.type === "upload" && data.selectedLogo.content) {
      // Convert base64 to blob for file upload
      const base64Data = data.selectedLogo.content.split(",")[1]
      const byteCharacters = atob(base64Data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: "image/png" })
      formData.append("website_logo", blob, "logo.png")
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

    // Return response in expected format
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
