// @ts-nocheck
"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Menu,
  Coins,
  Leaf,
  Search,
  Bell,
  User,
  ChevronDown,
  LogIn,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Web3Auth } from "@web3auth/modal"
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {
  createUser,
  getUnreadNotifications,
  markNotificationAsRead,
  getUserByEmail,
  getUserBalance,
} from "@/utils/db/actions"

const clientId = process.env.WEB3_AUTH_CLIENT_ID

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
})

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  privateKeyProvider,
})

interface HeaderProps {
  onMenuClick: () => void
  totalEarnings: number
}

export default function Header({ onMenuClick, totalEarnings }: HeaderProps) {
  const [provider, setProvider] = useState<IProvider | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<any>(null)
  const pathname = usePathname()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [balance, setBalance] = useState(0)

  console.log("user info", userInfo)

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal()
        setProvider(web3auth.provider)

        if (web3auth.connected) {
          setLoggedIn(true)
          const user = await web3auth.getUserInfo()
          setUserInfo(user)
          if (user.email) {
            localStorage.setItem("userEmail", user.email)
            try {
              await createUser(user.email, user.name || "Anonymous User")
            } catch (error) {
              console.error("Error creating user:", error)
            }
          }
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userInfo && userInfo.email) {
        const user = await getUserByEmail(userInfo.email)
        if (user) {
          const unreadNotifications = await getUnreadNotifications(user.id)
          setNotifications(unreadNotifications)
        }
      }
    }

    fetchNotifications()

    const notificationInterval = setInterval(fetchNotifications, 30000)

    return () => clearInterval(notificationInterval)
  }, [userInfo])

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (userInfo && userInfo.email) {
        const user = await getUserByEmail(userInfo.email)
        if (user) {
          const userBalance = await getUserBalance(user.id)
          setBalance(userBalance)
        }
      }
    }

    fetchUserBalance()

    const handleBalanceUpdate = (event: CustomEvent) => {
      setBalance(event.detail)
    }

    window.addEventListener(
      "balanceUpdated",
      handleBalanceUpdate as EventListener
    )

    return () => {
      window.removeEventListener(
        "balanceUpdated",
        handleBalanceUpdate as EventListener
      )
    }
  }, [userInfo])

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet")
      return
    }
    try {
      const web3authProvider = await web3auth.connect()
      setProvider(web3authProvider)
      setLoggedIn(true)
      const user = await web3auth.getUserInfo()
      setUserInfo(user)
      if (user.email) {
        localStorage.setItem("userEmail", user.email)
        try {
          await createUser(user.email, user.name || "Anonymous User")
        } catch (error) {
          console.error("Error creating user:", error)
        }
      }
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet")
      return
    }
    try {
      await web3auth.logout()
      setProvider(null)
      setLoggedIn(false)
      setUserInfo(null)
      localStorage.removeItem("userEmail")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  const getUserInfo = async () => {
    if (web3auth.connected) {
      const user = await web3auth.getUserInfo()
      setUserInfo(user)
      if (user.email) {
        localStorage.setItem("userEmail", user.email)
        try {
          await createUser(user.email, user.name || "Anonymous User")
        } catch (error) {
          console.error("Error creating user:", error)
        }
      }
    }
  }

  const handleNotificationClick = async (notificationId: number) => {
    await markNotificationAsRead(notificationId)
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    )
  }

  if (loading) {
    return <div>Loading Web3Auth...</div>
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:mr-4"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center">
            <Leaf className="mr-1 h-6 w-6 text-green-500 md:mr-2 md:h-8 md:w-8" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-800 md:text-lg">
                TrashTrack
              </span>
              <span className="-mt-1 text-[8px] text-gray-500 md:text-[10px]">
                SmartWaste
              </span>
            </div>
          </Link>
        </div>
        {!isMobile && (
          <div className="mx-4 max-w-xl flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>
        )}
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2">
              <Search className="h-5 w-5" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative mr-2">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 min-w-[1.2rem] px-1">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{notification.type}</span>
                      <span className="text-sm text-gray-500">
                        {notification.message}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="mr-2 flex items-center rounded-full bg-gray-100 px-2 py-1 md:mr-4 md:px-3">
            <Coins className="mr-1 h-4 w-4 text-green-500 md:h-5 md:w-5" />
            <span className="text-sm font-semibold text-gray-800 md:text-base">
              {balance.toFixed(2)}
            </span>
          </div>
          {!loggedIn ? (
            <Button
              onClick={login}
              className="bg-green-600 text-sm text-white hover:bg-green-700 md:text-base"
            >
              Login
              <LogIn className="ml-1 h-4 w-4 md:ml-2 md:h-5 md:w-5" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center"
                >
                  <User className="mr-1 h-5 w-5" />
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={getUserInfo}>
                  {userInfo ? userInfo.name : "Fetch User Info"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
