"use client"

import { useState } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AtSign, Phone } from "lucide-react"

interface LoginStepProps {
  onNext: (data: { email: string; phone: string }) => void
}

export function LoginStep({ onNext }: LoginStepProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({ email: "", phone: "" })

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "")
    return digits.length === 10
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow only digits, +, -, and spaces
    const sanitizedValue = value.replace(/[^0-9+\-\s]/g, "")
    // Count digits in the sanitized value
    const digitCount = sanitizedValue.replace(/\D/g, "").length
    // Only update state if digit count is 10 or less
    if (digitCount <= 10) {
      setPhone(sanitizedValue)
    }
  }

  const handleNext = async () => {
    const newErrors = { email: "", phone: "" }
    let isValid = true

    if (!email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (!phone) {
      newErrors.phone = "Phone number is required"
      isValid = false
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits"
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) return

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("contact_no", phone)
      formData.append("email_id", email)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkUserForRegistration`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      // Handle API error
      if (!response.ok || result.status === 400) {
        const serverErrors = { email: "", phone: "" }

        if (result.message?.email_id) {
          serverErrors.email = result.message.email_id
        }
        if (result.message?.contact_no) {
          serverErrors.phone = result.message.contact_no
        }

        setErrors(serverErrors)
        setLoading(false)
        return
      }

      // Success: proceed to next step
      onNext({ email, phone })
    } catch (error) {
      console.error("Error creating portal:", error)
      alert("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <StepContainer subtitle="We'll use this information to create your account and send verification">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 h-12 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
          </div>
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={handlePhoneChange}
              className={`pl-10 h-12 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
          </div>
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <NavigationButtons onNext={handleNext} nextLabel="Send OTP" loading={loading} />
      </div>
    </StepContainer>
  )
}