import { NextResponse } from 'next/server'
import { supabaseClient } from '@/shared/lib/supabase'

export async function POST(request) {
	try {
		const body = await request.json()

		console.log('Saving to Log table:', body)

		const { data, error } = await supabaseClient
			.from('Log')
			.insert([body])
			.select()

		if (error) {
			console.error('Supabase error:', error)
			throw error
		}

		console.log('Saved to Log table:', data)
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to save to Log table',
				details: error.message,
			},
			{ status: 500 }
		)
	}
}
