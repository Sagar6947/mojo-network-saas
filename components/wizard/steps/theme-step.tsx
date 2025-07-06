"use client"

import { useState } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Check, Palette } from "lucide-react"

interface ColorTheme {
  id: number
  theme_name: string
  theme_value: string
  gradient: string
  text_color: string
  status: number
}

interface ThemeStepProps {
  onBack: () => void
  onNext: (data: { selectedTheme: string }) => void
  themes: ColorTheme[]
  imagePath: string
}

export function ThemeStep({ onBack, onNext, themes, imagePath }: ThemeStepProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>("")

  const handleNext = () => {
    onNext({ selectedTheme })
  }

  // Filter active themes
  const activeThemes = themes.filter((theme) => theme.status === 1)

  return (
    <StepContainer subtitle="Select a color scheme that matches your brand identity">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-5 w-5 text-gray-500" />
          <p className="text-sm text-gray-600">
            Your theme will be applied to headers, buttons, and accents throughout your portal
          </p>
        </div>

        {activeThemes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No themes available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeThemes.map((theme) => (
              <div
                key={theme.id}
                className={`relative rounded-xl cursor-pointer transition-all overflow-hidden ${
                  selectedTheme === theme.id.toString() ? "ring-2 ring-black ring-offset-2" : ""
                }`}
                onClick={() => setSelectedTheme(theme.id.toString())}
              >
                <div className={`h-24 ${theme.gradient}`}></div>
                <div className="p-3 bg-white border-x border-b rounded-b-xl">
                  <p className="text-sm font-medium text-center">{theme.theme_name}</p>
                </div>
                {selectedTheme === theme.id.toString() && (
                  <div className="absolute top-2 right-2 bg-white rounded-full p-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <NavigationButtons onBack={onBack} onNext={handleNext} nextDisabled={!selectedTheme} />
      </div>
    </StepContainer>
  )
}
