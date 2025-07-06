"use client"

import { useState } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface NewsCategory {
  id: number
  category_name: string
  description: string
  category_image: string
  status: number
}

interface CategoriesStepProps {
  onBack: () => void
  onNext: (data: { selectedCategories: string[] }) => void
  categories: NewsCategory[]
  imagePath: string
}

export function CategoriesStep({ onBack, onNext, categories, imagePath }: CategoriesStepProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Filter active categories
  const activeCategories = categories.filter((category) => category.status === 1)

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

  // Create emoji mapping for categories (fallback if no image)
  const getEmojiForCategory = (categoryName: string): string => {
    const emojiMap: { [key: string]: string } = {
      Politics: "🏛️",
      Business: "💼",
      Technology: "💻",
      Sports: "⚽",
      Entertainment: "🎬",
      Health: "🏥",
      Education: "📚",
      Crime: "🚔",
      Weather: "🌤️",
      Lifestyle: "✨",
      "Local News": "🏘️",
      International: "🌍",
    }
    return emojiMap[categoryName] || "📰"
  }

  return (
    <StepContainer subtitle="Select the news categories you want to cover in your portal">
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Choose at least 3 categories to provide diverse content for your readers</p>
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {selectedCategories.map((categoryId) => {
                const category = activeCategories.find((c) => c.id.toString() === categoryId)
                return category ? (
                  <Badge key={categoryId} variant="secondary" className="text-sm">
                    {getEmojiForCategory(category.category_name)} {category.category_name}
                  </Badge>
                ) : null
              })}
            </div>
          )}
        </div>

        {activeCategories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No categories available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCategories.includes(category.id.toString())
                    ? "ring-2 ring-purple-500 ring-offset-2 border-purple-200 bg-purple-50"
                    : "border-gray-200"
                }`}
                onClick={() => handleCategoryToggle(category.id.toString())}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedCategories.includes(category.id.toString())}
                      onChange={() => handleCategoryToggle(category.id.toString())}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {category.category_image ? (
                          <img
                            src={`${imagePath}${category.category_image}`}
                            alt={category.category_name}
                            className="w-8 h-8 object-cover rounded"
                            onError={(e) => {
                              // Fallback to emoji if image fails to load
                              e.currentTarget.style.display = "none"
                              const emojiSpan = document.createElement("span")
                              emojiSpan.textContent = getEmojiForCategory(category.category_name)
                              emojiSpan.className = "text-2xl"
                              e.currentTarget.parentNode?.insertBefore(emojiSpan, e.currentTarget)
                            }}
                          />
                        ) : (
                          <span className="text-2xl">{getEmojiForCategory(category.category_name)}</span>
                        )}
                        <h3 className="font-semibold text-gray-900">{category.category_name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

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
