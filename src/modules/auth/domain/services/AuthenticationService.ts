import { supabaseClient } from '@/shared/lib/supabase'
import { PasswordService } from './PasswordService'
import { User } from '@/auth/domain/entities/User'
import { EmailService } from './EmailService'

export interface SignUpInput {
	email: string
	password: string
	firstName: string
	lastName: string
}

export interface SignInInput {
	email: string
	password: string
}

interface BaseAuthResponse {
	success: boolean
	message?: string
	error?: string
}

export interface AuthSuccessResponse extends BaseAuthResponse {
	success: true
	user: User | null
	session: null //Session | null
}

export interface AuthFailureResponse extends BaseAuthResponse {
	success: false
	user: null
	session: null
}

export type AuthResponse = AuthSuccessResponse | AuthFailureResponse

export class AuthenticationService {
	/**
	 * Sign up a new user
	 * The trigger will automatically create the users table record
	 */
	async signUp(input: SignUpInput): Promise<AuthResponse> {
		try {
			this.validatePassword(input.password)
			//this.validateEmail(input.email)

			const { data, error } = await supabaseClient.auth.signUp({
				email: input.email,
				password: input.password,
				options: {
					data: {
						first_name: input.firstName,
						last_name: input.lastName,
					},
				},
			})

			if (error) {
				console.error('Supabase auth.signUp error:', {
					message: error.message,
					status: error.status,
					//details: error.details,
					//hint: error.hint,
					code: error.code,
				})
				throw new Error(`Auth signup failed: ${error.message}`)
			}

			if (data.user) {
				// Allow DB trigger to complete
				await new Promise(resolve => setTimeout(resolve, 100))

				return {
					success: true,
					user: User.createFromDatabase(data.user),
					session: null, //data.session,
					message: data.user.email_confirmed_at
						? 'Account created successfully'
						: 'Please check your email to confirm your account',
				}
			}

			return {
				success: true,
				user: null,
				session: null, //data.session,
				message: 'Account created successfully',
			}
		} catch (err: unknown) {
			return {
				success: false,
				error: err instanceof Error ? err.message : 'Unknown error',
				user: null,
				session: null,
			}
		}
	}

	/**
	 * Sign in an existing user
	 */
	async signIn(input: SignInInput): Promise<AuthResponse> {
		try {
			this.validateEmail(input.email)

			if (!input.password || input.password.trim().length === 0) {
				throw new Error('Password is required')
			}

			const { data, error } =
				await supabaseClient.auth.signInWithPassword({
					email: input.email.trim().toLowerCase(),
					password: input.password,
				})

			if (error) {
				throw new Error(error.message)
			}
			console.warn(data.session)

			return {
				success: true,
				user: User.createFromDatabase(data.user),
				session: null, // data.session
				message: 'Signed in successfully',
			}
		} catch (err: unknown) {
			return {
				success: false,
				error: err instanceof Error ? err.message : 'Unknown error',
				user: null,
				session: null,
			}
		}
	}

	async signOut(): Promise<BaseAuthResponse> {
		try {
			const { error } = await supabaseClient.auth.signOut()

			if (error) {
				throw new Error(error.message)
			}

			return {
				success: true,
				message: 'Signed out successfully',
			}
		} catch (err: unknown) {
			return {
				success: false,
				error: err instanceof Error ? err.message : 'Unknown error',
			}
		}
	}

	// async getCurrentSession(): Promise<SessionResponse> {
	// 	try {
	// 		const {
	// 			data: { session },
	// 			error,
	// 		} = await supabaseClient.auth.getSession()

	// 		if (error) {
	// 			throw new Error(error.message)
	// 		}

	// 		return {
	// 			success: true,
	// 			session,
	// 			user: session?.user ?? null,
	// 			isAuthenticated: Boolean(session),
	// 		}
	// 	} catch (err: unknown) {
	// 		return {
	// 			success: false,
	// 			error: err instanceof Error ? err.message : 'Unknown error',
	// 			session: null,
	// 			user: null,
	// 			isAuthenticated: false,
	// 		}
	// 	}
	// }

	// async getCurrentUser(): Promise<{
	// 	success: boolean
	// 	user: SupabaseUser | null
	// 	isAuthenticated: boolean
	// 	error?: string
	// }> {
	// 	try {
	// 		const {
	// 			data: { user },
	// 			error,
	// 		} = await supabaseClient.auth.getUser()

	// 		if (error) {
	// 			throw new Error(error.message)
	// 		}

	// 		return {
	// 			success: true,
	// 			user,
	// 			isAuthenticated: Boolean(user),
	// 		}
	// 	} catch (err: unknown) {
	// 		return {
	// 			success: false,
	// 			error: err instanceof Error ? err.message : 'Unknown error',
	// 			user: null,
	// 			isAuthenticated: false,
	// 		}
	// 	}
	// }

	/* ---------- Validation ---------- */

	private validateEmail(email: string): void {
		if (!email || email.trim().length === 0) {
			throw new Error('Email is required')
		}

		if (!EmailService.isValid(email)) {
			throw new Error('Please enter a valid email address')
		}
	}

	private validatePassword(password: string): void {
		const passwordErrors = PasswordService.validateStrength(password)
		if (passwordErrors.length > 0) {
			throw new Error(passwordErrors[0])
		}
	}
}
