// src/modules/auth/domain/services/AuthenticationService.js
import { supabase } from '@/shared/lib/supabase.js' // Changed from supabaseAdmin
import { PasswordService } from './PasswordService.js'
import { EmailService } from './EmailService.js'

export class AuthenticationService {
	/**
	 * Sign up a new user
	 * The trigger will automatically create the users table record
	 */
	async signUp({ email, password, firstName, lastName }) {
		try {
			// Validate input
			this.validateEmail(email)
			this.validatePassword(password)
			this.validateName(firstName, 'First name')
			this.validateName(lastName, 'Last name')

			// Only create auth.users record - trigger handles users table
			const { data, error } = await supabase.auth.signUp({
				// Changed to supabase
				email: email.trim().toLowerCase(),
				password,
				options: {
					data: {
						first_name: firstName.trim(),
						last_name: lastName.trim(),
					},
				},
			})

			if (error) {
				console.error('Supabase auth.signUp error:', {
					message: error.message,
					status: error.status,
					details: error.details,
					hint: error.hint,
					code: error.code,
				})
				throw new Error(`Auth signup failed: ${error.message}`)
			}

			// Optional: Wait a moment for trigger to complete
			// and fetch the complete user profile
			if (data.user) {
				// Small delay to ensure trigger has completed
				await new Promise(resolve => setTimeout(resolve, 100))

				// Fetch the complete user profile
				const userProfile = await this.getUserProfile(data.user.id)

				return {
					success: true,
					user: data.user,
					userProfile: userProfile,
					session: data.session,
					message: data.user?.email_confirmed_at
						? 'Account created successfully'
						: 'Please check your email to confirm your account',
				}
			}

			return {
				success: true,
				user: data.user,
				session: data.session,
				message: 'Account created successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
				user: null,
				session: null,
			}
		}
	}

	/**
	 * Get user profile from users table
	 */
	async getUserProfile(userId) {
		try {
			const { data, error } = await supabase // Changed to supabase
				.from('users')
				.select('*')
				.eq('id', userId)
				.single()

			if (error) {
				console.error('Error fetching user profile:', error)
				return null
			}

			return data
		} catch (error) {
			console.error('Error in getUserProfile:', error)
			return null
		}
	}

	/**
	 * Sign in an existing user
	 * Also fetch their profile data
	 */
	async signIn({ email, password }) {
		try {
			// Validate input
			this.validateEmail(email)
			if (!password || password.trim().length === 0) {
				throw new Error('Password is required')
			}

			const { data, error } = await supabase.auth.signInWithPassword({
				// Changed to supabase
				email: email.trim().toLowerCase(),
				password,
			})

			if (error) {
				throw new Error(error.message)
			}

			// Fetch user profile
			const userProfile = data.user
				? await this.getUserProfile(data.user.id)
				: null

			return {
				success: true,
				user: data.user,
				userProfile: userProfile,
				session: data.session,
				message: 'Signed in successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
				user: null,
				session: null,
			}
		}
	}

	async signOut() {
		try {
			const { error } = await supabase.auth.signOut() // Changed to supabase

			if (error) {
				throw new Error(error.message)
			}

			return {
				success: true,
				message: 'Signed out successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			}
		}
	}

	async getCurrentSession() {
		try {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession() // Changed to supabase

			if (error) {
				throw new Error(error.message)
			}

			return {
				success: true,
				session,
				user: session?.user || null,
				isAuthenticated: !!session,
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
				session: null,
				user: null,
				isAuthenticated: false,
			}
		}
	}

	async getCurrentUser() {
		try {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser() // Changed to supabase

			if (error) {
				throw new Error(error.message)
			}

			// Also fetch profile if user exists
			const userProfile = user ? await this.getUserProfile(user.id) : null

			return {
				success: true,
				user,
				userProfile,
				isAuthenticated: !!user,
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
				user: null,
				userProfile: null,
				isAuthenticated: false,
			}
		}
	}

	// Validation methods
	validateEmail(email) {
		if (!email || email.trim().length === 0) {
			throw new Error('Email is required')
		}

		if (!EmailService.isValid(email)) {
			// Fixed: added email parameter
			throw new Error('Please enter a valid email address')
		}
	}

	validatePassword(password) {
		const passwordErrors = PasswordService.validateStrength(password)
		if (passwordErrors.length) {
			throw new Error(passwordErrors[0])
		}
	}

	validateName(name, fieldName) {
		if (!name || name.trim().length === 0) {
			throw new Error(`${fieldName} is required`)
		}

		if (name.trim().length < 2) {
			throw new Error(`${fieldName} must be at least 2 characters long`)
		}

		if (name.trim().length > 50) {
			throw new Error(`${fieldName} must be 50 characters or less`)
		}
	}
}
