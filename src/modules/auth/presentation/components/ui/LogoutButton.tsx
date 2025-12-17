'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthenticationService } from '@/modules/auth/domain/services/AuthenticationService'

interface LogoutButtonProps {
	className?: string
	children?: React.ReactNode
}

export default function LogoutButton({
	className = '',
	children = 'Logout',
}: LogoutButtonProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter()

	const handleLogout = async (): Promise<void> => {
		try {
			setIsLoading(true)

			const result = await new AuthenticationService().signOut()

			if (!result.success) {
				throw new Error(result.error ?? 'Logout failed')
			}

			router.push('/login')
		} catch (error: unknown) {
			console.error('Logout failed:', error)
			alert('Failed to logout. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<button
			type="button"
			onClick={handleLogout}
			disabled={isLoading}
			className={`
				bg-red-500 hover:bg-red-600
				text-white font-medium
				px-4 py-2 rounded-md
				transition-colors duration-200
				disabled:opacity-50 disabled:cursor-not-allowed
				${className}
			`}
		>
			{isLoading ? 'Logging out...' : children}
		</button>
	)
}
