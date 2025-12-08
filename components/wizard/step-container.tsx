"use client"

import type { ReactNode } from "react"

interface StepContainerProps {
  children: ReactNode
  subtitle?: string
}

export function StepContainer({ children, subtitle }: StepContainerProps) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {subtitle && (
        <div className="px-6 py-4 border-b bg-[#ca0013]">
          <p className="text-white text-center">{subtitle}</p>
        </div>
      )}
      <div className="p-6 md:p-8">{children}</div>
    </div>
  )
}
