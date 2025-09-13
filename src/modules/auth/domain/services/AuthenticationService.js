import { supabaseAdmin } from '@/shared/lib/supabase.js'
import { PasswordService } from './PasswordService.js'
import { EmailService } from './EmailService.js'

export class AuthenticationService {
	/**
	 * Sign up a new user
	 * @param {Object} userData - User registration data
	 * @param {string} userData.email - User email
	 * @param {string} userData.password - User password
	 * @param {string} userData.firstName - User first name
	 * @param {string} userData.lastName - User last name
	 * @returns {Promise<Object>} Authentication result
	 */
	async signUp({ email, password, firstName, lastName }) {
		try {
			// Validate input
			this.validateEmail(email)
			this.validatePassword(password)
			this.validateName(firstName, 'First name')
			this.validateName(lastName, 'Last name')

			const { data, error } = await supabaseAdmin.auth.signUp({
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
				throw new Error(error.message)
			}

			return {
				success: true,
				user: data.user,
				session: data.session,
				message: data.user?.email_confirmed_at
					? 'Account created successfully'
					: 'Please check your email to confirm your account',
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
	 * Sign in an existing user
	 * @param {Object} credentials - Login credentials
	 * @param {string} credentials.email - User email
	 * @param {string} credentials.password - User password
	 * @returns {Promise<Object>} Authentication result
	 */
	async signIn({ email, password }) {
		try {
			// Validate input
			this.validateEmail(email)
			if (!password || password.trim().length === 0) {
				throw new Error('Password is required')
			}

			const { data, error } = await supabaseAdmin.auth.signInWithPassword(
				{
					email: email.trim().toLowerCase(),
					password,
				}
			)

			if (error) {
				throw new Error(error.message)
			}

			return {
				success: true,
				user: data.user,
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

	/**
	 * Sign out the current user
	 * @returns {Promise<Object>} Sign out result
	 */
	async signOut() {
		try {
			const { error } = await supabaseAdmin.auth.signOut()

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

	/**
	 * Get current session
	 * @returns {Promise<Object>} Current session data
	 */
	async getCurrentSession() {
		try {
			const {
				data: { session },
				error,
			} = await supabaseAdmin.auth.getSession()

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

	/**
	 * Get current user
	 * @returns {Promise<Object>} Current user data
	 */
	async getCurrentUser() {
		try {
			const {
				data: { user },
				error,
			} = await supabaseAdmin.auth.getUser()

			if (error) {
				throw new Error(error.message)
			}

			return {
				success: true,
				user,
				isAuthenticated: !!user,
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
				user: null,
				isAuthenticated: false,
			}
		}
	}

	/**
	 * Refresh the current session
	 * @returns {Promise<Object>} Refreshed session data
	 */
	async refreshSession() {
		try {
			const { data, error } = await supabaseAdmin.auth.refreshSession()

			if (error) {
				throw new Error(error.message)
			}

			return {
				success: true,
				session: data.session,
				user: data.user,
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
				session: null,
				user: null,
			}
		}
	}

	/**
	 * Send password reset email
	 * @param {string} email - User email
	 * @returns {Promise<Object>} Reset password result
	 */
	async resetPassword(email) {
		try {
			this.validateEmail(email)

			const { error } = await supabaseAdmin.auth.resetPasswordForEmail(
				email.trim().toLowerCase(),
				{
					redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
				}
			)

			if (error) {
				throw new Error(error.message)
			}

			return {
				success: true,
				message: 'Password reset email sent',
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			}
		}
	}

	/**
	 * Update user password
	 * @param {string} newPassword - New password
	 * @returns {Promise<Object>} Update password result
	 */
	async updatePassword(newPassword) {
		try {
			this.validatePassword(newPassword)

			const { data, error } = await supabaseAdmin.auth.updateUser({
				password: newPassword,
			})

			if (error) {
				throw new Error(error.message)
			}

			return {
				success: true,
				user: data.user,
				message: 'Password updated successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			}
		}
	}

	// Validation methods
	validateEmail(email) {
		if (!email || email.trim().length === 0) {
			throw new Error('Email is required')
		}

		if (EmailService.isValid()) {
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
