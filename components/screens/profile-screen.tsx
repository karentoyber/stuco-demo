"use client"

import { useState } from "react"
import {
  Settings,
  ChevronRight,
  MapPin,
  GraduationCap,
  Star,
  Award,
  Bell,
  Shield,
  LogOut,
  Camera,
  Edit3,
  Globe,
} from "lucide-react"
import { type Language, t } from "@/lib/translations"

interface UserData {
  firstName: string
  lastName: string
  email: string
  school: string
  gradDate: string
}

interface ProfileScreenProps {
  userData?: UserData | null
  language: Language
  onToggleLanguage?: () => void
}

const DEFAULT_PROFILE = {
  name: "Alex Williams",
  school: "Stanford University",
  year: "Junior",
  bio: "Outdoor enthusiast and adventure seeker. Love meeting new people on the trail!",
  bioZh: "户外运动爱好者和冒险者。喜欢在旅途中结识新朋友！",
  avatar: "A",
  rating: 4.8,
  tripsCompleted: 14,
  companionsMatched: 28,
  fundsManaged: "$3,420",
  interests: ["Hiking", "Camping", "Photography", "Cooking", "Surfing"],
  interestsZh: ["徒步", "露营", "摄影", "烹饪", "冲浪"],
  badges: [
    { name: "Trip Leader", nameZh: "领队", icon: Award, color: "bg-accent/10 text-accent" },
    { name: "Verified", nameZh: "已认证", icon: Shield, color: "bg-primary/10 text-primary" },
    { name: "Top Rated", nameZh: "高评分", icon: Star, color: "bg-accent/10 text-accent" },
  ],
  upcomingTrips: [
    { name: "Yellowstone Adventure", nameZh: "黄石公园探险", date: "Jun 15 - 20", dateZh: "6月15-20日", members: 8 },
    { name: "Beach Bonfire Weekend", nameZh: "海滩篝火周末", date: "Aug 10 - 12", dateZh: "8月10-12日", members: 12 },
  ],
}

export function ProfileScreen({ userData, language, onToggleLanguage }: ProfileScreenProps) {
  const [editMode, setEditMode] = useState(false)

  // Use userData if available, otherwise fallback to defaults
  const profileName = userData 
    ? `${userData.firstName} ${userData.lastName}` 
    : DEFAULT_PROFILE.name
  const profileSchool = userData?.school || DEFAULT_PROFILE.school
  const profileYear = userData?.gradDate || DEFAULT_PROFILE.year
  const profileAvatar = userData?.firstName?.charAt(0).toUpperCase() || "A"

  const MENU_ITEMS = [
    { label: language === "en" ? "Notifications" : "通知", icon: Bell },
    { label: language === "en" ? "Privacy & Safety" : "隐私与安全", icon: Shield },
    { label: t("settings", language), icon: Settings },
  ]

  return (
    <div className="flex flex-col px-5 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-foreground">{t("profile", language)}</h1>
        <button
          onClick={() => setEditMode(!editMode)}
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
          aria-label={t("editProfile", language)}
        >
          <Edit3 className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Avatar & Info */}
      <div className="flex flex-col items-center mb-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">{profileAvatar}</span>
          </div>
          <button
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center"
            aria-label={language === "en" ? "Change photo" : "更换照片"}
          >
            <Camera className="w-3.5 h-3.5 text-primary-foreground" />
          </button>
        </div>
        <h2 className="text-lg font-bold text-foreground mt-3">{profileName}</h2>
        <div className="flex items-center gap-1 mt-0.5">
          <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {profileSchool} &middot; {profileYear}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-semibold text-foreground">{DEFAULT_PROFILE.rating}</span>
          <span className="text-xs text-muted-foreground">
            {language === "en" ? "rating" : "评分"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2 leading-relaxed max-w-[260px]">
          {language === "en" ? DEFAULT_PROFILE.bio : DEFAULT_PROFILE.bioZh}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-card rounded-xl p-3 text-center border border-border/50">
          <p className="text-lg font-bold text-primary">{DEFAULT_PROFILE.tripsCompleted}</p>
          <p className="text-[11px] text-muted-foreground">{t("trips", language)}</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center border border-border/50">
          <p className="text-lg font-bold text-primary">{DEFAULT_PROFILE.companionsMatched}</p>
          <p className="text-[11px] text-muted-foreground">{t("companions", language)}</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center border border-border/50">
          <p className="text-lg font-bold text-accent">{DEFAULT_PROFILE.fundsManaged}</p>
          <p className="text-[11px] text-muted-foreground">{t("fundsManaged", language)}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-foreground mb-2">{t("badges", language)}</h3>
        <div className="flex gap-2">
          {DEFAULT_PROFILE.badges.map((badge) => (
            <div
              key={badge.name}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${badge.color} bg-opacity-10`}
            >
              <badge.icon className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">
                {language === "en" ? badge.name : badge.nameZh}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-foreground mb-2">{t("interests", language)}</h3>
        <div className="flex gap-2 flex-wrap">
          {(language === "en" ? DEFAULT_PROFILE.interests : DEFAULT_PROFILE.interestsZh).map((interest) => (
            <span
              key={interest}
              className="text-[11px] bg-secondary text-secondary-foreground font-semibold px-3 py-1.5 rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Upcoming Trips */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-foreground mb-2">{t("upcomingTrips", language)}</h3>
        <div className="flex flex-col gap-2">
          {DEFAULT_PROFILE.upcomingTrips.map((trip) => (
            <div
              key={trip.name}
              className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">
                  {language === "en" ? trip.name : trip.nameZh}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {language === "en" ? trip.date : trip.dateZh} &middot; {trip.members} {t("members", language)}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Language Toggle */}
      <button
        onClick={onToggleLanguage}
        className="flex items-center gap-3 py-3 px-1 border-t border-border/50"
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-foreground flex-1 text-left">{t("language", language)}</span>
        <span className="text-sm text-muted-foreground">
          {language === "en" ? "English" : "中文"}
        </span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Menu */}
      <div className="flex flex-col gap-1 mb-3">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 py-3 px-1"
          >
            <item.icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground flex-1 text-left">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="flex items-center gap-3 py-3 px-1 mb-6">
        <LogOut className="w-4 h-4 text-destructive" />
        <span className="text-sm text-destructive font-medium">
          {language === "en" ? "Log Out" : "退出登录"}
        </span>
      </button>
    </div>
  )
}
