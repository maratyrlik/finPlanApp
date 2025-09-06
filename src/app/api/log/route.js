import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'

import { AccountBalanceRepository } from '../../../infrastructure/repositories/AccountBalanceRepository.js'
import { AccountBalance } from '../../../domain/entities/AccountBalance.js'

export async function POST(request) {
	try {
		// const body = await request.json()

		// console.log('Saving to Log table:', body)

		// // Ulož do tabulky "Log"
		// const { data, error } = await supabaseAdmin
		// 	.from('Log')
		// 	.insert([body])
		// 	.select()

		// if (error) {
		// 	console.error('Supabase error:', error)
		// 	throw error
		// }

		// console.log('Saved to Log table:', data)

		console.warn('maraLog -> saving Account: ')
		const accountRepo = new AccountBalanceRepository()

		// Create and save new account
		const ab = AccountBalance.create(4, 123)
		console.warn('maraLog -> AB: ', ab.toJSON())

		const savedAccount = await accountRepo.save(ab)
		console.log('Saved with ID:', ab.id)

		return NextResponse.json({
			success: true,
			message: 'Data saved to Log table successfully!',
			data: savedAccount.id,
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

async function saveAcc() {
	console.warn('maraLog -> saving Account: ')
	const accountRepo = new AccountRepository()

	// Create and save new account
	const newAccount = new Account({
		name: 'Acc1',
		description: 'first',
	})

	const savedAccount = await accountRepo.save(newAccount)
	console.log('Saved with ID:', savedAccount.id)
}
