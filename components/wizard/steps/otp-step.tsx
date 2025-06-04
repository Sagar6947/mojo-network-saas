"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Clock, Edit2, Phone } from "lucide-react"

interface OtpStepProps {
  onBack: () => void
  onNext: () => void
  phoneNumber: string
  onEditPhone: () => void
}

export function OtpStep({ onBack, onNext, phoneNumber, onEditPhone }: OtpStepProps) {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(30)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs[0].current) {
      inputRefs[0].current.focus()
    }

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatPhoneNumber = (phone: string) => {
    // Format phone number for display (e.g., +91 98765 43210)
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length >= 10) {
      const countryCode = cleaned.startsWith("91") ? "+91" : "+91"
      const number = cleaned.slice(-10)
      return `${countryCode} ${number.slice(0, 5)} ${number.slice(5)}`
    }
    return phone
  }

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 3 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleVerify = () => {
    const enteredOtp = otp.join("")

    if (enteredOtp.length !== 4) {
      setError("Please enter the complete OTP")
      return
    }

    setLoading(true)

    // For demo purposes, we'll accept "1234" as the valid OTP
    setTimeout(() => {
      if (enteredOtp === "1234") {
        onNext()
      } else {
        setError("Invalid OTP. For testing, use 1234.")
      }
      setLoading(false)
    }, 1000)
  }

  const handleResendOtp = () => {
    setCountdown(30)
    setOtp(["", "", "", ""])
    setError("")
    // Focus first input after resend
    if (inputRefs[0].current) {
      inputRefs[0].current.focus()
    }
    // Simulate OTP resend
    setTimeout(() => {
      alert("New OTP sent! For testing, use 1234.")
    }, 500)
  }

  return (
    <StepContainer subtitle="Enter the verification code to continue">
      <div className="space-y-8">
        {/* Phone number display with edit option */}
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">OTP sent to</p>
                <p className="font-semibold text-gray-900">{formatPhoneNumber(phoneNumber)}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onEditPhone} className="flex items-center gap-2">
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">Enter the 4-digit code we sent to your phone</p>

          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-16 w-16 text-center text-2xl font-bold"
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm mb-6">{error}</div>
          )}

          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            {countdown > 0 ? (
              <p className="text-sm text-gray-500">
                Resend OTP in <span className="font-medium">{countdown}s</span>
              </p>
            ) : (
              <Button variant="link" onClick={handleResendOtp} className="text-sm p-0 h-auto">
                Resend OTP
              </Button>
            )}
          </div>
        </div>

        <NavigationButtons onBack={onBack} onNext={handleVerify} loading={loading} nextLabel="Verify OTP" />
      </div>
    </StepContainer>
  )
}
