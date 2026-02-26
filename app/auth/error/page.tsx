import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        {/* Icon */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="h-10 w-10 text-destructive" strokeWidth={1.5} />
        </div>

        {/* Logo */}
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-6">
          RUSHD
        </span>

        {/* Title */}
        <h1 className="text-3xl font-medium text-text-primary mb-3 text-center">
          Something went wrong
        </h1>
        <p className="text-base text-text-secondary text-center max-w-sm mb-4">
          We encountered an issue while processing your request.
        </p>

        {/* Error details */}
        {params?.error && (
          <div className="w-full max-w-sm py-3 px-4 bg-destructive/10 border-l-[3px] border-destructive mb-8">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary mb-1">
              Error Code
            </p>
            <p className="text-sm text-destructive font-mono">{params.error}</p>
          </div>
        )}

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-divider mb-8" />

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Link href="/auth/login" className="w-full">
            <Button 
              className="w-full h-12 bg-gold hover:bg-gold-light text-primary-foreground font-semibold tracking-wide uppercase text-sm"
            >
              Try Again
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button 
              variant="outline"
              className="w-full h-12 border-divider text-text-primary hover:bg-surface hover:text-gold"
            >
              Return Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
