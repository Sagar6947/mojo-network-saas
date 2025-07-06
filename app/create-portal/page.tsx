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

interface UserSelections {
  email: string
  phone: string
  portalName: string
  selectedDomain: string
  selectedLogo: any
  selectedFavicon?: any
  selectedTheme: string
  selectedTemplate: string
  selectedCategories: string[]
}

type WizardState = "form" | "creating" | "success" | "error"

export default function CreatePortalPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardState, setWizardState] = useState<WizardState>("form")
  const [portalData, setPortalData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [commonData, setCommonData] = useState<CommonApiResponse | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [userSelections, setUserSelections] = useState<UserSelections>({
    email: "",
    phone: "",
    portalName: "",
    selectedDomain: "",
    selectedLogo: null,
    selectedFavicon: null,
    selectedTheme: "",
    selectedTemplate: "",
    selectedCategories: [],
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
    "Name Your News Portal",
    "Create Your Brand Identity",
    "Choose Your Color Theme",
    "Select a Layout Template",
    "Pick News Categories",
    "Preview Your Portal",
    "Launch Your News Portal",
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

  const handleLoginNext = (data: { email: string; phone: string }) => {
    setUserSelections((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  const handlePortalNameNext = (data: { portalName: string; selectedDomain: string }) => {
    setUserSelections((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  const handleLogoNext = (data: { selectedLogo: any; selectedFavicon?: any }) => {
    setUserSelections((prev) => ({ ...prev, ...data }))
    nextStep()
  }

  const handleThemeNext = (data: { selectedTheme: string }) => {
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

  const handleCreatePortal = async () => {
    setWizardState("creating")

    try {
      const portalData = {
        email: userSelections.email,
        phone: userSelections.phone,
        portalName: userSelections.portalName,
        selectedDomain: userSelections.selectedDomain,
        selectedLogo: userSelections.selectedLogo,
        selectedFavicon: userSelections.selectedFavicon,
        selectedTheme: userSelections.selectedTheme,
        selectedTemplate: userSelections.selectedTemplate || "1",
        selectedCategories: userSelections.selectedCategories || [],
      }

      console.log("Creating Portal with data:", portalData)

      const response = await mockCreatePortal(portalData)

      if (response.success) {
        setPortalData({
          ...response,
          portalName: userSelections.portalName,
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
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto animate-spin">
            <span className="text-3xl">⏳</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
            <p className="text-gray-600">Fetching application data...</p>
          </div>
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
      return <PortalCreationLoading portalName={userSelections.portalName} domain={userSelections.selectedDomain} />
    }

    if (wizardState === "success" && portalData) {
      return (
        <PortalSuccess
          portalName={portalData.portalName || userSelections.portalName}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Portal Creation Failed</h2>
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
        return <LoginStep onNext={handleLoginNext} />
      case 2:
        return (
          <OtpStep
            onBack={previousStep}
            onNext={nextStep}
            personName={`Sagar Thakur`}
            emailId={userSelections.email}
            phoneNumber={userSelections.phone}
            onEditPhone={() => goToStep(1)}
          />
        )
      case 3:
        return <PortalNameStep onBack={previousStep} onNext={handlePortalNameNext} />
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
                Everything looks perfect! Click the button below to create your news portal.
              </p>
              <button
                onClick={handleCreatePortal}
                className="bg-[#cb0015] text-white px-8 py-3 rounded-lg hover:bg-[#cb0015] transition-colors text-lg font-semibold"
              >
                🚀 Launch My Portal
              </button>
            </div>
          </div>
        )
      default:
        return <div>Step not implemented yet</div>
    }
  }

  const getTitle = () => {
    if (wizardState === "creating") return "Creating Your News Portal"
    if (wizardState === "success") return "Portal Created Successfully!"
    if (wizardState === "error") return "Portal Creation Failed"
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
