'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LogResponse {
	success: boolean
}

export default function Home() {
	const router = useRouter()

	const log = async (): Promise<void> => {
		try {
			const response = await fetch('/api/logs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify('Hello from the frontend!'),
			})

			const data: LogResponse = await response.json()

			if (data.success) {
				alert('Log sent successfully!')
			} else {
				alert('Failed to send message')
			}
		} catch (error: unknown) {
			console.error('Log error:', error)
			alert('Error sending message')
		}
	}

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Button
				size="lg"
				className="w-full sm:w-auto min-w-32"
				onClick={log}
			>
				Test button
			</Button>

			{/* Main Content */}
			<div className="flex-1 flex items-center justify-center px-4">
				<div className="text-center space-y-8 max-w-2xl">
					{/* App Icon */}
					<div className="flex justify-center">
						<div className="p-6 rounded-2xl bg-gradient-primary shadow-elegant">
							<Wallet className="h-16 w-16 text-white" />
						</div>
					</div>

					{/* App Name */}
					<h1 className="text-6xl md:text-7xl font-bold">
						Fin Plan App
					</h1>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
						<Link href="/signup">
							<Button
								size="lg"
								className="w-full sm:w-auto min-w-32"
							>
								Sign Up
							</Button>
						</Link>

						<Link href="/login">
							<Button
								variant="outline"
								size="lg"
								className="w-full sm:w-auto min-w-32"
							>
								Login
							</Button>
						</Link>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="py-6 px-4 border-t bg-card/50">
				<div className="text-center">
					<p className="text-muted-foreground text-sm">
						powered by #teamTyrlik
					</p>
				</div>
			</footer>
		</div>
	)
}
