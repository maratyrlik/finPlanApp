'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/login-form'
import { AuthenticationService } from '@/modules/auth/domain/services/AuthenticationService'

interface LoginFormData {
	email: string
	password: string
}

export default function LoginPage() {
	const [loading, setLoading] = useState<boolean>(false)
	const [message, setMessage] = useState<string>('')

	const router = useRouter()
	const authService = new AuthenticationService()

	const handleLogin = async (formData: any): Promise<void> => {
		setLoading(true)
		setMessage('')
		try {
			console.log('Login attempt:', formData)
			const result = await authService.signIn({
				email: formData.email,
				password: formData.password,
			})
			console.warn('maraLog -> result: ', result)
			if (result.success) {
				console.log('Login successful:', result)
				setMessage('Login successful! Redirecting...')
				const urlParams = new URLSearchParams(window.location.search)
				const redirectTo = urlParams.get('redirectTo') ?? '/dashboard'
				setTimeout(() => {
					router.push(redirectTo)
					router.refresh()
				}, 1000)
			} else {
				console.error('Login failed:', result.error)
				setMessage(result.error ?? 'Login failed')
			}
		} catch (error: unknown) {
			console.error('Login error:', error)
			setMessage(error instanceof Error ? error.message : 'Login failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm onSubmit={handleLogin} className="" />
				{message && (
					<p className="mt-4 text-center text-sm text-muted-foreground">
						{message}
					</p>
				)}
			</div>
		</div>
	)
}
