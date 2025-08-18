"use client"

import type React from "react"

import { useState } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Card } from "@/components/ui/card"
import { Upload, ImageIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LogoOption {
  type: "text" | "emoji" | "upload"
  content: string
  style?: string
}

interface LogoStepProps {
  onBack: () => void
  onNext: (data: { selectedLogo: LogoOption; selectedFavicon?: LogoOption }) => void
  portalName: string
}

export function LogoStep({ onBack, onNext, portalName }: LogoStepProps) {
  const [selectedLogo, setSelectedLogo] = useState<LogoOption | null>(null)
  const [selectedFavicon, setSelectedFavicon] = useState<LogoOption | null>(null)
  const [activeTab, setActiveTab] = useState("upload")

  const initials = portalName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const textOptions = [
    { bg: "bg-gradient-to-br from-purple-500 to-purple-700", text: "text-white" },
    { bg: "bg-gradient-to-br from-blue-500 to-blue-700", text: "text-white" },
    { bg: "bg-gradient-to-br from-red-500 to-red-600", text: "text-white" },
    { bg: "bg-gradient-to-br from-green-500 to-green-600", text: "text-white" },
    { bg: "bg-gradient-to-br from-orange-400 to-orange-500", text: "text-white" },
    { bg: "bg-gradient-to-br from-pink-500 to-purple-500", text: "text-white" },
    { bg: "bg-gradient-to-br from-gray-700 to-gray-900", text: "text-white" },
    { bg: "bg-gradient-to-br from-yellow-400 to-orange-500", text: "text-white" },
  ]

  const emojiOptions = ["📰", "📺", "🗞️", "📡", "🌐", "📱", "📊", "🔍"]

  const handleLogoSelect = (logo: LogoOption) => {
    setSelectedLogo(logo)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "favicon") => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        const logoOption = { type: "upload", content: result }

        if (type === "logo") {
          setSelectedLogo(logoOption)
        } else {
          setSelectedFavicon(logoOption)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    if (selectedLogo) {
      onNext({ selectedLogo, selectedFavicon: selectedFavicon || undefined })
    } else{
      onNext({ selectedLogo, selectedFavicon })
    }
  }

  return (
    <StepContainer subtitle="Your logo will appear on your news channel header and all branding materials">
      <div className="space-y-8">
        {/* Logo Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Logo (Optional)</h3>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* <TabsList className="grid grid-cols-1 mb-6">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <ImageIcon size={16} />
                <span>Upload Logo</span>
              </TabsTrigger>
            </TabsList> */}

            <TabsContent value="upload" className="mt-0">
              <div className="space-y-4">
                {selectedLogo?.type === "upload" ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-64 h-40 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                      <img
                        src={selectedLogo.content || "/placeholder.svg"}
                        alt="Uploaded logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedLogo(null)
                          const fileInput = document.getElementById("logo-upload") as HTMLInputElement
                          if (fileInput) fileInput.value = ""
                        }}
                        className="text-sm text-gray-600 hover:text-gray-800 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <Card
                    className="border-dashed border-2 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50/50 transition-colors"
                    onClick={() => document.getElementById("logo-upload")?.click()}
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-purple-500" />
                    </div>
                    <p className="text-gray-600 mb-2 font-medium">Click to upload your logo</p>
                    <p className="text-sm text-gray-500 mb-2">or drag and drop here</p>
                    <p className="text-xs text-gray-400">PNG, JPG or SVG (max 5MB)</p>
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "logo")}
                    />
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Favicon Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Favicon (Optional)</h3>
          <p className="text-sm text-gray-600 mb-4">Small icon that appears in browser tabs and bookmarks</p>

          <div className="space-y-4">
            {selectedFavicon?.type === "upload" ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                  <img
                    src={selectedFavicon.content || "/placeholder.svg"}
                    alt="Uploaded favicon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedFavicon(null)
                      const fileInput = document.getElementById("favicon-upload") as HTMLInputElement
                      if (fileInput) fileInput.value = ""
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <Card
                className="border-dashed border-2 p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50/50 transition-colors"
                onClick={() => document.getElementById("favicon-upload")?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-purple-500" />
                </div>
                <p className="text-gray-600 mb-1 font-medium">Upload Favicon</p>
                <p className="text-xs text-gray-400">16x16 or 32x32 pixels recommended</p>
                <input
                  type="file"
                  id="favicon-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "favicon")}
                />
              </Card>
            )}
          </div>
        </div>

        {/* Upload tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Upload Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use high-resolution images for best quality</li>
            <li>• Square images work best for logos</li>
            <li>• Transparent backgrounds (PNG) are recommended</li>
            <li>• Favicon should be small and simple for clarity</li>
          </ul>
        </div>
        <NavigationButtons onBack={onBack} onNext={handleNext} nextLabel={selectedFavicon || selectedLogo ? 'Continue' : 'Skip'} nextDisabled={false} />
      </div>
    </StepContainer>
  )
}
