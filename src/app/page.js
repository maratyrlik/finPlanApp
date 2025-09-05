'use client'

import Button from '../components/Button'
import log from '../lib/log'

export default function Home() {
	const handleClick = async () => {
		try {
			const response = await fetch('/api/message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: 'Hello from the frontend!',
				}),
			})

			const data = await response.json()

			if (data.success) {
				console.warn('sucess:', data)
				log('Hello')
				alert('Message sent successfully!')
			} else {
				alert('Failed to send message')
			}
		} catch (error) {
			console.error('Error:', error)
			alert('Error sending message')
		}
	}

	return (
		<div>
			Hello World
			<Button onClick={handleClick}>Click Me</Button>
		</div>
	)
}
