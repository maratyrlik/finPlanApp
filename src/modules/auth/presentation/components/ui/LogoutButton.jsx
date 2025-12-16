import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthenticationService } from '@/modules/auth/domain/services/AuthenticationService'

export default function LogoutButton({ className = '', children = 'Logout' }) {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const logoutHandler = new LogoutHandler()

	const handleLogout = async () => {
		console.log('logoutButton')
		try {
			setIsLoading(true)

			//await logoutHandler.handle()

			// const result = await new AuthenticationService().signOut({
			// 	email: formData.email,
			// 	password: formData.password,
			// })

			const { error } = await new AuthenticationService().signOut()

			if (error) {
				throw new Error(`Logout failed: ${error.message}`)
			}

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
