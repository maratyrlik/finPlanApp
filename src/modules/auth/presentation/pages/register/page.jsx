'use client'

import { useState } from 'react'
import { RegisterForm } from '../../components/forms/RegisterForm.jsx'
import { AuthLayout } from '../../components/ui/AuthLayout.jsx'

export default function RegisterPage() {
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')

	const handleRegister = async formData => {
		setLoading(true)
		setMessage('')

		try {
			console.log('i am here')
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})
			console.log('i am here2', response)

			const data = await response.json()
			console.log('i am here3', data)

			if (!response.ok) {
				throw new Error(data.error || 'Registration failed')
			}
			console.log('i am here4')

			setMessage(data.message)
			// Optionally redirect to login or verification page
		} catch (error) {
			console.dir(error)
			setMessage(error.message)
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

			<RegisterForm onSubmit={handleRegister} loading={loading} />
		</AuthLayout>
	)
}
