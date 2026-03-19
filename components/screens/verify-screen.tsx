"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Mail, RefreshCw, CheckCircle2 } from "lucide-react"
import { type Language, t } from "@/lib/translations"

interface VerifyScreenProps {
  email: string
  onVerify: () => void
  onBack: () => void
  language: Language
}

export function VerifyScreen({ email, onVerify, onBack, language }: VerifyScreenProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Simulate cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all digits entered
    if (value && index === 5 && newCode.every(d => d)) {
      handleVerify(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (pastedData.length === 6) {
      const newCode = pastedData.split("")
      setCode(newCode)
      handleVerify(pastedData)
    }
  }

  const handleVerify = (enteredCode: string) => {
    setIsVerifying(true)
    setError("")

    // Simulate verification (accept any 6-digit code for demo)
    setTimeout(() => {
      if (enteredCode.length === 6) {
        setIsVerified(true)
        setTimeout(() => {
          onVerify()
        }, 1500)
      } else {
        setError(t("invalidCode", language))
        setCode(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
      setIsVerifying(false)
    }, 1500)
  }

  const handleResend = () => {
    if (resendCooldown > 0) return
    setResendCooldown(60)
    setError("")
    // In real app, would resend the code
  }

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1***$3")

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
          aria-label={t("back", language)}
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{t("verifyEmail", language)}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col items-center">
        {/* Icon */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all ${
          isVerified ? "bg-primary/20" : "bg-secondary"
        }`}>
          {isVerified ? (
            <CheckCircle2 className="w-10 h-10 text-primary" />
          ) : (
            <Mail className="w-10 h-10 text-primary" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-foreground text-center mb-2">
          {isVerified ? t("verified", language) : t("checkYourInbox", language)}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-[280px]">
          {isVerified 
            ? t("welcomeToStuCo", language)
            : <>{t("sentCodeTo", language)} <span className="font-medium text-foreground">{maskedEmail}</span></>
          }
        </p>

        {!isVerified && (
          <>
            {/* Code Input */}
            <div className="flex gap-2 mb-6" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isVerifying}
                  className={`w-11 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all focus:outline-none ${
                    error 
                      ? "border-destructive bg-destructive/10" 
                      : digit 
                        ? "border-primary bg-primary/10" 
                        : "border-border bg-secondary/50 focus:border-primary"
                  } ${isVerifying ? "opacity-50" : ""}`}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-destructive mb-4">{error}</p>
            )}

            {/* Verifying State */}
            {isVerifying && (
              <div className="flex items-center gap-2 text-primary mb-4">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">{t("verifying", language)}</span>
              </div>
            )}

            {/* Resend */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {t("didntReceiveCode", language)}
              </p>
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className={`text-sm font-semibold ${
                  resendCooldown > 0 
                    ? "text-muted-foreground cursor-not-allowed" 
                    : "text-primary hover:underline"
                }`}
              >
                {resendCooldown > 0 ? `${t("resendIn", language)} ${resendCooldown}s` : t("resendCode", language)}
              </button>
            </div>

            {/* Hint for demo */}
            <div className="mt-auto pt-8">
              <p className="text-xs text-muted-foreground text-center bg-secondary/50 px-4 py-2 rounded-lg">
                {t("demoHint", language)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
