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

import { PasswordService } from '@/auth/domain/services/PasswordService'
import { EmailService } from '@/auth/domain/services/EmailService'

export function SignUpForm({ className, loading = false, ...props }) {
	const [formData, setFormData] = useState({
		firstName: 'mara',
		lastName: 'seznam',
		email: 'tyrlik.marek@seznam.cz',
		password: 'hyjqad-rexpix-3pogCi',
		confirmPassword: 'hyjqad-rexpix-3pogCi',
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

		if (validateForm() && props.onSubmit) {
			// Don't send confirmPassword to backend
			const { confirmPassword, ...submitData } = formData
			props.onSubmit(submitData)
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Create Account</CardTitle>
					<CardDescription>
						Join us and start your journey
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3 sm:grid-cols-2">
								<div className="grid gap-3">
									<Label htmlFor="">First Name</Label>
									<Input
										id="firstNmae"
										type="text"
										placeholder="m@example.com"
										required
										value={formData.firstName}
										onChange={value =>
											handleInputChange(
												'firstName',
												value
											)
										}
										error={errors.firstName}
									/>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="text">Last Name</Label>
									<Input
										id="lastName"
										type="text"
										required
										value={formData.lastName}
										onChange={value =>
											handleInputChange('lastName', value)
										}
										error={errors.lastName}
									/>
								</div>
							</div>
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
								<Label htmlFor="password">Password</Label>
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
							<div className="grid gap-3">
								<Label htmlFor="password">
									Confirm Password
								</Label>
								<Input
									id="confirmPassword"
									type="password"
									required
									value={formData.confirmPassword}
									onChange={value =>
										handleInputChange(
											'confirmPassword',
											value
										)
									}
									error={errors.confirmPassword}
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									className="w-full"
									onClick={handleSubmit}
									loading={loading}
								>
									Create Account
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{' '}
							<a
								href="/login"
								className="underline underline-offset-4"
							>
								Sign in
							</a>
						</div>
						<div className="mt-4 text-center text-sm">
							By creating an account, you agree to our Terms of
							Service and Privacy Policy
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
