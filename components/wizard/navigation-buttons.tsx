"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface NavigationButtonsProps {
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  backLabel?: string
  nextDisabled?: boolean
  loading?: boolean
}

export function NavigationButtons({
  onBack,
  onNext,
  nextLabel = "Continue",
  backLabel = "Back",
  nextDisabled = false,
  loading = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end mt-8">
      {onBack && (
        <Button variant="outline" onClick={onBack} disabled={loading} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          {backLabel}
        </Button>
      )}
      <Button onClick={onNext} disabled={nextDisabled || loading} className="flex items-center gap-2">
        {loading ? (
          <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
        ) : (
          nextLabel
        )}
        {!loading && <ArrowRight size={16} />}
      </Button>
    </div>
  )
}
