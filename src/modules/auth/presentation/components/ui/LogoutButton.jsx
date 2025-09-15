import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogoutHandler } from '@/auth/app/handlers/LogoutHandler.js'

export default function LogoutButton({ className = '', children = 'Logout' }) {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const logoutHandler = new LogoutHandler()

	const handleLogout = async () => {
		try {
			setIsLoading(true)

			await logoutHandler.handle()

			// Redirect to login page or home page after successful logout
			router.push('/login')
		} catch (error) {
			console.error('Logout failed:', error)
			// You might want to show a toast notification or error message here
			alert('Failed to logout. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<button
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
