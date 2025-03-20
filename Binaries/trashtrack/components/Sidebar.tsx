import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Trash, Coins, Medal, Settings, Home } from "lucide-react"

const sidebarItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/report", icon: MapPin, label: "Report Waste" },
  { href: "/collect", icon: Trash, label: "Collect Waste" },
  { href: "/rewards", icon: Coins, label: "Rewards" },
  { href: "/leaderboard", icon: Medal, label: "Leaderboard" },
]

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-gray-200 bg-white pt-20 text-gray-800 transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <nav className="flex h-full flex-col justify-between">
        <div className="space-y-8 px-4 py-6">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={`w-full justify-start py-3 ${
                  pathname === item.href
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="text-base">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
        <div className="border-t border-gray-200 p-4">
          <Link href="/settings" passHref>
            <Button
              variant={pathname === "/settings" ? "secondary" : "outline"}
              className={`w-full py-3 ${
                pathname === "/settings"
                  ? "bg-green-100 text-green-800"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              <span className="text-base">Settings</span>
            </Button>
          </Link>
        </div>
      </nav>
    </aside>
  )
}
