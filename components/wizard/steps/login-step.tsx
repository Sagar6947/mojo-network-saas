"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AtSign, Phone, User, MapPin, Building } from "lucide-react"

interface LoginStepProps {
  onNext: (data: { name: string; email: string; phone: string; state: string; city: string }) => void
}

interface State {
  id: number
  state_name: string
}

interface City {
  city_id: number
  city_name: string
}

export function LoginStep({ onNext }: LoginStepProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    general: "",
  })

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stateApi`)
        const data = await response.json()
        if (data.status === 200) {
          setStates(data.data)
        }
      } catch (err) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Failed to fetch states.",
        }))
      }
    }

    fetchStates()
  }, [])

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (state) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cityApi/${state}`)
          const data = await response.json()
          if (data.status === 200) {
            setCities(data.data)
          }
        } catch (err) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "Failed to fetch cities.",
          }))
        }
      } else {
        setCities([])
        setCity("")
      }
    }

    fetchCities()
  }, [state])

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
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      general: "",
    }
    let isValid = true

    if (!name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

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

    if (!state) {
      newErrors.state = "State is required"
      isValid = false
    }

    if (!city) {
      newErrors.city = "City is required"
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
        const serverErrors = {
          name: "",
          email: "",
          phone: "",
          state: "",
          city: "",
          general: "",
        }

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
      onNext({ name: name.trim(), email, phone, state, city })
    } catch (error) {
      console.error("Error creating portal:", error)
      setErrors((prev) => ({
        ...prev,
        general: "Something went wrong. Please try again later.",
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <StepContainer subtitle="We'll use this information to create your account and send verification">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`pl-10 h-12 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
          </div>
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium">
              State
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={`pl-10 h-12 w-full border rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.state ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
              >
                <option value="">Select State</option>
                {states.map((stateItem) => (
                  <option key={stateItem.id} value={stateItem.id}>
                    {stateItem.state_name}
                  </option>
                ))}
              </select>
            </div>
            {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              City
            </Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!state}
                className={`pl-10 h-12 w-full border rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.city ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
              >
                <option value="">Select City</option>
                {cities.map((cityItem) => (
                  <option key={cityItem.city_id} value={cityItem.city_id}>
                    {cityItem.city_name}
                  </option>
                ))}
              </select>
            </div>
            {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
          </div>
        </div>

        {errors.general && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">{errors.general}</div>
        )}

        <NavigationButtons onNext={handleNext} nextLabel="Send OTP" loading={loading} />
      </div>
    </StepContainer>
  )
}
