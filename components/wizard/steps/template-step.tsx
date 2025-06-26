"use client"

import type React from "react"

import { useState } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Card } from "@/components/ui/card"
import { Check, Layout, Newspaper, Grid3X3, List } from "lucide-react"

interface TemplateOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  preview: string
}

interface TemplateStepProps {
  onBack: () => void
  onNext: (data: { selectedTemplate: string }) => void
}

export function TemplateStep({ onBack, onNext }: TemplateStepProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")

  const templateOptions: TemplateOption[] = [
    {
      id: "modern",
      name: "Modern News",
      description: "Clean, contemporary design with large featured articles",
      icon: <Layout className="h-6 w-6" />,
      preview: "modern-preview",
    },
    {
      id: "classic",
      name: "Classic Newspaper",
      description: "Traditional newspaper layout with multiple columns",
      icon: <Newspaper className="h-6 w-6" />,
      preview: "classic-preview",
    },
    {
      id: "magazine",
      name: "Magazine Style",
      description: "Visual-focused layout with large images and cards",
      icon: <Grid3X3 className="h-6 w-6" />,
      preview: "magazine-preview",
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      description: "Simple, distraction-free reading experience",
      icon: <List className="h-6 w-6" />,
      preview: "minimal-preview",
    },
  ]

  const handleNext = () => {
    if (selectedTemplate) {
      onNext({ selectedTemplate })
    }
  }

  const renderPreview = (templateId: string) => {
    const baseClasses = "w-full h-32 rounded border-2 border-gray-200 p-2 text-xs"

    switch (templateId) {
      case "modern":
        return (
          <div className={baseClasses}>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="grid grid-cols-3 gap-1 h-6">
              <div className="bg-gray-200 rounded"></div>
              <div className="bg-gray-200 rounded"></div>
              <div className="bg-gray-200 rounded"></div>
            </div>
            <div className="mt-2 space-y-1">
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        )
      case "classic":
        return (
          <div className={baseClasses}>
            <div className="h-3 bg-gray-300 rounded mb-2"></div>
            <div className="grid grid-cols-4 gap-1 h-20">
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        )
      case "magazine":
        return (
          <div className={baseClasses}>
            <div className="h-3 bg-gray-300 rounded mb-2"></div>
            <div className="grid grid-cols-2 gap-2 h-20">
              <div className="bg-gray-200 rounded"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        )
      case "minimal":
        return (
          <div className={baseClasses}>
            <div className="h-3 bg-gray-300 rounded mb-3"></div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-5/6"></div>
              <div className="h-2 bg-gray-200 rounded w-4/5"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        )
      default:
        return <div className={baseClasses}></div>
    }
  }

  return (
    <StepContainer subtitle="Choose a layout template that best fits your news portal style">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templateOptions.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id
                  ? "ring-2 ring-purple-500 ring-offset-2 border-purple-200"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-[#cb0015]">
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                  {selectedTemplate === template.id && <Check className="h-5 w-5 text-purple-600" />}
                </div>

                {/* Template Preview */}
                <div className="mt-4">{renderPreview(template.id)}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Template Features:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All templates are mobile-responsive</li>
            <li>• Easy to customize colors and fonts</li>
            <li>• SEO optimized for better search rankings</li>
            <li>• You can change templates later from your dashboard</li>
          </ul>
        </div>

        <NavigationButtons onBack={onBack} onNext={handleNext} nextDisabled={!selectedTemplate} />
      </div>
    </StepContainer>
  )
}
