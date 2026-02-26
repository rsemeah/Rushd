'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center px-6 pt-8 pb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-sm">Back</span>
        </Link>
      </header>

      <main className="flex flex-1 flex-col justify-center px-6 pb-12">
        {/* Logo */}
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold">
            RUSHD
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-medium text-text-primary mb-2">
          Welcome back
        </h1>
        <p className="text-base text-text-secondary mb-10">
          Continue your journey through the Names
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
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
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-surface border-divider text-text-primary placeholder:text-text-secondary/50 focus:border-gold focus:ring-gold"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label 
              htmlFor="password"
              className="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-surface border-divider text-text-primary pr-12 focus:border-gold focus:ring-gold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="py-3 px-4 bg-destructive/10 border-l-[3px] border-destructive">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-12 bg-gold hover:bg-gold-light text-primary-foreground font-semibold tracking-wide uppercase text-sm"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Sign up link */}
        <div className="mt-8 text-center">
          <span className="text-sm text-text-secondary">
            {"Don't have an account? "}
          </span>
          <Link
            href="/auth/sign-up"
            className="text-sm text-gold hover:text-gold-light font-medium"
          >
            Create one
          </Link>
        </div>
      </main>
    </div>
  )
}
