"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { BookOpen, Home, Heart } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl">WordLearn</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant={pathname === "/" ? "default" : "ghost"} size="sm" asChild>
                <Link href="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Ana Sayfa</span>
                </Link>
              </Button>

              <Button variant={pathname === "/my-words" ? "default" : "ghost"} size="sm" asChild>
                <Link href="/my-words" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Kelimelerim</span>
                </Link>
              </Button>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
