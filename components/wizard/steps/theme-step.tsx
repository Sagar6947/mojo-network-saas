"use client"

import type React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Check, Palette, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import debounce from "lodash/debounce"

interface ColorTheme {
  id: number
  theme_name: string
  theme_value: string
  gradient: string
  text_color: string
  primary_color?: string
  secondary_color?: string
  status: number
}

interface CustomColors {
  primary: string
  secondary: string
  text: string
}

interface ThemeStepProps {
  onBack: () => void
  onNext: (data: {
    selectedTheme: string
    primaryColor: string
    secondaryColor: string
    textColor: string
  }) => void
  themes: ColorTheme[]
  imagePath: string
}

// Helper function to extract colors from gradient or provide defaults
const extractColorsFromTheme = (theme: ColorTheme): CustomColors => {
  const defaultColors: Record<string, CustomColors> = {
    Blue: { primary: "#3B82F6", secondary: "#60A5FA", text: "#1F2937" },
    Purple: { primary: "#8B5CF6", secondary: "#A78BFA", text: "#1F2937" },
    Green: { primary: "#10B981", secondary: "#34D399", text: "#1F2937" },
    Red: { primary: "#EF4444", secondary: "#F87171", text: "#1F2937" },
    Orange: { primary: "#F97316", secondary: "#FB923C", text: "#1F2937" },
    Pink: { primary: "#EC4899", secondary: "#F472B6", text: "#1F2937" },
    Indigo: { primary: "#6366F1", secondary: "#818CF8", text: "#1F2937" },
    Teal: { primary: "#14B8A6", secondary: "#5EEAD4", text: "#1F2937" },
  }

  // const matchedTheme = Object.keys(defaultColors).find((key) =>
  //   theme.theme_name.toLowerCase().includes(key.toLowerCase()),
  // )

  // if (matchedTheme) {
  //   return defaultColors[matchedTheme]
  // }

  if (theme.primary_color && theme.secondary_color) {
    return {
      primary: theme.primary_color,
      secondary: theme.secondary_color,
      text: theme.text_color || "#1F2937",
    }
  }

  return { primary: "#3B82F6", secondary: "#60A5FA", text: "#1F2937" }
}

