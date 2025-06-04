"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-xl font-bold gradient-text">MojoNetwork</div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-[200px] bg-gray-200 rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-gradient-to-r from-purple-light to-purple-dark rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-700 min-w-[60px]">{Math.round(progress)}%</div>
            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full border">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Return to Website</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
