"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

type UserSettings = {
  name: string
  email: string
  phone: string
  address: string
  notifications: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Eco Street, Green City, 12345",
    notifications: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated settings:", settings)
    alert("Settings updated successfully!")
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">
        Account Settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={settings.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-green-500 focus:ring-green-500"
            />
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={settings.email}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-green-500 focus:ring-green-500"
            />
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={settings.phone}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-green-500 focus:ring-green-500"
            />
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <div className="relative">
            <input
              type="text"
              id="address"
              name="address"
              value={settings.address}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-green-500 focus:ring-green-500"
            />
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={settings.notifications}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label
            htmlFor="notifications"
            className="ml-2 block text-sm text-gray-700"
          >
            Receive email notifications
          </label>
        </div>

        <Button
          type="submit"
          className="w-full bg-green-500 text-white hover:bg-green-600"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </form>
    </div>
  )
}
