'use client'

import { useState } from 'react'
import { SignUpForm } from '@/components/sign-up-form.jsx'

export default function SignUpPage() {
	//TODO - loading
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')

	const handleRegister = async formData => {
		setLoading(true)
		setMessage('')

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Registration failed')
			}

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
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignUpForm onSubmit={handleRegister} />
			</div>
		</div>
	)
}
