"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import type { User } from "@supabase/supabase-js"

interface SettingsClientProps {
  user: User
}

export function SettingsClient({ user }: SettingsClientProps) {
  const [firstName, setFirstName] = useState(user.user_metadata?.first_name || "")
  const [lastName, setLastName] = useState(user.user_metadata?.last_name || "")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      })
      if (error) throw error
      setMessage({ type: "success", text: "Profile updated successfully" })
      router.refresh()
    } catch (error: unknown) {
      setMessage({ 
        type: "error", 
        text: error instanceof Error ? error.message : "Failed to update profile" 
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4 border-b border-divider">
        <Link
          href="/"
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-sm">Back</span>
        </Link>
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold">
          SETTINGS
        </span>
      </header>

      <main className="flex-1 px-6 py-8">
        {/* Profile Section */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-6">
            Profile
          </h2>
          
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label 
                htmlFor="email" 
                className="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email || ""}
                disabled
                className="h-12 bg-surface border-divider text-text-secondary cursor-not-allowed"
              />
              <p className="text-xs text-text-secondary">Email cannot be changed</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label 
                  htmlFor="firstName" 
                  className="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-12 bg-surface border-divider text-text-primary focus:border-gold focus:ring-gold"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label 
                  htmlFor="lastName" 
                  className="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-12 bg-surface border-divider text-text-primary focus:border-gold focus:ring-gold"
                />
              </div>
            </div>

            {message && (
              <div className={`py-3 px-4 border-l-[3px] ${
                message.type === "success" 
                  ? "bg-green/10 border-green" 
                  : "bg-destructive/10 border-destructive"
              }`}>
                <p className={`text-sm ${message.type === "success" ? "text-green" : "text-destructive"}`}>
                  {message.text}
                </p>
              </div>
            )}

            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="h-12 bg-gold hover:bg-gold-light text-primary-foreground font-semibold tracking-wide uppercase text-sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-divider mb-10" />

        {/* Appearance Section */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-6">
            Appearance
          </h2>
          
          <div className="flex items-center justify-between py-4 bg-surface px-4">
            <div>
              <p className="text-base text-text-primary font-medium">Theme</p>
              <p className="text-sm text-text-secondary">Switch between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-divider mb-10" />

        {/* Account Section */}
        <section>
          <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary mb-6">
            Account
          </h2>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-12 border-destructive text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </section>
      </main>
    </div>
  )
}
