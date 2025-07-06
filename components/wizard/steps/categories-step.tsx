"use client"

import { useState } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface Category {
  id: string
  name: string
  description: string
  icon: string
}

interface CategoriesStepProps {
  onBack: () => void
  onNext: (data: { selectedCategories: string[] }) => void
}

export function CategoriesStep({ onBack, onNext }: CategoriesStepProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories: Category[] = [
    { id: "1", name: "Politics", description: "Government, elections, policy news", icon: "🏛️" },
    { id: "2", name: "Business", description: "Economy, markets, corporate news", icon: "💼" },
    { id: "3", name: "Technology", description: "Tech innovations, gadgets, digital trends", icon: "💻" },
    { id: "4", name: "Sports", description: "Cricket, football, Olympics, local sports", icon: "⚽" },
    { id: "5", name: "Entertainment", description: "Movies, music, celebrities, culture", icon: "🎬" },
    { id: "6", name: "Health", description: "Medical news, wellness, healthcare", icon: "🏥" },
    { id: "7", name: "Education", description: "Schools, universities, academic news", icon: "📚" },
    { id: "8", name: "Crime", description: "Law enforcement, court cases, safety", icon: "🚔" },
    { id: "9", name: "Weather", description: "Local weather, climate, natural disasters", icon: "🌤️" },
    { id: "10", name: "Lifestyle", description: "Fashion, food, travel, relationships", icon: "✨" },
    { id: "11", name: "Local News", description: "Community events, local government", icon: "🏘️" },
    { id: "12", name: "International", description: "World news, global events", icon: "🌍" },
  ]

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleNext = () => {
    // Ensure we have the required minimum categories
    if (selectedCategories.length < 3) {
      return
    }

    onNext({ selectedCategories })
  }

  return (
    <StepContainer subtitle="Select the news categories you want to cover in your portal">
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Choose at least 3 categories to provide diverse content for your readers</p>
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return category ? (
                  <Badge key={categoryId} variant="secondary" className="text-sm">
                    {category.icon} {category.name}
                  </Badge>
                ) : null
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCategories.includes(category.id)
                  ? "ring-2 ring-purple-500 ring-offset-2 border-purple-200 bg-purple-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">💡 Pro Tips:</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Start with 3-5 categories to maintain quality content</li>
            <li>• Local News is highly recommended for community engagement</li>
            <li>• You can add or remove categories later from your dashboard</li>
            <li>• Popular categories help attract more readers</li>
          </ul>
        </div>

        <NavigationButtons
          onBack={onBack}
          onNext={handleNext}
          nextDisabled={selectedCategories.length < 3}
          nextLabel={selectedCategories.length < 3 ? `Select ${3 - selectedCategories.length} more` : "Continue"}
        />
      </div>
    </StepContainer>
  )
}
