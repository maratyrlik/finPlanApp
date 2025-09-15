'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/auth/presentation/components/forms/LoginForm.jsx'
import { AuthLayout } from '@/auth/presentation/components/ui/AuthLayout.jsx'
import { AuthenticationService } from '@/modules/auth/domain/services/AuthenticationService.js'

export default function LoginPage() {
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const router = useRouter()
	const authService = new AuthenticationService()

	const handleLogin = async formData => {
		setLoading(true)
		setMessage('')

		try {
			console.log('Login attempt:', formData)

			// Use your AuthenticationService
			const result = await authService.signIn({
				email: formData.email,
				password: formData.password,
			})

			if (result.success) {
				console.log('Login successful:', result)
				setMessage('Login successful! Redirecting...')

				// Get redirect URL from query params or default to dashboard
				const urlParams = new URLSearchParams(window.location.search)
				const redirectTo = urlParams.get('redirectTo') || '/dashboard'

				// Small delay to show success message
				setTimeout(() => {
					router.push(redirectTo)
					router.refresh() // Refresh to update middleware state
				}, 1000)
			} else {
				console.error('Login failed:', result.error)
				setMessage(result.error || 'Login failed')
			}
		} catch (error) {
			console.error('Login error:', error)
			setMessage(error.message || 'Login failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<AuthLayout>
			{message && (
				<div
					className={`auth-form__${
						message.includes('successful') ? 'success' : 'error'
					} auth-mb-4`}
				>
					{message}
				</div>
			)}
			<LoginForm onSubmit={handleLogin} loading={loading} />
		</AuthLayout>
	)
}
