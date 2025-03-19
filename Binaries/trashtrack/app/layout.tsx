"use client"

import "./globals.css"

import "leaflet/dist/leaflet.css"
import { Toaster } from "react-hot-toast"
import { getAvailableRewards, getUserByEmail } from "@/utils/db/actions"
import { Inter } from "next/font/google"
import { useState, useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [totalEarnings, setTotalEarnings] = useState(0)

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail")
        if (userEmail) {
          const user = await getUserByEmail(userEmail)
          console.log("user from layout", user)

          if (user) {
            const availableRewards = (await getAvailableRewards(user.id)) as any
            console.log("availableRewards from layout", availableRewards)
            setTotalEarnings(availableRewards)
          }
        }
      } catch (error) {
        console.error("Error fetching total earnings:", error)
      }
    }

    fetchTotalEarnings()
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col bg-gray-50">
          <div className="flex flex-1">
            <main className="ml-0 flex-1 p-4 transition-all duration-300 lg:ml-64 lg:p-8">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
