'use client'

import { useState } from 'react'
import { LoginForm } from '../../components/forms/LoginForm.jsx'
import { AuthLayout } from '../../components/ui/AuthLayout.jsx'

export default function LoginPage() {
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')

	const handleLogin = async formData => {
		setLoading(true)
		setMessage('')

		try {
			console.log('Login attempt:', formData)

			// TODO: Replace with actual API call
			// const response = await fetch('/api/auth/login', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(formData)
			// })

			// Simulate API call for now
			await new Promise(resolve => setTimeout(resolve, 2000))

			// For demo purposes, show success message
			setMessage('Login successful! (This is just a demo)')
		} catch (error) {
			setMessage(error.message || 'Login failed')
			console.error('Login error:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<AuthLayout>
			{message && (
				<div
					className={`auth-form__${message.includes('successful') ? 'success' : 'error'} auth-mb-4`}
				>
					{message}
				</div>
			)}

			<LoginForm onSubmit={handleLogin} loading={loading} />
		</AuthLayout>
	)
}
