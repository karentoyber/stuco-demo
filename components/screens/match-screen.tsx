"use client"

import { useState } from "react"
import { 
  MapPin, 
  Sparkles, 
  Mountain, 
  Waves, 
  TreePine, 
  Tent, 
  Camera, 
  Music,
  Utensils,
  Star,
  Check
} from "lucide-react"
import Image from "next/image"
import { type Language, t } from "@/lib/translations"

const getPreferenceQuestions = (language: Language) => [
  {
    id: "tripType",
    question: t("whatTypeOfTrip", language),
    options: [
      { id: "adventure", label: language === "en" ? "Adventure" : "探险", icon: Mountain },
      { id: "beach", label: t("beach", language), icon: Waves },
      { id: "camping", label: t("camping", language), icon: Tent },
      { id: "nature", label: language === "en" ? "Nature" : "自然", icon: TreePine },
    ],
  },
  {
    id: "budget",
    question: t("budgetRange", language),
    options: [
      { id: "budget", label: "$50-150" },
      { id: "mid", label: "$150-300" },
      { id: "premium", label: "$300-500" },
      { id: "flexible", label: language === "en" ? "Flexible" : "灵活" },
    ],
  },
  {
    id: "groupSize",
    question: t("groupSize", language),
    options: [
      { id: "small", label: language === "en" ? "3-5 people" : "3-5人" },
      { id: "medium", label: language === "en" ? "6-10 people" : "6-10人" },
      { id: "large", label: language === "en" ? "10+ people" : "10人以上" },
      { id: "any", label: language === "en" ? "Any size" : "任何规模" },
    ],
  },
  {
    id: "interests",
    question: t("interests", language),
    multiSelect: true,
    options: [
      { id: "hiking", label: t("hiking", language), icon: Mountain },
      { id: "photography", label: t("photography", language), icon: Camera },
      { id: "music", label: language === "en" ? "Music" : "音乐", icon: Music },
      { id: "food", label: t("food", language), icon: Utensils },
      { id: "camping", label: t("camping", language), icon: Tent },
      { id: "swimming", label: language === "en" ? "Swimming" : "游泳", icon: Waves },
    ],
  },
  {
    id: "duration",
    question: t("tripDuration", language),
    options: [
      { id: "weekend", label: language === "en" ? "Weekend (2-3 days)" : "周末 (2-3天)" },
      { id: "short", label: language === "en" ? "Short (4-5 days)" : "短途 (4-5天)" },
      { id: "week", label: language === "en" ? "Full week (6-7 days)" : "一周 (6-7天)" },
      { id: "flexible", label: language === "en" ? "Flexible" : "灵活" },
    ],
  },
]

const MATCHED_TRIPS = [
  {
    id: "1",
    title: "Yellowstone Adventure",
    titleZh: "黄石公园探险",
    location: "Yellowstone National Park, WY",
    locationZh: "怀俄明州黄石国家公园",
    image: "/images/trip-lakeside.jpg",
    dates: "Jun 15 - Jun 20",
    datesZh: "6月15日 - 6月20日",
    spots: 3,
    price: "$280",
    tags: ["Camping", "Hiking"],
    tagsZh: ["露营", "徒步"],
    matchScore: 98,
    captain: { name: "Sarah K.", school: "Stanford", avatar: "S" },
    members: 5,
  },
  {
    id: "2",
    title: "Mountain Ridge Trek",
    titleZh: "山脊徒步",
    location: "Rocky Mountain NP, CO",
    locationZh: "科罗拉多州落基山国家公园",
    image: "/images/trip-mountain.jpg",
    dates: "Jul 4 - Jul 8",
    datesZh: "7月4日 - 7月8日",
    spots: 5,
    price: "$195",
    tags: ["Hiking", "Photography"],
    tagsZh: ["徒步", "摄影"],
    matchScore: 92,
    captain: { name: "Alex W.", school: "Santa Clara U", avatar: "A" },
    members: 3,
  },
  {
    id: "3",
    title: "Beach Bonfire Weekend",
    titleZh: "海滩篝火周末",
    location: "Santa Cruz, CA",
    locationZh: "加州圣克鲁斯",
    image: "/images/trip-beach.jpg",
    dates: "Aug 10 - Aug 12",
    datesZh: "8月10日 - 8月12日",
    spots: 4,
    price: "$150",
    tags: ["Beach", "Surfing"],
    tagsZh: ["海滩", "冲浪"],
    matchScore: 85,
    captain: { name: "Jordan P.", school: "UC Berkeley", avatar: "J" },
    members: 8,
  },
  {
    id: "4",
    title: "Forest Retreat Camp",
    titleZh: "森林露营",
    location: "Redwood National Park, CA",
    locationZh: "加州红杉国家公园",
    image: "/images/trip-forest.jpg",
    dates: "Sep 1 - Sep 4",
    datesZh: "9月1日 - 9月4日",
    spots: 2,
    price: "$220",
    tags: ["Camping", "Nature"],
    tagsZh: ["露营", "自然"],
    matchScore: 78,
    captain: { name: "Emma L.", school: "Stanford", avatar: "E" },
    members: 4,
  },
]

