"use client"

import Link from "next/link"
import { Poppins } from "next/font/google"

import { useState, useEffect } from "react"
import { ArrowRight, Leaf, Recycle, Users, Coins, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

import ContractInteraction from "@/components/ContractInteraction"
import {
  getRecentReports,
  getAllRewards,
  getWasteCollectionTasks,
} from "@/utils/db/actions"

const poppins = Poppins({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  display: "swap",
})

function AnimatedGlobe() {
  return (
    <div className="relative mx-auto mb-8 h-32 w-32">
      <div className="absolute inset-0 animate-pulse rounded-full bg-green-500 opacity-20"></div>
      <div className="absolute inset-2 animate-ping rounded-full bg-green-400 opacity-40"></div>
      <div className="absolute inset-4 animate-spin rounded-full bg-green-300 opacity-60"></div>
      <div className="absolute inset-6 animate-bounce rounded-full bg-green-200 opacity-80"></div>
      <Leaf className="absolute inset-0 m-auto h-16 w-16 animate-pulse text-green-600" />
    </div>
  )
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [impactData, setImpactData] = useState({
    wasteCollected: 0,
    reportsSubmitted: 0,
    tokensEarned: 0,
    co2Offset: 0,
  })

  useEffect(() => {
    async function fetchImpactData() {
      try {
        const reports = await getRecentReports(100)
        const rewards = await getAllRewards()
        const tasks = await getWasteCollectionTasks(100)

        const wasteCollected = tasks.reduce((total, task) => {
          const match = task.amount.match(/(\d+(\.\d+)?)/)
          const amount = match ? parseFloat(match[0]) : 0
          return total + amount
        }, 0)

        const reportsSubmitted = reports.length
        const tokensEarned = rewards.reduce(
          (total, reward) => total + (reward.points || 0),
          0
        )
        const co2Offset = wasteCollected * 0.5

        setImpactData({
          wasteCollected: Math.round(wasteCollected * 10) / 10,
          reportsSubmitted,
          tokensEarned,
          co2Offset: Math.round(co2Offset * 10) / 10,
        })
      } catch (error) {
        console.error("Error fetching impact data:", error)

        setImpactData({
          wasteCollected: 0,
          reportsSubmitted: 0,
          tokensEarned: 0,
          co2Offset: 0,
        })
      }
    }

    fetchImpactData()
  }, [])

  const login = () => {
    setLoggedIn(true)
  }

  return (
    <div className={`container mx-auto px-4 py-16 ${poppins.className}`}>
      <section className="mb-20 text-center">
        <AnimatedGlobe />
        <h1 className="mb-6 text-6xl font-bold tracking-tight text-gray-800">
          Zero-to-Hero <span className="text-green-600">Waste Management</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-600">
          Join our community in making waste management more efficient and
          rewarding!
        </p>
        {!loggedIn ? (
          <Button
            onClick={login}
            className="transform rounded-full bg-green-600 px-10 py-6 text-lg font-medium text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-green-700"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Link href="/report">
            <Button className="transform rounded-full bg-green-600 px-10 py-6 text-lg font-medium text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-green-700">
              Report Waste
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        )}
      </section>

      <section className="mb-20 grid gap-10 md:grid-cols-3">
        <FeatureCard
          icon={Leaf}
          title="Eco-Friendly"
          description="Contribute to a cleaner environment by reporting and collecting waste."
        />
        <FeatureCard
          icon={Coins}
          title="Earn Rewards"
          description="Get tokens for your contributions to waste management efforts."
        />
        <FeatureCard
          icon={Users}
          title="Community-Driven"
          description="Be part of a growing community committed to sustainable practices."
        />
      </section>

      <section className="mb-20 rounded-3xl bg-white p-10 shadow-lg">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
          Our Impact
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          <ImpactCard
            title="Waste Collected"
            value={`${impactData.wasteCollected} kg`}
            icon={Recycle}
          />
          <ImpactCard
            title="Reports Submitted"
            value={impactData.reportsSubmitted.toString()}
            icon={MapPin}
          />
          <ImpactCard
            title="Tokens Earned"
            value={impactData.tokensEarned.toString()}
            icon={Coins}
          />
          <ImpactCard
            title="CO2 Offset"
            value={`${impactData.co2Offset} kg`}
            icon={Leaf}
          />
        </div>
      </section>
    </div>
  )
}

function ImpactCard({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: string | number
  icon: React.ElementType
}) {
  const formattedValue =
    typeof value === "number"
      ? value.toLocaleString("en-US", { maximumFractionDigits: 1 })
      : value

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 ease-in-out hover:shadow-md">
      <Icon className="mb-4 h-10 w-10 text-green-500" />
      <p className="mb-2 text-3xl font-bold text-gray-800">{formattedValue}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="mb-6 rounded-full bg-green-100 p-4">
        <Icon className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="mb-4 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  )
}
