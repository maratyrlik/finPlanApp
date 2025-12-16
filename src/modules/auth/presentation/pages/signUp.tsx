'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignupForm } from '@/components/signup-form'
import { AuthenticationService } from '@/modules/auth/domain/services/AuthenticationService'

interface SignupFormData {
	email: string
	password: string
	firstName: string
	lastName: string
}

export default function SignUpPage() {
	const [loading, setLoading] = useState<boolean>(false)
	const [message, setMessage] = useState<string>('')

	const router = useRouter()
	const authService = new AuthenticationService()

	const handleRegister = async (formData: any): Promise<void> => {
		console.log(formData)
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

				const urlParams = new URLSearchParams(window.location.search)
				const redirectTo = urlParams.get('redirectTo') ?? '/dashboard'

				setTimeout(() => {
					router.push(redirectTo)
					router.refresh()
				}, 1000)

				// TODO: user is not logged in after signup
			} else {
				console.error('SignUp failed:', result.error)
				setMessage(result.error ?? 'SignUp failed')
			}
		} catch (error: unknown) {
			console.warn('SignUp error', error)
			setMessage(error instanceof Error ? error.message : 'SignUp failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignupForm onSubmit={handleRegister} />
				{message && (
					<p className="mt-4 text-center text-sm text-muted-foreground">
						{message}
					</p>
				)}
			</div>
		</div>
	)
}
