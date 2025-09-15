import { supabaseClient } from '@/shared/lib/supabase.js'

export class Logout {
	async execute() {
		try {
			const { error } = await supabaseClient.auth.signOut()

			if (error) {
				throw new Error(`Logout failed: ${error.message}`)
			}

			return { success: true }
		} catch (error) {
			throw new Error(`Failed to logout: ${error.message}`)
		}
	}
}
