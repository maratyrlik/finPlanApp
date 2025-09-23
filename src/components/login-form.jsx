import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm({ className, ...props }) {
	const [formData, setFormData] = useState({
		email: 'tyrlik.marek@seznam.cz',
		password: 'hyjqad-rexpix-3pogCi',
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

		if (validateForm() && props.onSubmit) {
			props.onSubmit(formData)
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									value={formData.email}
									onChange={value =>
										handleInputChange('email', value)
									}
									error={errors.email}
								/>
							</div>
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<a
										href="/auth/forgot-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
								</div>
								<Input
									id="password"
									type="password"
									required
									value={formData.password}
									onChange={value =>
										handleInputChange('password', value)
									}
									error={errors.password}
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									className="w-full"
									onClick={handleSubmit}
								>
									Login
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<a
								href="/register"
								className="underline underline-offset-4"
							>
								Sign up
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
