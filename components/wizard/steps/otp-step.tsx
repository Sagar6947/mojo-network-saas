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
  personName: string
  emailId: string
  phoneNumber: string
  onEditPhone: () => void
}

export function OtpStep({ onBack, onNext, personName, emailId, phoneNumber, onEditPhone }: OtpStepProps) {
  const [otp, setOtp] = useState(["", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(30)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    // Focus the first input on mount
    inputRefs[0]?.current?.focus()

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatPhoneNumber = (phone: string) => {
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

    if (value && index < 4 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleVerify = async () => {
    const enteredOtp = otp.join("")

    if (enteredOtp.length !== 5) {
      setError("Please enter the complete OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("otp", enteredOtp)
      formData.append("contact_no", phoneNumber)
      formData.append("email_id", emailId)
      formData.append("name", personName)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userRegisterOTPVerify`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok || result.status !== 200) {
        throw new Error(result.message || "OTP verification failed")
      }

      // Store token and portal_id in sessionStorage
      const portalId = result.data?.portal_id
      const token = result.data?.token

      if (portalId && token) {
        localStorage.setItem('portal_id', portalId)
        localStorage.setItem("portal_token", token)
      }

      console.log("OTP verified successfully:", result)
      onNext()
    } catch (err: any) {
      console.error("OTP verification failed:", err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = () => {
    setCountdown(30)
    setOtp(["", "", "", "", ""])
    setError("")
    inputRefs[0]?.current?.focus()

    // Simulate resend
    setTimeout(() => {
      alert("New OTP sent! For testing, use 12345.")
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
          <p className="text-gray-600 mb-6">Enter the 5-digit code we sent to your phone</p>

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