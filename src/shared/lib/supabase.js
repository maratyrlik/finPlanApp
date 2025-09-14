// src/shared/lib/supabase.js - Client-side configuration
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables')
}

// Client-side Supabase client (for browser/components)
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// For backwards compatibility with your existing code
export const supabaseAdmin = supabase
