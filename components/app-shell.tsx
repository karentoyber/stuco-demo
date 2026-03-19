"use client"

import { useState } from "react"
import { Home, Compass, Plus, MessageCircle, User, Globe } from "lucide-react"
import { HomeScreen } from "@/components/screens/home-screen"
import { MatchScreen } from "@/components/screens/match-screen"
import { CreateTripScreen } from "@/components/screens/create-trip-screen"
import { ChatsScreen } from "@/components/screens/chats-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { TripDetailScreen } from "@/components/screens/trip-detail-screen"
import { FundScreen } from "@/components/screens/fund-screen"
import { SignupScreen } from "@/components/screens/signup-screen"
import { VerifyScreen } from "@/components/screens/verify-screen"
import { type Language, t } from "@/lib/translations"

export type Screen = "signup" | "verify" | "home" | "match" | "create" | "chats" | "profile" | "trip-detail" | "fund"

interface UserData {
  firstName: string
  lastName: string
  email: string
  school: string
  gradDate: string
}

export function AppShell() {
  const [activeScreen, setActiveScreen] = useState<Screen>("signup")
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null)
  const [previousScreen, setPreviousScreen] = useState<Screen>("chats")
  const [userData, setUserData] = useState<UserData | null>(null)
  const [language, setLanguage] = useState<Language>("en")
  const [isTopMatch, setIsTopMatch] = useState<boolean>(false)

  const toggleLanguage = () => {
    setLanguage(lang => lang === "en" ? "zh" : "en")
  }

  const handleSignup = (data: UserData) => {
    setUserData(data)
    setActiveScreen("verify")
  }

  const handleVerify = () => {
    setActiveScreen("home")
  }

  const navigateToTrip = (tripId: string, topMatch?: boolean) => {
    setSelectedTripId(tripId)
    setIsTopMatch(topMatch ?? false)
    setPreviousScreen(activeScreen)
    setActiveScreen("trip-detail")
  }

  const navigateBack = () => {
    setActiveScreen(previousScreen)
    setSelectedTripId(null)
  }

  const navigateToChat = () => {
    setActiveScreen("chats")
  }

  const navigateToFund = (tripId: string) => {
    setSelectedTripId(tripId)
    setPreviousScreen("chats")
    setActiveScreen("fund")
  }

  const navigateFromFund = () => {
    setActiveScreen("chats")
  }

  const tabs = [
    { id: "home" as const, icon: Home, labelKey: "home" as const },
    { id: "match" as const, icon: Compass, labelKey: "match" as const },
    { id: "create" as const, icon: Plus, labelKey: "createTrip" as const },
    { id: "chats" as const, icon: MessageCircle, labelKey: "chats" as const },
    { id: "profile" as const, icon: User, labelKey: "profile" as const },
  ]

  const showBottomNav = !["signup", "verify", "trip-detail", "create", "fund"].includes(activeScreen)
  const showLanguageToggle = ["signup", "verify"].includes(activeScreen)

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="relative w-full max-w-[393px] h-[852px] bg-card rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-foreground/10">
        {/* Status bar */}
        <div className="flex items-center justify-between px-8 pt-3 pb-1 bg-card">
          <span className="text-xs font-semibold text-foreground">9:41</span>
          <div className="flex items-center gap-2">
            {showLanguageToggle && (
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/50 text-[10px] font-medium text-foreground"
                aria-label="Toggle language"
              >
                <Globe className="w-3 h-3" />
                {language === "en" ? "EN" : "中"}
              </button>
            )}
            <div className="w-4 h-2.5 border border-foreground/60 rounded-sm relative">
              <div className="absolute inset-0.5 bg-foreground/60 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="h-[calc(100%-7rem)] overflow-y-auto overflow-x-hidden">
          {activeScreen === "signup" && (
            <SignupScreen onSubmit={handleSignup} language={language} />
          )}
          {activeScreen === "verify" && userData && (
            <VerifyScreen 
              email={userData.email} 
              onVerify={handleVerify}
              onBack={() => setActiveScreen("signup")}
              language={language}
            />
          )}
          {activeScreen === "home" && (
            <HomeScreen 
              onTripClick={navigateToTrip} 
              onNavigateToMatch={() => setActiveScreen("match")}
              userName={userData?.firstName}
              language={language}
            />
          )}
          {activeScreen === "match" && (
            <MatchScreen onTripClick={navigateToTrip} language={language} />
          )}
          {activeScreen === "create" && (
            <CreateTripScreen onBack={() => setActiveScreen("home")} language={language} />
          )}
          {activeScreen === "chats" && (
            <ChatsScreen onOpenFund={navigateToFund} language={language} />
          )}
          {activeScreen === "profile" && (
            <ProfileScreen 
              userData={userData} 
              language={language}
              onToggleLanguage={toggleLanguage}
            />
          )}
          {activeScreen === "trip-detail" && (
            <TripDetailScreen 
              tripId={selectedTripId} 
              onBack={navigateBack}
              onOpenChat={navigateToChat}
              language={language}
              isTopMatch={isTopMatch}
            />
          )}
          {activeScreen === "fund" && (
            <FundScreen onBack={navigateFromFund} language={language} />
          )}
        </div>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border px-4 pb-6 pt-2">
            <nav className="flex items-center justify-around">
              {tabs.map((tab) => {
                const isActive = activeScreen === tab.id
                const isCreate = tab.id === "create"

                if (isCreate) {
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveScreen("create")}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg -mt-6"
                      aria-label={t("createTrip", language)}
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  )
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveScreen(tab.id)}
                    className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    aria-label={t(tab.labelKey, language)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-[10px] font-medium">{t(tab.labelKey, language)}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
