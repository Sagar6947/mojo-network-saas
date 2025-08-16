"use client"

import { useState, useEffect } from "react"
import { WizardLayout } from "@/components/wizard/wizard-layout"
import { LoginStep } from "@/components/wizard/steps/login-step"
import { OtpStep } from "@/components/wizard/steps/otp-step"
import { PortalNameStep } from "@/components/wizard/steps/portal-name-step"
import { LogoStep } from "@/components/wizard/steps/logo-step"
import { ThemeStep } from "@/components/wizard/steps/theme-step"
import { TemplateStep } from "@/components/wizard/steps/template-step"
import { CategoriesStep } from "@/components/wizard/steps/categories-step"
import { PreviewStep } from "@/components/wizard/steps/preview-step"
import { PortalCreationLoading } from "@/components/wizard/portal-creation-loading"
import { PortalSuccess } from "@/components/wizard/portal-success"
import { mockCreatePortal, fetchCommonData, type CommonApiResponse } from "@/lib/api"
import "./skeletonLoader.css"

interface UserSelections {
  name: string
  email: string
  phone: string
  portalName: string
  channelLanguage: string
  channelName: string
  selectedDomain: string
  selectedLogo: any
  selectedFavicon?: any
  selectedTheme: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  selectedTemplate: string
  selectedCategories: string[]
  state: string
  city: string
}

interface ThemeSelectionData {
  selectedTheme: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
}



type WizardState = "form" | "creating" | "success" | "error"

