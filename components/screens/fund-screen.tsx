"use client"

import { useState } from "react"
import {
  DollarSign,
  QrCode,
  Users,
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  ArrowLeft,
} from "lucide-react"
import { type Language, t } from "@/lib/translations"

const FUND_DATA = {
  tripName: "Zhangjiajie Adventure",
  tripNameZh: "张家界探险",
  totalBudget: 14400,
  collected: 10800,
  members: [
    { name: "Alex C.", paid: 1800, total: 1800, status: "paid" as const, avatar: "A" },
    { name: "Lily Z.", paid: 1800, total: 1800, status: "paid" as const, avatar: "L" },
    { name: "Kevin C.", paid: 1800, total: 1800, status: "paid" as const, avatar: "K" },
    { name: "Sophie L.", paid: 900, total: 1800, status: "partial" as const, avatar: "S" },
    { name: "Emma W.", paid: 1800, total: 1800, status: "paid" as const, avatar: "E" },
    { name: "Jason H.", paid: 1800, total: 1800, status: "paid" as const, avatar: "J" },
    { name: "Mike W.", paid: 0, total: 1800, status: "pending" as const, avatar: "M" },
    { name: "Rachel T.", paid: 900, total: 1800, status: "partial" as const, avatar: "R" },
  ],
  expenses: [
    {
      id: 1,
      title: "Hotel Reservation",
      titleZh: "酒店预订",
      amount: 4800,
      paidBy: "Lily Z.",
      date: "Jun 5",
      dateZh: "6月5日",
      type: "expense" as const,
    },
    {
      id: 2,
      title: "Train Tickets (Shanghai-Zhangjiajie)",
      titleZh: "火车票（上海-张家界）",
      amount: 2400,
      paidBy: "Kevin C.",
      date: "Jun 8",
      dateZh: "6月8日",
      type: "expense" as const,
    },
    {
      id: 3,
      title: "Lily Z. - Contribution",
      titleZh: "Lily Z. - 缴费",
      amount: 1800,
      paidBy: "Lily Z.",
      date: "Jun 10",
      dateZh: "6月10日",
      type: "income" as const,
    },
    {
      id: 4,
      title: "Kevin C. - Contribution",
      titleZh: "Kevin C. - 缴费",
      amount: 1800,
      paidBy: "Kevin C.",
      date: "Jun 10",
      dateZh: "6月10日",
      type: "income" as const,
    },
    {
      id: 5,
      title: "Park Entry Tickets",
      titleZh: "景区门票",
      amount: 1600,
      paidBy: "Alex C.",
      date: "Jun 12",
      dateZh: "6月12日",
      type: "expense" as const,
    },
  ],
}

interface FundScreenProps {
  onBack?: () => void
  language: Language
}