export function ThemeStep({ onBack, onNext, themes, imagePath }: ThemeStepProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>("")
  const [customColors, setCustomColors] = useState<CustomColors>({
    primary: "#3B82F6",
    secondary: "#60A5FA",
    text: "#1F2937",
  })
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const activeThemes = useMemo(() => themes.filter((theme) => theme.status === 1), [themes])

  useEffect(() => {
    if (selectedTheme) {
      const theme = activeThemes.find((t) => t.id.toString() === selectedTheme)
      if (theme) {
        const extractedColors = extractColorsFromTheme(theme)
        setCustomColors(extractedColors)
      }
    }
  }, [selectedTheme, activeThemes])

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)
    setShowColorPicker(true)
  }

  // Debounced color change handler to reduce re-renders
  const handleColorChange = useCallback(
    debounce((colorType: keyof CustomColors, value: string) => {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
      if (value.startsWith("#") && (value.length === 4 || value.length === 7)) {
        if (hexRegex.test(value)) {
          setCustomColors((prev) => ({
            ...prev,
            [colorType]: value,
          }))
        }
      } else if (!value.startsWith("#")) {
        const newValue = `#${value}`
        if (hexRegex.test(newValue)) {
          setCustomColors((prev) => ({
            ...prev,
            [colorType]: newValue,
          }))
        }
      }
    }, 300),
    []
  )

  const handleNext = () => {
    onNext({
      selectedTheme,
      primaryColor: customColors.primary,
      secondaryColor: customColors.secondary,
      textColor: customColors.text,
    })
  }

  const ColorPicker = ({
    color,
    onChange,
    label,
  }: {
    color: string
    onChange: (value: string) => void
    label: string
  }) => {
    const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()
      onChange(e.target.value)
    }

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()
      const value = e.target.value
      onChange(value)
    }

    const handleColorSwatchClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      const colorInput = document.getElementById(`color-input-${label}`) as HTMLInputElement
      if (colorInput) {
        colorInput.click()
      }
    }

    return (
      <div className="space-y-2" data-color-picker>
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-2" data-color-picker>
          <div
            className="w-8 h-8 rounded border-2 border-gray-200 cursor-pointer hover:border-gray-400 transition-colors"
            style={{ backgroundColor: color }}
            onClick={handleColorSwatchClick}
            data-color-picker
          />
          <input
            id={`color-input-${label}`}
            type="color"
            value={color}
            onChange={handleColorInputChange}
            className="w-0 h-0 opacity-0 absolute"
            data-color-picker
          />
          <Input
            type="text"
            value={color}
            onChange={handleTextInputChange}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            className="flex-1 text-sm"
            placeholder="#000000"
            maxLength={7}
            data-color-picker
          />
        </div>
      </div>
    )
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

        {activeThemes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No themes available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeThemes.map((theme) => {
              const themeColors = extractColorsFromTheme(theme)
              const isSelected = selectedTheme === theme.id.toString()

              return (
                <div
                  key={theme.id}
                  className={`relative rounded-xl cursor-pointer transition-all overflow-hidden border-2 ${
                    isSelected ? "border-black" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleThemeSelect(theme.id.toString())}
                >
                  <div className="h-20 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 ">
                    <div className="color-palette-item" style={{backgroundColor: `${theme.primary_color}`}}></div>
                    <div className="color-palette-item" style={{backgroundColor: `${theme.secondary_color}`}}></div>
                    <div className="color-palette-item" style={{backgroundColor: `${theme.text_color}`}}></div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium">{theme.theme_name}</p>
                      {isSelected && (
                        <div className="bg-black text-white rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: isSelected ? customColors.primary : theme.primary_color }}
                        />
                        <span className="text-xs text-gray-600">Primary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: isSelected ? customColors.secondary : theme.secondary_color }}
                        />
                        <span className="text-xs text-gray-600">Secondary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: isSelected ? customColors.text : theme.text_color }}
                        />
                        <span className="text-xs text-gray-600">Text</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {selectedTheme && showColorPicker && (
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Customize Colors</h3>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-80"
                  side="top"
                  align="end"
                  onInteractOutside={(e) => {
                    const target = e.target as Element
                    if (target.closest("[data-color-picker]")) {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className="space-y-4" data-color-picker>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Color Customization</h4>
                      <Button variant="ghost" size="sm" onClick={() => setIsPopoverOpen(false)} className="h-6 w-6 p-0">
                        ×
                      </Button>
                    </div>
                    <ColorPicker
                      color={customColors.primary}
                      onChange={(value) => handleColorChange("primary", value)}
                      label="Primary"
                    />
                    <ColorPicker
                      color={customColors.secondary}
                      onChange={(value) => handleColorChange("secondary", value)}
                      label="Secondary"
                    />
                    <ColorPicker
                      color={customColors.text}
                      onChange={(value) => handleColorChange("text", value)}
                      label="Text"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div
                  className="w-full h-16 rounded-lg border-2 border-dashed border-gray-300 mb-2 cursor-pointer hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: customColors.primary }}
                  onClick={() => setIsPopoverOpen(true)}
                />
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-gray-500 font-mono">{customColors.primary}</p>
              </div>
              <div className="text-center">
                <div
                  className="w-full h-16 rounded-lg border-2 border-dashed border-gray-300 mb-2 cursor-pointer hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: customColors.secondary }}
                  onClick={() => setIsPopoverOpen(true)}
                />
                <p className="text-sm font-medium">Secondary</p>
                <p className="text-xs text-gray-500 font-mono">{customColors.secondary}</p>
              </div>
              <div className="text-center">
                <div
                  className="w-full h-16 rounded-lg border-2 border-dashed border-gray-300 mb-2 cursor-pointer hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: customColors.text }}
                  onClick={() => setIsPopoverOpen(true)}
                />
                <p className="text-sm font-medium">Text</p>
                <p className="text-xs text-gray-500 font-mono">{customColors.text}</p>
              </div>
            </div>
          </div>
        )}

        <NavigationButtons onBack={onBack} onNext={handleNext} nextDisabled={!selectedTheme} />
      </div>
    </StepContainer>
  )
}