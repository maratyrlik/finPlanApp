import { UserRepository } from '@/auth/infrastructure/repositories/UserRepository.js'
import { PasswordService } from '@/auth/domain/services/PasswordService.js'

import { LogService } from '@/log/domain/services/LogService.js'
import { AuthenticationService } from '@/auth/domain/services/AuthenticationService.js'

export class RegisterHandler {
	constructor() {
		this.userRepository = new UserRepository()
	}

	async handle(registerCommand) {
		try {
			registerCommand.validate()

			// const existingUser = await this.userRepository.findByEmail(
			// 	registerCommand.email
			// )
			// if (existingUser) {
			// 	throw new Error('An account with this email already exists')
			// }

			const passwordErrors = PasswordService.validateStrength(
				registerCommand.password
			)
			if (passwordErrors.length > 0) {
				throw new Error(passwordErrors[0])
			}

			const authService = new AuthenticationService()

			const result = await authService.signUp({
				email: registerCommand.email,
				password: registerCommand.password,
				firstName: registerCommand.firstName,
				lastName: registerCommand.lastName,
			})

			if (result.success) {
				console.log('User created:', result.user)
			} else {
				console.error('Error:', result.error)
			}

			return {
				//	user: savedUser, - můžu si ho najít přes findByEmail - ale potřebuju?
				user: {},
				message: 'Registration successful! Welcome to our platform.',
			}
		} catch (error) {
			LogService.error(error.message)
			throw error
		}
	}
}
