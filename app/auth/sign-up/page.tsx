'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react'

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Password validation rules
  const passwordRules = [
    { label: 'At least 12 characters', valid: password.length >= 12 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'One number', valid: /[0-9]/.test(password) },
    { label: 'One special character', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]

  const isPasswordValid = passwordRules.every(rule => rule.valid)
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (!isPasswordValid) {
      setError('Password does not meet requirements')
      setIsLoading(false)
      return
    }

    if (!doPasswordsMatch) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (!termsAccepted) {
      setError('You must accept the terms and privacy policy')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
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

      <main className="flex flex-1 flex-col px-6 pb-12 overflow-y-auto">
        {/* Logo */}
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold">
            RUSHD
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-medium text-text-primary mb-2">
          Begin your journey
        </h1>
        <p className="text-base text-text-secondary mb-8">
          Create an account to track your progress through the 99 Names
        </p>

        {/* Form */}
        <form onSubmit={handleSignUp} className="flex flex-col gap-5">
          {/* Name fields */}
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
                required
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

          {/* Email */}
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

          {/* Password */}
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
            
            {/* Password requirements */}
            {password.length > 0 && (
              <div className="mt-2 flex flex-col gap-1.5">
                {passwordRules.map((rule, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {rule.valid ? (
                      <Check className="h-3.5 w-3.5 text-green" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-text-secondary" />
                    )}
                    <span className={`text-xs ${rule.valid ? 'text-green' : 'text-text-secondary'}`}>
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <Label 
              htmlFor="confirmPassword"
              className="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`h-12 bg-surface border-divider text-text-primary focus:border-gold focus:ring-gold ${
                confirmPassword.length > 0 && !doPasswordsMatch ? 'border-destructive' : ''
              }`}
            />
            {confirmPassword.length > 0 && !doPasswordsMatch && (
              <p className="text-xs text-destructive mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3 mt-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-0.5 border-divider data-[state=checked]:bg-gold data-[state=checked]:border-gold"
            />
            <Label 
              htmlFor="terms" 
              className="text-sm text-text-secondary leading-relaxed cursor-pointer"
            >
              I agree to the{' '}
              <Link href="/terms" className="text-gold hover:text-gold-light">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-gold hover:text-gold-light">Privacy Policy</Link>
            </Label>
          </div>

          {error && (
            <div className="py-3 px-4 bg-destructive/10 border-l-[3px] border-destructive">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading || !isPasswordValid || !doPasswordsMatch || !termsAccepted}
            className="h-12 bg-gold hover:bg-gold-light text-primary-foreground font-semibold tracking-wide uppercase text-sm disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        {/* Login link */}
        <div className="mt-8 text-center">
          <span className="text-sm text-text-secondary">
            Already have an account?{' '}
          </span>
          <Link
            href="/auth/login"
            className="text-sm text-gold hover:text-gold-light font-medium"
          >
            Sign in
          </Link>
        </div>
      </main>
    </div>
  )
}
