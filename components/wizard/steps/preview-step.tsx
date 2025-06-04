"use client"

import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Palette, Tags, ImageIcon } from "lucide-react"

interface PreviewStepProps {
  onBack: () => void
  onNext: () => void
  userSelections: {
    portalName: string
    selectedDomain: string
    selectedLogo: any
    selectedTheme: string
    selectedTemplate: string
    selectedCategories: string[]
  }
}

export function PreviewStep({ onBack, onNext, userSelections }: PreviewStepProps) {
  const getThemeName = (themeValue: string) => {
    const themes: Record<string, string> = {
      red: "Red Fire",
      blue: "Ocean Blue",
      green: "Forest Green",
      orange: "Sunset Orange",
      purple: "Royal Purple",
      dark: "Midnight Dark",
      warm: "Warm Sunset",
      cyan: "Ocean Breeze",
    }
    return themes[themeValue] || themeValue
  }

  const getTemplateName = (templateValue: string) => {
    const templates: Record<string, string> = {
      modern: "Modern News",
      classic: "Classic Newspaper",
      magazine: "Magazine Style",
      minimal: "Minimal Clean",
    }
    return templates[templateValue] || templateValue
  }

  const getCategoryNames = (categoryIds: string[]) => {
    const categoryMap: Record<string, { name: string; icon: string }> = {
      politics: { name: "Politics", icon: "🏛️" },
      business: { name: "Business", icon: "💼" },
      technology: { name: "Technology", icon: "💻" },
      sports: { name: "Sports", icon: "⚽" },
      entertainment: { name: "Entertainment", icon: "🎬" },
      health: { name: "Health", icon: "🏥" },
      education: { name: "Education", icon: "📚" },
      crime: { name: "Crime", icon: "🚔" },
      weather: { name: "Weather", icon: "🌤️" },
      lifestyle: { name: "Lifestyle", icon: "✨" },
      local: { name: "Local News", icon: "🏘️" },
      international: { name: "International", icon: "🌍" },
    }
    return categoryIds.map((id) => categoryMap[id] || { name: id, icon: "📰" })
  }

  return (
    <StepContainer subtitle="Review your portal configuration before launching">
      <div className="space-y-8">
        {/* Portal Preview */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <h3 className="text-xl font-bold text-center mb-6">Portal Preview</h3>

          {/* Mock browser window */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-mono">https://{userSelections.selectedDomain}</span>
              </div>
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                {userSelections.selectedLogo && userSelections.selectedLogo.type === "upload" ? (
                  <img
                    src={userSelections.selectedLogo.content || "/placeholder.svg"}
                    alt="Portal Logo"
                    className="w-12 h-12 object-contain"
                  />
                ) : userSelections.selectedLogo && userSelections.selectedLogo.type === "text" ? (
                  <div
                    className={`w-12 h-12 rounded flex items-center justify-center ${userSelections.selectedLogo.style || ""}`}
                  >
                    <span className="text-lg font-bold">{userSelections.selectedLogo.content}</span>
                  </div>
                ) : userSelections.selectedLogo && userSelections.selectedLogo.type === "emoji" ? (
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-2xl">{userSelections.selectedLogo.content}</span>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">
                      {userSelections.portalName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{userSelections.portalName}</h1>
                  <p className="text-gray-600 text-sm">Your trusted source for news</p>
                </div>
              </div>

              {/* Content preview */}
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-gray-100 rounded"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Configuration Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              Portal Details
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Name:</span>
                <p className="font-medium">{userSelections.portalName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Domain:</span>
                <p className="font-medium font-mono text-purple-600">https://{userSelections.selectedDomain}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-purple-600" />
              Brand Identity
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Logo:</span>
                <div className="flex items-center gap-2 mt-1">
                  {userSelections.selectedLogo && userSelections.selectedLogo.type === "upload" ? (
                    <>
                      <img
                        src={userSelections.selectedLogo.content || "/placeholder.svg"}
                        alt="Logo"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-sm">Custom Upload</span>
                    </>
                  ) : userSelections.selectedLogo && userSelections.selectedLogo.type === "text" ? (
                    <>
                      <div
                        className={`w-8 h-8 rounded flex items-center justify-center text-sm ${userSelections.selectedLogo.style || ""}`}
                      >
                        {userSelections.selectedLogo.content}
                      </div>
                      <span className="text-sm">Text Logo</span>
                    </>
                  ) : userSelections.selectedLogo && userSelections.selectedLogo.type === "emoji" ? (
                    <>
                      <span className="text-xl">{userSelections.selectedLogo.content}</span>
                      <span className="text-sm">Emoji Logo</span>
                    </>
                  ) : (
                    <span className="text-sm">Default Logo</span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-600" />
              Design
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Theme:</span>
                <p className="font-medium">{getThemeName(userSelections.selectedTheme)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Template:</span>
                <p className="font-medium">{getTemplateName(userSelections.selectedTemplate)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Tags className="h-5 w-5 text-purple-600" />
              Content Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {getCategoryNames(userSelections.selectedCategories).map((category, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {category.icon} {category.name}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">🎉 Ready to Launch!</h4>
          <p className="text-sm text-green-800">
            Your portal configuration looks great! Click "Continue" to proceed to the final launch step.
          </p>
        </div>

        <NavigationButtons onBack={onBack} onNext={onNext} nextLabel="Continue to Launch" />
      </div>
    </StepContainer>
  )
}
