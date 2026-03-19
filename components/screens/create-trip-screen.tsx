"use client"

import { ArrowLeft, MapPin, Calendar, ImageIcon, Tent, Mountain, Waves, Building } from "lucide-react"
import { useState } from "react"
import { type Language, t } from "@/lib/translations"

interface CreateTripScreenProps {
  onBack: () => void
  language: Language
}

export function CreateTripScreen({ onBack, language }: CreateTripScreenProps) {
  const [tripName, setTripName] = useState("")
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [budget, setBudget] = useState("")
  const [maxMembers, setMaxMembers] = useState("6")
  const [description, setDescription] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const DESTINATION_OPTIONS = [
    { id: "park", label: language === "en" ? "National Park" : "国家公园", icon: Tent },
    { id: "beach", label: t("beach", language), icon: Waves },
    { id: "mountain", label: t("mountain", language), icon: Mountain },
    { id: "city", label: t("city", language), icon: Building },
  ]

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
          aria-label={t("back", language)}
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{t("createTrip", language)}</h1>
      </div>

      <div className="px-5 flex flex-col gap-4">
        {/* Trip Image */}
        <button className="w-full h-36 rounded-2xl bg-secondary border-2 border-dashed border-border flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {language === "en" ? "Add cover photo" : "添加封面照片"}
          </span>
        </button>

        {/* Trip Type */}
        <div>
          <label className="text-xs font-bold text-foreground mb-2 block">
            {t("tripType", language)}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {DESTINATION_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedType(opt.id)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-center transition-colors ${
                  selectedType === opt.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <opt.icon className="w-4 h-4" />
                <span className="text-[11px] font-semibold">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trip Name */}
        <div>
          <label htmlFor="trip-name" className="text-xs font-bold text-foreground mb-1.5 block">
            {t("tripName", language)}
          </label>
          <input
            id="trip-name"
            type="text"
            placeholder={language === "en" ? "e.g. Summer Camping Trip" : "例如：夏季露营之旅"}
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="destination" className="text-xs font-bold text-foreground mb-1.5 block">
            {t("destination", language)}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="destination"
              type="text"
              placeholder={language === "en" ? "Search destination..." : "搜索目的地..."}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-secondary rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="start-date" className="text-xs font-bold text-foreground mb-1.5 block">
              {t("startDate", language)}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-secondary rounded-xl pl-9 pr-3 py-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label htmlFor="end-date" className="text-xs font-bold text-foreground mb-1.5 block">
              {t("endDate", language)}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-secondary rounded-xl pl-9 pr-3 py-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Budget & Members */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="budget" className="text-xs font-bold text-foreground mb-1.5 block">
              {t("budgetPerPerson", language)}
            </label>
            <input
              id="budget"
              type="text"
              placeholder="$0"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="max-members" className="text-xs font-bold text-foreground mb-1.5 block">
              {t("maxGroupSize", language)}
            </label>
            <input
              id="max-members"
              type="number"
              min="2"
              max="20"
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="text-xs font-bold text-foreground mb-1.5 block">
            {t("description", language)}
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder={language === "en" ? "Tell others what this trip is about..." : "告诉其他人这次旅行的内容..."}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Create Button */}
        <button className="w-full bg-primary text-primary-foreground font-bold text-sm py-4 rounded-2xl mb-6">
          {t("createAndShare", language)}
        </button>
      </div>
    </div>
  )
}
