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
    const response = await fetch("https://mojoapi.seagullventure.com/api/create-portal/", {
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
    console.log("api portal creation response:", result)
    return result
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
