import { LogoutHandler } from '@/auth/app/handlers/LogoutHandler.js'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' })
	}

	try {
		const logoutHandler = new LogoutHandler()
		const result = await logoutHandler.handle()

		res.status(200).json(result)
	} catch (error) {
		console.error('API Logout error:', error)
		res.status(500).json({ error: 'Failed to logout' })
	}
}
