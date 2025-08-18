"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search, AtSign, Phone, User, ArrowLeft, ArrowRight, Clock, Edit2, ExternalLink, Copy, CheckCircle, Smartphone, Download, Play, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { StepContainer } from "../step-container"
import { NavigationButtons } from "../navigation-buttons"

// SearchableDropdown Component
interface SearchableDropdownProps {
  options: any[]
  value: string
  onChange: (value: string, id: string) => void // Modified to return both value and ID
  labelKey: string
  valueKey: string
  placeholder: string
  disabled?: boolean
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  labelKey,
  valueKey,
  placeholder,
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [displayValue, setDisplayValue] = useState("")
  const [focusedIndex, setFocusedIndex] = useState(-1) // Track focused dropdown item
  const dropdownRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]) // Refs for dropdown items

  useEffect(() => {
    const selectedOption = options.find((option) => option[labelKey] === value)
    if (selectedOption) {
      setDisplayValue(selectedOption[labelKey])
    } else {
      setDisplayValue("")
    }
  }, [value, options, labelKey])

  const filteredOptions = options.filter((option) =>
    option[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (optionValue: string) => {
    const selectedOption = options.find((option) => option[valueKey].toString() === optionValue)
    if (selectedOption) {
      setDisplayValue(selectedOption[labelKey])
      onChange(selectedOption[labelKey], selectedOption[valueKey].toString())
    }
    setSearchTerm("")
    setIsOpen(false)
    setFocusedIndex(-1)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setSearchTerm("")
      setIsOpen(false)
      setFocusedIndex(-1)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      setSearchTerm("")
      setIsOpen(false)
      setFocusedIndex(-1)
    } else if (e.key === "ArrowDown" && isOpen && filteredOptions.length > 0) {
      e.preventDefault() // Prevent default scrolling
      setFocusedIndex(0) // Focus first dropdown item
      itemRefs.current[0]?.focus()
    } else if (e.key === "ArrowUp" && isOpen && filteredOptions.length > 0) {
      e.preventDefault() // Prevent default scrolling
      setFocusedIndex(filteredOptions.length - 1) // Focus last dropdown item
      itemRefs.current[filteredOptions.length - 1]?.focus()
    }
  }

  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const nextIndex = (index + 1) % filteredOptions.length
      setFocusedIndex(nextIndex)
      itemRefs.current[nextIndex]?.focus()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const prevIndex = (index - 1 + filteredOptions.length) % filteredOptions.length
      setFocusedIndex(prevIndex)
      itemRefs.current[prevIndex]?.focus()
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (filteredOptions[index]) {
        handleSelect(filteredOptions[index][valueKey].toString())
      }
    } else if (e.key === "Escape") {
      setSearchTerm("")
      setIsOpen(false)
      setFocusedIndex(-1)
      dropdownRef.current?.querySelector("input")?.focus() // Return focus to input
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // Reset refs array when filtered options change
    itemRefs.current = filteredOptions.map(() => null)
  }, [filteredOptions])

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          type="text"
          autoComplete="new-password"
          name={`dropdown-${labelKey}-${Math.random().toString(36).substring(2)}`}
          placeholder={placeholder}
          value={isOpen ? searchTerm : displayValue}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
            setFocusedIndex(-1) // Reset focus when typing
          }}
          onClick={() => setIsOpen(true)}
          onFocus={() => {
            setSearchTerm("")
            setIsOpen(true)
            setFocusedIndex(-1)
          }}
          onKeyDown={handleInputKeyDown}
          className="pl-10 h-10 cursor-pointer"
          disabled={disabled}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option[valueKey]}
                ref={(el) => (itemRefs.current[index] = el)}
                tabIndex={0} // Make list item focusable
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 outline-none ${value === option[labelKey] ? "bg-gray-200" : ""
                  } ${index === focusedIndex ? "bg-gray-100" : ""}`}
                onClick={() => handleSelect(option[valueKey].toString())}
                onKeyDown={(e) => handleDropdownKeyDown(e, index)}
              >
                {option[labelKey]}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  )
}

// LoginStep Component (Updated to handle state_id and city_id)
interface LoginStepProps {
  onNext: (data: {
    name: string
    email: string
    phone: string
    state: string
    city: string
    state_id: string // Added for API
    city_id: string // Added for API
  }) => void
  updateUserSelections: (data: {
    name: string
    email: string
    phone: string
    state: string
    city: string
    state_id: string // Added for API
    city_id: string // Added for API
  }) => void
  goToStep: (step: number) => void
  loginstate: boolean
}

interface State {
  id: number
  state_name: string
}

interface City {
  city_id: number
  city_name: string
}

interface UserLoginData {
  name: string
  contact_no: number
  email?: string
  state: string
  city: string
  portal_id: string
  is_profile_complete: number
  token: string
  portal_details?: {
    portal_id: string
    channel_name: string
    portal_logo: string | null
    portal_site_url: string
    portal_admin_url: string
  }
}

// PortalDetails Component (Unchanged)
interface PortalDetailsProps {
  userData: UserLoginData
  onBack: () => void
}

const PortalDetails: React.FC<PortalDetailsProps> = ({ userData, onBack }) => {
  const [copied, setCopied] = useState(false)
  const [copiedAdmin, setCopiedAdmin] = useState(false)

  const portalDetails = userData.portal_details!
  const displayUrl = portalDetails.portal_site_url
  const displayAdminUrl = portalDetails.portal_admin_url

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(displayUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const handleCopyAdminUrl = async () => {
    try {
      await navigator.clipboard.writeText(displayAdminUrl)
      setCopiedAdmin(true)
      setTimeout(() => setCopiedAdmin(false), 2000)
    } catch (err) {
      console.error("Failed to copy Admin URL:", err)
    }
  }

  const handleVisitPortal = () => {
    window.open(displayUrl, "_blank")
  }

  const handleDownloadApp = (platform: "android" | "ios") => {
    alert(`Redirecting to ${platform === "android" ? "Google Play Store" : "App Store"}...`)
  }

  return (
    <StepContainer subtitle="Welcome back! Your channel is ready to use.">
      <div className="space-y-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 p-0 h-auto text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Button>

        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Welcome Back!</h2>
          <p className="text-gray-600">Your Saas Channel "{portalDetails.channel_name}" is ready to use!</p>
        </div>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Your Channel URL:</p>
              <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-3 border">
                <span className="font-mono text-lg text-purple-600 break-all">{displayUrl}</span>
                <Button variant="outline" size="sm" onClick={handleCopyUrl} className="flex-shrink-0 bg-transparent">
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 mb-2">Admin URL:</p>
              <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-3 border">
                <span className="font-mono text-lg text-purple-600 break-all">{displayAdminUrl}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAdminUrl}
                  className="flex-shrink-0 bg-transparent"
                >
                  {copiedAdmin ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleVisitPortal} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Visit Your Channel
              </Button>
              <Button variant="outline" onClick={() => window.open(displayAdminUrl, "_blank")}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        </Card>

        <div className="border rounded-lg overflow-hidden shadow-md">
          <div className="bg-gray-800 text-white p-3 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-mono">{displayUrl}</span>
          </div>
          <div className="bg-white p-4">
            <div className="flex items-center gap-3 mb-4 border-b pb-4">
              {portalDetails.portal_logo ? (
                <img
                  src={portalDetails.portal_logo || "/placeholder.svg"}
                  alt="Portal Logo"
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                  <span className="text-purple-600 font-bold">
                    {portalDetails.channel_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <h3 className="font-bold text-lg">{portalDetails.channel_name}</h3>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Download Mobile App</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Manage your Saas Portal on the go with our mobile content management app.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadApp("android")}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Android
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadApp("ios")}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    iOS
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Watch Tutorial</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Learn how to add content, customize your portal, and start earning revenue.
                </p>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                  <Play className="h-3 w-3" />
                  Watch Now
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-gray-50">
          <h3 className="font-semibold mb-4">Channel Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Portal ID:</span>
              <span className="ml-2 font-mono">{portalDetails.portal_id}</span>
            </div>
            <div>
              <span className="text-gray-600">Channel Name:</span>
              <span className="ml-2">{portalDetails.channel_name}</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className="ml-2 text-green-600 font-medium">Active</span>
            </div>
            <div>
              <span className="text-gray-600">Plan:</span>
              <span className="ml-2">Basic (Free)</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-orange-200 bg-orange-50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">⭐</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-900 mb-2">Upgrade to Premium</h3>
              <p className="text-sm text-orange-800 mb-4">
                Get your own custom domain, advanced analytics, and premium features starting at ₹15,000/year.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
              >
                View Plans
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </StepContainer>
  )
}

// LoginForm Component (Unchanged)
interface LoginFormProps {
  onBack: () => void
  onLoginSuccess: (userData: UserLoginData) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onBack, onLoginSuccess }) => {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", ""])
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (showOtpInput) {
      inputRefs[0]?.current?.focus()
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showOtpInput])

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length >= 10) {
      const countryCode = cleaned.startsWith("91") ? "+91" : "+91"
      const number = cleaned.slice(-10)
      return `${countryCode} ${number.slice(0, 5)} ${number.slice(5)}`
    }
    return phone
  }

  const handleOtpChange = (index: number, value: string) => {
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const sanitizedValue = value.replace(/[^0-9+\-\s]/g, "")
    const digitCount = sanitizedValue.replace(/\D/g, "").length
    if (digitCount <= 10) {
      setPhone(sanitizedValue)
    }
  }

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "")
    return digits.length === 10
  }

  const handleSendOtp = async () => {
    if (!validatePhone(phone)) {
      setError("Phone number must contain exactly 10 digits")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("contact_no", phone)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userLoginCheck`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.status === 400) {
        setError(result.message || "Enter Registered Contact Number")
      } else if (result.status === 200) {
        setShowOtpInput(true)
        setError("")
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      setError("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("")

    if (enteredOtp.length !== 5) {
      setError("Please enter the complete OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("contact_no", phone)
      formData.append("otp", enteredOtp)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userLogin`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.status === 400) {
        setError(result.message || "Enter Valid OTP")
      } else if (result.status === 200) {
        localStorage.setItem("portal_token", result.data.token)
        onLoginSuccess(result.data)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setError("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = () => {
    setCountdown(30)
    setOtp(["", "", "", "", ""])
    setError("")
    inputRefs[0]?.current?.focus()
    handleSendOtp()
  }

  return (
    <StepContainer subtitle="Enter your registered mobile number to login">
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 p-0 h-auto text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Registration
        </Button>

        {!showOtpInput ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="login-phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="login-phone"
                  type="tel"
                  placeholder="12345 67890"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="pl-10 h-12"
                />
              </div>
              {error && (
                <div className="flex justify-between gap-2">
                  <div className="border-red-400 text-red-700 rounded">{error}</div>{" "}
                  <Button
                    variant="ghost"
                    onClick={onBack}
                    className="flex items-center gap-2 p-0 h-auto text-gray-600 hover:text-gray-800"
                  >
                    Register Here
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 justify-center mt-8">
              <Button
                onClick={handleSendOtp}
                disabled={loading || !validatePhone(phone)}
                className=" h-12 bg-[#cb0015] hover:bg-[#cb0015]/90"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
                <ArrowRight size={16} />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">OTP sent to</p>
                    <p className="font-semibold text-gray-900">{formatPhoneNumber(phone)}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowOtpInput(false)
                    setOtp(["", "", "", "", ""])
                    setError("")
                  }}
                  className="flex items-center gap-2"
                >
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
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-16 w-16 text-center text-2xl font-bold"
                  />
                ))}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm mb-6">{error}</div>
              )}

              <div className="flex items-center justify-center gap-2 mb-6">
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

            <Button
              onClick={handleVerifyOtp}
              disabled={loading || otp.join("").length !== 5}
              className="w-full h-12 bg-[#cb0015] hover:bg-[#cb0015]/90"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </>
        )}
      </div>
    </StepContainer>
  )
}

// Updated LoginStep Component
export function LoginStep({ onNext, goToStep, loginstate, updateUserSelections }: LoginStepProps) {
  const [isLoginMode, setIsLoginMode] = useState(loginstate)
  const [showPortalDetails, setShowPortalDetails] = useState(false)
  const [userData, setUserData] = useState<UserLoginData | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [state, setState] = useState("")
  const [stateId, setStateId] = useState("") // Store state ID
  const [city, setCity] = useState("")
  const [cityId, setCityId] = useState("") // Store city ID
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
  const [policies, setPolicies] = useState({
    serviceAgreement: false,
    advertisingPolicy: false,
    grievanceRedressalPolicy: false,
    contentLicensingPolicy: false,
  })

  const handlePolicyChange = (policy: string) => {
    setPolicies({
      ...policies,
      [policy]: !policies[policy as keyof typeof policies],
    })
  }

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

  useEffect(() => {
    const fetchCities = async () => {
      if (stateId) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cityApi/${stateId}`)
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
        setCityId("")
      }
    }
    fetchCities()
  }, [stateId])

  const handleStateSelect = (stateName: string, id: string) => {
    setState(stateName)
    setStateId(id)
    setCity("") // Reset city when state changes
    setCityId("")
  }

  const handleCitySelect = (cityName: string, id: string) => {
    setCity(cityName)
    setCityId(id)
  }

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
    const sanitizedValue = value.replace(/[^0-9+\-\s]/g, "")
    const digitCount = sanitizedValue.replace(/\D/g, "").length
    if (digitCount <= 10) {
      setPhone(sanitizedValue)
    }
  }

  const handleLoginSuccess = (loginData: UserLoginData) => {
    setUserData(loginData)
    updateUserSelections({
      name: loginData.name || "",
      email: loginData.email || "",
      phone: loginData.contact_no.toString(),
      state: loginData.state || "",
      city: loginData.city || "",
      state_id: "", // Not provided by login API, so leave empty
      city_id: "", // Not provided by login API, so leave empty
    })

    if (loginData.is_profile_complete === 1) {
      setShowPortalDetails(true)
    } else {
      goToStep(3)
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
    if (!state || !stateId) {
      newErrors.state = "Please select a state from the dropdown"
      isValid = false
    }
    if (!city || !cityId) {
      newErrors.city = "Please select a city from the dropdown"
      isValid = false
    }
    if (!Object.values(policies).every(Boolean)) {
      newErrors.general = "You must accept all policies to proceed."
      isValid = false
    }
    setErrors(newErrors)
    if (!isValid) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("contact_no", phone)
      formData.append("email_id", email)
      formData.append("state_id", stateId) // Send state_id to API
      formData.append("city_id", cityId) // Send city_id to API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkUserForRegistration`, {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
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
        if (serverErrors.email || serverErrors.phone) {
          serverErrors.general = "User already exists. Please login with your registered mobile number."
        }
        setErrors(serverErrors)
        setLoading(false)
        return
      }
      onNext({ name: name.trim(), email, phone, state, city, state_id: stateId, city_id: cityId })
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

  if (showPortalDetails && userData) {
    return (
      <PortalDetails
        userData={userData}
        onBack={() => {
          setShowPortalDetails(false)
          setIsLoginMode(false)
          setUserData(null)
        }}
      />
    )
  }

  if (isLoginMode) {
    return <LoginForm onBack={() => setIsLoginMode(false)} onLoginSuccess={handleLoginSuccess} />
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
              placeholder="12345 67890"
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
            <SearchableDropdown
              options={states}
              value={state}
              onChange={handleStateSelect}
              labelKey="state_name"
              valueKey="id"
              placeholder="Select a state..."
            />
            {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              City
            </Label>
            <SearchableDropdown
              options={cities}
              value={city}
              onChange={handleCitySelect}
              labelKey="city_name"
              valueKey="city_id"
              placeholder="Select a city..."
              disabled={!stateId}
            />
            {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
          </div>
        </div>
        <div className="space-y-4">
          {[
            {
              id: "serviceAgreement",
              label: "SaaS Service Agreement",
              link: "policy/saas-service-agreement",
            },
            {
              id: "advertisingPolicy",
              label: "Advertising & Monetization Policy",
              link: "policy/advertising-and-monetization-policy",
            },
            {
              id: "grievanceRedressalPolicy",
              label: "Grievance Redressal Policy (as per IT Rules, 2021)",
              link: "policy/grievance-redressal-policy",
            },
            {
              id: "contentLicensingPolicy",
              label: "Content Responsibility & Licensing Policy",
              link: "policy/content-responsibility-and-licensing-policy",
            },
          ].map((policy) => (
            <div key={policy.id} className="flex items-start space-x-2">
              <div className="flex items-center h-5">
                <input
                  id={policy.id}
                  type="checkbox"
                  checked={policies[policy.id as keyof typeof policies]}
                  onChange={() => handlePolicyChange(policy.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <Label htmlFor={policy.id} className="text-sm">
                I accept the{" "}
                <a
                  href={policy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {policy.label}
                </a>
              </Label>
            </div>
          ))}
        </div>
        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-400 text-red-700 rounded">{errors.general}</div>
        )}
        <NavigationButtons onNext={handleNext} nextLabel="Send OTP" loading={loading} />
        <div className="text-center">
          <span className="text-gray-600">Already registered? </span>
          <button onClick={() => setIsLoginMode(true)} className="text-[#cb0015] hover:underline font-medium">
            Login Here
          </button>
        </div>
      </div>
    </StepContainer>
  )
}