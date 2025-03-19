"use client"

import { useState, useEffect } from "react"
import {
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Gift,
  AlertCircle,
  Loader,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getUserByEmail,
  getRewardTransactions,
  getAvailableRewards,
  redeemReward,
  createTransaction,
} from "@/utils/db/actions"
import { toast } from "react-hot-toast"

type Transaction = {
  id: number
  type: "earned_report" | "earned_collect" | "redeemed"
  amount: number
  description: string
  date: string
}

type Reward = {
  id: number
  name: string
  cost: number
  description: string | null
  collectionInfo: string
}

export default function RewardsPage() {
  const [user, setUser] = useState<{
    id: number
    email: string
    name: string
  } | null>(null)
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserDataAndRewards = async () => {
      setLoading(true)
      try {
        const userEmail = localStorage.getItem("userEmail")
        if (userEmail) {
          const fetchedUser = await getUserByEmail(userEmail)
          if (fetchedUser) {
            setUser(fetchedUser)
            const fetchedTransactions = await getRewardTransactions(
              fetchedUser.id
            )
            setTransactions(fetchedTransactions as Transaction[])
            const fetchedRewards = await getAvailableRewards(fetchedUser.id)
            setRewards(fetchedRewards.filter((r) => r.cost > 0))
            const calculatedBalance = fetchedTransactions.reduce(
              (acc, transaction) => {
                return transaction.type.startsWith("earned")
                  ? acc + transaction.amount
                  : acc - transaction.amount
              },
              0
            )
            setBalance(Math.max(calculatedBalance, 0))
          } else {
            toast.error("User not found. Please log in again.")
          }
        } else {
          toast.error("User not logged in. Please log in.")
        }
      } catch (error) {
        console.error("Error fetching user data and rewards:", error)
        toast.error("Failed to load rewards data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserDataAndRewards()
  }, [])

  const handleRedeemReward = async (rewardId: number) => {
    if (!user) {
      toast.error("Please log in to redeem rewards.")
      return
    }

    const reward = rewards.find((r) => r.id === rewardId)
    if (reward && balance >= reward.cost && reward.cost > 0) {
      try {
        if (balance < reward.cost) {
          toast.error("Insufficient balance to redeem this reward")
          return
        }

        await redeemReward(user.id, rewardId)

        await createTransaction(
          user.id,
          "redeemed",
          reward.cost,
          `Redeemed ${reward.name}`
        )

        await refreshUserData()

        toast.success(`You have successfully redeemed: ${reward.name}`)
      } catch (error) {
        console.error("Error redeeming reward:", error)
        toast.error("Failed to redeem reward. Please try again.")
      }
    } else {
      toast.error("Insufficient balance or invalid reward cost")
    }
  }

  const handleRedeemAllPoints = async () => {
    if (!user) {
      toast.error("Please log in to redeem points.")
      return
    }

    if (balance > 0) {
      try {
        await redeemReward(user.id, 0)

        await createTransaction(
          user.id,
          "redeemed",
          balance,
          "Redeemed all points"
        )

        await refreshUserData()

        toast.success(`You have successfully redeemed all your points!`)
      } catch (error) {
        console.error("Error redeeming all points:", error)
        toast.error("Failed to redeem all points. Please try again.")
      }
    } else {
      toast.error("No points available to redeem")
    }
  }

  const refreshUserData = async () => {
    if (user) {
      const fetchedUser = await getUserByEmail(user.email)
      if (fetchedUser) {
        const fetchedTransactions = await getRewardTransactions(fetchedUser.id)
        setTransactions(fetchedTransactions as Transaction[])
        const fetchedRewards = await getAvailableRewards(fetchedUser.id)
        setRewards(fetchedRewards.filter((r) => r.cost > 0))

        const calculatedBalance = fetchedTransactions.reduce(
          (acc, transaction) => {
            return transaction.type.startsWith("earned")
              ? acc + transaction.amount
              : acc - transaction.amount
          },
          0
        )
        setBalance(Math.max(calculatedBalance, 0))
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">Rewards</h1>

      <div className="mb-8 flex h-full flex-col justify-between rounded-xl border-l-4 border-green-500 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Reward Balance
        </h2>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <Coins className="mr-3 h-10 w-10 text-green-500" />
            <div>
              <span className="text-4xl font-bold text-green-500">
                {balance}
              </span>
              <p className="text-sm text-gray-500">Available Points</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Recent Transactions
          </h2>
          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b border-gray-200 p-4 last:border-b-0"
                >
                  <div className="flex items-center">
                    {transaction.type === "earned_report" ? (
                      <ArrowUpRight className="mr-3 h-5 w-5 text-green-500" />
                    ) : transaction.type === "earned_collect" ? (
                      <ArrowUpRight className="mr-3 h-5 w-5 text-blue-500" />
                    ) : (
                      <ArrowDownRight className="mr-3 h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${transaction.type.startsWith("earned") ? "text-green-500" : "text-red-500"}`}
                  >
                    {transaction.type.startsWith("earned") ? "+" : "-"}
                    {transaction.amount}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No transactions yet
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Available Rewards
          </h2>
          <div className="space-y-4">
            {rewards.length > 0 ? (
              rewards.map((reward) => (
                <div
                  key={reward.id}
                  className="rounded-xl bg-white p-4 shadow-md"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {reward.name}
                    </h3>
                    <span className="font-semibold text-green-500">
                      {reward.cost} points
                    </span>
                  </div>
                  <p className="mb-2 text-gray-600">{reward.description}</p>
                  <p className="mb-4 text-sm text-gray-500">
                    {reward.collectionInfo}
                  </p>
                  {reward.id === 0 ? (
                    <div className="space-y-2">
                      <Button
                        onClick={handleRedeemAllPoints}
                        className="w-full bg-green-500 text-white hover:bg-green-600"
                        disabled={balance === 0}
                      >
                        <Gift className="mr-2 h-4 w-4" />
                        Redeem All Points
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleRedeemReward(reward.id)}
                      className="w-full bg-green-500 text-white hover:bg-green-600"
                      disabled={balance < reward.cost}
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      Redeem Reward
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex items-center">
                  <AlertCircle className="mr-3 h-6 w-6 text-yellow-400" />
                  <p className="text-yellow-700">
                    No rewards available at the moment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
