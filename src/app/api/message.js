import { NextResponse } from 'next/server'

export async function POST(request) {
	try {
		const { message } = await request.json()

		// Process your message here
		console.log('Received message:', message)

		// You can save to database, send email, etc.

		return NextResponse.json({
			success: true,
			message: 'Message received successfully - really?',
		})
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: 'Failed to process message' },
			{ status: 500 }
		)
	}
}
