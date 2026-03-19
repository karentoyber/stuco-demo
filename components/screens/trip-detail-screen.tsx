"use client"

import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Bookmark, Share2, Crown, Settings, UserPlus, UserMinus, MessageCircle, Clock, Sparkles } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { type Language, t } from "@/lib/translations"

const TRIP_DATA: Record<string, {
  title: string
  titleZh: string
  location: string
  locationZh: string
  image: string
  description: string
  descriptionZh: string
  dates: string
  datesZh: string
  duration: string
  durationZh: string
  groupSize: string
  groupSizeZh: string
  pricePerPerson: string
  tags: string[]
  tagsZh: string[]
  captain: { name: string; school: string; avatar: string }
  members: { name: string; school: string; avatar: string; status: "confirmed" | "pending" }[]
  isUserCaptain?: boolean
  isUserMember?: boolean
}> = {
  "1": {
    title: "Yellowstone Adventure",
    titleZh: "黄石公园探险",
    location: "Yellowstone National Park, Wyoming",
    locationZh: "怀俄明州黄石国家公园",
    image: "/images/trip-lakeside.jpg",
    description:
      "Explore Yellowstone and beyond! Get your feet wet and your hands dirty, while you explore the geysers, hot springs, and wildlife of America's first national park.",
    descriptionZh:
      "探索黄石公园及更多！弄湿你的脚，弄脏你的手，同时探索美国第一个国家公园的间歇泉、温泉和野生动物。",
    dates: "Jun 15 - Jun 20",
    datesZh: "6月15日 - 6月20日",
    duration: "5 Days",
    durationZh: "5天",
    groupSize: "6-8 Students",
    groupSizeZh: "6-8名学生",
    pricePerPerson: "$280",
    tags: ["Camping", "Hiking", "Wildlife"],
    tagsZh: ["露营", "徒步", "野生动物"],
    captain: { name: "Sarah K.", school: "Stanford", avatar: "S" },
    members: [
      { name: "Mike R.", school: "UC Berkeley", avatar: "M", status: "confirmed" },
      { name: "Jess T.", school: "San Jose State", avatar: "J", status: "confirmed" },
      { name: "Alex W.", school: "Santa Clara U", avatar: "A", status: "confirmed" },
      { name: "Taylor L.", school: "Stanford", avatar: "T", status: "pending" },
    ],
    isUserCaptain: true,
    isUserMember: true,
  },
  "2": {
    title: "Mountain Ridge Trek",
    titleZh: "山脊徒步",
    location: "Rocky Mountain National Park, Colorado",
    locationZh: "科罗拉多州落基山国家公园",
    image: "/images/trip-mountain.jpg",
    description:
      "Challenge yourself on stunning alpine trails with breathtaking views of the Continental Divide. Perfect for students who love hiking and photography.",
    descriptionZh:
      "在令人惊叹的高山步道上挑战自己，欣赏大陆分水岭的壮丽景色。非常适合喜欢徒步和摄影的学生。",
    dates: "Jul 4 - Jul 8",
    datesZh: "7月4日 - 7月8日",
    duration: "4 Days",
    durationZh: "4天",
    groupSize: "5-10 Students",
    groupSizeZh: "5-10名学生",
    pricePerPerson: "$195",
    tags: ["Hiking", "Photography", "Mountain"],
    tagsZh: ["徒步", "摄影", "山区"],
    captain: { name: "Alex W.", school: "Santa Clara U", avatar: "A" },
    members: [
      { name: "Taylor L.", school: "Stanford", avatar: "T", status: "confirmed" },
    ],
    isUserCaptain: false,
    isUserMember: false,
  },
  "3": {
    title: "Beach Bonfire Weekend",
    titleZh: "海滩篝火周末",
    location: "Santa Cruz, California",
    locationZh: "加州圣克鲁斯",
    image: "/images/trip-beach.jpg",
    description:
      "Sun, sand, and surf await! Spend a laid-back weekend at Santa Cruz with bonfires, surfing lessons, and a boardwalk adventure.",
    descriptionZh:
      "阳光、沙滩和冲浪等着你！在圣克鲁斯度过一个轻松的周末，有篝火、冲浪课程和木板道探险。",
    dates: "Aug 10 - Aug 12",
    datesZh: "8月10日 - 8月12日",
    duration: "2 Days",
    durationZh: "2天",
    groupSize: "8-12 Students",
    groupSizeZh: "8-12名学生",
    pricePerPerson: "$150",
    tags: ["Beach", "Surfing", "Bonfire"],
    tagsZh: ["海滩", "冲浪", "篝火"],
    captain: { name: "Jordan P.", school: "UC Berkeley", avatar: "J" },
    members: [
      { name: "Casey M.", school: "Stanford", avatar: "C", status: "confirmed" },
      { name: "Riley D.", school: "San Jose State", avatar: "R", status: "confirmed" },
      { name: "Morgan S.", school: "Santa Clara U", avatar: "M", status: "confirmed" },
    ],
    isUserCaptain: false,
    isUserMember: false,
  },
  "4": {
    title: "Forest Retreat Camp",
    titleZh: "森林露营",
    location: "Redwood National Park, California",
    locationZh: "加州红杉国家公园",
    image: "/images/trip-forest.jpg",
    description:
      "Disconnect and recharge among the tallest trees on Earth. Hammock camping, stargazing, and peaceful hikes through ancient groves.",
    descriptionZh:
      "在地球上最高的树木中断开连接并充电。吊床露营、观星和穿越古老树林的宁静徒步。",
    dates: "Sep 1 - Sep 4",
    datesZh: "9月1日 - 9月4日",
    duration: "3 Days",
    durationZh: "3天",
    groupSize: "4-6 Students",
    groupSizeZh: "4-6名学生",
    pricePerPerson: "$220",
    tags: ["Camping", "Nature", "Meditation"],
    tagsZh: ["露营", "自然", "冥想"],
    captain: { name: "Emma L.", school: "Stanford", avatar: "E" },
    members: [
      { name: "Noah B.", school: "UC Berkeley", avatar: "N", status: "confirmed" },
    ],
    isUserCaptain: false,
    isUserMember: false,
  },
}

