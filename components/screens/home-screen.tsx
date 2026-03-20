"use client"

import { Search, MapPin, Bell, Compass, TrendingUp, Calendar, Users, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { type Language, t } from "@/lib/translations"

const NEARBY_SCHOOLS = [
  { name: "NYU Shanghai", nameZh: "上纽", distance: "0 km", trips: 24 },
  { name: "Fudan", nameZh: "复旦", distance: "8 km", trips: 18 },
  { name: "SJTU", nameZh: "交大", distance: "12 km", trips: 15 },
  { name: "Tongji", nameZh: "同济", distance: "6 km", trips: 12 },
  { name: "DKU", nameZh: "昆杜", distance: "50 km", trips: 8 },
]

const UPCOMING_TRIPS = [
  {
    id: "1",
    title: "Zhangjiajie National Park",
    titleZh: "张家界国家森林公园",
    image: "/images/trip-mountain.jpg",
    dates: "Jun 15-20",
    datesZh: "6月15-20日",
    daysUntil: 12,
    members: 6,
  },
]

const TRENDING_DESTINATIONS = [
  { name: "Hangzhou", nameZh: "杭州", trips: 32, image: "/images/trip-lakeside.jpg" },
  { name: "Tokyo", nameZh: "东京", trips: 28, image: "/images/trip-city.jpg" },
  { name: "Bali", nameZh: "巴厘岛", trips: 24, image: "/images/trip-beach.jpg" },
  { name: "Guilin", nameZh: "桂林", trips: 18, image: "/images/trip-mountain.jpg" },
]

interface HomeScreenProps {
  onTripClick: (tripId: string) => void
  onNavigateToMatch?: () => void
  userName?: string
  language: Language
}

export function HomeScreen({ onTripClick, onNavigateToMatch, userName, language }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ height: '192px' }}>
        <Image
          src="/images/hero-landscape.jpg"
          alt="Beautiful nature landscape with mountains and trees"
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
        <div className="absolute top-4 right-4">
          <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-foreground" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full" />
          </button>
        </div>
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-sm text-foreground/70">{t("goodMorning", language)}</p>
          <h1 className="text-2xl font-bold text-foreground">{t("hello", language)} {userName || t("explorer", language)}</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 -mt-1">
        <div className="flex items-center gap-2 bg-secondary rounded-2xl px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchDestinations", language)}
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onNavigateToMatch}
            className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-2xl p-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">{t("findTrips", language)}</p>
              <p className="text-[11px] text-muted-foreground">
                {language === "en" ? "Match to your vibe" : "匹配你的风格"}
              </p>
            </div>
          </button>
          <button className="flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-2xl p-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">{t("trending", language)}</p>
              <p className="text-[11px] text-muted-foreground">
                {language === "en" ? "Popular now" : "热门推荐"}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Your Upcoming Trip */}
      {UPCOMING_TRIPS.length > 0 && (
        <div className="px-5 mt-5">
          <h2 className="text-sm font-bold text-foreground mb-3">{t("yourTrips", language)}</h2>
          {UPCOMING_TRIPS.map((trip) => (
            <button
              key={trip.id}
              onClick={() => onTripClick(trip.id)}
              className="w-full flex gap-3 bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 text-left"
            >
              <div className="relative w-24 flex-shrink-0" style={{ height: '96px' }}>
                <Image
                  src={trip.image}
                  alt={language === "en" ? trip.title : trip.titleZh}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center py-3 pr-3 flex-1">
                <h3 className="text-sm font-bold text-foreground">
                  {language === "en" ? trip.title : trip.titleZh}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground">
                      {language === "en" ? trip.dates : trip.datesZh}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground">{trip.members}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {language === "en" ? `${trip.daysUntil} days away` : `还有${trip.daysUntil}天`}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Nearby Schools */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">{t("nearbySchools", language)}</h2>
          <button className="flex items-center gap-1 text-xs text-primary font-semibold">
            <MapPin className="w-3 h-3" />
            <span>{language === "en" ? "Turn on location" : "开启定位"}</span>
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {NEARBY_SCHOOLS.map((school) => (
            <button
              key={school.name}
              className="flex-shrink-0 flex flex-col items-center gap-1 bg-secondary rounded-2xl px-4 py-3 min-w-[90px]"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {school.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                {language === "en" ? school.name : school.nameZh}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {school.trips} {t("trips", language).toLowerCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Destinations */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">{t("trendingDestinations", language)}</h2>
          <button className="flex items-center text-xs text-primary font-semibold">
            {t("viewAll", language)} <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {TRENDING_DESTINATIONS.map((dest, index) => (
            <button
              key={dest.name}
              className="flex-shrink-0 relative w-32 rounded-2xl overflow-hidden"
              style={{ height: '160px' }}
            >
              <Image
                src={dest.image}
                alt={language === "en" ? dest.name : dest.nameZh}
                fill
                sizes="128px"
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-bold text-white">
                  {language === "en" ? dest.name : dest.nameZh}
                </p>
                <p className="text-[10px] text-white/80">
                  {dest.trips} {language === "en" ? "active trips" : "个活跃旅程"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-6" />
    </div>
  )
}
