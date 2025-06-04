"use client"

import { useState, useEffect } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Check, Globe, AlertCircle, X, Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { mockCheckDomainAvailability } from "@/lib/api"

interface PortalNameStepProps {
  onBack: () => void
  onNext: (data: { portalName: string; selectedDomain: string }) => void
}

interface DomainStatus {
  domain: string
  available: boolean | null // null means checking
  suggestions?: string[]
}

export function PortalNameStep({ onBack, onNext }: PortalNameStepProps) {
  const [portalName, setPortalName] = useState("")
  const [selectedDomain, setSelectedDomain] = useState("")
  const [domainSuggestions, setDomainSuggestions] = useState<string[]>([])
  const [domainStatuses, setDomainStatuses] = useState<Map<string, DomainStatus>>(new Map())
  const [checkingDomains, setCheckingDomains] = useState(false)
  const platformDomain = "seagullventure.com"

  useEffect(() => {
    if (portalName) {
      generateDomainSuggestions(portalName)
    } else {
      setDomainSuggestions([])
      setSelectedDomain("")
      setDomainStatuses(new Map())
    }
  }, [portalName])

  const generateDomainSuggestions = async (name: string) => {
    const cleanName = name.toLowerCase().trim()

    const suggestions = [
      cleanName.replace(/\s+/g, "") + `.${platformDomain}`,
      cleanName.replace(/\s+/g, "-") + `.${platformDomain}`,
      cleanName.replace(/\s+/g, "") + "news." + `${platformDomain}`,
      "daily" + cleanName.replace(/\s+/g, "") + `.${platformDomain}`,
      cleanName.replace(/\s+/g, "") + "today" + `.${platformDomain}`,
      "the" + cleanName.replace(/\s+/g, "") + `.${platformDomain}`,
    ]

    setDomainSuggestions(suggestions)

    // Check availability for all suggestions
    setCheckingDomains(true)
    const newStatuses = new Map<string, DomainStatus>()

    // Initialize all domains as checking
    suggestions.forEach((domain) => {
      newStatuses.set(domain, { domain, available: null })
    })
    setDomainStatuses(new Map(newStatuses))

    // Check each domain availability
    for (const domain of suggestions) {
      try {
        const result = await mockCheckDomainAvailability(domain)
        newStatuses.set(domain, {
          domain,
          available: result.available,
          suggestions: result.suggestions,
        })
        setDomainStatuses(new Map(newStatuses))
      } catch (error) {
        console.error(`Error checking domain ${domain}:`, error)
        newStatuses.set(domain, { domain, available: false })
        setDomainStatuses(new Map(newStatuses))
      }
    }

    setCheckingDomains(false)
  }

  const handleDomainSelect = (domain: string) => {
    const status = domainStatuses.get(domain)
    if (status?.available === true) {
      setSelectedDomain(domain)
    }
  }

  const handleNext = () => {
    if (!portalName || !selectedDomain) return

    const domainStatus = domainStatuses.get(selectedDomain)
    if (!domainStatus?.available) {
      alert("Please select an available domain")
      return
    }

    onNext({ portalName, selectedDomain })
  }

  const getDomainStatusIcon = (domain: string) => {
    const status = domainStatuses.get(domain)

    if (status?.available === null) {
      return <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
    } else if (status?.available === true) {
      return <Check className="h-4 w-4 text-green-500" />
    } else {
      return <X className="h-4 w-4 text-red-500" />
    }
  }

  const getDomainStatusText = (domain: string) => {
    const status = domainStatuses.get(domain)

    if (status?.available === null) {
      return "Checking..."
    } else if (status?.available === true) {
      return "Available"
    } else {
      return "Not Available"
    }
  }

  const getDomainCardClass = (domain: string) => {
    const status = domainStatuses.get(domain)
    const isSelected = selectedDomain === domain

    if (status?.available === false) {
      return "border-red-200 bg-red-50 opacity-60 cursor-not-allowed"
    } else if (isSelected && status?.available === true) {
      return "border-purple-500 bg-purple-50"
    } else if (status?.available === true) {
      return "border-gray-200 hover:border-gray-300 cursor-pointer"
    } else {
      return "border-gray-200 opacity-60"
    }
  }

  return (
    <StepContainer subtitle="Choose a memorable name and domain for your news portal">
      <div className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="portalName" className="text-sm font-medium">
            Portal Name
          </Label>
          <Input
            id="portalName"
            placeholder="e.g., Daily News Hub"
            value={portalName}
            onChange={(e) => setPortalName(e.target.value)}
            className="h-12"
          />
          <p className="text-xs text-gray-500">This will be the name of your news portal shown to visitors</p>
        </div>

        {domainSuggestions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <Label className="text-sm font-medium">Choose Your Domain</Label>
              {checkingDomains && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Checking availability...
                </span>
              )}
            </div>

            <RadioGroup value={selectedDomain} onValueChange={handleDomainSelect}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {domainSuggestions.map((domain, index) => {
                  const status = domainStatuses.get(domain)
                  const isAvailable = status?.available === true
                  const isSelected = selectedDomain === domain

                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 border rounded-lg p-3 transition-all ${getDomainCardClass(domain)}`}
                      onClick={() => isAvailable && handleDomainSelect(domain)}
                    >
                      <RadioGroupItem
                        value={domain}
                        id={`domain-${index}`}
                        className="sr-only"
                        disabled={!isAvailable}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${!isAvailable ? "text-gray-500" : ""}`}>{domain}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {getDomainStatusIcon(domain)}
                          <span
                            className={`text-xs ${
                              status?.available === true
                                ? "text-green-600"
                                : status?.available === false
                                  ? "text-red-600"
                                  : "text-gray-500"
                            }`}
                          >
                            {getDomainStatusText(domain)}
                          </span>
                        </div>
                      </div>
                      {isSelected && isAvailable && <Check className="h-4 w-4 text-purple-500 flex-shrink-0" />}
                    </div>
                  )
                })}
              </div>
            </RadioGroup>

            {/* Show alternative suggestions if selected domain is not available */}
            {selectedDomain && domainStatuses.get(selectedDomain)?.available === false && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Domain Not Available</p>
                    <p className="text-sm text-yellow-800 mt-1">
                      The domain "{selectedDomain}" is already taken. Here are some alternatives:
                    </p>
                    {domainStatuses.get(selectedDomain)?.suggestions && (
                      <div className="mt-3 space-y-2">
                        {domainStatuses
                          .get(selectedDomain)
                          ?.suggestions?.slice(0, 3)
                          .map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleDomainSelect(suggestion)}
                              className="block w-full text-left text-sm text-yellow-800 hover:text-yellow-900 underline"
                            >
                              {suggestion}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedDomain && domainStatuses.get(selectedDomain)?.available === true && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Domain Available!</p>
                    <p className="text-sm text-green-800 mt-1">
                      Your portal will be available at: <strong>https://{selectedDomain}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <NavigationButtons
          onBack={onBack}
          onNext={handleNext}
          nextDisabled={!portalName || !selectedDomain || domainStatuses.get(selectedDomain)?.available !== true}
        />
      </div>
    </StepContainer>
  )
}
