import { Onest } from "next/font/google"
import localFont from "next/font/local"

export const fontPrimary = Onest({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
})

export const fontSecondary = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-secondary",
  display: "swap",
  preload: false,
})
