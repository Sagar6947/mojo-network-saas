"use client"

import { useState, useEffect } from "react"
import { StepContainer } from "./step-container"

import { CheckCircle, Globe, Palette, Layout, Settings, Rocket } from "lucide-react"

interface PortalCreationLoadingProps {
  portalName: string
  domain: string
}

const creationSteps = [
  { icon: Globe, label: "Setting up domain", duration: 800 },
  { icon: Palette, label: "Applying theme", duration: 600 },
  { icon: Layout, label: "Building layout", duration: 700 },
  { icon: Settings, label: "Configuring settings", duration: 500 },
  { icon: Rocket, label: "Launching portal", duration: 400 },
]

export function PortalCreationLoading({ portalName, domain }: PortalCreationLoadingProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    if (currentStepIndex < creationSteps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, currentStepIndex])
        setCurrentStepIndex((prev) => prev + 1)
      }, creationSteps[currentStepIndex].duration)

      return () => clearTimeout(timer)
    }
  }, [currentStepIndex])

  return (
    
      <StepContainer subtitle="Please wait while we set up your news portal">
        <div className="space-y-8">
          {/* Portal info */}
          <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{portalName}</h3>
            <p className="text-purple-600 font-medium">{domain}</p>
          </div>

          {/* Progress steps */}
          <div className="space-y-4">
            {creationSteps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = completedSteps.includes(index)
              const isCurrent = currentStepIndex === index
              const isPending = index > currentStepIndex

              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${isCompleted
                      ? "bg-green-50 border border-green-200"
                      : isCurrent
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className={`h-5 w-5 ${isCurrent ? "animate-pulse" : ""}`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`font-medium transition-colors duration-300 ${isCompleted ? "text-green-700" : isCurrent ? "text-blue-700" : "text-gray-600"
                        }`}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <div className="mt-2">
                        <div className="w-full bg-blue-200 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full animate-pulse w-3/4"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {isCompleted && <div className="text-green-600 text-sm font-medium">✓ Complete</div>}
                </div>
              )
            })}
          </div>

          {/* Loading message */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Creating your news portal...</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">This usually takes 30-60 seconds</p>
          </div>
        </div>
      </StepContainer>
  )
}
