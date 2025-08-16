"use client"

import { useState } from "react"
import { StepContainer } from "./step-container"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink, Copy, CheckCircle, Smartphone, Download, Play, Globe } from "lucide-react"

interface PortalSuccessProps {
  portalName: string
  portalUrl: string
  portalAdminUrl: string
  portalId: string
  selectedLogo?: any
  selectedDomain?: string
}

export function PortalSuccess({ portalName, portalUrl, portalAdminUrl, portalId, selectedLogo, selectedDomain }: PortalSuccessProps) {
  const [copied, setCopied] = useState(false)
  const [copiedAdmin, setCopiedAdmin] = useState(false)

  // Ensure we have a valid URL from API response
  const displayUrl = portalUrl || (selectedDomain ? `https://${selectedDomain}` : "https://news.mojonetwork.in")
  const displayAdminUrl = portalAdminUrl || `${displayUrl}/admin`

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(displayUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const handleCopyAdminUrl = async () => {
    try {
      await navigator.clipboard.writeText(displayAdminUrl)
      setCopiedAdmin(true)
      setTimeout(() => setCopiedAdmin(false), 2000)
    } catch (err) {
      console.error("Failed to copy Admin URL:", err)
    }
  }

  const handleVisitPortal = () => {
    window.open(displayUrl, "_blank")
  }

  const handleDownloadApp = (platform: "android" | "ios") => {
    alert(`Redirecting to ${platform === "android" ? "Google Play Store" : "App Store"}...`)
  }

  return (
    <StepContainer subtitle="Your news portal is now live and ready to use!">
      <div className="space-y-8">
        {/* Success animation */}
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Congratulations!</h2>
          <p className="text-gray-600">Your Saas Channel "{portalName}" is now live!</p>
        </div>

        {/* Portal URL Card */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Your Channel URL:</p>
              <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-3 border">
                <span className="font-mono text-lg text-purple-600 break-all">{displayUrl}</span>
                <Button variant="outline" size="sm" onClick={handleCopyUrl} className="flex-shrink-0 bg-transparent">
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 mb-2">Admin URL:</p>
              <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-3 border">
                <span className="font-mono text-lg text-purple-600 break-all">{displayAdminUrl}</span>
                <Button variant="outline" size="sm" onClick={handleCopyAdminUrl} className="flex-shrink-0 bg-transparent">
                  {copiedAdmin ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleVisitPortal} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Visit Your Channel
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(displayAdminUrl, '_blank')}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </Card>

        {/* Portal Preview */}
        <div className="border rounded-lg overflow-hidden shadow-md">
          <div className="bg-gray-800 text-white p-3 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-mono">{displayUrl}</span>
          </div>
          <div className="bg-white p-4">
            <div className="flex items-center gap-3 mb-4 border-b pb-4">
              {selectedLogo && selectedLogo.type === "upload" ? (
                <img
                  src={selectedLogo.content || "/placeholder.svg"}
                  alt="Portal Logo"
                  className="w-10 h-10 object-contain"
                />
              ) : selectedLogo && selectedLogo.type === "text" ? (
                <div className={`w-10 h-10 rounded flex items-center justify-center ${selectedLogo.style || ""}`}>
                  {selectedLogo.content}
                </div>
              ) : selectedLogo && selectedLogo.type === "emoji" ? (
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                  {selectedLogo.content}
                </div>
              ) : (
                <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                  <span className="text-purple-600 font-bold">{portalName.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <h3 className="font-bold text-lg">{portalName}</h3>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Download Mobile App</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Manage your news channel on the go with our mobile content management app.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadApp("android")}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Android
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadApp("ios")}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    iOS
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Watch Tutorial</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Learn how to add content, customize your channel, and start earning revenue.
                </p>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                  <Play className="h-3 w-3" />
                  Watch Now
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Portal Details */}
        <Card className="p-6 bg-gray-50">
          <h3 className="font-semibold mb-4">Channel Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Portal ID:</span>
              <span className="ml-2 font-mono">{portalId}</span>
            </div>
            <div>
              <span className="text-gray-600">Created:</span>
              <span className="ml-2">{new Date().toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className="ml-2 text-green-600 font-medium">Active</span>
            </div>
            <div>
              <span className="text-gray-600">Plan:</span>
              <span className="ml-2">Basic (Free)</span>
            </div>
          </div>
        </Card>

        {/* Upgrade prompt */}
        <Card className="p-6 border-orange-200 bg-orange-50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">⭐</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-900 mb-2">Upgrade to Premium</h3>
              <p className="text-sm text-orange-800 mb-4">
                Get your own custom domain, advanced analytics, and premium features starting at ₹15,000/year.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
              >
                View Plans
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </StepContainer>
  )
}
