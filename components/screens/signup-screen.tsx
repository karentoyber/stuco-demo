"use client"

import { useState } from "react"
import { GraduationCap, Mail, User, Calendar, ChevronDown, ArrowRight } from "lucide-react"
import Image from "next/image"
import { type Language, t } from "@/lib/translations"

interface SignupScreenProps {
  onSubmit: (data: {
    firstName: string
    lastName: string
    email: string
    school: string
    gradDate: string
  }) => void
  language: Language
}

const SCHOOLS = [
  "UC Berkeley",
  "UCLA",
  "Stanford University",
  "USC",
  "UC San Diego",
  "UC Davis",
  "UC Irvine",
  "Cal Poly SLO",
  "San Jose State",
  "SF State",
  "Other"
]

const GRAD_YEARS = ["2025", "2026", "2027", "2028", "2029"]

export function SignupScreen({ onSubmit, language }: SignupScreenProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [school, setSchool] = useState("")
  const [gradYear, setGradYear] = useState("")
  const [gradSeason, setGradSeason] = useState("")
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false)
  const [emailError, setEmailError] = useState("")

  const GRAD_SEASONS = [
    { value: "Spring", label: t("spring", language) },
    { value: "Summer", label: t("summer", language) },
    { value: "Fall", label: t("fall", language) },
    { value: "Winter", label: t("winter", language) },
  ]

  const validateEmail = (email: string) => {
    if (!email.endsWith(".edu")) {
      setEmailError(t("emailError", language))
      return false
    }
    setEmailError("")
    return true
  }

  const isFormValid = 
    firstName.trim() && 
    lastName.trim() && 
    email.trim() && 
    email.endsWith(".edu") &&
    school && 
    gradYear && 
    gradSeason

  const handleSubmit = () => {
    if (!validateEmail(email)) return
    if (!isFormValid) return

    onSubmit({
      firstName,
      lastName,
      email,
      school,
      gradDate: `${gradSeason} ${gradYear}`
    })
  }

  return (
    <div className="min-h-full flex flex-col">
      {/* Hero Header */}
      <div className="relative" style={{ height: '180px' }}>
        <Image
          src="/images/hero-landscape.jpg"
          alt="Travel adventure"
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-2xl font-bold">{t("joinStuCo", language)}</h1>
          <p className="text-sm opacity-90 mt-1">{t("findYourTravelCrew", language)}</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 p-5 space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              {t("firstName", language)}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Alex"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              {t("lastName", language)}
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Chen"
              className="w-full px-3 py-2.5 bg-secondary/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* School Email */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
            {t("schoolEmail", language)}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) validateEmail(e.target.value)
              }}
              onBlur={() => email && validateEmail(email)}
              placeholder="you@university.edu"
              className={`w-full pl-9 pr-3 py-2.5 bg-secondary/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                emailError ? "ring-2 ring-destructive/50" : "focus:ring-primary/50"
              }`}
            />
          </div>
          {emailError && (
            <p className="text-xs text-destructive mt-1">{emailError}</p>
          )}
        </div>

        {/* School Selection */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
            {t("school", language)}
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <button
              type="button"
              onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
              className="w-full pl-9 pr-9 py-2.5 bg-secondary/50 rounded-xl text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <span className={school ? "text-foreground" : "text-muted-foreground"}>
                {school || t("selectYourSchool", language)}
              </span>
            </button>
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform ${showSchoolDropdown ? "rotate-180" : ""}`} />
            
            {showSchoolDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                {SCHOOLS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSchool(s)
                      setShowSchoolDropdown(false)
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-secondary/50 transition-colors ${
                      school === s ? "text-primary font-medium bg-secondary/30" : "text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Graduation Date */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
            {t("expectedGraduation", language)}
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={gradSeason}
                onChange={(e) => setGradSeason(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-secondary/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
              >
                <option value="" className="text-muted-foreground">{t("season", language)}</option>
                {GRAD_SEASONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <select
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className="flex-1 px-3 py-2.5 bg-secondary/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
            >
              <option value="" className="text-muted-foreground">{t("year", language)}</option>
              {GRAD_YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center px-4">
          {t("termsText", language)}
        </p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            isFormValid
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {t("continue", language)}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
