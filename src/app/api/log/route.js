import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'

export async function POST(request) {
	try {
		const body = await request.json()

		console.log('Saving to Log table:', body)

		// Ulož do tabulky "Log"
		const { data, error } = await supabaseAdmin
			.from('Log')
			.insert([body])
			.select()

		if (error) {
			console.error('Supabase error:', error)
			throw error
		}

		console.log('Saved to Log table:', data)

		return NextResponse.json({
			success: true,
			message: 'Data saved to Log table successfully!',
			data: data[0],
		})
	} catch (error) {
		console.error('API Error:', error)
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
