"use client"

import { useState } from "react"
import { ArrowLeft, Send, DollarSign, Users, Image as ImageIcon, MapPin } from "lucide-react"
import NextImage from "next/image"
import { type Language, t } from "@/lib/translations"

const TRIP_CHATS = [
  {
    id: "1",
    tripName: "Zhangjiajie Adventure",
    tripNameZh: "张家界探险",
    tripImage: "/images/trip-mountain.jpg",
    lastMessage: "Lily: Don't forget to pack layers!",
    lastMessageZh: "Lily: 别忘了带保暖衣物！",
    timestamp: "2m ago",
    timestampZh: "2分钟前",
    unread: 3,
    members: 6,
    status: "upcoming" as const,
    dates: "Jun 15 - Jun 20",
    datesZh: "6月15日 - 6月20日",
  },
  {
    id: "2",
    tripName: "Tokyo & Mt. Fuji",
    tripNameZh: "东京富士山",
    tripImage: "/images/trip-city.jpg",
    lastMessage: "Kevin: Anyone need help with visa?",
    lastMessageZh: "Kevin: 有人需要签证帮助吗？",
    timestamp: "1h ago",
    timestampZh: "1小时前",
    unread: 0,
    members: 4,
    status: "upcoming" as const,
    dates: "Jul 4 - Jul 10",
    datesZh: "7月4日 - 7月10日",
  },
  {
    id: "3",
    tripName: "Hangzhou West Lake",
    tripNameZh: "杭州西湖",
    tripImage: "/images/trip-lakeside.jpg",
    lastMessage: "Emma: The tea was amazing!",
    lastMessageZh: "Emma: 茶太好喝了！",
    timestamp: "2d ago",
    timestampZh: "2天前",
    unread: 0,
    members: 10,
    status: "past" as const,
    dates: "Last weekend",
    datesZh: "上周末",
  },
]

const CHAT_MESSAGES = [
  {
    id: "1",
    sender: "Lily Z.",
    avatar: "L",
    message: "Hey everyone! Super excited for Zhangjiajie!",
    messageZh: "大家好！超级期待张家界之旅！",
    timestamp: "10:30 AM",
    isMe: false,
  },
  {
    id: "2",
    sender: "Me",
    senderZh: "我",
    avatar: "A",
    message: "Same here! Has everyone contributed to the fund yet?",
    messageZh: "我也是！大家都交费了吗？",
    timestamp: "10:32 AM",
    isMe: true,
  },
  {
    id: "3",
    sender: "Kevin C.",
    avatar: "K",
    message: "Just sent my share! Check the fund.",
    messageZh: "刚交了我的份额！看看资金。",
    timestamp: "10:35 AM",
    isMe: false,
  },
  {
    id: "4",
    sender: "Lily Z.",
    avatar: "L",
    message: "Don't forget to pack layers! It gets cold on the mountains.",
    messageZh: "别忘了带保暖衣物！山上很冷。",
    timestamp: "10:40 AM",
    isMe: false,
  },
  {
    id: "5",
    sender: "Sophie L.",
    avatar: "S",
    message: "Good tip! Also bringing my camera for the glass skywalks!",
    messageZh: "好建议！我也带相机拍玻璃栈道！",
    timestamp: "10:42 AM",
    isMe: false,
  },
]

interface ChatsScreenProps {
  onOpenFund?: (tripId: string) => void
  language: Language
}