interface MatchScreenProps {
  onTripClick?: (tripId: string, isTopMatch?: boolean) => void
  language: Language
}

export function MatchScreen({ onTripClick, language }: MatchScreenProps) {
  const [surveyComplete, setSurveyComplete] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

  const PREFERENCE_QUESTIONS = getPreferenceQuestions(language)

  const handleAnswer = (questionId: string, optionId: string, multiSelect?: boolean) => {
    if (multiSelect) {
      const currentAnswers = (answers[questionId] as string[]) || []
      if (currentAnswers.includes(optionId)) {
        setAnswers({ ...answers, [questionId]: currentAnswers.filter((a) => a !== optionId) })
      } else {
        setAnswers({ ...answers, [questionId]: [...currentAnswers, optionId] })
      }
    } else {
      setAnswers({ ...answers, [questionId]: optionId })
      // Auto-advance for single select
      if (currentQuestion < PREFERENCE_QUESTIONS.length - 1) {
        setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestion < PREFERENCE_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setSurveyComplete(true)
    }
  }

  const handleRetakeSurvey = () => {
    setSurveyComplete(false)
    setCurrentQuestion(0)
    setAnswers({})
  }

  const question = PREFERENCE_QUESTIONS[currentQuestion]
  const isMultiSelect = question?.multiSelect
  const currentAnswer = answers[question?.id]
  const canProceed = isMultiSelect 
    ? (currentAnswer as string[])?.length > 0 
    : Boolean(currentAnswer)

  // Survey View
  if (!surveyComplete) {
    return (
      <div className="flex flex-col px-5 pt-4 min-h-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">{t("travelPreferences", language)}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("matchWithTrips", language)}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1.5 mb-6">
          {PREFERENCE_QUESTIONS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                idx <= currentQuestion ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-foreground mb-4">{question.question}</h2>
          
          <div className={`grid ${question.options.length > 4 ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
            {question.options.map((option) => {
              const Icon = "icon" in option ? option.icon : null
              const isSelected = isMultiSelect
                ? (currentAnswer as string[])?.includes(option.id)
                : currentAnswer === option.id

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(question.id, option.id, isMultiSelect)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card"
                  }`}
                >
                  {Icon && (
                    <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  )}
                  <span className={`text-xs font-semibold text-center ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {option.label}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6 mb-6">
          {currentQuestion > 0 && (
            <button
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="flex-1 bg-secondary text-secondary-foreground font-semibold text-sm py-3.5 rounded-2xl"
            >
              {t("back", language)}
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex-1 font-semibold text-sm py-3.5 rounded-2xl transition-colors ${
              canProceed
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {currentQuestion === PREFERENCE_QUESTIONS.length - 1 
              ? t("findMyMatches", language) 
              : language === "en" ? "Next" : "下一步"}
          </button>
        </div>
      </div>
    )
  }

  // Results View
  const topMatch = MATCHED_TRIPS[0]
  const otherMatches = MATCHED_TRIPS.slice(1)

  return (
    <div className="flex flex-col px-5 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {language === "en" ? "Your Matches" : "您的匹配"}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {language === "en" ? "Based on your travel preferences" : "根据您的旅行偏好"}
          </p>
        </div>
        <button
          onClick={handleRetakeSurvey}
          className="text-xs text-primary font-semibold"
        >
          {t("retakeSurvey", language)}
        </button>
      </div>

      {/* Top Match Card */}
      <div className="relative mb-5">
        <div className="absolute -top-2 left-4 z-10 flex items-center gap-1 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3" />
          {t("yourTopMatch", language)}
        </div>
        <div className="w-full bg-card rounded-2xl overflow-hidden shadow-lg border-2 border-accent/30">
          <button
            onClick={() => onTripClick?.(topMatch.id, true)}
            className="w-full text-left"
          >
            <div className="relative" style={{ height: '160px' }}>
              <Image
                src={topMatch.image}
                alt={language === "en" ? topMatch.title : topMatch.titleZh}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                loading="eager"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-lg font-bold text-white text-balance">
                  {language === "en" ? topMatch.title : topMatch.titleZh}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-white/80" />
                  <span className="text-xs text-white/80">
                    {language === "en" ? topMatch.location : topMatch.locationZh}
                  </span>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {topMatch.matchScore}% {t("match", language)}
              </div>
            </div>
            <div className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{topMatch.captain.avatar}</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">{t("captain", language)}</p>
                    <p className="text-xs font-semibold text-foreground">{topMatch.captain.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent">{topMatch.price}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {topMatch.spots} {t("spotsAvailable", language)}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5 mt-3">
                {(language === "en" ? topMatch.tags : topMatch.tagsZh).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
          {/* First come first serve - direct join */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-[11px] text-accent font-medium">
                {t("firstComeFirstServe", language)}
              </span>
            </div>
            <button
              onClick={() => onTripClick?.(topMatch.id, true)}
              className="w-full bg-primary text-primary-foreground font-bold text-sm py-3 rounded-xl"
            >
              {t("joinNow", language)}
            </button>
          </div>
        </div>
      </div>

      {/* Other Matches - Require Request */}
      <h2 className="text-sm font-bold text-foreground mb-3">{t("moreMatches", language)}</h2>
      <div className="flex flex-col gap-3">
        {otherMatches.map((trip, index) => (
          <div
            key={trip.id}
            className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50"
          >
            <button
              onClick={() => onTripClick?.(trip.id, false)}
              className="flex gap-3 w-full text-left"
            >
              <div className="relative w-28 flex-shrink-0" style={{ height: '112px' }}>
                <Image
                  src={trip.image}
                  alt={language === "en" ? trip.title : trip.titleZh}
                  fill
                  sizes="112px"
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {trip.matchScore}%
                </div>
              </div>
              <div className="flex flex-col justify-center py-3 pr-3 flex-1">
                <h3 className="text-sm font-bold text-foreground text-balance">
                  {language === "en" ? trip.title : trip.titleZh}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">
                    {language === "en" ? trip.location : trip.locationZh}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-primary">{trip.captain.avatar}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {t("captain", language)}: {trip.captain.name}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-bold text-accent">
                    {trip.price}/{language === "en" ? "person" : "人"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {trip.spots} {t("spots", language)}
                  </span>
                </div>
              </div>
            </button>
            {/* Request to join button */}
            <div className="px-3 pb-3">
              <button
                onClick={() => onTripClick?.(trip.id, false)}
                className="w-full bg-secondary text-secondary-foreground font-semibold text-xs py-2.5 rounded-xl border border-primary/20"
              >
                {t("requestToJoin", language)}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-6" />
    </div>
  )
}
