"use client"

import { useState } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Check, Palette } from "lucide-react"

interface ThemeOption {
  name: string
  value: string
  gradient: string
  textColor: string
}

interface ThemeStepProps {
  onBack: () => void
  onNext: (data: { selectedTheme: string }) => void
}

export function ThemeStep({ onBack, onNext }: ThemeStepProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>("")

  const themeOptions: ThemeOption[] = [
    { name: "Red Fire", value: "red", gradient: "bg-gradient-to-r from-red-500 to-red-600", textColor: "text-white" },
    {
      name: "Ocean Blue",
      value: "blue",
      gradient: "bg-gradient-to-r from-blue-600 to-blue-800",
      textColor: "text-white",
    },
    {
      name: "Forest Green",
      value: "green",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-white",
    },
    {
      name: "Sunset Orange",
      value: "orange",
      gradient: "bg-gradient-to-r from-orange-400 to-orange-500",
      textColor: "text-white",
    },
    {
      name: "Royal Purple",
      value: "purple",
      gradient: "bg-gradient-to-r from-purple-600 to-indigo-600",
      textColor: "text-white",
    },
    {
      name: "Midnight Dark",
      value: "dark",
      gradient: "bg-gradient-to-r from-gray-800 to-gray-900",
      textColor: "text-white",
    },
    {
      name: "Warm Sunset",
      value: "warm",
      gradient: "bg-gradient-to-r from-red-400 to-yellow-400",
      textColor: "text-white",
    },
    {
      name: "Ocean Breeze",
      value: "cyan",
      gradient: "bg-gradient-to-r from-cyan-400 to-blue-500",
      textColor: "text-white",
    },
  ]

  const handleNext = () => {
    onNext({ selectedTheme })
  }

  return (
    <StepContainer subtitle="Select a color scheme that matches your brand identity">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-5 w-5 text-gray-500" />
          <p className="text-sm text-gray-600">
            Your theme will be applied to headers, buttons, and accents throughout your portal
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themeOptions.map((theme) => (
            <div
              key={theme.value}
              className={`relative rounded-xl cursor-pointer transition-all overflow-hidden ${
                selectedTheme === theme.value ? "ring-2 ring-black ring-offset-2" : ""
              }`}
              onClick={() => setSelectedTheme(theme.value)}
            >
              <div className={`h-24 ${theme.gradient}`}></div>
              <div className="p-3 bg-white border-x border-b rounded-b-xl">
                <p className="text-sm font-medium text-center">{theme.name}</p>
              </div>
              {selectedTheme === theme.value && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-0.5">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        <NavigationButtons onBack={onBack} onNext={handleNext} nextDisabled={!selectedTheme} />
      </div>
    </StepContainer>
  )
}