export default function CreatePortalPage({ searchParams }: { searchParams: { login?: string } }) {
  const login = searchParams?.login;
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardState, setWizardState] = useState<WizardState>("form")
  const [portalData, setPortalData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [commonData, setCommonData] = useState<CommonApiResponse | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [userSelections, setUserSelections] = useState<UserSelections>({
    name: "",
    email: "",
    phone: "",
    channelLanguage: "",
    channelName: "",
    portalName: "",
    selectedDomain: "",
    selectedLogo: null,
    selectedFavicon: null,
    selectedTheme: "",
    primaryColor: "",
    secondaryColor: "",
    textColor: "",
    selectedTemplate: "",
    selectedCategories: [],
    state: "",
    city: "",
  })

  // Fetch common data on component mount
  useEffect(() => {
    const loadCommonData = async () => {
      try {
        setIsLoadingData(true)
        const data = await fetchCommonData()
        setCommonData(data)
      } catch (error) {
        console.error("Failed to load common data:", error)
        setError("Failed to load application data. Please refresh the page.")
      } finally {
        setIsLoadingData(false)
      }
    }

    loadCommonData()
  }, [])

  const totalSteps = 9

  const stepTitles = [
    "Welcome to MojoNetwork",
    "Verify Your Phone Number",
    "Name Your News Channel",
    "Add Your Brand Identity",
    "Choose Your Color Theme",
    "Select a Layout Template",
    "Pick News Categories",
    "Preview Your Channel",
    "Launch Your News Channel",
  ]

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
    window.scrollTo(0, 0)
  }

  const handleLoginNext = (data: { name: string; email: string; phone: string; state: string; city: string }) => {
    setUserSelections((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  const handlePortalNameNext = (data: { channelName: string; portalName: string; selectedDomain: string }) => {
    setUserSelections((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  const handleLogoNext = (data: { selectedLogo: any; selectedFavicon?: any }) => {
    setUserSelections((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  const handleThemeNext = (data: ThemeSelectionData) => {
    setUserSelections((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  const handleTemplateNext = (data: { selectedTemplate: string }) => {
    setUserSelections((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  const handleCategoriesNext = (data: { selectedCategories: string[] }) => {
    setUserSelections((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  const handlePreviewNext = () => {
    nextStep()
  }

  const updateUserSelections = (data: {
    name: string;
    email: string;
    phone: string;
    state: string;
    city: string;
  }) => {
    setUserSelections((prev) => ({ ...prev, ...data }));
  };

  const handleCreatePortal = async () => {
    setWizardState("creating")

    try {
      const portalData = {
        name: userSelections.name,
        email: userSelections.email,
        phone: userSelections.phone,
        channelLanguage: userSelections.channelLanguage,
        channelName: userSelections.channelName,
        portalName: userSelections.portalName,
        selectedDomain: userSelections.selectedDomain,
        selectedLogo: userSelections.selectedLogo,
        selectedFavicon: userSelections.selectedFavicon,
        primaryColor: userSelections.primaryColor,
        secondaryColor: userSelections.secondaryColor,
        textColor: userSelections.textColor,
        selectedTheme: userSelections.selectedTheme,
        selectedTemplate: userSelections.selectedTemplate || "1",
        selectedCategories: userSelections.selectedCategories || [],
        state: userSelections.state,
        city: userSelections.city,
      }

      console.log("Creating Portal with data:", portalData)

      const response = await mockCreatePortal(portalData)

      if (response.success) {
        setPortalData({
          ...response,
          portalName: userSelections.portalName,
          channelLanguage: userSelections.channelLanguage,
          channelName: userSelections.channelName,
          selectedDomain: userSelections.selectedDomain,
          selectedLogo: userSelections.selectedLogo,
          selectedFavicon: userSelections.selectedFavicon,
          selectedTheme: userSelections.selectedTheme,
          selectedTemplate: userSelections.selectedTemplate,
          selectedCategories: userSelections.selectedCategories,
        })
        setWizardState("success")
      } else {
        throw new Error(response.message || "Failed to create portal")
      }
    } catch (error: any) {
      console.error("Portal creation failed:", error)
      let errorMessage = "An unexpected error occurred"
      if (error.message) {
        errorMessage = error.message
      }
      setError(errorMessage)
      setWizardState("error")
    }
  }

  const renderContent = () => {
    if (isLoadingData) {
      return (

        <div className="space-y-6 bg-white p-4 rounded-lg shadow-md">
          {/* Full Name Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 skeleton-animation"></div>
            <div className="relative h-12 bg-gray-200 rounded-md skeleton-animation"></div>
          </div>

          {/* Email Address Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 skeleton-animation"></div>
            <div className="relative h-12 bg-gray-200 rounded-md skeleton-animation"></div>
          </div>

          {/* Phone Number Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 skeleton-animation"></div>
            <div className="relative h-12 bg-gray-200 rounded-md skeleton-animation"></div>
          </div>

          {/* State and City Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20 skeleton-animation"></div>
              <div className="relative h-12 bg-gray-200 rounded-md skeleton-animation"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20 skeleton-animation"></div>
              <div className="relative h-12 bg-gray-200 rounded-md skeleton-animation"></div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 bg-gray-200 rounded-full skeleton-animation"></div>
        </div>

      )
    }

    if (!commonData) {
      return (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">❌</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Data</h2>
            <p className="text-gray-600 mb-4">Unable to fetch application data. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    // Rest of the existing renderContent logic...
    if (wizardState === "creating") {
      return <PortalCreationLoading portalName={userSelections.channelName} domain={userSelections.selectedDomain} />
    }

    if (wizardState === "success" && portalData) {
      return (
        <PortalSuccess
          portalName={portalData.channelName || userSelections.channelName}
          portalUrl={portalData.portalUrl}
          portalAdminUrl={portalData.portalAdminUrl}
          portalId={portalData.portalId}
          selectedLogo={userSelections.selectedLogo}
          selectedDomain={portalData.selectedDomain || userSelections.selectedDomain}
        />
      )
    }

    if (wizardState === "error") {
      return (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">❌</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Channel Creation Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => {
                setWizardState("form")
                setError(null)
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    // Render form steps with common data
    switch (currentStep) {
      case 1:
        return <LoginStep
          onNext={handleLoginNext}
          updateUserSelections={updateUserSelections} // Pass the new prop
          goToStep={goToStep}
          loginstate={!!login} // Convert to boolean
        />
      case 2:
        return (
          <OtpStep
            onBack={previousStep}
            onNext={nextStep}
            personName={userSelections.name}
            emailId={userSelections.email}
            phoneNumber={userSelections.phone}
            state={userSelections.state}
            city={userSelections.city}
            onEditPhone={() => goToStep(1)}
          />
        )
      case 3:
        return <PortalNameStep onBack={previousStep} onNext={handlePortalNameNext} nativeLanguage={commonData.data.channel_language} />
      case 4:
        return <LogoStep onBack={previousStep} onNext={handleLogoNext} portalName={userSelections.portalName} />
      case 5:
        return (
          <ThemeStep
            onBack={previousStep}
            onNext={handleThemeNext}
            themes={commonData.data.color_theme}
            imagePath={commonData.data.image_path}
          />
        )
      case 6:
        return (
          <TemplateStep
            onBack={previousStep}
            onNext={handleTemplateNext}
            templates={commonData.data.theme_layout}
            imagePath={commonData.data.image_path}
          />
        )
      case 7:
        return (
          <CategoriesStep
            onBack={previousStep}
            onNext={handleCategoriesNext}
            categories={commonData.data.news_category}
            imagePath={commonData.data.image_path}
          />
        )
      case 8:
        return (
          <PreviewStep
            onBack={previousStep}
            onNext={handlePreviewNext}
            userSelections={userSelections}
            commonData={commonData}
          />
        )
      case 9:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto ">
              <span className="text-3xl">🚀</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Launch!</h2>
              <p className="text-gray-600 mb-6">
                Everything looks perfect! Click the button below to create your news channel.
              </p>
              <button
                onClick={handleCreatePortal}
                className="bg-[#cb0015] text-white px-8 py-3 rounded-lg hover:bg-[#cb0015] transition-colors text-lg font-semibold"
              >
                🚀 Launch My Channel
              </button>
            </div>
          </div>
        )
      default:
        return <div>Step not implemented yet</div>
    }
  }

  const getTitle = () => {
    if (wizardState === "creating") return "Creating Your News Channel"
    if (wizardState === "success") return "Channel Created Successfully!"
    if (wizardState === "error") return "Channel Creation Failed"
    return stepTitles[currentStep - 1]
  }

  const getCurrentStep = () => {
    if (wizardState !== "form") return totalSteps
    return currentStep
  }

  return (
    <WizardLayout currentStep={getCurrentStep()} totalSteps={totalSteps} title={getTitle()}>
      {renderContent()}
    </WizardLayout>
  )
}