export function FundScreen({ onBack, language }: FundScreenProps) {
  const [showQR, setShowQR] = useState(false)
  const [expandedMembers, setExpandedMembers] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "expenses">("overview")

  const progress = (FUND_DATA.collected / FUND_DATA.totalBudget) * 100

  return (
    <div className="flex flex-col px-5 pt-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {onBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
            aria-label={t("back", language)}
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
        )}
        <div>
          <h1 className="text-xl font-bold text-foreground">{t("groupFund", language)}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {language === "en" ? FUND_DATA.tripName : FUND_DATA.tripNameZh}
          </p>
        </div>
      </div>

      {/* Fund Overview Card */}
      <div className="bg-primary rounded-2xl p-5 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80">{t("totalCollected", language)}</p>
            <p className="text-3xl font-bold mt-0.5">¥{FUND_DATA.collected.toLocaleString()}</p>
          </div>
          <button
            onClick={() => setShowQR(!showQR)}
            className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center"
            aria-label={t("payWithQR", language)}
          >
            <QrCode className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs opacity-80 mb-1.5">
            <span>
              ¥{FUND_DATA.collected.toLocaleString()} / ¥{FUND_DATA.totalBudget.toLocaleString()}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-foreground rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 opacity-80" />
            <span className="text-xs opacity-80">
              {FUND_DATA.members.length} {t("members", language)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 opacity-80" />
            <span className="text-xs opacity-80">
              ¥1,800/{language === "en" ? "person" : "人"}
            </span>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      {showQR && (
        <div className="bg-card rounded-2xl p-5 mt-4 border border-border/50 shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-bold text-foreground mb-3">
            {language === "en" ? "Scan to Pay" : "扫码支付"}
          </h3>
          {/* QR Code Visualization */}
          <div className="w-48 h-48 bg-foreground rounded-xl flex items-center justify-center relative p-4">
            <div className="w-full h-full bg-card rounded-md relative overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="QR Code for payment">
                {/* QR code visual pattern */}
                <rect x="5" y="5" width="25" height="25" fill="#0c4a5e" rx="3" />
                <rect x="8" y="8" width="19" height="19" fill="white" rx="2" />
                <rect x="11" y="11" width="13" height="13" fill="#0c4a5e" rx="1" />

                <rect x="70" y="5" width="25" height="25" fill="#0c4a5e" rx="3" />
                <rect x="73" y="8" width="19" height="19" fill="white" rx="2" />
                <rect x="76" y="11" width="13" height="13" fill="#0c4a5e" rx="1" />

                <rect x="5" y="70" width="25" height="25" fill="#0c4a5e" rx="3" />
                <rect x="8" y="73" width="19" height="19" fill="white" rx="2" />
                <rect x="11" y="76" width="13" height="13" fill="#0c4a5e" rx="1" />

                {/* Data pattern */}
                {[
                  [35, 5], [40, 5], [50, 5], [55, 5], [60, 5],
                  [35, 10], [45, 10], [55, 10], [65, 10],
                  [35, 15], [40, 15], [50, 15], [60, 15],
                  [35, 20], [45, 20], [55, 20],
                  [35, 25], [40, 25], [50, 25], [60, 25], [65, 25],
                  [5, 35], [10, 35], [15, 35], [25, 35], [35, 35],
                  [45, 35], [55, 35], [65, 35], [75, 35], [85, 35], [90, 35],
                  [5, 40], [15, 40], [25, 40], [40, 40], [50, 40],
                  [60, 40], [70, 40], [80, 40], [90, 40],
                  [5, 45], [10, 45], [20, 45], [30, 45], [40, 45],
                  [55, 45], [65, 45], [75, 45], [85, 45],
                  [5, 50], [15, 50], [25, 50], [35, 50], [45, 50],
                  [55, 50], [65, 50], [80, 50], [90, 50],
                  [5, 55], [10, 55], [20, 55], [30, 55], [40, 55],
                  [55, 55], [70, 55], [80, 55],
                  [5, 60], [15, 60], [25, 60], [35, 60], [50, 60],
                  [60, 60], [70, 60], [85, 60], [90, 60],
                  [5, 65], [10, 65], [20, 65], [30, 65], [45, 65],
                  [55, 65], [65, 65], [75, 65], [90, 65],
                  [35, 70], [45, 70], [55, 70], [65, 70], [80, 70], [90, 70],
                  [35, 75], [40, 75], [50, 75], [60, 75], [70, 75], [85, 75],
                  [35, 80], [45, 80], [55, 80], [65, 80], [75, 80], [90, 80],
                  [35, 85], [40, 85], [50, 85], [60, 85], [80, 85],
                  [35, 90], [45, 90], [55, 90], [70, 90], [85, 90], [90, 90],
                ].map(([x, y], i) => (
                  <rect key={i} x={x} y={y} width="4" height="4" fill="#0c4a5e" />
                ))}

                {/* Center logo */}
                <rect x="40" y="40" width="20" height="20" fill="white" rx="4" />
                <rect x="43" y="43" width="14" height="14" fill="#0891b2" rx="2" />
                <text x="50" y="53" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                  S
                </text>
              </svg>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            {t("scanToPay", language)}
          </p>
          <div className="flex gap-2 mt-3 w-full">
            <button className="flex-1 bg-primary text-primary-foreground text-xs font-semibold py-2.5 rounded-xl">
              {language === "en" ? "Share Code" : "分享二维码"}
            </button>
            <button className="flex-1 bg-secondary text-secondary-foreground text-xs font-semibold py-2.5 rounded-xl">
              {language === "en" ? "Copy Link" : "复制链接"}
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-secondary rounded-xl p-1 mt-4">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors ${
            activeTab === "overview"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          {t("members", language)}
        </button>
        <button
          onClick={() => setActiveTab("expenses")}
          className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors ${
            activeTab === "expenses"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          {language === "en" ? "Expenses" : "支出"}
        </button>
      </div>

      {/* Members Tab */}
      {activeTab === "overview" && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-foreground">
              {t("memberContributions", language)}
            </h2>
            <button
              onClick={() => setExpandedMembers(!expandedMembers)}
              className="text-muted-foreground"
              aria-label={expandedMembers ? "Collapse" : "Expand"}
            >
              {expandedMembers ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {expandedMembers && (
            <div className="flex flex-col gap-2">
              {FUND_DATA.members.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {member.avatar.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">{member.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            member.status === "paid"
                              ? "bg-primary"
                              : member.status === "partial"
                              ? "bg-accent"
                              : "bg-muted"
                          }`}
                          style={{
                            width: `${(member.paid / member.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground min-w-[80px] text-right">
                        ¥{member.paid.toLocaleString()}/¥{member.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    {member.status === "paid" && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    {member.status === "partial" && (
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                        <Clock className="w-3 h-3 text-accent" />
                      </div>
                    )}
                    {member.status === "pending" && (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Expenses Tab */}
      {activeTab === "expenses" && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-foreground">
              {t("recentTransactions", language)}
            </h2>
            <button 
              className="w-7 h-7 rounded-full bg-primary flex items-center justify-center" 
              aria-label={t("addExpense", language)}
            >
              <Plus className="w-3.5 h-3.5 text-primary-foreground" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {FUND_DATA.expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    expense.type === "expense" ? "bg-accent/10" : "bg-primary/10"
                  }`}
                >
                  {expense.type === "expense" ? (
                    <ArrowUpRight className="w-4 h-4 text-accent" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">
                    {language === "en" ? expense.title : expense.titleZh}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {expense.paidBy} &middot; {language === "en" ? expense.date : expense.dateZh}
                  </p>
                </div>
                <span
                  className={`text-sm font-bold ${
                    expense.type === "expense" ? "text-accent" : "text-primary"
                  }`}
                >
                  {expense.type === "expense" ? "-" : "+"}¥{expense.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pay Button */}
      <button className="w-full mt-5 mb-6 bg-accent text-accent-foreground font-bold text-sm py-4 rounded-2xl">
        {language === "en" ? "Contribute to Fund" : "贡献资金"}
      </button>
    </div>
  )
}
