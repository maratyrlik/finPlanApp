// src/app/api/logs/log/route.ts
import { NextResponse } from 'next/server'
import { LogService } from '@/log/domain/services/LogService.ts'

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const body = await request.json()
		LogService.error(body)

		return NextResponse.json(
			{
				success: true,
				detail: 'Logged sussesfully',
			},
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to save to Log table',
				details: error,
			},
			{ status: 500 }
		)
	}
}
