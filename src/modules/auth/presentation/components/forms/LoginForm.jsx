import { useState } from 'react'
import { AuthInput } from '../ui/AuthInput.jsx'
import { AuthButton } from '../ui/AuthButton.jsx'

export function LoginForm({ onSubmit, loading = false }) {
	const [formData, setFormData] = useState({
		email: '@',
		password: '',
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
	}

	const validateForm = () => {
		const newErrors = {}

		// Email validation
		if (!formData.email) {
			newErrors.email = 'Email is required'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address'
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = 'Password is required'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (validateForm() && onSubmit) {
			onSubmit(formData)
		}
	}

	const isFormValid = formData.email && formData.password

	return (
		<form onSubmit={handleSubmit} className="auth-form">
			<div className="auth-form__header">
				<h1 className="auth-form__title">Sign In</h1>
				<p className="auth-form__subtitle">
					Welcome back to your account
				</p>
			</div>

			<div className="auth-form__fields">
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
					placeholder="Enter your password"
					autoComplete="current-password"
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
					Sign In
				</AuthButton>
			</div>

			<div className="auth-form__footer">
				<a href="/auth/forgot-password" className="auth-form__link">
					Forgot your password?
				</a>
				<p className="auth-form__text">
					Don't have an account?{' '}
					<a href="/register" className="auth-form__link">
						Sign up
					</a>
				</p>
			</div>
		</form>
	)
}
