import { createBrowserClient } from '@supabase/ssr'

// Mock client for when Supabase is not configured
const mockClient = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => ({ error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: { message: 'Supabase not configured' } }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: 'Supabase not configured' } }),
    updateUser: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
  },
  from: () => ({
    select: () => ({ data: null, error: null }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
} as unknown as ReturnType<typeof createBrowserClient>

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if env vars exist and are non-empty
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.trim() === '' || supabaseAnonKey.trim() === '') {
    return mockClient
  }

  // Validate URL format - must start with https://
  const trimmedUrl = supabaseUrl.trim()
  if (!trimmedUrl.startsWith('https://')) {
    return mockClient
  }

  return createBrowserClient(trimmedUrl, supabaseAnonKey.trim())
}
