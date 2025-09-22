'use client'

import { useRouter } from 'next/navigation'
//import Button from '@/shared/components/Button'
import { Button } from '@/components/ui/button'

export default function Home() {
	const router = useRouter()

	const goToDashboard = () => {
		router.push('/dashboard')
	}

	const goToLogin = () => {
		router.push('/login')
	}

	const handleClick = async () => {
		try {
			// const response = await fetch('/api/message', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		message: 'Hello from the frontend!',
			// 	}),
			// })
			// const data = await response.json()
			// if (data.success) {
			// 	console.warn('sucess:', data)
			// 	log('Hello')
			// 	alert('Message sent successfully!')
			// } else {
			// 	alert('Failed to send message')
			// }
		} catch (error) {
			console.error('Error:', error)
			alert('Error sending message')
		}
	}

	return (
		<div>
			Hello World
			<br />
			<br />
			<Button onClick={handleClick}>Click Me</Button>
			<br />
			<br />
			<Button onClick={goToLogin}>Login</Button>
			<br />
			<br />
			<Button onClick={goToDashboard}>Dashboard</Button>
		</div>
	)
}
