import type React from "react";
import { useState, useEffect, useRef } from "react";
import { StepContainer } from "../step-container";
import { NavigationButtons } from "../navigation-buttons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AtSign, Phone, User, MapPin, Building, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginStepProps {
  onNext: (data: {
    name: string;
    email: string;
    phone: string;
    state: string;
    city: string;
  }) => void;
}

interface State {
  id: number;
  state_name: string;
}

interface City {
  city_id: number;
  city_name: string;
}

interface SearchableDropdownProps {
  options: any[];
  value: string;
  onChange: (value: string) => void;
  labelKey: string;
  valueKey: string;
  placeholder: string;
  disabled?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  labelKey,
  valueKey,
  placeholder,
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedOption = options.find(option => option[labelKey] === value);
    if (selectedOption) {
      setDisplayValue(selectedOption[labelKey]);
    } else {
      setDisplayValue("");
    }
  }, [value, options, labelKey]);

  const filteredOptions = options.filter((option) =>
    option[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (optionValue: string) => {
    console.log("Selected option value:", optionValue);
    const selectedOption = options.find(option => option[valueKey].toString() === optionValue);
    if (selectedOption) {
      setDisplayValue(selectedOption[labelKey]);
      onChange(selectedOption[labelKey]); // Send the label instead of the value
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm || displayValue}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 h-10"
          disabled={disabled}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option[valueKey]}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${value === option[labelKey] ? "bg-gray-200" : ""}`}
                onClick={() => handleSelect(option[valueKey].toString())}
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
  );
};

export function LoginStep({ onNext }: LoginStepProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [stateId, setStateId] = useState(""); // Store the state ID separately
  const [city, setCity] = useState("");
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    general: "",
  });
  const [policies, setPolicies] = useState({
    serviceAgreement: false,
    advertisingPolicy: false,
    grievanceRedressalPolicy: false,
    contentLicensingPolicy: false,
  });

  const handlePolicyChange = (policy: string) => {
    setPolicies({
      ...policies,
      [policy]: !policies[policy as keyof typeof policies],
    });
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stateApi`
        );
        const data = await response.json();
        if (data.status === 200) {
          setStates(data.data);
        }
      } catch (err) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Failed to fetch states.",
        }));
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (stateId) { // Use stateId for fetching cities
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cityApi/${stateId}`
          );
          const data = await response.json();
          if (data.status === 200) {
            setCities(data.data);
          }
        } catch (err) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "Failed to fetch cities.",
          }));
        }
      } else {
        setCities([]);
        setCity("");
      }
    };
    fetchCities();
  }, [stateId]);

  const handleStateSelect = (stateName: string) => {
    const selectedState = states.find(s => s.state_name === stateName);
    if (selectedState) {
      setState(stateName);
      setStateId(selectedState.id.toString()); // Store the state ID
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9+\-\s]/g, "");
    const digitCount = sanitizedValue.replace(/\D/g, "").length;
    if (digitCount <= 10) {
      setPhone(sanitizedValue);
    }
  };

  const handleNext = async () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      general: "",
    };
    let isValid = true;
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }
    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits";
      isValid = false;
    }
    if (!state) {
      newErrors.state = "State is required";
      isValid = false;
    }
    if (!city) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!Object.values(policies).every(Boolean)) {
      newErrors.general = "You must accept all policies to proceed.";
      isValid = false;
    }
    setErrors(newErrors);
    if (!isValid) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("contact_no", phone);
      formData.append("email_id", email);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkUserForRegistration`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (!response.ok || result.status === 400) {
        const serverErrors = {
          name: "",
          email: "",
          phone: "",
          state: "",
          city: "",
          general: "",
        };
        if (result.message?.email_id) {
          serverErrors.email = result.message.email_id;
        }
        if (result.message?.contact_no) {
          serverErrors.phone = result.message.contact_no;
        }
        setErrors(serverErrors);
        setLoading(false);
        return;
      }
      onNext({ name: name.trim(), email, phone, state, city });
    } catch (error) {
      console.error("Error creating portal:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Something went wrong. Please try again later.",
      }));
    } finally {
      setLoading(false);
    }
  };

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
              className={`pl-10 h-12 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
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
              className={`pl-10 h-12 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
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
              className={`pl-10 h-12 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
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
              placeholder="Search states..."
            />
            {errors.state && (
              <p className="text-sm text-red-500 mt-1">{errors.state}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              City
            </Label>
            <SearchableDropdown
              options={cities}
              value={city}
              onChange={setCity}
              labelKey="city_name"
              valueKey="city_id"
              placeholder="Search cities..."
              disabled={!stateId}
            />
            {errors.city && (
              <p className="text-sm text-red-500 mt-1">{errors.city}</p>
            )}
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
                <a href={policy.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {policy.label}
                </a>
              </Label>
            </div>
          ))}
        </div>
        {errors.general && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}
        <NavigationButtons
          onNext={handleNext}
          nextLabel="Send OTP"
          loading={loading}
        />
      </div>
    </StepContainer>
  );
}
