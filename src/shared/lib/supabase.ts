// src/shared/lib/supabase-client.ts
import { createBrowserClient, type CookieOptions } from '@supabase/ssr'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables')
}

type BrowserCookie = {
	name: string
	value: string
	options?: CookieOptions
}

// Create client-side Supabase client
export const supabaseClient = createBrowserClient(
	supabaseUrl,
	supabaseAnonKey,
	{
		cookies: {
			getAll(): BrowserCookie[] {
				if (typeof document === 'undefined') return []

				return document.cookie
					.split('; ')
					.filter(Boolean)
					.map(cookie => {
						const [name, ...rest] = cookie.split('=')
						return {
							name,
							value: decodeURIComponent(rest.join('=')),
						}
					})
			},

			setAll(cookies: BrowserCookie[]): void {
				if (typeof document === 'undefined') return

				cookies.forEach(({ name, value, options }) => {
					const opts: string[] = []

					if (options?.maxAge !== undefined) {
						opts.push(`max-age=${options.maxAge}`)
					}
					if (options?.path) {
						opts.push(`path=${options.path}`)
					}
					if (options?.domain) {
						opts.push(`domain=${options.domain}`)
					}
					if (options?.secure) {
						opts.push('secure')
					}
					if (options?.sameSite) {
						opts.push(`samesite=${options.sameSite}`)
					}

					// ❗ httpOnly CANNOT be set from the browser
					// options.httpOnly is ignored intentionally

					document.cookie = `${name}=${encodeURIComponent(
						value ?? ''
					)}${opts.length ? '; ' + opts.join('; ') : ''}`
				})
			},
		},
	}
)
