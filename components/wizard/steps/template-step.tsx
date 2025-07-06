"use client"

import { useState } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Card } from "@/components/ui/card"
import { Check, Layout } from "lucide-react"

interface ThemeLayout {
  id: number
  layout_id: string
  layout_name: string
  description: string
  layout_image: string
  preview: string
  status: number
}

interface TemplateStepProps {
  onBack: () => void
  onNext: (data: { selectedTemplate: string }) => void
  templates: ThemeLayout[]
  imagePath: string
}

export function TemplateStep({ onBack, onNext, templates, imagePath }: TemplateStepProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")

  const handleNext = () => {
    if (selectedTemplate) {
      onNext({ selectedTemplate })
    }
  }

  // Filter active templates
  const activeTemplates = templates.filter((template) => template.status === 1)

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
        {activeTemplates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No templates available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id.toString()
                    ? "ring-2 ring-purple-500 ring-offset-2 border-purple-200"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedTemplate(template.id.toString())}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-[#cb0015]">
                        <Layout className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{template.layout_name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                    {selectedTemplate === template.id.toString() && <Check className="h-5 w-5 text-purple-600" />}
                  </div>

                  {/* Template Preview - Use actual image if available, fallback to generated preview */}
                  <div className="mt-4">
                    {template.layout_image ? (
                      <img
                        src={`${imagePath}${template.layout_image}`}
                        alt={template.layout_name}
                        className="w-full h-32 object-cover rounded border-2 border-gray-200"
                        onError={(e) => {
                          // Fallback to generated preview if image fails to load
                          e.currentTarget.style.display = "none"
                          e.currentTarget.nextElementSibling?.classList.remove("hidden")
                        }}
                      />
                    ) : null}
                    <div className={template.layout_image ? "hidden" : ""}>{renderPreview(template.layout_id)}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

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
