import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
	let res = NextResponse.next({
		request: {
			headers: req.headers,
		},
	})

	// Create Supabase client for middleware
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return req.cookies.getAll().map(cookie => ({
						name: cookie.name,
						value: cookie.value,
					}))
				},
				setAll(cookies) {
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
		}
	)

	try {
		// Get current session
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession()

		const { pathname } = req.nextUrl
		const isAuthenticated = !!session && !error

		// ===== ROUTE DEFINITIONS =====
		const protectedRoutes = [
			'/dashboard',
			'/profile',
			'/accounts',
			'/settings',
			'/admin',
		]

		const authRoutes = [
			'/login',
			'/register',
			'/signup',
			'/forgot-password',
			'/reset-password',
		]

		// ===== ROUTE CHECKING LOGIC =====
		const isProtectedRoute = protectedRoutes.some(route =>
			pathname.startsWith(route)
		)

		const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

		// ===== REDIRECT LOGIC =====

		// 1. Protected route + not authenticated → redirect to login
		if (isProtectedRoute && !isAuthenticated) {
			const loginUrl = new URL('login', req.url)
			loginUrl.searchParams.set('redirectTo', pathname)

			return NextResponse.redirect(loginUrl)
		}

		// 2. Auth route + authenticated → redirect to dashboard
		if (isAuthRoute && isAuthenticated) {
			const redirectTo = req.nextUrl.searchParams.get('redirectTo')
			const targetUrl =
				redirectTo && redirectTo.startsWith('/')
					? redirectTo
					: '/dashboard'

			return NextResponse.redirect(new URL(targetUrl, req.url))
		}

		// 3. All other routes → allow access
		return res
	} catch (error) {
		return res
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)'],
}
