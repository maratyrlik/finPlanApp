import { useState } from 'react'
import { AuthInput } from '@/auth/presentation/components/ui/AuthInput.jsx'
import { AuthButton } from '@/auth/presentation/components/ui/AuthButton.jsx'

import { PasswordService } from '@/auth/domain/services/PasswordService.js'
import { EmailService } from '@/auth/domain/services/EmailService.js'

export function RegisterForm({ onSubmit, loading = false }) {
	const [formData, setFormData] = useState({
		firstName: 'm',
		lastName: 't',
		email: 'm@t.cz',
		password: 'MmmmmmCssssss2022',
		confirmPassword: 'MmmmmmCssssss2022',
	})

	const [errors, setErrors] = useState({})

	const handleInputChange = (field, value) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}))

		// Clear error when user starts typing
		if (errors[field]) {
			setErrors(prev => ({
				...prev,
				[field]: null,
			}))
		}

		// Clear confirm password error if password matches
		if (
			field === 'password' &&
			errors.confirmPassword &&
			value === formData.confirmPassword
		) {
			setErrors(prev => ({
				...prev,
				confirmPassword: null,
			}))
		}

		// Clear confirm password error if passwords now match
		if (
			field === 'confirmPassword' &&
			errors.confirmPassword &&
			value === formData.password
		) {
			setErrors(prev => ({
				...prev,
				confirmPassword: null,
			}))
		}
	}

	const validateForm = () => {
		const newErrors = {}

		// First name validation
		if (!formData.firstName.trim()) {
			newErrors.firstName = 'First name is required'
		} else if (formData.firstName.length > 50) {
			newErrors.firstName = 'First name must be 50 characters or less'
		}

		// Last name validation
		if (!formData.lastName.trim()) {
			newErrors.lastName = 'Last name is required'
		} else if (formData.lastName.length > 50) {
			newErrors.lastName = 'Last name must be 50 characters or less'
		}

		// Email validation
		if (!formData.email) {
			newErrors.email = 'Email is required'
		} else if (!EmailService.isValid(formData.email)) {
			newErrors.email = 'Please enter a valid email address'
		}

		// Password validation
		const passwordErrors = PasswordService.validateStrength(
			formData.password
		)
		if (passwordErrors.length) {
			newErrors.password = passwordErrors[0]
		}

		// Confirm password validation
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = 'Please confirm your password'
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (validateForm() && onSubmit) {
			// Don't send confirmPassword to backend
			const { confirmPassword, ...submitData } = formData
			onSubmit(submitData)
		}
	}

	const isFormValid =
		formData.firstName &&
		formData.lastName &&
		formData.email &&
		formData.password &&
		formData.confirmPassword

	return (
		<form onSubmit={handleSubmit} className="auth-form">
			<div className="auth-form__header">
				<h1 className="auth-form__title">Create Account</h1>
				<p className="auth-form__subtitle">
					Join us and start your journey
				</p>
			</div>

			<div className="auth-form__fields">
				<div className="auth-form__row">
					<AuthInput
						id="firstName"
						type="text"
						label="First Name"
						value={formData.firstName}
						onChange={value =>
							handleInputChange('firstName', value)
						}
						error={errors.firstName}
						placeholder="Enter your first name"
						autoComplete="given-name"
						required
					/>

					<AuthInput
						id="lastName"
						type="text"
						label="Last Name"
						value={formData.lastName}
						onChange={value => handleInputChange('lastName', value)}
						error={errors.lastName}
						placeholder="Enter your last name"
						autoComplete="family-name"
						required
					/>
				</div>

				<AuthInput
					id="email"
					type="email"
					label="Email Address"
					value={formData.email}
					onChange={value => handleInputChange('email', value)}
					error={errors.email}
					placeholder="Enter your email"
					autoComplete="email"
					required
				/>

				<AuthInput
					id="password"
					type="password"
					label="Password"
					value={formData.password}
					onChange={value => handleInputChange('password', value)}
					error={errors.password}
					placeholder="Create a password"
					autoComplete="new-password"
					required
				/>

				<AuthInput
					id="confirmPassword"
					type="password"
					label="Confirm Password"
					value={formData.confirmPassword}
					onChange={value =>
						handleInputChange('confirmPassword', value)
					}
					error={errors.confirmPassword}
					placeholder="Confirm your password"
					autoComplete="new-password"
					required
				/>
			</div>

			<div className="auth-form__actions">
				<AuthButton
					type="submit"
					variant="primary"
					size="large"
					loading={loading}
					disabled={!isFormValid}
					fullWidth
				>
					Create Account
				</AuthButton>
			</div>

			<div className="auth-form__footer">
				<p className="auth-form__text">
					Already have an account?{' '}
					<a href="/auth/login" className="auth-form__link">
						Sign in
					</a>
				</p>

				<div className="auth-form__terms">
					<p className="auth-form__text-small">
						By creating an account, you agree to our{' '}
						<a href="/terms" className="auth-form__link">
							Terms of Service
						</a>{' '}
						and{' '}
						<a href="/privacy" className="auth-form__link">
							Privacy Policy
						</a>
					</p>
				</div>
			</div>
		</form>
	)
}