interface TripDetailScreenProps {
  tripId: string | null
  onBack: () => void
  onOpenChat?: () => void
  language: Language
  isTopMatch?: boolean // If true, first come first serve. If false, requires request approval
}

export function TripDetailScreen({ tripId, onBack, onOpenChat, language, isTopMatch = false }: TripDetailScreenProps) {
  const trip = TRIP_DATA[tripId || "1"] || TRIP_DATA["1"]
  const [saved, setSaved] = useState(false)
  const [showManageModal, setShowManageModal] = useState(false)
  const [hasJoined, setHasJoined] = useState(trip.isUserMember)
  const [requestSent, setRequestSent] = useState(false)

  const totalMembers = trip.members.length + 1 // +1 for captain

  return (
    <div className="flex flex-col">
      {/* Hero Image */}
      <div className="relative" style={{ height: '224px' }}>
        <Image
          src={trip.image}
          alt={language === "en" ? trip.title : trip.titleZh}
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 to-transparent" />

        {/* Top Actions */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
            aria-label={t("back", language)}
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
              aria-label={saved ? "Unsave trip" : "Save trip"}
            >
              <Bookmark
                className={`w-4 h-4 ${saved ? "fill-primary text-primary" : "text-foreground"}`}
              />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
              aria-label="Share trip"
            >
              <Share2 className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-4 relative">
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground text-balance">
                {language === "en" ? trip.title : trip.titleZh}
              </h1>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs text-muted-foreground">
                  {language === "en" ? trip.location : trip.locationZh}
                </span>
              </div>
            </div>
            <div className="bg-accent/10 rounded-xl px-3 py-2 text-center">
              <span className="text-lg font-bold text-accent block leading-none">
                {trip.dates.split(" ")[1]}
              </span>
              <span className="text-[11px] text-accent/80">{trip.dates.split(" ")[0]}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h2 className="text-xs font-bold text-foreground mb-1">{t("description", language)}</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {language === "en" ? trip.description : trip.descriptionZh}
            </p>
          </div>

          {/* Details Grid */}
          <div className="mt-4">
            <h2 className="text-xs font-bold text-foreground mb-2">{t("tripDetails", language)}</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">
                    {language === "en" ? "Duration" : "时长"}
                  </p>
                  <p className="text-xs font-semibold text-foreground">
                    {language === "en" ? trip.duration : trip.durationZh}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">
                    {language === "en" ? "Group Size" : "团队规模"}
                  </p>
                  <p className="text-xs font-semibold text-foreground">
                    {language === "en" ? trip.groupSize : trip.groupSizeZh}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">
                    {language === "en" ? "Per Person" : "每人"}
                  </p>
                  <p className="text-xs font-semibold text-foreground">{trip.pricePerPerson}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">
                    {language === "en" ? "Transport" : "交通"}
                  </p>
                  <p className="text-xs font-semibold text-foreground">
                    {language === "en" ? "Carpool" : "拼车"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-4">
            {(language === "en" ? trip.tags : trip.tagsZh).map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="mt-4">
          <h2 className="text-sm font-bold text-foreground mb-2">{t("location", language)}</h2>
          <div className="h-36 rounded-2xl overflow-hidden bg-secondary border border-border/50 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {language === "en" ? trip.location : trip.locationZh}
                </span>
              </div>
            </div>
            {/* Map grid lines for visual effect */}
            <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Trip Captain Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-foreground">{t("captain", language)}</h2>
            {trip.isUserCaptain && (
              <button
                onClick={() => setShowManageModal(true)}
                className="flex items-center gap-1 text-xs text-primary font-semibold"
              >
                <Settings className="w-3 h-3" />
                {t("manageTrip", language)}
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 bg-primary/5 rounded-xl p-3 border border-primary/20">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-base font-bold text-primary">{trip.captain.avatar}</span>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <Crown className="w-3 h-3 text-accent-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{trip.captain.name}</p>
              <p className="text-[11px] text-muted-foreground">{trip.captain.school}</p>
            </div>
            {trip.isUserCaptain && (
              <span className="text-[11px] bg-accent text-accent-foreground font-semibold px-2 py-1 rounded-full">
                {language === "en" ? "You" : "你"}
              </span>
            )}
          </div>
        </div>

        {/* Members */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-foreground">
              {t("travelers", language)} ({totalMembers})
            </h2>
            {trip.isUserCaptain && (
              <button className="flex items-center gap-1 text-xs text-primary font-semibold">
                <UserPlus className="w-3 h-3" />
                {language === "en" ? "Invite" : "邀请"}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {trip.members.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
              >
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{member.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">{member.name}</p>
                  <p className="text-[11px] text-muted-foreground">{member.school}</p>
                </div>
                {member.status === "pending" ? (
                  <span className="text-[11px] bg-accent/10 text-accent font-semibold px-2 py-1 rounded-full">
                    {t("pending", language)}
                  </span>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
                {trip.isUserCaptain && (
                  <button className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center">
                    <UserMinus className="w-3.5 h-3.5 text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-5 mb-6">
          {hasJoined ? (
            <>
              <button
                onClick={onOpenChat}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-4 rounded-2xl"
              >
                <MessageCircle className="w-4 h-4" />
                {t("openChat", language)}
              </button>
            </>
          ) : requestSent ? (
            // Request has been sent, waiting for approval
            <div className="flex flex-col gap-2">
              <div className="flex-1 flex items-center justify-center gap-2 bg-accent/10 text-accent font-bold text-sm py-4 rounded-2xl border-2 border-accent/30">
                <Clock className="w-4 h-4" />
                {t("requestSent", language)}
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {t("waitingForApproval", language)}
              </p>
              <button
                onClick={() => setRequestSent(false)}
                className="text-xs text-destructive font-medium"
              >
                {t("cancelRequest", language)}
              </button>
            </div>
          ) : isTopMatch ? (
            // Top match - first come first serve, direct join
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2 text-accent">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium">{t("firstComeFirstServe", language)}</span>
              </div>
              <button
                onClick={() => setHasJoined(true)}
                className="flex-1 bg-primary text-primary-foreground font-bold text-sm py-4 rounded-2xl"
              >
                {t("joinNow", language)}
              </button>
            </div>
          ) : (
            // Other matches - need to request
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setRequestSent(true)}
                className="flex-1 bg-primary text-primary-foreground font-bold text-sm py-4 rounded-2xl"
              >
                {t("requestToJoin", language)}
              </button>
              <p className="text-xs text-center text-muted-foreground">
                {t("waitingForApproval", language)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Captain Management Modal */}
      {showManageModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-end justify-center z-50">
          <div className="bg-card w-full max-w-[393px] rounded-t-3xl p-5 pb-[calc(32px+env(safe-area-inset-bottom))] max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
            <h2 className="text-lg font-bold text-foreground mb-4">{t("manageTrip", language)}</h2>
            
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 p-3 bg-secondary rounded-xl text-left">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {language === "en" ? "Manage Budget" : "管理预算"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {language === "en" ? "Adjust per-person cost and expenses" : "调整每人费用和支出"}
                  </p>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-3 bg-secondary rounded-xl text-left">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {language === "en" ? "Manage Members" : "管理成员"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {language === "en" ? "Approve, invite, or remove members" : "批准、邀请或移除成员"}
                  </p>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-3 bg-secondary rounded-xl text-left">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {language === "en" ? "Trip Settings" : "旅程设置"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {language === "en" ? "Edit details, dates, and description" : "编辑详情、日期和描述"}
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowManageModal(false)}
              className="w-full mt-4 bg-secondary text-secondary-foreground font-semibold text-sm py-3 rounded-xl"
            >
              {t("close", language)}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
