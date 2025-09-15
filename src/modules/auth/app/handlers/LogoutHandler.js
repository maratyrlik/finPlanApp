import { Logout } from '@/auth/app/commands/Logout.js'

export class LogoutHandler {
	constructor() {
		this.logoutCommand = new Logout()
	}

	async handle() {
		try {
			const result = await this.logoutCommand.execute()
			return result
		} catch (error) {
			console.error('Logout handler error:', error)
			throw error
		}
	}
}
