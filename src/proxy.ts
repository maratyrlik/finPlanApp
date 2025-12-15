import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function proxy(req: NextRequest): Promise<NextResponse> {
	let res = NextResponse.next({
		request: {
			headers: req.headers,
		},
	})

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return req.cookies.getAll().map(cookie => {
					return {
						name: cookie.name,
						value: cookie.value,
					}
				})
			},

			setAll(
				cookies: Array<{
					name: string
					value: string
					options?: CookieOptions
				}>
			) {
				cookies.forEach(({ name, value, options }) => {
					req.cookies.set(name, value)

					res = NextResponse.next({
						request: {
							headers: req.headers,
						},
					})

					res.cookies.set(name, value, options)
				})
			},
		},
	})

	try {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession()

		const pathname = req.nextUrl.pathname
		const isAuthenticated = Boolean(session && !error)

		// ===== ROUTE DEFINITIONS =====
		const protectedRoutes: string[] = [
			'/dashboard',
			'/profile',
			'/accounts',
			'/settings',
			'/admin',
		]

		const authRoutes: string[] = [
			'/login',
			'/signup',
			'/forgot-password',
			'/reset-password',
		]

		// ===== ROUTE CHECKING =====
		const isProtectedRoute = protectedRoutes.some(route => {
			return pathname.startsWith(route)
		})

		const isAuthRoute = authRoutes.some(route => {
			return pathname.startsWith(route)
		})

		// ===== REDIRECT LOGIC =====

		// 1. Protected route + not authenticated
		if (isProtectedRoute && !isAuthenticated) {
			const loginUrl = new URL('/login', req.url)
			loginUrl.searchParams.set('redirectTo', pathname)

			return NextResponse.redirect(loginUrl)
		}

		// 2. Auth route + authenticated
		if (isAuthRoute && isAuthenticated) {
			const redirectTo = req.nextUrl.searchParams.get('redirectTo')

			let targetUrl = '/dashboard'

			if (redirectTo && redirectTo.startsWith('/')) {
				targetUrl = redirectTo
			}

			return NextResponse.redirect(new URL(targetUrl, req.url))
		}

		// 3. Allow access
		return res
	} catch {
		return res
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)'],
}
