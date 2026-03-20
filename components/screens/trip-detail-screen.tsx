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
    title: "Zhangjiajie Avatar Mountains",
    titleZh: "张家界阿凡达仙境",
    location: "Zhangjiajie, Hunan Province",
    locationZh: "湖南省张家界市",
    image: "/images/trip-mountain.jpg",
    description:
      "Explore the stunning floating mountains that inspired Avatar! Hike the glass skywalks, ride cable cars through mist-covered peaks, and camp under the stars in China's most magical landscape.",
    descriptionZh:
      "探索启发《阿凡达》电影的壮观悬浮山脉！徒步玻璃栈道，乘坐缆车穿越云雾缭绕的山峰，在中国最神奇的风景中露营观星。",
    dates: "Jun 15 - Jun 20",
    datesZh: "6月15日 - 6月20日",
    duration: "5 Days",
    durationZh: "5天",
    groupSize: "6-8 Students",
    groupSizeZh: "6-8名学生",
    pricePerPerson: "¥1,800",
    tags: ["Hiking", "Photography", "Adventure"],
    tagsZh: ["徒步", "摄影", "探险"],
    captain: { name: "Lily Z.", school: "NYU Shanghai", avatar: "L" },
    members: [
      { name: "Kevin C.", school: "Fudan University", avatar: "K", status: "confirmed" },
      { name: "Sophie L.", school: "SJTU", avatar: "S", status: "confirmed" },
      { name: "Emma W.", school: "Tongji University", avatar: "E", status: "confirmed" },
      { name: "Jason H.", school: "NYU Shanghai", avatar: "J", status: "pending" },
    ],
    isUserCaptain: true,
    isUserMember: true,
  },
  "2": {
    title: "Tokyo & Mt. Fuji Explorer",
    titleZh: "东京富士山探索",
    location: "Tokyo & Hakone, Japan",
    locationZh: "日本东京&箱根",
    image: "/images/trip-city.jpg",
    description:
      "Experience the best of Japan! Explore vibrant Tokyo, soak in traditional onsen hot springs in Hakone, and witness the majestic Mt. Fuji at sunrise.",
    descriptionZh:
      "体验日本的精华！探索繁华的东京，在箱根体验传统温泉，在日出时欣赏壮丽的富士山。",
    dates: "Jul 4 - Jul 10",
    datesZh: "7月4日 - 7月10日",
    duration: "6 Days",
    durationZh: "6天",
    groupSize: "5-10 Students",
    groupSizeZh: "5-10名学生",
    pricePerPerson: "¥5,500",
    tags: ["City", "Culture", "Mountain"],
    tagsZh: ["城市", "文化", "山区"],
    captain: { name: "Kevin C.", school: "Fudan University", avatar: "K" },
    members: [
      { name: "Amy L.", school: "NYU Shanghai", avatar: "A", status: "confirmed" },
    ],
    isUserCaptain: false,
    isUserMember: false,
  },
  "3": {
    title: "Bali Beach Retreat",
    titleZh: "巴厘岛海滩度假",
    location: "Bali, Indonesia",
    locationZh: "印度尼西亚巴厘岛",
    image: "/images/trip-beach.jpg",
    description:
      "Escape to paradise! Surf the legendary waves, explore ancient temples, watch stunning sunsets, and experience the vibrant nightlife of Bali.",
    descriptionZh:
      "逃离到天堂！冲浪传奇海浪，探索古老寺庙，观赏迷人日落，体验巴厘岛充满活力的夜生活。",
    dates: "Aug 10 - Aug 16",
    datesZh: "8月10日 - 8月16日",
    duration: "6 Days",
    durationZh: "6天",
    groupSize: "8-12 Students",
    groupSizeZh: "8-12名学生",
    pricePerPerson: "¥4,200",
    tags: ["Beach", "Surfing", "Culture"],
    tagsZh: ["海滩", "冲浪", "文化"],
    captain: { name: "Sophie L.", school: "SJTU", avatar: "S" },
    members: [
      { name: "Mike W.", school: "NYU Shanghai", avatar: "M", status: "confirmed" },
      { name: "Rachel T.", school: "Fudan University", avatar: "R", status: "confirmed" },
      { name: "David K.", school: "Tongji University", avatar: "D", status: "confirmed" },
    ],
    isUserCaptain: false,
    isUserMember: false,
  },
  "4": {
    title: "Hangzhou West Lake & Tea",
    titleZh: "杭州西湖茶文化之旅",
    location: "Hangzhou, Zhejiang Province",
    locationZh: "浙江省杭州市",
    image: "/images/trip-lakeside.jpg",
    description:
      "Discover the poetic beauty of Hangzhou! Bike around West Lake, visit Longjing tea plantations, explore ancient pagodas, and taste authentic Hangzhou cuisine.",
    descriptionZh:
      "发现杭州的诗意之美！环西湖骑行，参观龙井茶园，探索古塔，品尝正宗杭州美食。",
    dates: "Sep 1 - Sep 3",
    datesZh: "9月1日 - 9月3日",
    duration: "3 Days",
    durationZh: "3天",
    groupSize: "4-6 Students",
    groupSizeZh: "4-6名学生",
    pricePerPerson: "¥980",
    tags: ["Culture", "Nature", "Food"],
    tagsZh: ["文化", "自然", "美食"],
    captain: { name: "Emma W.", school: "Tongji University", avatar: "E" },
    members: [
      { name: "Chris Z.", school: "NYU Shanghai", avatar: "C", status: "confirmed" },
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
              <span className="text-[10px] text-accent/80">{trip.dates.split(" ")[0]}</span>
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
                  <p className="text-[10px] text-muted-foreground">
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
                  <p className="text-[10px] text-muted-foreground">
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
                  <p className="text-[10px] text-muted-foreground">
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
                  <p className="text-[10px] text-muted-foreground">
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
                className="text-[10px] bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full"
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
              <span className="text-[10px] bg-accent text-accent-foreground font-semibold px-2 py-1 rounded-full">
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
                  <p className="text-[10px] text-muted-foreground">{member.school}</p>
                </div>
                {member.status === "pending" ? (
                  <span className="text-[10px] bg-accent/10 text-accent font-semibold px-2 py-1 rounded-full">
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
          <div className="bg-card w-full max-w-[393px] rounded-t-3xl p-5 pb-8">
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
