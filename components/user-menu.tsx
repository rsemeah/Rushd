"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { User as UserIcon, LogOut, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="flex h-10 w-10 items-center justify-center text-text-secondary">
        <UserIcon className="h-5 w-5 animate-pulse" strokeWidth={1.5} />
      </div>
    )
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="flex h-10 w-10 items-center justify-center text-text-secondary hover:text-gold transition-colors"
        aria-label="Sign in"
      >
        <UserIcon className="h-5 w-5" strokeWidth={1.5} />
      </Link>
    )
  }

  // Extract user's first name from metadata or email
  const firstName = user.user_metadata?.first_name || user.email?.split("@")[0] || "User"
  const initials = firstName.charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center bg-gold/10 text-gold font-medium text-sm hover:bg-gold/20 transition-colors"
          aria-label="User menu"
        >
          {initials}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-surface border-divider"
      >
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-text-primary truncate">
            {firstName}
          </p>
          <p className="text-xs text-text-secondary truncate">
            {user.email}
          </p>
        </div>
        <DropdownMenuSeparator className="bg-divider" />
        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center gap-2 text-text-primary cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-divider" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 text-destructive cursor-pointer focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