export function ChatsScreen({ onOpenFund, language }: ChatsScreenProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

  const filteredChats = TRIP_CHATS.filter((chat) => chat.status === activeTab)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("")
    }
  }

  // Chat List View
  if (!selectedChat) {
    return (
      <div className="flex flex-col px-5 pt-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-foreground">{t("tripChats", language)}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {language === "en" ? "Coordinate with your travel groups" : "与旅行小组协调沟通"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-secondary rounded-xl p-1 mb-4">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors ${
              activeTab === "upcoming"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            {t("upcomingTrips", language)}
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors ${
              activeTab === "past"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            {t("pastTrips", language)}
          </button>
        </div>

        {/* Chat List */}
        <div className="flex flex-col gap-3">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                {language === "en" 
                  ? `No ${activeTab} trips` 
                  : activeTab === "upcoming" ? "暂无即将进行的旅程" : "暂无历史旅程"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activeTab === "upcoming" 
                  ? (language === "en" ? "Join a trip to start chatting with your group!" : "加入旅程开始与小组聊天！")
                  : (language === "en" ? "Your past trip chats will appear here." : "您的历史旅程聊天将显示在这里。")}
              </p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className="flex gap-3 bg-card rounded-2xl p-3 border border-border/50 shadow-sm text-left"
              >
                <div className="relative w-14 rounded-xl overflow-hidden flex-shrink-0" style={{ height: '56px' }}>
                  <NextImage
                    src={chat.tripImage}
                    alt={language === "en" ? chat.tripName : chat.tripNameZh}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground truncate pr-2">
                      {language === "en" ? chat.tripName : chat.tripNameZh}
                    </h3>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">
                      {language === "en" ? chat.timestamp : chat.timestampZh}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {language === "en" ? chat.dates : chat.datesZh}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-muted-foreground truncate pr-2">
                      {language === "en" ? chat.lastMessage : chat.lastMessageZh}
                    </p>
                    {chat.unread > 0 && (
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="h-6" />
      </div>
    )
  }

  // Individual Chat View
  const currentChat = TRIP_CHATS.find((c) => c.id === selectedChat)

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <button
          onClick={() => setSelectedChat(null)}
          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
          aria-label={t("back", language)}
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="relative w-10 rounded-xl overflow-hidden flex-shrink-0" style={{ height: '40px' }}>
          <NextImage
            src={currentChat?.tripImage || ""}
            alt={language === "en" ? (currentChat?.tripName || "") : (currentChat?.tripNameZh || "")}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-foreground truncate">
            {language === "en" ? currentChat?.tripName : currentChat?.tripNameZh}
          </h2>
          <p className="text-[10px] text-muted-foreground">
            {currentChat?.members} {t("members", language)}
          </p>
        </div>
        <button
          onClick={() => onOpenFund?.(selectedChat)}
          className="flex items-center gap-1 bg-accent/10 text-accent px-3 py-1.5 rounded-full"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">{language === "en" ? "Fund" : "资金"}</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
        <button className="flex items-center gap-1 bg-card text-foreground px-3 py-1.5 rounded-full text-xs font-medium border border-border">
          <MapPin className="w-3 h-3" />
          {t("tripDetails", language)}
        </button>
        <button className="flex items-center gap-1 bg-card text-foreground px-3 py-1.5 rounded-full text-xs font-medium border border-border">
          <Users className="w-3 h-3" />
          {t("members", language)}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {CHAT_MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.isMe ? "flex-row-reverse" : ""}`}
          >
            {!msg.isMe && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">{msg.avatar}</span>
              </div>
            )}
            <div className={`max-w-[75%] ${msg.isMe ? "items-end" : ""}`}>
              {!msg.isMe && (
                <p className="text-[10px] text-muted-foreground mb-0.5 ml-1">{msg.sender}</p>
              )}
              <div
                className={`px-3 py-2 rounded-2xl ${
                  msg.isMe
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-foreground rounded-bl-md"
                }`}
              >
                <p className="text-xs leading-relaxed">
                  {language === "en" ? msg.message : msg.messageZh}
                </p>
              </div>
              <p className={`text-[9px] text-muted-foreground mt-0.5 ${msg.isMe ? "text-right mr-1" : "ml-1"}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="px-4 py-3 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1 bg-secondary rounded-2xl px-4 py-2.5">
            <input
              type="text"
              placeholder={language === "en" ? "Type a message..." : "输入消息..."}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
            aria-label={language === "en" ? "Send message" : "发送消息"}
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
