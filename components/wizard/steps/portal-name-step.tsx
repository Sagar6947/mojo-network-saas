import { useState, useEffect, useRef } from "react";
import { StepContainer } from "../step-container";
import { NavigationButtons } from "../navigation-buttons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Globe, AlertCircle, X, Loader2, Search } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface NativeLanguage {
  id: number;
  language_name: string;
  language_slug: string;
  status: number;
}

interface PortalNameStepProps {
  onBack: () => void;
  onNext: (data: { channelName: string; portalName: string; selectedDomain: string; channelLanguage: string }) => void;
  nativeLanguage: NativeLanguage[];
}

interface DomainStatus {
  domain: string;
  available: boolean | null;
  suggestions?: string[];
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
    const selectedOption = options.find(option => option[valueKey] === value);
    if (selectedOption) {
      setDisplayValue(selectedOption[labelKey]);
    } else {
      setDisplayValue("");
    }
  }, [value, options, valueKey, labelKey]);

  const filteredOptions = options.filter((option) =>
    option[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (optionValue: string) => {
    const selectedOption = options.find(option => option[valueKey] === optionValue);
    if (selectedOption) {
      setDisplayValue(selectedOption[labelKey]);
      onChange(optionValue);
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
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${value === option[valueKey] ? "bg-gray-200" : ""
                  }`}
                onClick={() => handleSelect(option[valueKey])}
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

export function PortalNameStep({ onBack, onNext, nativeLanguage }: PortalNameStepProps) {
  const [channelName, setChannelName] = useState("");
  const [portalName, setPortalName] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domainSuggestions, setDomainSuggestions] = useState<string[]>([]);
  const [domainStatuses, setDomainStatuses] = useState<Map<string, DomainStatus>>(new Map());
  const [checkingDomains, setCheckingDomains] = useState(false);
  const [channelLanguage, setChannelLanguage] = useState("");
  const platformDomain = "mojonetwork.in";

  useEffect(() => {
    if (channelName.trim()) {
      setPortalName(channelName);
    }
  }, [channelName])

  useEffect(() => {
    if (!portalName.trim()) {
      setDomainSuggestions([]);
      setSelectedDomain("");
      setDomainStatuses(new Map());
      return;
    }
    const handler = setTimeout(() => {
      checkDomainAvailability(portalName);
    }, 600);
    return () => clearTimeout(handler);
  }, [portalName]);

  const checkDomainAvailability = async (name: string) => {
    const cleanName = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const domain = `${cleanName}.${platformDomain}`;
    setCheckingDomains(true);

    const portalId = localStorage.getItem("portal_id") || "";
    const token = localStorage.getItem("portal_token") || "";

    try {
      const formData = new FormData();
      formData.append("domain_name", cleanName);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkDomainAvailability`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || result.status !== 200) {
        throw new Error(result.message || "Domain check failed");
      }

      const available = result.data.is_domain_available;
      const suggestions = result.data.domain_suggestion?.filter((s: string | null) => s !== null) || [];

      const statuses = new Map<string, DomainStatus>();
      statuses.set(domain, { domain, available, suggestions });

      suggestions.forEach((suggested: string) => {
        const fullSuggested = suggested.includes(".") ? suggested : `${suggested}.${platformDomain}`;
        statuses.set(fullSuggested, { domain: fullSuggested, available: true });
      });

      setDomainSuggestions([domain, ...suggestions.map((s: string) => (s.includes(".") ? s : `${s}.${platformDomain}`))]);
      setDomainStatuses(statuses);

      if (available) {
        setSelectedDomain(domain);
      } else {
        setSelectedDomain("");
      }
    } catch (error) {
      console.error("Domain check error:", error);
      setDomainSuggestions([]);
      setDomainStatuses(new Map());
    }
    setCheckingDomains(false);
  };

  const handleDomainSelect = (domain: string) => {
    const status = domainStatuses.get(domain);
    if (status?.available) {
      setSelectedDomain(domain);
    }
  };

  const handleNext = () => {
    if (!channelName || !portalName || !selectedDomain || !channelLanguage) return;
    const status = domainStatuses.get(selectedDomain);
    if (!status?.available) {
      alert("Please select an available domain");
      return;
    }
    onNext({ channelName, portalName, selectedDomain, channelLanguage });
  };

  const getDomainStatusIcon = (domain: string) => {
    const status = domainStatuses.get(domain);
    if (status?.available === null) return <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />;
    if (status?.available === true) return <Check className="h-4 w-4 text-green-500" />;
    return <X className="h-4 w-4 text-red-500" />;
  };

  const getDomainStatusText = (domain: string) => {
    const status = domainStatuses.get(domain);
    if (status?.available === null) return "Checking...";
    return status?.available ? "Available" : "Not Available";
  };

  const getDomainCardClass = (domain: string) => {
    const status = domainStatuses.get(domain);
    const isSelected = selectedDomain === domain;
    if (status?.available === false) {
      return "border-red-200 bg-red-50 opacity-60 cursor-not-allowed";
    } else if (isSelected && status?.available === true) {
      return "border-purple-500 bg-purple-50";
    } else if (status?.available === true) {
      return "border-gray-200 hover:border-gray-300 cursor-pointer";
    } else {
      return "border-gray-200 opacity-60";
    }
  };

  return (
    <StepContainer subtitle="Choose a memorable name and domain for your news channel">
      <div className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="language" className="text-sm font-medium">
            Channel Language
          </Label>
          <SearchableDropdown
            options={nativeLanguage}
            value={channelLanguage}
            onChange={setChannelLanguage}
            labelKey="language_name"
            valueKey="language_slug"
            placeholder="Choose language"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="channelName">Channel Name</Label>
          <Input
            id="channelName"
            placeholder="e.g., My News Channel"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="h-12"
          />
          <p className="text-xs text-gray-500">This will be the name of your channel</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="portalName">
            Domain Name
            {checkingDomains && (
              <span className="ml-1 text-xs text-gray-500 inline-flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" /> Checking...
              </span>
            )}
          </Label>
          <Input
            id="portalName"
            placeholder="e.g., dailynews.mojonetwork.in"
            value={portalName}
            onChange={(e) => setPortalName(e.target.value)}
            className="h-12"
          />
          <p className="text-xs text-gray-500">This will be shown to visitors</p>
        </div>
        {domainSuggestions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <Label className="text-sm font-medium">Choose Your Domain</Label>
              {checkingDomains && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> Checking...
                </span>
              )}
            </div>
            <RadioGroup value={selectedDomain} onValueChange={handleDomainSelect}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {domainSuggestions.map((domain, index) => {
                  const status = domainStatuses.get(domain);
                  const isAvailable = status?.available === true;
                  const isSelected = selectedDomain === domain;
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 border rounded-lg p-3 transition-all ${getDomainCardClass(domain)}`}
                      onClick={() => isAvailable && handleDomainSelect(domain)}
                    >
                      <RadioGroupItem
                        value={domain}
                        id={`domain-${index}`}
                        className="sr-only"
                        disabled={!isAvailable}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${!isAvailable ? "text-gray-500" : ""}`}>{domain}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {getDomainStatusIcon(domain)}
                          <span className={`text-xs ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                            {getDomainStatusText(domain)}
                          </span>
                        </div>
                      </div>
                      {isSelected && isAvailable && <Check className="h-4 w-4 text-purple-500 flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
            {selectedDomain && domainStatuses.get(selectedDomain)?.available === false && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Domain Not Available</p>
                    <p className="text-sm text-yellow-800 mt-1">
                      The domain "{selectedDomain}" is already taken. Here are some alternatives:
                    </p>
                    <div className="mt-3 space-y-2">
                      {domainStatuses
                        .get(selectedDomain)
                        ?.suggestions?.slice(0, 3)
                        .map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDomainSelect(s)}
                            className="block w-full text-left text-sm text-yellow-800 hover:text-yellow-900 underline"
                          >
                            {s}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedDomain && domainStatuses.get(selectedDomain)?.available === true && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Domain Available!</p>
                    <p className="text-sm text-green-800 mt-1">
                      Your channel will be available at: <strong>https://{selectedDomain}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <NavigationButtons
          onBack={onBack}
          onNext={handleNext}
          nextDisabled={!channelName || !portalName || !selectedDomain || !channelLanguage || domainStatuses.get(selectedDomain)?.available !== true}
        />
      </div>
    </StepContainer>
  );
}
