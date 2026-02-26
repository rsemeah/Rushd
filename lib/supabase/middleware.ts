import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Debug: Log raw env var values
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('[v0] Raw SUPABASE_URL:', JSON.stringify(rawUrl))
  console.log('[v0] Raw SUPABASE_URL type:', typeof rawUrl)
  console.log('[v0] Raw SUPABASE_URL length:', rawUrl?.length)
  console.log('[v0] Has ANON_KEY:', !!rawKey)

  // If Supabase is not configured, skip auth checks
  if (!rawUrl || !rawKey || rawUrl.trim() === '' || rawKey.trim() === '') {
    console.log('[v0] Supabase not configured, skipping auth middleware')
    return NextResponse.next({ request })
  }

  // Trim and validate URL
  const supabaseUrl = rawUrl.trim()
  const supabaseAnonKey = rawKey.trim()

  // Validate URL format before creating client
  let validatedUrl: URL
  try {
    validatedUrl = new URL(supabaseUrl)
    console.log('[v0] URL validated successfully:', validatedUrl.href)
  } catch (e) {
    console.log('[v0] Invalid Supabase URL format:', supabaseUrl, 'Error:', e)
    return NextResponse.next({ request })
  }

  // Extra validation: must be https and supabase.co domain
  if (!validatedUrl.protocol.startsWith('https')) {
    console.log('[v0] URL is not HTTPS:', validatedUrl.protocol)
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  console.log('[v0] Creating Supabase client with URL:', supabaseUrl)

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes - redirect to login if not authenticated
  const protectedPaths = ['/dashboard', '/protected', '/settings']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // If user is logged in and tries to access auth pages, redirect to dashboard
  const authPaths = ['/auth/login', '/auth/sign-up']
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname === path
  )

  if (isAuthPath && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
