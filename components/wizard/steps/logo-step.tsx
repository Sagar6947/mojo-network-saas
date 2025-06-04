"use client"

import type React from "react"

import { useState } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { GridLogoCropper } from "../grid-logo-cropper"
import { Card } from "@/components/ui/card"
import { Upload, ImageIcon, Smile, Crop } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LogoOption {
  type: "text" | "emoji" | "upload"
  content: string
  style?: string
}

interface LogoStepProps {
  onBack: () => void
  onNext: (data: { selectedLogo: LogoOption }) => void
  portalName: string
}

export function LogoStep({ onBack, onNext, portalName }: LogoStepProps) {
  const [selectedLogo, setSelectedLogo] = useState<LogoOption | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [cropperOpen, setCropperOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("generated")

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setUploadedImage(result)
        setCropperOpen(true)
        setActiveTab("upload")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedImageUrl: string) => {
    setCroppedImage(croppedImageUrl)
    setSelectedLogo({ type: "upload", content: croppedImageUrl })
    setCropperOpen(false)
  }

  const handleCropCancel = () => {
    setCropperOpen(false)
  }

  const handleNext = () => {
    if (selectedLogo) {
      onNext({ selectedLogo })
    }
  }

  return (
    <StepContainer subtitle="Your logo will appear on your news portal header and all branding materials">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="generated" className="flex items-center gap-2">
            <Smile size={16} />
            <span>Generated</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <span className="font-bold">A</span>
            <span>Text</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <ImageIcon size={16} />
            <span>Upload</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generated" className="mt-0">
          <div className="grid grid-cols-4 gap-4">
            {emojiOptions.map((emoji, index) => (
              <Card
                key={index}
                className={`aspect-square flex items-center justify-center text-4xl cursor-pointer transition-all hover:shadow-md ${
                  selectedLogo?.type === "emoji" && selectedLogo.content === emoji
                    ? "ring-2 ring-purple-500 ring-offset-2"
                    : ""
                }`}
                onClick={() => handleLogoSelect({ type: "emoji", content: emoji })}
              >
                {emoji}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="text" className="mt-0">
          <div className="grid grid-cols-4 gap-4">
            {textOptions.map((style, index) => (
              <Card
                key={index}
                className={`aspect-square flex items-center justify-center cursor-pointer transition-all hover:shadow-md ${
                  selectedLogo?.type === "text" && selectedLogo.style === `${style.bg} ${style.text}`
                    ? "ring-2 ring-purple-500 ring-offset-2"
                    : ""
                } ${style.bg} ${style.text}`}
                onClick={() =>
                  handleLogoSelect({
                    type: "text",
                    content: initials,
                    style: `${style.bg} ${style.text}`,
                  })
                }
              >
                <span className="text-3xl font-bold">{initials}</span>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-0">
          <div className="space-y-4">
            {croppedImage ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                  <img
                    src={croppedImage || "/placeholder.svg"}
                    alt="Cropped logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCropperOpen(true)}
                    className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 underline"
                  >
                    <Crop className="h-4 w-4" />
                    Adjust crop
                  </button>
                  <button
                    onClick={() => {
                      setCroppedImage(null)
                      setSelectedLogo(null)
                      setUploadedImage(null)
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
                <input type="file" id="logo-upload" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </Card>
            )}

            {/* Upload tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Logo Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use high-resolution images for best quality</li>
                <li>• Square images work best for logos</li>
                <li>• Transparent backgrounds (PNG) are recommended</li>
                <li>• Simple designs scale better across different sizes</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {uploadedImage && (
        <GridLogoCropper
          imageUrl={uploadedImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          open={cropperOpen}
        />
      )}

      <NavigationButtons onBack={onBack} onNext={handleNext} nextDisabled={!selectedLogo} />
    </StepContainer>
  )
}
