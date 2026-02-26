import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, skip auth checks
  if (!rawUrl || !rawKey || rawUrl.trim() === '' || rawKey.trim() === '') {
    return NextResponse.next({ request })
  }

  // Trim and validate URL
  const supabaseUrl = rawUrl.trim()
  const supabaseAnonKey = rawKey.trim()

  // Must start with https://
  if (!supabaseUrl.startsWith('https://')) {
    return NextResponse.next({ request })
  }

  // Validate URL format before creating client
  try {
    new URL(supabaseUrl)
  } catch {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

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
