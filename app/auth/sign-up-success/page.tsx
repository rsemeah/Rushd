import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        {/* Icon */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center bg-gold/10 border border-gold/20">
          <Mail className="h-10 w-10 text-gold" strokeWidth={1.5} />
        </div>

        {/* Logo */}
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-6">
          RUSHD
        </span>

        {/* Title */}
        <h1 className="text-3xl font-medium text-text-primary mb-3 text-center">
          Check your email
        </h1>
        <p className="text-base text-text-secondary text-center max-w-sm mb-8">
          {"We've sent you a verification link. Please check your inbox and click the link to activate your account."}
        </p>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-divider mb-8" />

        {/* Instructions */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="flex gap-4 items-start">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center text-gold text-sm font-medium">
              1
            </div>
            <p className="text-sm text-text-secondary">
              Open the email from Rushd
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center text-gold text-sm font-medium">
              2
            </div>
            <p className="text-sm text-text-secondary">
              Click the verification link
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center text-gold text-sm font-medium">
              3
            </div>
            <p className="text-sm text-text-secondary">
              Begin your journey through the Names
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3 w-full max-w-sm">
          <Link href="/auth/login" className="w-full">
            <Button 
              variant="outline"
              className="w-full h-12 border-divider text-text-primary hover:bg-surface hover:text-gold"
            >
              Return to Login
            </Button>
          </Link>
        </div>

        {/* Help text */}
        <p className="mt-8 text-xs text-text-secondary text-center">
          {"Didn't receive the email? Check your spam folder or "}
          <Link href="/auth/sign-up" className="text-gold hover:text-gold-light">
            try again
          </Link>
        </p>
      </main>
    </div>
  )
}
