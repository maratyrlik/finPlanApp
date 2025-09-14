// src/shared/lib/supabase.js - Fixed client-side configuration
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables')
}

// Create client-side Supabase client with proper cookie handling
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
	cookies: {
		getAll() {
			// Only run in browser
			if (typeof document === 'undefined') return []

			return document.cookie
				.split('; ')
				.filter(Boolean)
				.map(cookie => {
					const [name, value] = cookie.split('=')
					return { name, value: decodeURIComponent(value) }
				})
		},
		setAll(cookies) {
			// Only run in browser
			if (typeof document === 'undefined') return

			cookies.forEach(({ name, value, options = {} }) => {
				const cookieOptions = []
				if (options.maxAge)
					cookieOptions.push(`max-age=${options.maxAge}`)
				if (options.path) cookieOptions.push(`path=${options.path}`)
				if (options.domain)
					cookieOptions.push(`domain=${options.domain}`)
				if (options.secure) cookieOptions.push('secure')
				if (options.httpOnly) cookieOptions.push('httponly')
				if (options.sameSite)
					cookieOptions.push(`samesite=${options.sameSite}`)

				const cookieString = `${name}=${encodeURIComponent(value || '')}${cookieOptions.length ? '; ' + cookieOptions.join('; ') : ''}`
				document.cookie = cookieString
			})
		},
	},
})

// For backwards compatibility with your existing code
export const supabaseAdmin = supabase
