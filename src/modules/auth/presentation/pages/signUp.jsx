'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignUpForm } from '@/components/sign-up-form.jsx'

import { AuthenticationService } from '@/modules/auth/domain/services/AuthenticationService.ts'

export default function SignUpPage() {
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const router = useRouter()
	const authService = new AuthenticationService()

	const handleRegister = async formData => {
		setLoading(true)
		setMessage('')

		try {
			const result = await authService.signUp({
				email: formData.email,
				password: formData.password,
				firstName: formData.firstName,
				lastName: formData.lastName,
			})

			if (result.success) {
				console.log('SignUp successful:', result)
				setMessage('SignUp successful! Redirecting...')

				// Get redirect URL from query params or default to dashboard
				const urlParams = new URLSearchParams(window.location.search)
				const redirectTo = urlParams.get('redirectTo') || '/dashboard'

				// Small delay to show success message
				setTimeout(() => {
					router.push(redirectTo)
					router.refresh() // Refresh to update middleware state
				}, 1000)

				//TODO - po sign upu nejsem přihlášený
			} else {
				console.error('SignUp failed:', result.error)
				setMessage(result.error || 'SignUp failed')
			}
		} catch (error) {
			console.warn('SignUp error')
			console.dir(error)
			setMessage(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignUpForm onSubmit={handleRegister} loading={loading} />
			</div>
		</div>
	)
}
