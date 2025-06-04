"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StepContainerProps {
  children: ReactNode
  subtitle?: string
}

export function StepContainer({ children, subtitle }: StepContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {subtitle && (
        <div className="px-6 py-4 bg-gray-50 border-b">
          <p className="text-gray-600">{subtitle}</p>
        </div>
      )}
      <div className="p-6 md:p-8">{children}</div>
    </motion.div>
  )
}
